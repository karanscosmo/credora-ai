from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import asyncio
import json
import os
import random
from typing import Optional, AsyncGenerator

router = APIRouter()

try:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))
    HAS_OPENAI = bool(os.getenv("OPENAI_API_KEY"))
except Exception:
    HAS_OPENAI = False
    client = None


DEMO_RECRUITER_THOUGHTS = [
    ("Projects appear polished but not production-mature.", "skeptical", 55),
    ("Recruiters may subconsciously question originality of the GitHub portfolio.", "skeptical", 48),
    ("The resume has strong keywords but lacks quantified outcomes in leadership roles.", "neutral", 60),
    ("Strong system design vocabulary — candidate may perform well in technical screens.", "positive", 72),
    ("Missing deployment URLs triggers mild skepticism in SaaS-focused recruiters.", "skeptical", 52),
    ("AI-generated resume phrasing detected — senior engineers may flag this.", "skeptical", 44),
    ("React/TypeScript combination suggests frontend-leaning despite full-stack claim.", "neutral", 58),
    ("3-year experience claim doesn't align with commit history density.", "skeptical", 50),
    ("Absence of open source contributions raises 'lone wolf' concern.", "skeptical", 53),
    ("The summary is template-driven. High similarity to generic engineer profiles.", "skeptical", 46),
    ("GitHub shows consistent commit streaks — signals discipline and reliability.", "positive", 75),
    ("Technical depth in Python ecosystem suggests backend credibility.", "positive", 70),
]


async def generate_recruiter_thoughts(skills_str: str) -> AsyncGenerator[str, None]:
    """Stream recruiter thoughts via SSE."""
    
    if HAS_OPENAI and skills_str != "demo":
        try:
            stream = client.chat.completions.create(
                model="gpt-4o-mini",
                stream=True,
                messages=[
                    {
                        "role": "system",
                        "content": """You are simulating the internal monologue of an experienced technical recruiter
                        reviewing a candidate's profile. Generate 8-10 distinct, realistic thoughts that a recruiter would have.
                        Each thought should be on its own line, starting with a sentiment marker:
                        [POSITIVE] for encouraging thoughts
                        [SKEPTICAL] for doubts
                        [NEUTRAL] for observations
                        
                        Be specific, insightful, and realistic. Avoid generic statements.""",
                    },
                    {
                        "role": "user",
                        "content": f"Candidate skills: {skills_str}\nGenerate recruiter thoughts:",
                    },
                ],
                max_tokens=600,
            )
            
            buffer = ""
            thought_index = 0
            sentiment_map = {"[POSITIVE]": "positive", "[SKEPTICAL]": "skeptical", "[NEUTRAL]": "neutral"}
            
            for chunk in stream:
                if chunk.choices[0].delta.content:
                    buffer += chunk.choices[0].delta.content
                    
                    # Parse complete lines
                    while "\n" in buffer:
                        line, buffer = buffer.split("\n", 1)
                        line = line.strip()
                        if not line:
                            continue
                        
                        # Detect sentiment
                        mood = "neutral"
                        sentiment = 60
                        for marker, m in sentiment_map.items():
                            if line.startswith(marker):
                                mood = m
                                line = line[len(marker):].strip()
                                sentiment = 70 if m == "positive" else 45 if m == "skeptical" else 58
                                break
                        
                        if line:
                            event_data = json.dumps({
                                "thought": line,
                                "index": thought_index,
                                "mood": mood,
                                "sentiment": sentiment,
                            })
                            yield f"data: {event_data}\n\n"
                            thought_index += 1
                            await asyncio.sleep(0.3)
            
            yield "data: {\"done\": true}\n\n"
            return
            
        except Exception:
            pass  # Fall through to demo
    
    # Demo mode: stream pre-defined thoughts
    thoughts = random.sample(DEMO_RECRUITER_THOUGHTS, min(8, len(DEMO_RECRUITER_THOUGHTS)))
    for i, (thought, mood, sentiment) in enumerate(thoughts):
        event_data = json.dumps({
            "thought": thought,
            "index": i,
            "mood": mood,
            "sentiment": sentiment,
        })
        yield f"data: {event_data}\n\n"
        await asyncio.sleep(0.3)
    
    yield "data: {\"done\": true}\n\n"


@router.get("/stream")
async def stream_recruiter_brain(username: Optional[str] = None):
    """SSE endpoint for streaming recruiter thoughts."""
    skills_str = username or "demo"
    
    return StreamingResponse(
        generate_recruiter_thoughts(skills_str),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
