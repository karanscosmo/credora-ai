# 🌌 CREDORA AI — Neural Recruiter Intelligence OS

> **Decode recruiter trust before interviews decide your future.**

Credora AI is an enterprise-grade recruiter-intelligence platform designed to expose the "silent rejection" triggers that often bypass traditional feedback loops. By simulating recruiter psychology through neural analysis of resumes, GitHub constellations, and adaptive technical pulses, Credora provides a high-fidelity map of your recruitability.

---

## 🚀 NEW: AI Resume & Company Prep Engine
The latest update transforms Credora into a complete hiring success ecosystem.
- **Company-Specific Builder**: Tailor your resume specifically for Google, Meta, Stripe, and more using company-wise intelligence.
- **ATS Compatibility Meter**: Real-time scoring and neural suggestions to bypass automated filters.
- **Interview Simulator**: Simulated mock rounds with a Neural Evaluator providing behavioral and technical feedback.
- **Hiring Pipeline Dashboard**: Track your readiness velocity across multiple target companies.

---

## 🧠 Core Intelligence Modules

| Module | Purpose | Status |
|:---|:---|:---|
| **2-Minute Flow™** | Immersive, continuous cinematic evaluation journey. | ✅ PROD |
| **AI Prep Engine™** | **(NEW)** Company-specific resume building & mock interviews. | ✅ PROD |
| **Resume Intel** | ATS mapping, AI-phrase detection, and quantified impact scoring. | ✅ PROD |
| **GitHub Constellation™** | Engineering maturity and tutorial-boilerplate detection. | ✅ PROD |
| **Communication Pulse™** | Real-time voice frequency & semantic confidence analysis. | ✅ PROD |
| **Technical Pulse™** | Adaptive interrogation based on technical depth. | ✅ PROD |
| **Recruiter Brain™** | Simulated "thinking" stream of recruiter hesitation triggers. | ✅ PROD |
| **Silent Rejection Risk™** | Exposure of high-priority pass-over signals. | ✅ PROD |

---

## 🛠 Architecture & Tech Stack

The platform is architected as a high-performance monorepo:

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.
- **Backend**: FastAPI (Python 3.10+) + OpenAI GPT-4o + PyMuPDF.
- **Deployment**: Optimized for Vercel with a unified API entry point (`/_/backend`).

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
uvicorn index:app --reload --port 8000
```

### 2. Intelligence HUD (Frontend)
```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Deployment Guide (Vercel Optimized)

This project is pre-configured for a **unified monorepo deployment** on Vercel.

1.  **Environment Variables**:
    *   `OPENAI_API_KEY`: Required for the neural core.
2.  **Vercel Configuration**:
    *   The `vercel.json` in the root automatically routes `/_/backend` to the FastAPI backend.
    *   Set the **Framework Preset** to Next.js.
    *   Ensure the **Build Command** is `npm run build` (within the frontend context).

---

## 🎨 Design Language
- **Atmosphere**: Deep Obsidian Base (#020408)
- **Primary Accent**: Cyan Pulse (#06B6D4) / Electric Glow (#3B82F6)
- **Typography**: Sora / Geist (Display) / Geist Mono (Data Streams)
- **Experience**: Cinematic glassmorphism with 60fps Framer Motion transitions.

---
*Built for the next generation of engineers who want to control the narrative.*
