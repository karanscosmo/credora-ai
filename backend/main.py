from fastapi import FastAPI, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
import asyncio
import json
import os
import uuid
import time
from typing import Optional, AsyncGenerator

from routers import resume, github_intel, communication, technical, analysis, stream, auth

app = FastAPI(
    title="Credora AI — Neural Recruitment Intelligence API",
    description="Production-grade recruiter intelligence operating system backend",
    version="2.4.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(resume.router, prefix="/api/resume", tags=["Resume Intelligence"])
app.include_router(github_intel.router, prefix="/api/github", tags=["GitHub Constellation"])
app.include_router(communication.router, prefix="/api/communication", tags=["Communication Pulse"])
app.include_router(technical.router, prefix="/api/technical", tags=["Technical Pulse"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["Core Analysis"])
app.include_router(stream.router, prefix="/api/recruiter-brain", tags=["Recruiter Brain"])


@app.get("/")
async def root():
    return {
        "service": "Credora AI — Neural Intelligence Backend",
        "version": "2.4.0",
        "status": "NEURAL_SYSTEMS_ACTIVE",
        "timestamp": time.time(),
    }


@app.get("/health")
async def health():
    return {"status": "healthy", "neural_status": "synchronized"}


@app.get("/api/ping")
async def ping():
    return {"pong": True, "ts": time.time()}
