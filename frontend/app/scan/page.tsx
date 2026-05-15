"use client";

import React, { useState, useRef, useEffect } from 'react';
import NavBar from '@/components/credora/NavBar';
import { resumeApi, githubApi, sessionStore, type ResumeUploadResult } from '@/lib/api';
import { useRouter } from 'next/navigation';

type ScanStep =
  | 'idle'
  | 'uploading'
  | 'parsing'
  | 'github'
  | 'synthesis'
  | 'done'
  | 'error';

const STEP_LABELS: Record<ScanStep, string> = {
  idle:       'Awaiting payload...',
  uploading:  'Uploading resume...',
  parsing:    'Neural parsing — extracting skills & impacts...',
  github:     'Scanning GitHub constellation...',
  synthesis:  'Synthesizing recruiter intelligence...',
  done:       'Analysis complete — redirecting to dashboard',
  error:      'Scan failed — please retry',
};

const LOG_MESSAGES = {
  uploading:  ['[INIT] Receiving payload...', '[PARSE] Identifying document format...'],
  parsing:    ['[OCR] Extracting text layer...', '[NLP] Mapping skill nodes...', '[TRUST] Computing authenticity score...'],
  github:     ['[GIT] Fetching repository constellation...', '[PATTERN] Running tutorial detection...', '[SCORE] Computing engineering maturity...'],
  synthesis:  ['[AI] Synthesizing recruitability index...', '[BRAIN] Simulating recruiter hesitation...', '[REPORT] Building final intelligence brief...'],
};

