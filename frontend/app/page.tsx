"use client";

import React from 'react';
import Link from 'next/link';
import NavBar from '@/components/credora/NavBar';

const FEATURES = [
  {
    icon: 'document_scanner',
    color: 'text-cyan-pulse',
    border: 'border-cyan-pulse/30',
    title: 'Resume Neural Scan',
    desc: 'ATS compatibility, AI phrase detection, quantified impact extraction. Results in < 10 sec.',
    stat: '< 10s',
    statLabel: 'Parse Time',
  },
  {
    icon: 'hub',
    color: 'text-electric-glow',
    border: 'border-electric-glow/30',
    title: 'GitHub Constellation',
    desc: 'Engineering maturity, originality scoring, tutorial pattern detection across all repositories.',
    stat: '< 20s',
    statLabel: 'Analysis',
  },
  {
    icon: 'psychology',
    color: 'text-tertiary',
    border: 'border-tertiary/30',
    title: 'Recruiter Brain™',
    desc: 'Neural simulation of actual recruiter hesitation triggers, bias maps, and rejection risk zones.',
    stat: '< 2min',
    statLabel: 'Full Eval',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface starfield overflow-x-hidden">
      <NavBar showSide={false} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <main className="relative pt-28 pb-20 px-6 md:px-16 max-w-7xl mx-auto">
        {/* Atmospheric glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-electric-glow/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-pulse/6 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto stream-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 glass-pane rounded-full border border-cyan-pulse/20">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-pulse animate-pulse" />
            <span className="font-mono-data text-[10px] text-cyan-pulse tracking-widest uppercase">
              Neural Intelligence Platform — v2.4
            </span>
          </div>

          {/* Headline — fluid, no overflow */}
          <h1 className="font-headline-lg text-on-surface mb-6 leading-tight">
            Decode recruiter trust before&nbsp;
            <span className="text-cyan-pulse drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              interviews decide
            </span>
            &nbsp;your future.
          </h1>

          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
            Credora AI runs a full neural evaluation of your resume, GitHub, and technical depth — and shows you exactly what makes recruiters hesitate, in under 2 minutes.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
            <Link
              href="/scan"
              className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-pulse text-midnight-deep font-semibold text-sm tracking-wide rounded-2xl hover:brightness-110 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <span className="material-symbols-outlined text-xl">bolt</span>
              Start Free Scan
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 px-8 py-4 glass-pane text-on-surface font-semibold text-sm tracking-wide rounded-2xl hover:bg-white/10 active:scale-95 transition-all duration-200 border border-white/10"
            >
              <span className="material-symbols-outlined text-xl">grid_view</span>
              View Demo Dashboard
            </Link>
          </div>

          {/* Timer badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-pane rounded-2xl border border-white/8 mb-16">
            <span className="material-symbols-outlined text-electric-glow text-xl">timer</span>
            <span className="font-mono-data text-xs text-on-surface-variant uppercase tracking-widest">
              Full evaluation completes in&nbsp;
              <strong className="text-electric-glow">under 2 minutes</strong>
            </span>
          </div>
        </div>

        {/* ── Feature Cards ─────────────────────────────────── */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 stream-in stream-in-delay-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`glass-pane p-6 rounded-2xl border ${f.border} hover:-translate-y-1 transition-all duration-300 group`}
            >
              <div className={`flex items-center gap-3 mb-4 ${f.color}`}>
                <span className="material-symbols-outlined text-2xl">{f.icon}</span>
                <span className="font-semibold text-sm uppercase tracking-wide">{f.title}</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{f.desc}</p>
              <div className="flex items-end gap-2 pt-4 border-t border-white/[0.06]">
                <span className={`font-mono-data text-2xl font-bold ${f.color}`}>{f.stat}</span>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest pb-1">{f.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Intelligence Modules Grid ─────────────────────── */}
        <div className="relative z-10 mt-20 stream-in stream-in-delay-3">
          <p className="text-center font-mono-data text-[10px] text-on-surface-variant/50 uppercase tracking-[0.4em] mb-8">
            Intelligence Modules
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Recruiter Brain Simulation™',
              'Confidence vs Evidence™',
              'Tutorial Project Detection™',
              'Attention Heatmap™',
              'Silent Rejection Risk™',
              'Communication Pulse™',
              'Startup vs MNC Fit™',
              'Improvement Simulator™',
            ].map((mod) => (
              <span
                key={mod}
                className="px-4 py-2 glass-pane rounded-full text-[11px] font-mono-data text-on-surface-variant border border-white/[0.06] hover:border-cyan-pulse/30 hover:text-cyan-pulse transition-all cursor-default"
              >
                {mod}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Floating action */}
      <Link
        href="/scan"
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-cyan-pulse text-midnight-deep flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-110 active:scale-95 transition-all duration-200 z-50"
        aria-label="Start Scan"
      >
        <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
      </Link>
    </div>
  );
}
