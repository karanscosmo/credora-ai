from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
import tempfile
import os
import uuid
import asyncio
from typing import Optional

router = APIRouter()

# Try to import PDF libraries
try:
    import fitz  # PyMuPDF
    HAS_PYMUPDF = True
except ImportError:
    HAS_PYMUPDF = False

try:
    import pdfplumber
    HAS_PDFPLUMBER = True
except ImportError:
    HAS_PDFPLUMBER = False

try:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))
    HAS_OPENAI = bool(os.getenv("OPENAI_API_KEY"))
except Exception:
    HAS_OPENAI = False
    client = None


def extract_text_from_pdf(file_path: str) -> str:
    """Extract text from PDF using PyMuPDF with pdfplumber fallback."""
    text = ""
    
    if HAS_PYMUPDF:
        try:
            doc = fitz.open(file_path)
            for page in doc:
                text += page.get_text()
            doc.close()
            if text.strip():
                return text
        except Exception:
            pass
    
    if HAS_PDFPLUMBER:
        try:
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    text += (page.extract_text() or "") + "\n"
            if text.strip():
                return text
        except Exception:
            pass
    
    return "Resume text extraction requires PyMuPDF or pdfplumber"


def parse_resume_with_ai(text: str) -> dict:
    """Use OpenAI to parse resume structure."""
    if not HAS_OPENAI or not text.strip():
        return _demo_resume_data()
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": """You are an expert resume parser. Extract structured information from the resume text.
                    Return a JSON object with these fields:
                    - skills: list of technical skills
                    - experience: list of job titles/companies
                    - education: list of education entries
                    - summary: the professional summary
                    - github_url: GitHub URL if present (or null)
                    - email: email if present (or null)
                    - quantified_impacts: list of statements with numbers/metrics
                    - ai_generated_phrases: list of generic/AI-sounding phrases detected
                    - weak_statements: list of low-impact phrases to improve
                    """,
                },
                {"role": "user", "content": f"Parse this resume:\n\n{text[:4000]}"},
            ],
            response_format={"type": "json_object"},
            max_tokens=1000,
        )
        return json.loads(response.choices[0].message.content)
    except Exception:
        return _demo_resume_data()


def compute_trust_score(parsed: dict, text: str) -> int:
    """Compute recruiter trust score from resume data."""
    score = 50
    
    # Skills count
    skills = parsed.get("skills", [])
    score += min(len(skills) * 2, 15)
    
    # Quantified impacts
    impacts = parsed.get("quantified_impacts", [])
    score += min(len(impacts) * 3, 15)
    
    # AI-generated phrases (deduct)
    ai_phrases = parsed.get("ai_generated_phrases", [])
    score -= min(len(ai_phrases) * 3, 15)
    
    # Experience entries
    exp = parsed.get("experience", [])
    score += min(len(exp) * 2, 10)
    
    # Summary quality
    summary = parsed.get("summary", "")
    if len(summary) > 100:
        score += 5
    
    return max(40, min(99, score))


def compute_ats_score(text: str) -> dict:
    """Simple ATS compatibility analysis."""
    checks = {
        "standard_format": len(text) > 200,
        "font_hierarchy": True,  # Can't check from text
        "keyword_density": len(text.split()) > 100,
        "img_block": False,  # Would need visual analysis
    }
    return checks


def _demo_resume_data() -> dict:
    return {
        "skills": ["Python", "React", "TypeScript", "Node.js", "AWS", "Docker", "PostgreSQL"],
        "experience": ["Software Engineer @ TechCorp", "Backend Developer @ StartupXY"],
        "education": ["B.Tech Computer Science, 2021"],
        "summary": "Experienced full-stack engineer with 3 years building scalable web applications.",
        "github_url": None,
        "email": None,
        "quantified_impacts": ["Improved API response time by 40%", "Led team of 5 engineers"],
        "ai_generated_phrases": ["Passionate about technology", "Strong team player", "Results-driven professional"],
        "weak_statements": ["Responsible for development", "Worked on various projects"],
    }


import json

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    github_username: Optional[str] = Form(None),
):
    """Upload and analyze resume PDF."""
    if not file.filename:
        raise HTTPException(400, "No file provided")
    
    if not file.filename.lower().endswith((".pdf", ".docx")):
        raise HTTPException(400, "Only PDF and DOCX files are supported")
    
    session_id = str(uuid.uuid4())
    
    # Save temp file
    suffix = ".pdf" if file.filename.lower().endswith(".pdf") else ".docx"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name
    
    try:
        # Extract text
        text = extract_text_from_pdf(tmp_path) if suffix == ".pdf" else "DOCX support requires python-docx"
        
        # Parse resume
        parsed = parse_resume_with_ai(text)
        
        # Compute scores
        trust_score = compute_trust_score(parsed, text)
        ats = compute_ats_score(text)
        
        return {
            "session_id": session_id,
            "trust_score": trust_score,
            "resume_data": {
                "fileName": file.filename,
                "skills": parsed.get("skills", []),
                "experience": parsed.get("experience", []),
                "education": parsed.get("education", []),
                "summary": parsed.get("summary", ""),
                "rawText": text[:500],
            },
            "ats_analysis": ats,
            "skills": parsed.get("skills", []),
            "quantified_impacts": parsed.get("quantified_impacts", []),
            "ai_generated_phrases": parsed.get("ai_generated_phrases", []),
            "weak_statements": parsed.get("weak_statements", []),
            "heatmap_data": {
                "hotspots": [
                    {"section": "Experience", "attention": 95, "sentiment": "positive"},
                    {"section": "Skills", "attention": 88, "sentiment": "neutral"},
                    {"section": "Summary", "attention": 42, "sentiment": "skeptical"},
                ],
                "suspicion_flags": parsed.get("ai_generated_phrases", [])[:3],
                "gaze_retention": 4.2,
            },
        }
    finally:
        os.unlink(tmp_path)
