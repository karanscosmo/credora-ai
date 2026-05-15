from fastapi import APIRouter, HTTPException, Depends, status, Header
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta
import hashlib
import uuid

router = APIRouter()

# Use PyJWT if available, otherwise fallback to simple tokens
try:
    from jose import JWTError, jwt
    HAS_JWT = True
except ImportError:
    HAS_JWT = False

SECRET_KEY = "CREDORA_AI_NEURAL_INTELLIGENCE_SECRET_KEY_2026"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(plain: str, hashed: str) -> bool:
    return hash_password(plain) == hashed


# In-memory user store (demo)
USERS_DB: dict = {
    "demo@credora.ai": {
        "id": "usr_demo_001",
        "email": "demo@credora.ai",
        "hashed_password": hash_password("demo1234"),
        "name": "Demo Recruiter",
        "organization": "Credora AI",
        "role": "Recruiter Intelligence Lead",
        "is_guest": False,
    }
}


def create_token(data: dict, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES) -> str:
    if HAS_JWT:
        payload = {**data, "exp": datetime.utcnow() + timedelta(minutes=expires_minutes)}
        return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    # Fallback: simple UUID token
    token = f"credora_{uuid.uuid4().hex}"
    return token


def decode_token(token: str) -> dict:
    if HAS_JWT:
        try:
            return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        except Exception:
            raise HTTPException(status_code=401, detail="Token invalid or expired")
    return {}


def get_current_user(authorization: Optional[str] = Header(None)) -> dict:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    return decode_token(authorization.split(" ")[1])


# ── Models ──────────────────────────────────────────────────────
class LoginRequest(BaseModel):
    email: str
    password: str


class SignupRequest(BaseModel):
    email: str
    password: str
    name: str
    organization: Optional[str] = None


class OAuthRequest(BaseModel):
    id_token: str
    email: str
    name: str


# ── Routes ──────────────────────────────────────────────────────
@router.post("/login")
async def login(req: LoginRequest):
    user = USERS_DB.get(req.email.lower())
    if not user or not verify_password(req.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    token = create_token({"sub": user["email"], "id": user["id"], "name": user["name"], "is_guest": False})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"id": user["id"], "email": user["email"], "name": user["name"], "organization": user.get("organization", ""), "role": user["role"]},
    }


@router.post("/signup")
async def signup(req: SignupRequest):
    email = req.email.lower()
    # Allow re-registration in demo mode (just overwrite)
    user_id = f"usr_{uuid.uuid4().hex[:8]}"
    USERS_DB[email] = {
        "id": user_id,
        "email": email,
        "hashed_password": hash_password(req.password),
        "name": req.name,
        "organization": req.organization or "",
        "role": "Recruiter Intelligence User",
        "is_guest": False,
    }
    token = create_token({"sub": email, "id": user_id, "name": req.name, "is_guest": False})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"id": user_id, "email": email, "name": req.name, "organization": req.organization or "", "role": "Recruiter Intelligence User"},
    }


@router.post("/guest")
async def guest_access():
    guest_id = f"gst_{uuid.uuid4().hex[:8]}"
    token = create_token({"sub": f"guest@credora.ai", "id": guest_id, "name": "Guest", "is_guest": True}, expires_minutes=120)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"id": guest_id, "email": "guest@credora.ai", "name": "Guest Explorer", "role": "Guest"},
    }


@router.post("/oauth/google")
async def oauth_google(req: OAuthRequest):
    """Simulated Google OAuth — accepts any id_token in dev mode."""
    email = req.email.lower()
    if email not in USERS_DB:
        uid = f"usr_g_{uuid.uuid4().hex[:8]}"
        USERS_DB[email] = {"id": uid, "email": email, "hashed_password": "", "name": req.name, "organization": "", "role": "Google User", "is_guest": False}
    user = USERS_DB[email]
    token = create_token({"sub": user["email"], "id": user["id"], "name": user["name"], "is_guest": False})
    return {"access_token": token, "token_type": "bearer", "user": {"id": user["id"], "email": user["email"], "name": user["name"]}}


@router.get("/me")
async def get_me(current: dict = Depends(get_current_user)):
    return {"id": current.get("id"), "email": current.get("sub"), "name": current.get("name"), "is_guest": current.get("is_guest", False)}