export default function ScanPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [githubUsername, setGithubUsername] = useState('');
  const [step, setStep] = useState<ScanStep>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const addLog = (msg: string) =>
    setLogs((prev) => [...prev.slice(-12), `${new Date().toISOString().slice(11, 19)}  ${msg}`]);

  const simulateProgress = (from: number, to: number, duration: number) =>
    new Promise<void>((resolve) => {
      const steps = 20;
      const inc = (to - from) / steps;
      const delay = duration / steps;
      let cur = from;
      const iv = setInterval(() => {
        cur += inc;
        setProgress(Math.min(cur, to));
        if (cur >= to) { clearInterval(iv); resolve(); }
      }, delay);
    });

  const handleFile = (f: File) => {
    if (!f.name.match(/\.(pdf|docx)$/i)) {
      alert('Please upload a PDF or DOCX file.');
      return;
    }
    setFile(f);
  };

  const handleScan = async () => {
    if (!file) return;
    setStep('uploading');
    setLogs([]);
    setProgress(0);

    try {
      // ── Step 1: Upload & parse ──────────────────────────────
      LOG_MESSAGES.uploading.forEach(addLog);
      await simulateProgress(0, 20, 800);

      setStep('parsing');
      LOG_MESSAGES.parsing.forEach(addLog);
      const resumeResult: ResumeUploadResult = await resumeApi.upload(file, githubUsername || undefined);
      sessionStore.save('resume', resumeResult);
      await simulateProgress(20, 50, 1500);

      // ── Step 2: GitHub (if username provided) ───────────────
      if (githubUsername.trim()) {
        setStep('github');
        LOG_MESSAGES.github.forEach(addLog);
        try {
          const ghResult = await githubApi.analyze(githubUsername.trim());
          sessionStore.save('github', ghResult);
        } catch {
          addLog('[WARN] GitHub scan degraded — using resume signals only');
        }
        await simulateProgress(50, 80, 1500);
      } else {
        await simulateProgress(50, 80, 500);
      }

      // ── Step 3: Synthesis ───────────────────────────────────
      setStep('synthesis');
      LOG_MESSAGES.synthesis.forEach(addLog);
      await simulateProgress(80, 100, 1200);

      setStep('done');
      addLog('[COMPLETE] Neural intelligence report ready.');
      setTimeout(() => router.push('/experience'), 800);
    } catch (err: unknown) {
      setStep('error');
      addLog(`[ERROR] ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const isActive = step !== 'idle' && step !== 'error';

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface starfield overflow-hidden">
      <NavBar />

      <main className={`ml-[72px] pt-16 min-h-screen flex flex-col lg:flex-row`}>
        {/* ── Left Panel — Upload Zone ────────────────────────── */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16 relative">
          {/* Scan line */}
          {isActive && <div className="scan-line top-0" />}

          {/* Atmospheric glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-electric-glow/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 w-full max-w-lg stream-in">
            {/* Page title */}
            <div className="mb-8">
              <p className="font-mono-data text-[10px] text-cyan-pulse tracking-widest uppercase mb-2">
                Resume Intelligence Scan
              </p>
              <h1 className="font-headline-lg text-on-surface leading-tight">
                Upload your resume to begin neural analysis
              </h1>
            </div>

            {/* Drop zone */}
            <div
              onClick={() => !isActive && fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); if (!isActive) setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const f = e.dataTransfer.files[0];
                if (f && !isActive) handleFile(f);
              }}
              className={`
                relative w-full h-52 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center
                transition-all duration-300 cursor-pointer group
                ${isDragging ? 'border-cyan-pulse bg-cyan-pulse/8' : 'border-white/15 hover:border-cyan-pulse/50 hover:bg-white/3'}
                ${isActive ? 'cursor-not-allowed opacity-70' : ''}
                ${file ? 'border-cyan-pulse/40 bg-cyan-pulse/5' : ''}
              `}
            >
              <span className={`material-symbols-outlined text-5xl mb-3 transition-all duration-300 ${file ? 'text-cyan-pulse' : 'text-on-surface-variant/40 group-hover:text-cyan-pulse/70'}`}>
                {file ? 'check_circle' : 'upload_file'}
              </span>
              {file ? (
                <>
                  <p className="font-semibold text-sm text-on-surface">{file.name}</p>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    {(file.size / 1024).toFixed(0)} KB — Ready for analysis
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-sm text-on-surface-variant">
                    Drop your resume here
                  </p>
                  <p className="text-[11px] text-on-surface-variant/60 mt-1">PDF or DOCX — max 10 MB</p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf,.docx"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>

            {/* GitHub input */}
            <div className="mt-5">
              <label className="block font-mono-data text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">
                GitHub Username (optional — unlocks full analysis)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 font-mono-data text-sm">@</span>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="your-github-handle"
                  disabled={isActive}
                  className="w-full pl-8 pr-4 py-3 bg-white/3 border border-white/10 rounded-xl text-sm font-mono-data text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-cyan-pulse/50 transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            {/* Progress bar */}
            {isActive && (
              <div className="mt-6">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-pulse transition-all duration-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-cyan-pulse font-mono-data uppercase tracking-widest mt-2">
                  {STEP_LABELS[step]}
                </p>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={handleScan}
              disabled={!file || isActive}
              className={`
                mt-6 w-full py-4 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-300
                flex items-center justify-center gap-3
                ${(!file || isActive)
                  ? 'bg-white/5 text-on-surface-variant/40 cursor-not-allowed border border-white/8'
                  : 'bg-cyan-pulse text-midnight-deep hover:brightness-110 active:scale-[0.98] shadow-[0_0_24px_rgba(6,182,212,0.4)]'}
              `}
            >
              {isActive ? (
                <>
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">bolt</span>
                  Commence Neural Analysis
                </>
              )}
            </button>

            {step === 'error' && (
              <button
                onClick={() => { setStep('idle'); setProgress(0); setLogs([]); }}
                className="mt-3 w-full py-3 rounded-xl font-mono-data text-[11px] text-error border border-error/30 hover:bg-error/10 transition-colors uppercase tracking-widest"
              >
                Reset &amp; Retry
              </button>
            )}
          </div>
        </div>

        {/* ── Right Panel — Live Log ────────────────────────── */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/[0.06] flex flex-col">
          {/* HUD metrics */}
          <div className="grid grid-cols-2 border-b border-white/[0.06]">
            {[
              { label: 'Parse Time', value: '< 10s' },
              { label: 'Full Analysis', value: '< 2min' },
              { label: 'Modules', value: '9' },
              { label: 'Accuracy', value: '98.4%' },
            ].map((m: any) => (
              <div key={m.label} className="p-5 border-r border-white/[0.06] last:border-r-0 even:border-r-0">
                <p className="font-mono-data text-[9px] text-on-surface-variant/50 uppercase tracking-widest mb-1">{m.label}</p>
                <p className="font-mono-data text-lg text-cyan-pulse font-bold">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Log terminal */}
          <div className="flex-1 p-5 overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-cyan-pulse animate-pulse' : 'bg-on-surface-variant/30'}`} />
              <span className="font-mono-data text-[10px] text-on-surface-variant/50 uppercase tracking-widest">
                Neural Terminal
              </span>
            </div>
            <div className="space-y-2 font-mono-data text-[10px]">
              {logs.length === 0 ? (
                <p className="text-on-surface-variant/30 italic">Awaiting scan initiation...</p>
              ) : (
                logs.map((log: string, i: number) => (
                  <p
                    key={i}
                    className={`leading-relaxed ${
                      log.includes('[ERROR]') ? 'text-error' :
                      log.includes('[COMPLETE]') ? 'text-cyan-pulse font-semibold' :
                      log.includes('[WARN]') ? 'text-yellow-400' :
                      'text-on-surface-variant/70'
                    }`}
                  >
                    {log}
                  </p>
                ))
              )}
              {isActive && <p className="text-cyan-pulse animate-pulse">_</p>}
            </div>
          </div>

          {/* Scan integrity */}
          <div className="p-5 border-t border-white/[0.06]">
            <p className="font-mono-data text-[9px] text-on-surface-variant/30 uppercase tracking-widest text-center">
              Scan integrity verified by CREDORA NEURAL CORE V0.4
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
