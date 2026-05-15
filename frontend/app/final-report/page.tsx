"use client";

import React, { useEffect, useState } from 'react';
import NavBar from '@/components/credora/NavBar';
import Link from 'next/link';
import { sessionStore, type ResumeUploadResult, type GitHubResult, type FullAnalysisResult } from '@/lib/api';

export default function FinalReportPage() {
  const [resume, setResume] = useState<ResumeUploadResult | null>(null);
  const [github, setGithub] = useState<GitHubResult | null>(null);

  useEffect(() => {
    setResume(sessionStore.load<ResumeUploadResult>('resume'));
    setGithub(sessionStore.load<GitHubResult>('github'));
  }, []);

  const trustScore = resume?.trust_score ?? 78;
  const ghScore = github?.originality ?? 82;
  const index = Math.round((trustScore * 0.5) + (ghScore * 0.5));
  const startupFit = Math.min(99, Math.round(index * 0.97));
  const mncFit = Math.min(99, Math.round(index * 0.78));
  const tier = index >= 85 ? 'Tier 1' : index >= 70 ? 'Tier 2' : 'Tier 3';
  const tierColor = tier === 'Tier 1' ? 'text-cyan-pulse' : tier === 'Tier 2' ? 'text-electric-glow' : 'text-yellow-400';

  const components = [
    { label: 'Resume Intelligence', score: trustScore, weight: '25%' },
    { label: 'GitHub Constellation', score: ghScore, weight: '25%' },
    { label: 'Technical Pulse', score: 74, weight: '20%' },
    { label: 'Communication Pulse', score: 88, weight: '15%' },
    { label: 'Authenticity Score', score: 72, weight: '15%' },
  ];

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface starfield overflow-x-hidden">
      <NavBar />
      <main className="ml-[72px] pt-20 px-6 lg:px-10 pb-16 max-w-[1200px]">
        {/* Header */}
        <header className="mb-10 stream-in">
          <p className="font-mono-data text-[10px] text-cyan-pulse tracking-widest uppercase mb-2">Final Intelligence Report</p>
          <h1 className="font-headline-lg text-on-surface leading-tight mb-3">
            Recruiter Intelligence Summary
          </h1>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Complete neural assessment across all evaluation dimensions. This is what recruiters would see if they had full visibility.
          </p>
        </header>

        {/* Main score */}
        <div className="glass-pane p-8 rounded-3xl border border-white/10 mb-8 stream-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <p className="font-mono-data text-[9px] text-on-surface-variant/50 uppercase tracking-widest mb-2">Recruitability Index™</p>
              <div className="flex items-end gap-3">
                <span className="font-mono-data text-7xl font-bold text-primary">{index}</span>
                <div className="pb-2">
                  <p className={`font-mono-data text-xl font-bold ${tierColor}`}>{tier}</p>
                  <p className="font-mono-data text-[9px] text-on-surface-variant/50 uppercase tracking-widest">/100 score</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                {index >= 75
                  ? <><span className="material-symbols-outlined text-cyan-pulse text-xl">verified</span><span className="text-xs text-cyan-pulse">Top 12% of evaluated candidates</span></>
                  : <><span className="material-symbols-outlined text-yellow-400 text-xl">trending_up</span><span className="text-xs text-yellow-400">Improvement roadmap available</span></>
                }
              </div>
            </div>

            {/* Score breakdown */}
            <div className="flex gap-8">
              {[
                { label: 'Startup Fit', value: startupFit, color: 'text-cyan-pulse' },
                { label: 'MNC Fit', value: mncFit, color: 'text-electric-glow' },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <p className={`font-mono-data text-4xl font-bold ${m.color}`}>{m.value}</p>
                  <p className="font-mono-data text-[9px] text-on-surface-variant/50 uppercase tracking-widest mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Component scores */}
        <div className="glass-pane p-6 rounded-2xl mb-6 stream-in stream-in-delay-1">
          <p className="font-mono-data text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-5">Score Breakdown by Module</p>
          <div className="space-y-4">
            {components.map((c) => (
              <div key={c.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-data text-on-surface">{c.label}</span>
                    <span className="font-mono-data text-[9px] text-on-surface-variant/40 uppercase">Weight: {c.weight}</span>
                  </div>
                  <span className={`font-mono-data font-bold ${c.score >= 80 ? 'text-cyan-pulse' : c.score >= 65 ? 'text-electric-glow' : 'text-yellow-400'}`}>
                    {c.score}
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${c.score >= 80 ? 'bg-cyan-pulse' : c.score >= 65 ? 'bg-electric-glow' : 'bg-yellow-400'}`}
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Silent rejection risks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 stream-in stream-in-delay-2">
          <div className="glass-pane p-6 rounded-2xl border-l-4 border-error">
            <p className="font-mono-data text-[10px] text-error uppercase tracking-widest mb-4">Top Silent Rejection Risks</p>
            <ul className="space-y-3">
              {(resume?.weak_statements?.length ? resume.weak_statements.slice(0, 3) : [
                'No live deployment URLs detected',
                'AI-generated resume phrasing found',
                'GitHub portfolio entropy too high',
              ]).map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-error text-base mt-0.5">warning</span>
                  <span>{typeof r === 'string' ? r : (r as any)?.label ?? r}</span>
                </li>
              ))}
            </ul>
            <Link href="/silent-rejection" className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-mono-data text-error/70 hover:text-error transition-colors uppercase tracking-widest">
              View all risks <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="glass-pane p-6 rounded-2xl border-l-4 border-electric-glow">
            <p className="font-mono-data text-[10px] text-electric-glow uppercase tracking-widest mb-4">Top Improvements</p>
            <ul className="space-y-3">
              {[
                { title: 'Add live demo URLs', gain: 18 },
                { title: 'Rewrite resume summary with metrics', gain: 12 },
                { title: 'Build one original GitHub project', gain: 15 },
              ].map((imp, i) => (
                <li key={i} className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">{imp.title}</span>
                  <span className="font-mono-data text-electric-glow font-bold">+{imp.gain}pts</span>
                </li>
              ))}
            </ul>
            <Link href="/dashboard?tab=improvements" className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-mono-data text-electric-glow/70 hover:text-electric-glow transition-colors uppercase tracking-widest">
              Full improvement plan <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 stream-in stream-in-delay-3">
          <Link href="/scan" className="flex items-center gap-2 px-6 py-3 bg-cyan-pulse text-midnight-deep font-semibold text-sm rounded-xl hover:brightness-110 transition-all">
            <span className="material-symbols-outlined text-base">bolt</span>
            Re-Scan with Updated Resume
          </Link>
          <Link href="/startup-mnc-fit" className="flex items-center gap-2 px-6 py-3 glass-pane text-on-surface font-semibold text-sm rounded-xl hover:bg-white/10 transition-all border border-white/10">
            <span className="material-symbols-outlined text-base">business</span>
            View Fit Analysis
          </Link>
          <Link href="/silent-rejection" className="flex items-center gap-2 px-6 py-3 glass-pane text-error font-semibold text-sm rounded-xl hover:bg-error/10 transition-all border border-error/20">
            <span className="material-symbols-outlined text-base">warning</span>
            View Rejection Risks
          </Link>
        </div>
      </main>
    </div>
  );
}
