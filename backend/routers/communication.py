from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
import os
import re
import tempfile
from typing import Optional

router = APIRouter()

try:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))
    HAS_OPENAI = bool(os.getenv("OPENAI_API_KEY"))
except Exception:
    HAS_OPENAI = False
    client = None


class CommunicationAnalysisRequest(BaseModel):
    answer: str
    question: str
    session_id: Optional[str] = None


NEXT_QUESTIONS = [
    "Describe the most complex technical challenge you've solved. What was your decision-making process?",
    "How do you approach designing for scalability when requirements aren't fully defined?",
    "Tell me about a time you had to convince a team to adopt a different technical approach.",
]


def analyze_text_communication(answer: str, question: str) -> dict:
    """Analyze communication quality using NLP heuristics."""
    words = answer.lower().split()
    word_count = len(words)
    
    filler_words = ["um", "uh", "like", "you know", "basically", "literally", "kind of", "sort of"]
    filler_count = sum(1 for word in words if word in filler_words)
    
    # STAR structure detection
    situation_markers = ["when", "while", "during", "in", "at"]
    task_markers = ["had to", "needed to", "required", "challenge was"]
    action_markers = ["i did", "i implemented", "i built", "i led", "i created", "my approach"]
    result_markers = ["result", "outcome", "achieved", "improved", "reduced", "increased", "%"]
    
    has_situation = any(m in answer.lower() for m in situation_markers)
    has_task = any(m in answer.lower() for m in task_markers)
    has_action = any(m in answer.lower() for m in action_markers)
    has_result = any(m in answer.lower() for m in result_markers)
    
    star_score = sum([has_situation, has_task, has_action, has_result]) / 4
    
    # Technical density
    tech_keywords = ["api", "database", "architecture", "system", "service", "endpoint", "microservice",
                     "latency", "scale", "deploy", "cache", "queue", "async", "distributed", "protocol"]
    tech_count = sum(1 for word in words if word in tech_keywords)
    tech_density = "High" if tech_count > 5 else "Medium" if tech_count > 2 else "Low"
    
    # Clarity score (inversely proportional to filler density)
    filler_ratio = filler_count / max(word_count, 1)
    clarity = max(0.3, min(1.0, 1.0 - filler_ratio * 3))
    
    # Words per minute estimation (assuming normal speech rate ~130wpm)
    estimated_wpm = 130 + (len(words) > 100) * 20
    
    # Overall confidence
    confidence = int(50 + star_score * 30 + (1 - filler_ratio) * 20 + min(tech_count * 2, 10))
    confidence = max(40, min(98, confidence))
    
    return {
        "clarity": round(clarity, 2),
        "technical_density": tech_density,
        "filler_words": filler_count,
        "star_structure": star_score > 0.5,
        "confidence": confidence,
        "wpm": estimated_wpm,
        "recruiter_impression": "Positive" if confidence > 70 else "Mixed" if confidence > 50 else "Skeptical",
    }


def analyze_communication_with_ai(answer: str, question: str) -> dict:
    """Use OpenAI to analyze communication quality."""
    if not HAS_OPENAI:
        return analyze_text_communication(answer, question)
    
    try:
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": """You are a senior technical recruiter and communication expert.
                    Analyze the candidate's interview answer and return a JSON object with:
                    - clarity: float 0-1 (how clear and concise)
                    - technical_density: "High"|"Medium"|"Low" 
                    - filler_words: int (count of um, uh, like, basically, etc.)
                    - star_structure: bool (does it follow Situation-Task-Action-Result)
                    - confidence: int 0-100 (overall confidence score)
                    - wpm: int (estimated speaking pace in words per minute)
                    - recruiter_impression: "Positive"|"Mixed"|"Skeptical"
                    - feedback: string (2-3 sentence specific, actionable feedback)
                    - next_question: null or a follow-up question if more probing needed
                    """,
                },
                {
                    "role": "user",
                    "content": f"Question: {question}\n\nAnswer: {answer}",
                },
            ],
            response_format={"type": "json_object"},
            max_tokens=400,
        )
        import json
        return json.loads(resp.choices[0].message.content)
    except Exception:
        result = analyze_text_communication(answer, question)
        result["feedback"] = "Strong technical articulation. Consider adding more quantified outcomes."
        result["next_question"] = None
        return result


@router.post("/analyze")
async def analyze_communication(request: CommunicationAnalysisRequest):
    """Analyze a communication response."""
    if not request.answer.strip():
        raise HTTPException(400, "Answer cannot be empty")
    
    result = analyze_communication_with_ai(request.answer, request.question)
    
    # Add next question from pool if not provided
    if not result.get("next_question"):
        import random
        result["next_question"] = random.choice(NEXT_QUESTIONS)
    
    return result


@router.post("/transcribe")
async def transcribe_audio(audio: UploadFile = File(...)):
    """Transcribe audio using Whisper API."""
    if not HAS_OPENAI:
        return {
            "transcript": "Voice transcription requires OpenAI API key. Please type your response.",
            "duration": 0,
        }
    
    # Save temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
        content = await audio.read()
        tmp.write(content)
        tmp_path = tmp.name
    
    try:
        with open(tmp_path, "rb") as f:
            transcript = client.audio.transcriptions.create(
                model="whisper-1",
                file=f,
                language="en",
            )
        return {
            "transcript": transcript.text,
            "duration": 0,
        }
    except Exception as e:
        return {
            "transcript": f"Transcription failed: {str(e)}. Please type your response.",
            "duration": 0,
        }
    finally:
        os.unlink(tmp_path)
