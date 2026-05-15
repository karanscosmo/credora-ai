// ============================================================
// CREDORA AI — Production API Client
// All backend communication goes through here
// ============================================================

const isProd = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
const API_BASE = isProd ? '/_/backend' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000');

// ─── Generic fetch wrapper ───────────────────────────────────
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('credora_token') : null;
  const url = `${API_BASE}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(err.detail || err.message || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Auth ────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<{ access_token: string; user: Record<string, unknown> }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signup: (name: string, email: string, password: string, organization?: string) =>
    apiFetch<{ access_token: string; user: Record<string, unknown> }>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, organization }),
    }),

  me: () =>
    apiFetch<Record<string, unknown>>('/api/auth/me'),

  guestToken: () =>
    apiFetch<{ access_token: string }>('/api/auth/guest'),
};

// ─── Resume ──────────────────────────────────────────────────
export type ResumeUploadResult = {
  session_id: string;
  trust_score: number;
  resume_data: {
    fileName: string;
    skills: string[];
    experience: string[];
    education: string[];
    summary: string;
  };
  ats_analysis: Record<string, boolean>;
  skills: string[];
  quantified_impacts: string[];
  ai_generated_phrases: string[];
  weak_statements: string[];
  heatmap_data: {
    hotspots: Array<{ section: string; attention: number; sentiment: string }>;
    suspicion_flags: string[];
    gaze_retention: number;
  };
};

export const resumeApi = {
  upload: async (file: File, githubUsername?: string): Promise<ResumeUploadResult> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('credora_token') : null;
    const formData = new FormData();
    formData.append('file', file);
    if (githubUsername) formData.append('github_username', githubUsername);

    const res = await fetch(`${API_BASE}/api/resume/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Upload failed' }));
      throw new Error(err.detail || 'Upload failed');
    }

    return res.json();
  },
};

// ─── GitHub ──────────────────────────────────────────────────
export type GitHubResult = {
  username: string;
  totalRepos: number;
  followers: number;
  topLanguages: string[];
  repos: Array<{
    name: string;
    stars: number;
    commits: number;
    hasReadme: boolean;
    isDeployed: boolean;
    originality: number;
    description: string;
    language: string;
    isTutorial: boolean;
    isFork: boolean;
    verified?: boolean;
    entropy?: string;
    languages?: string[];
  }>;
  engineeringMaturity: string;
  commitConsistency: number;
  originality: number;
  commitVelocity: string;
  knowledgeEntropy: string;
  tutorialCount: number;
  deploymentProof: boolean;
  readmeQuality: number;
  engineeringRating: string;
};

export const githubApi = {
  analyze: (username: string) =>
    apiFetch<GitHubResult>('/api/github/analyze', {
      method: 'POST',
      body: JSON.stringify({ username }),
    }),
};

// ─── Communication Pulse ─────────────────────────────────────
export type CommunicationResult = {
  confidence_score: number;
  filler_word_rate: number;
  semantic_clarity: number;
  tone: string;
  recommendation: string;
  behavioral_archetype: string;
};

export const communicationApi = {
  analyze: (text: string) =>
    apiFetch<CommunicationResult>('/api/communication/analyze', {
      method: 'POST',
      body: JSON.stringify({ text }),
    }),
};

// ─── Technical Pulse ─────────────────────────────────────────
export type TechnicalResult = {
  questions: Array<{ id: string; question: string; options: string[]; correct: number; difficulty: string }>;
  scores: number[];
  avg_score: number;
  trust_score: number;
  archetype: string;
};

export const technicalApi = {
  getQuestions: (skills: string[]) =>
    apiFetch<TechnicalResult>('/api/technical/questions', {
      method: 'POST',
      body: JSON.stringify({ skills }),
    }),

  submitAnswers: (sessionId: string, answers: number[]) =>
    apiFetch<TechnicalResult>('/api/technical/submit', {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId, answers }),
    }),
};

// ─── Full Analysis / Recruitability ──────────────────────────
export type FullAnalysisResult = {
  recruitability_index: number;
  component_scores: {
    resume: number;
    github: number;
    technical: number;
    communication: number;
    authenticity: number;
  };
  startup_fit: number;
  mnc_fit: number;
  silent_rejection_risks: string[];
  top_improvements: Array<{ title: string; impact: string; trust_gain: number }>;
};

export const analysisApi = {
  full: (sessionId: string, githubUsername?: string, technicalScores?: number[], communicationScore?: number) =>
    apiFetch<FullAnalysisResult>('/api/analysis/full', {
      method: 'POST',
      body: JSON.stringify({
        session_id: sessionId,
        github_username: githubUsername,
        technical_scores: technicalScores,
        communication_score: communicationScore,
      }),
    }),
};

// ─── Session Storage Helpers ─────────────────────────────────
export const sessionStore = {
  save: (key: string, data: unknown) => {
    try {
      localStorage.setItem(`credora_${key}`, JSON.stringify(data));
    } catch {}
  },
  load: <T>(key: string): T | null => {
    try {
      const raw = localStorage.getItem(`credora_${key}`);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },
  clear: (key: string) => {
    try {
      localStorage.removeItem(`credora_${key}`);
    } catch {}
  },
  clearAll: () => {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('credora_'))
        .forEach((k) => localStorage.removeItem(k));
    } catch {}
  },
};
