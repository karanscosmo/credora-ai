# CREDORA AI — Neural Recruiter Intelligence OS

> **"Decode recruiter trust before interviews decide your future."**

## Architecture

```
/frontend     — Next.js 16 + TypeScript + Tailwind CSS
/backend      — FastAPI + Python + OpenAI + GitHub API
```

## Quick Start

### 1. Frontend (Next.js)
```bash
cd frontend
npm install
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev                          # → http://localhost:3000
```

### 2. Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
cp ../.env.example .env             # add your API keys
uvicorn main:app --reload --port 8000
```

### 3. Environment Keys Required
| Key | Purpose |
|-----|---------|
| `OPENAI_API_KEY` | GPT-4o analysis, Whisper voice transcription |
| `GITHUB_TOKEN` | Higher GitHub API rate limits (optional) |

## Features

| Page | Route | Status |
|------|-------|--------|
| Neural Intro | `/` | ✅ Live |
| Resume Intelligence Scan | `/scan` | ✅ Live |
| Recruiter Attention Heatmap™ | `/heatmap` | ✅ Live |
| GitHub Intelligence Constellation™ | `/github` | ✅ Live |
| Tutorial Project Detection™ | `/tutorial-detect` | ✅ Live |
| Communication Pulse™ + Voice | `/pulse` | ✅ Live |
| Adaptive Technical Pulse™ | `/technical` | ✅ Live |
| Confidence vs Evidence Engine™ | `/confidence` | ✅ Live |
| Recruiter Brain Simulation™ | `/recruiter-brain` | ✅ Live |
| Silent Rejection Risk Engine™ | `/rejection-risk` | ✅ Live |
| Recruitability Dashboard™ | `/dashboard` | ✅ Live |
| Improvement Simulator™ | `/simulator` | ✅ Live |
| Startup vs MNC Fit Engine™ | `/fit-engine` | ✅ Live |

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `POST /api/resume/upload` | POST | Upload & parse resume PDF |
| `POST /api/github/analyze` | POST | Analyze GitHub profile |
| `POST /api/communication/analyze` | POST | Analyze text response |
| `POST /api/communication/transcribe` | POST | Voice → text via Whisper |
| `POST /api/technical/questions` | POST | Generate adaptive questions |
| `POST /api/analysis/full` | POST | Compute Recruitability Index |
| `GET /api/recruiter-brain/stream` | GET | SSE recruiter thought stream |

## Design System

- **Background**: `#070b14` / `#0d1321`
- **Primary**: `#b3c5ff` (Electric Blue)
- **Secondary**: `#7df4ff` (Cyan Glow)
- **Alert**: `#ffb59c` (Coral)
- **Fonts**: Sora (display) · Hanken Grotesk (body) · JetBrains Mono (data)

## Production Deployment

### Frontend → Vercel
```bash
cd frontend && vercel deploy
```

### Backend → Railway
```bash
# Railway detects requirements.txt automatically
railway up
```
