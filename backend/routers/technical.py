from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
import os

router = APIRouter()

try:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))
    HAS_OPENAI = bool(os.getenv("OPENAI_API_KEY"))
except Exception:
    HAS_OPENAI = False
    client = None


class TechnicalQuestionsRequest(BaseModel):
    skills: List[str]
    previous_answers: Optional[List[int]] = None
    difficulty: Optional[str] = "adaptive"


FALLBACK_QUESTIONS = [
    {
        "question": "Design a rate limiter that handles 10M requests/second with sub-millisecond latency.",
        "vectors": [
            {"id": "A", "text": "Token bucket algorithm with Redis atomic operations and local in-memory cache.", "score": 90},
            {"id": "B", "text": "Simple database counter with a timestamp check.", "score": 20},
            {"id": "C", "text": "Fixed window counter using Redis INCR with TTL.", "score": 60},
        ],
        "correct": "A",
        "topic": "System Design",
    },
    {
        "question": "What is the key difference between optimistic and pessimistic concurrency control?",
        "vectors": [
            {"id": "A", "text": "Optimistic assumes conflicts are rare; pessimistic locks resources preemptively.", "score": 95},
            {"id": "B", "text": "Optimistic uses more memory; pessimistic uses more CPU.", "score": 15},
            {"id": "C", "text": "They are equivalent — just different naming conventions.", "score": 5},
        ],
        "correct": "A",
        "topic": "Databases",
    },
]


@router.post("/questions")
async def generate_questions(request: TechnicalQuestionsRequest):
    """Generate adaptive technical questions based on skills."""
    if not HAS_OPENAI:
        return {"questions": FALLBACK_QUESTIONS}
    
    try:
        import json
        avg_score = 0
        if request.previous_answers:
            avg_score = sum(request.previous_answers) / len(request.previous_answers)
        
        difficulty = "advanced" if avg_score > 75 else "intermediate" if avg_score > 50 else "foundational"
        
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": f"""Generate 2 adaptive technical interview questions for a software engineer.
                    Skills: {', '.join(request.skills[:5])}
                    Difficulty: {difficulty}
                    
                    Return JSON with 'questions' array. Each question has:
                    - question: string
                    - vectors: array of 3 objects with id (A/B/C), text, score (0-100)
                    - correct: string (A, B, or C)
                    - topic: string
                    """,
                },
                {"role": "user", "content": "Generate questions"},
            ],
            response_format={"type": "json_object"},
            max_tokens=800,
        )
        return json.loads(resp.choices[0].message.content)
    except Exception:
        return {"questions": FALLBACK_QUESTIONS}
