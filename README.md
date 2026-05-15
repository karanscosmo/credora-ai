# 🌌 CREDORA AI — Neural Recruiter Intelligence OS
> **Decode recruiter trust before interviews decide your future.**

Credora AI is an enterprise-grade recruiter-intelligence platform designed to expose the "silent rejection" triggers that often bypass traditional feedback loops. By simulating recruiter psychology through neural analysis of resumes, GitHub constellations, and adaptive technical pulses, Credora provides a high-fidelity map of your recruitability.

---

## 🛠 Architecture & Tech Stack

The platform is architected as a high-performance monorepo:

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.
- **Backend**: FastAPI (Python 3.10+) + OpenAI GPT-4o + Whisper + GitHub REST API.
- **Intelligence**: Custom neural weighting for trust, originality, and engineering maturity.

```text
/frontend     — The Cinematic Recruiter Intelligence HUD
/backend      — Neural Core & Data Interrogation Pipeline
```

---

## ⚡️ Quick Start

### 1. Neural Core (Backend)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Intelligence HUD (Frontend)
```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Core Intelligence Modules

| Module | Purpose | Status |
|:---|:---|:---|
| **2-Minute Flow™** | Immersive, continuous cinematic evaluation journey. | ✅ PROD |
| **Resume Intel** | ATS mapping, AI-phrase detection, and quantified impact scoring. | ✅ PROD |
| **GitHub Constellation™** | Engineering maturity and tutorial-boilerplate detection. | ✅ PROD |
| **Communication Pulse™** | Real-time voice frequency & semantic confidence analysis. | ✅ PROD |
| **Technical Pulse™** | Adaptive interrogation based on technical depth. | ✅ PROD |
| **Recruiter Brain™** | Simulated "thinking" stream of recruiter hesitation triggers. | ✅ PROD |
| **Silent Rejection Risk™** | Exposure of high-priority pass-over signals. | ✅ PROD |

---

## 🚀 Deployment Guide

### Frontend (Vercel)
1. Push this repo to your GitHub.
2. Connect the repository in the **Vercel Dashboard**.
3. **Crucial**: Set the `Root Directory` to `frontend`.
4. Add Environment Variable: `NEXT_PUBLIC_API_URL` (pointing to your hosted backend).

### Backend (Railway / Render)
1. Create a new project on **Railway**.
2. Connect the repo and set the `Root Directory` to `backend`.
3. Add Environment Variable: `OPENAI_API_KEY`.
4. Railway will automatically detect the `requirements.txt` and `main.py`.

---

## 🔑 Environment Variables

| Variable | Required | Description |
|:---|:---|:---|
| `OPENAI_API_KEY` | Yes | Powers the neural analysis and interrogation. |
| `NEXT_PUBLIC_API_URL` | Yes | The URL of your FastAPI backend. |
| `GITHUB_TOKEN` | No | Extends rate limits for deep repository scans. |

---

## 🎨 Design Language
- **Atmosphere**: Deep Obsidian Space (#070b14)
- **Primary Accent**: Electric Blue / Cyan Pulse
- **Typography**: Sora (Display) / JetBrains Mono (Intelligence Streams)

---
*Built for the next generation of engineers who want to control the narrative.*
