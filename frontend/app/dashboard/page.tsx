"use client";

import React, { useState, useEffect } from 'react';
import NavBar from '@/components/credora/NavBar';
import Link from 'next/link';
import { sessionStore, type ResumeUploadResult, type GitHubResult } from '@/lib/api';

type TabKey = 'overview' | 'github' | 'heatmap' | 'improvements';

function ScoreRing({ value, size = 120 }: { value: number; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (value / 100);
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={6} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#06B6D4" strokeWidth={6}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.16,1,0.3,1)' }}
      />
    </svg>
  );
}

function StatCard({ label, value, sub, accent = 'cyan' }: { label: string; value: string | number; sub?: string; accent?: string }) {
  const color = accent === 'cyan' ? 'text-cyan-pulse' : accent === 'blue' ? 'text-electric-glow' : 'text-error';
  return (
    <div className="glass-pane p-5 rounded-2xl">
      <p className="font-mono-data text-[9px] text-on-surface-variant/60 uppercase tracking-widest mb-2">{label}</p>
      <p className={`font-mono-data text-xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-[10px] text-on-surface-variant/50 mt-1">{sub}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const [resume, setResume] = useState<ResumeUploadResult | null>(null);
  const [github, setGithub] = useState<GitHubResult | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  useEffect(() => {
    setResume(sessionStore.load<ResumeUploadResult>('resume'));
    setGithub(sessionStore.load<GitHubResult>('github'));
  }, []);

  // Compute composite score
  const trustScore = resume?.trust_score ?? 78;
  const ghScore = github?.originality ?? 82;
  const compositeScore = Math.round((trustScore * 0.5) + (ghScore * 0.5));
  const startupFit = Math.min(99, Math.round(compositeScore * 0.97));
  const mncFit = Math.min(99, Math.round(compositeScore * 0.78));

  const TABS: { key: TabKey; label: string; icon: string }[] = [
    { key: 'overview', label: 'Overview', icon: 'grid_view' },
    { key: 'github', label: 'GitHub Intel', icon: 'hub' },
    { key: 'heatmap', label: 'Recruiter Heatmap', icon: 'visibility' },
    { key: 'improvements', label: 'Improvements', icon: 'trending_up' },
  ];

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface starfield overflow-x-hidden">
      <NavBar />

      <main className="ml-[72px] pt-20 px-6 lg:px-10 pb-16 max-w-[1600px]">
        {/* ── Header ─────────────────────────────────────────── */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 stream-in">
          <div>
            <p className="font-mono-data text-[10px] text-cyan-pulse tracking-widest uppercase mb-2">
              Executive Intelligence Summary
            </p>
            <h1 className="font-headline-lg text-on-surface leading-tight">
              Recruitability Dashboard<span className="text-cyan-pulse">™</span>
            </h1>
            <p className="text-sm text-on-surface-variant mt-1 max-w-xl">
              Neural-pathway assessment cross-referenced against global hiring hesitation signals.
            </p>
          </div>

          {/* Score widget */}
          <div className="glass-pane p-5 rounded-2xl border-l-4 border-cyan-pulse min-w-[200px] flex-shrink-0">
            <p className="font-mono-data text-[9px] text-on-surface-variant/60 uppercase tracking-widest mb-1">Recruitability Index™</p>
            <div className="flex items-end gap-2">
              <span className="font-mono-data text-4xl font-bold text-primary">{compositeScore}</span>
              <span className="font-mono-data text-sm text-cyan-pulse pb-1">/100</span>
            </div>
            <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-pulse transition-all duration-1000 rounded-full" style={{ width: `${compositeScore}%` }} />
            </div>
          </div>
        </header>

        {/* ── Tabs ───────────────────────────────────────────── */}
        <div className="flex gap-1 mb-8 p-1 glass-pane rounded-xl w-fit border border-white/[0.06]">
          {TABS.map((t: any) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
                activeTab === t.key
                  ? 'bg-electric-glow/20 text-white border border-electric-glow/30'
                  : 'text-on-surface-variant/60 hover:text-on-surface hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-base">{t.icon}</span>
              <span className="hidden md:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* ── Tab: Overview ─────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-8 stream-in">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Resume Trust" value={`${trustScore}%`} sub="Authenticity score" accent="cyan" />
              <StatCard label="GitHub Score" value={`${ghScore}%`} sub={github ? github.engineeringRating : 'Not scanned'} accent="blue" />
              <StatCard label="Startup Fit" value={`${startupFit}%`} sub="High-growth orgs" accent="cyan" />
              <StatCard label="MNC Fit" value={`${mncFit}%`} sub="Enterprise orgs" accent="blue" />
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Radar area — skills */}
              <div className="lg:col-span-8 glass-pane p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <p className="font-mono-data text-[10px] text-on-surface-variant uppercase tracking-widest">Cognitive & Strategic Mapping</p>
                  <span className="flex items-center gap-1.5 text-[9px] font-mono-data text-cyan-pulse uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-pulse animate-pulse" />
                    Live Sync
                  </span>
                </div>

                {/* Skill bars */}
                <div className="space-y-4">
                  {[
                    { label: 'Technical Architecture', score: 92 },
                    { label: 'Execution Velocity', score: resume ? Math.min(99, trustScore + 10) : 84 },
                    { label: 'Leadership Signals', score: 71 },
                    { label: 'Neural Adaptability', score: 96 },
                    { label: 'Strategic Thinking', score: 88 },
                  ].map(({ label, score }: any) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-mono-data text-on-surface-variant uppercase tracking-wide">{label}</span>
                        <span className="font-mono-data text-cyan-pulse font-bold">{score}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-electric-glow to-cyan-pulse rounded-full transition-all duration-1000"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skills chips */}
                {resume?.skills && resume.skills.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-white/[0.06]">
                    <p className="font-mono-data text-[9px] text-on-surface-variant/50 uppercase tracking-widest mb-3">Detected Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map((s: string) => (
                        <span key={s} className="px-3 py-1 bg-electric-glow/10 border border-electric-glow/20 rounded-full text-[10px] font-mono-data text-electric-glow uppercase">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right column — hesitation + brief */}
              <div className="lg:col-span-4 space-y-5">
                {/* Hesitation signals */}
                <div className="glass-pane p-5 rounded-2xl border-t-2 border-error">
                  <p className="font-mono-data text-[10px] text-error uppercase tracking-widest mb-4">Hesitation Signals</p>
                  <ul className="space-y-4">
                    {(resume?.weak_statements?.length ? resume.weak_statements.slice(0, 3) : [
                      'Resume phrases sound AI-generated',
                      'No live project deployment URLs detected',
                      'GitHub portfolio lacks architectural depth',
                    ]).map((s: any, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-error text-xl mt-0.5 flex-shrink-0">warning</span>
                        <p className="text-xs text-on-surface-variant leading-relaxed">{typeof s === 'string' ? s : (s as any).label ?? s}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Intelligence brief */}
                <div className="glass-pane p-5 rounded-2xl border-t-2 border-cyan-pulse">
                  <p className="font-mono-data text-[10px] text-cyan-pulse uppercase tracking-widest mb-3">Intelligence Brief</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed italic">
                    {resume
                      ? `Profile shows strong technical execution with ${resume.skills?.length ?? 0} verified skills. ${github ? `GitHub constellation confirms ${github.engineeringRating} engineering maturity.` : 'GitHub scan pending for full constellation.'}`
                      : `Upload your resume and run the scan to generate your personalized intelligence brief.`
                    }
                  </p>
                  <Link
                    href="/scan"
                    className="inline-flex items-center gap-2 mt-4 text-[10px] font-mono-data text-cyan-pulse hover:text-white transition-colors uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    {resume ? 'Re-scan with new resume' : 'Run your first scan'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: GitHub ────────────────────────────────────── */}
        {activeTab === 'github' && (
          <div className="space-y-6 stream-in">
            {github ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard label="Total Repos" value={github.totalRepos} accent="cyan" />
                  <StatCard label="Originality" value={`${github.originality}%`} accent="blue" />
                  <StatCard label="Tutorial Projects" value={github.tutorialCount} sub="Detected" accent={github.tutorialCount > 3 ? 'error' : 'cyan'} />
                  <StatCard label="Engineering Tier" value={github.engineeringRating} accent="blue" />
                </div>
                <div className="glass-pane p-6 rounded-2xl">
                  <p className="font-mono-data text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-5">Repository Constellation</p>
                  <div className="space-y-3">
                    {github.repos.slice(0, 8).map((repo: any) => (
                      <div key={repo.name} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${repo.isTutorial ? 'border-error/20 bg-error/5' : 'border-white/[0.06] hover:border-cyan-pulse/20'}`}>
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`material-symbols-outlined text-base flex-shrink-0 ${repo.isTutorial ? 'text-error' : repo.verified ? 'text-cyan-pulse' : 'text-on-surface-variant/40'}`}>
                            {repo.isTutorial ? 'warning' : repo.verified ? 'verified' : 'code'}
                          </span>
                          <div className="min-w-0">
                            <p className="font-mono-data text-xs text-on-surface truncate">{repo.name}</p>
                            <p className="text-[10px] text-on-surface-variant/50 truncate">{repo.description || '—'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0 ml-3">
                          <span className="text-[10px] font-mono-data text-on-surface-variant">{repo.language}</span>
                          <span className={`text-[10px] font-bold font-mono-data ${repo.originality > 70 ? 'text-cyan-pulse' : repo.originality > 40 ? 'text-yellow-400' : 'text-error'}`}>
                            {repo.originality}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="glass-pane p-12 rounded-2xl text-center">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4 block">hub</span>
                <p className="text-sm text-on-surface-variant">No GitHub scan data. Run a scan with your GitHub username to unlock this module.</p>
                <Link href="/scan" className="inline-flex items-center gap-2 mt-5 px-6 py-3 bg-cyan-pulse text-midnight-deep text-xs font-semibold rounded-xl hover:brightness-110 transition-all">
                  <span className="material-symbols-outlined text-base">bolt</span>
                  Run GitHub Scan
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Heatmap ───────────────────────────────────── */}
        {activeTab === 'heatmap' && (
          <div className="space-y-6 stream-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Attention sections */}
              <div className="glass-pane p-6 rounded-2xl">
                <p className="font-mono-data text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-5">Recruiter Attention Distribution</p>
                <div className="space-y-4">
                  {(resume?.heatmap_data?.hotspots ?? [
                    { section: 'Work Experience', attention: 95, sentiment: 'positive' },
                    { section: 'Technical Skills', attention: 88, sentiment: 'neutral' },
                    { section: 'Professional Summary', attention: 42, sentiment: 'skeptical' },
                    { section: 'Education', attention: 31, sentiment: 'neutral' },
                    { section: 'Projects', attention: 76, sentiment: 'positive' },
                  ]).map((h: any) => (
                    <div key={h.section}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-mono-data text-on-surface uppercase">{h.section}</span>
                        <span className={`font-mono-data font-bold ${h.attention > 70 ? 'text-cyan-pulse' : h.attention > 40 ? 'text-yellow-400' : 'text-error'}`}>
                          {h.attention}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${h.attention > 70 ? 'bg-cyan-pulse' : h.attention > 40 ? 'bg-yellow-400' : 'bg-error'}`}
                          style={{ width: `${h.attention}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suspicion flags */}
              <div className="glass-pane p-6 rounded-2xl border-t-2 border-error">
                <p className="font-mono-data text-[10px] text-error uppercase tracking-widest mb-5">AI Phrase Detection</p>
                <div className="space-y-3">
                  {(resume?.ai_generated_phrases?.length ? resume.ai_generated_phrases : [
                    'Passionate about technology',
                    'Strong team player',
                    'Results-driven professional',
                    'Dynamic self-starter',
                  ]).map((phrase: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-error/8 border border-error/15 rounded-xl">
                      <span className="material-symbols-outlined text-error text-base">flag</span>
                      <span className="text-xs text-on-surface-variant italic">"{typeof phrase === 'string' ? phrase : ''}"</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-on-surface-variant/50 mt-4">
                  These phrases trigger recruiter skepticism. Replace with specific, quantified achievements.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Improvements ──────────────────────────────── */}
        {activeTab === 'improvements' && (
          <div className="space-y-6 stream-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top improvements */}
              <div className="glass-pane p-6 rounded-2xl border-t-2 border-electric-glow">
                <p className="font-mono-data text-[10px] text-electric-glow uppercase tracking-widest mb-5">Priority Improvements</p>
                <div className="space-y-4">
                  {[
                    { title: 'Add live demo URLs to top 3 projects', impact: 'high', gain: 18 },
                    { title: 'Rewrite summary with specific metrics', impact: 'high', gain: 12 },
                    { title: 'Add a system-design architecture diagram', impact: 'medium', gain: 9 },
                    { title: 'Pin and document your best GitHub repo', impact: 'medium', gain: 7 },
                    { title: 'Remove generic AI-sounding phrases', impact: 'high', gain: 14 },
                  ].map((imp: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/3 rounded-xl border border-white/[0.06] hover:border-electric-glow/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className={`h-2 w-2 rounded-full flex-shrink-0 ${imp.impact === 'high' ? 'bg-cyan-pulse' : 'bg-electric-glow'}`} />
                        <span className="text-xs text-on-surface">{imp.title}</span>
                      </div>
                      <span className="text-[10px] font-mono-data text-electric-glow font-bold flex-shrink-0 ml-4">+{imp.gain}pts</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Score simulator */}
              <div className="glass-pane p-6 rounded-2xl">
                <p className="font-mono-data text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-5">If You Fix All Issues</p>
                <div className="flex items-center justify-center gap-8 py-6">
                  <div className="text-center">
                    <p className="font-mono-data text-[9px] text-on-surface-variant/50 uppercase mb-2">Current</p>
                    <div className="relative">
                      <ScoreRing value={compositeScore} size={100} />
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="font-mono-data text-2xl font-bold text-on-surface">{compositeScore}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-mono-data text-[9px] text-cyan-pulse uppercase mb-2">Optimized</p>
                    <div className="relative">
                      <ScoreRing value={Math.min(99, compositeScore + 20)} size={100} />
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="font-mono-data text-2xl font-bold text-cyan-pulse">{Math.min(99, compositeScore + 20)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="glass-pane p-4 rounded-xl mt-2 border border-cyan-pulse/20">
                  <p className="text-xs text-on-surface-variant text-center">
                    Implementing all improvements could raise your recruitability score by up to{' '}
                    <strong className="text-cyan-pulse">+20 points</strong>, moving you into the top 5% of candidates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
