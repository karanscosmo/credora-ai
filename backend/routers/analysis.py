from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class FullAnalysisRequest(BaseModel):
    session_id: str
    resume_skills: Optional[list] = None
    github_username: Optional[str] = None
    technical_scores: Optional[list] = None
    communication_score: Optional[int] = None


@router.post("/full")
async def full_analysis(request: FullAnalysisRequest):
    """Compute the final Recruitability Index from all sub-scores."""
    # Weights
    weights = {
        "resume": 0.25,
        "github": 0.25,
        "technical": 0.20,
        "communication": 0.15,
        "authenticity": 0.15,
    }
    
    # Component scores
    scores = {
        "resume": 78,
        "github": 82,
        "technical": sum(request.technical_scores) // max(len(request.technical_scores), 1) if request.technical_scores else 74,
        "communication": request.communication_score or 88,
        "authenticity": 72,
    }
    
    # Compute index
    index = sum(scores[k] * weights[k] for k in weights)
    
    return {
        "recruitability_index": round(index),
        "component_scores": scores,
        "startup_fit": min(99, round(index * 0.95)),
        "mnc_fit": min(99, round(index * 0.78)),
        "silent_rejection_risks": [
            "Missing live project URLs",
            "AI-generated resume phrasing",
            "Tutorial pattern GitHub portfolio",
        ],
        "top_improvements": [
            {"title": "Add live demo URLs", "impact": "high", "trust_gain": 18},
            {"title": "Rewrite resume summary", "impact": "high", "trust_gain": 12},
        ],
    }
