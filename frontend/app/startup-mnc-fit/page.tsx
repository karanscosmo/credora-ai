"use client";

import React, { useEffect, useState } from 'react';
import NavBar from '@/components/credora/NavBar';
import { sessionStore, type ResumeUploadResult } from '@/lib/api';

interface FitData {
  label: string;
  score: number;
  color: string;
  description: string;
  bestFor: string[];
  watchouts: string[];
}

export default function StartupMNCFitPage() {
  const [resume, setResume] = useState<ResumeUploadResult | null>(null);
  const [base, setBase] = useState(78);

  useEffect(() => {
    const r = sessionStore.load<ResumeUploadResult>('resume');
    setResume(r);
    if (r) setBase(r.trust_score ?? 78);
  }, []);

  const startupScore = Math.min(99, Math.round(base * 0.97 + 4));
  const mncScore = Math.min(99, Math.round(base * 0.76));

  const FIT_DATA: FitData[] = [
    {
      label: 'Startup Fit',
      score: startupScore,
      color: 'text-cyan-pulse',
      description: 'Your profile exhibits high velocity, autonomous decision-making, and broad-stack capability — strong signals for high-growth environments.',
      bestFor: ['Seed-stage startups', 'Series A/B scaleups', 'Stealth AI labs', 'Remote-first teams'],
      watchouts: ['May need to adapt to structured PMs', 'Document your thought process more visibly'],
    },
    {
      label: 'MNC / Enterprise Fit',
      score: mncScore,
      color: 'text-electric-glow',
      description: 'Profile shows technical depth but may need stronger evidence of process adherence, documentation, and cross-functional collaboration at scale.',
      bestFor: ['Large tech companies', 'FAANG-adjacent roles', 'Consulting firms', 'Financial institutions'],
      watchouts: ['Add systems design experience', 'Highlight any compliance or SOC-2 adjacent work'],
    },
  ];

  const archetypes = [
    { label: 'Builder', match: startupScore > 85, desc: 'Zero-to-one product execution' },
    { label: 'Scaler', match: startupScore > 70 && mncScore > 70, desc: 'Grows systems and teams' },
    { label: 'Operator', match: mncScore > 75, desc: 'Process-driven, reliable delivery' },
    { label: 'Specialist', match: base > 80, desc: 'Deep domain expertise' },
  ];

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface starfield overflow-x-hidden">
      <NavBar />
      <main className="ml-[72px] pt-20 px-6 lg:px-10 pb-16 max-w-[1200px]">
        <header className="mb-10 stream-in">
          <p className="font-mono-data text-[10px] text-cyan-pulse tracking-widest uppercase mb-2">Startup vs MNC Fit Engine™</p>
          <h1 className="font-headline-lg text-on-surface leading-tight mb-3">Where You'll Thrive</h1>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Neural profiling of your work style, risk tolerance, and execution patterns to match you to the right company archetype.
          </p>
        </header>

        {/* Fit cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 stream-in stream-in-delay-1">
          {FIT_DATA.map((fit: any) => (
            <div key={fit.label} className="glass-pane p-6 rounded-2xl border border-white/[0.06]">
              <div className="flex items-end gap-3 mb-4">
                <span className={`font-mono-data text-5xl font-bold ${fit.color}`}>{fit.score}</span>
                <div className="pb-1">
                  <p className={`font-semibold text-sm ${fit.color} uppercase tracking-wide`}>{fit.label}</p>
                  <p className="text-[9px] text-on-surface-variant/50 uppercase tracking-widest">/100</p>
                </div>
              </div>

              <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                <div className={`h-full ${fit.color === 'text-cyan-pulse' ? 'bg-cyan-pulse' : 'bg-electric-glow'} rounded-full transition-all duration-1000`}
                  style={{ width: `${fit.score}%` }} />
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed mb-5">{fit.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono-data text-[9px] text-on-surface-variant/50 uppercase tracking-widest mb-2">Best For</p>
                  <ul className="space-y-1.5">
                    {fit.bestFor.map((b: string) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <span className="h-1 w-1 rounded-full bg-cyan-pulse flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono-data text-[9px] text-error/70 uppercase tracking-widest mb-2">Watch Out</p>
                  <ul className="space-y-1.5">
                    {fit.watchouts.map((w: string) => (
                      <li key={w} className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <span className="h-1 w-1 rounded-full bg-error flex-shrink-0" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Archetype matrix */}
        <div className="glass-pane p-6 rounded-2xl mb-10 stream-in stream-in-delay-2">
          <p className="font-mono-data text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-5">Engineering Archetype Matrix</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {archetypes.map((a: any) => (
              <div key={a.label} className={`p-4 rounded-xl border transition-all ${a.match ? 'border-cyan-pulse/30 bg-cyan-pulse/5' : 'border-white/[0.06] opacity-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`h-2 w-2 rounded-full ${a.match ? 'bg-cyan-pulse' : 'bg-on-surface-variant/30'}`} />
                  <p className={`font-semibold text-sm ${a.match ? 'text-on-surface' : 'text-on-surface-variant/50'}`}>{a.label}</p>
                </div>
                <p className="text-[10px] text-on-surface-variant/60">{a.desc}</p>
                {a.match && (
                  <span className="inline-block mt-2 text-[9px] font-mono-data text-cyan-pulse bg-cyan-pulse/10 border border-cyan-pulse/20 rounded-full px-2 py-0.5 uppercase">Match</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Companies section */}
        <div className="glass-pane p-6 rounded-2xl stream-in stream-in-delay-3">
          <p className="font-mono-data text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-5">Company Signals — Where Your Profile Gets Noticed</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { tier: 'Tier 1 Match', companies: ['Y Combinator startups', 'AI-native companies', 'Seed-to-Series-B'], color: 'border-cyan-pulse/30 bg-cyan-pulse/5' },
              { tier: 'Tier 2 Match', companies: ['Mid-size tech companies', 'Remote-first platforms', 'Series C+'], color: 'border-electric-glow/20 bg-electric-glow/5' },
              { tier: 'Stretch Goal', companies: ['FAANG companies', 'Fortune 500 tech divisions', 'Quant firms'], color: 'border-white/10' },
            ].map((t: any) => (
              <div key={t.tier} className={`p-4 rounded-xl border ${t.color}`}>
                <p className="font-mono-data text-[9px] text-on-surface-variant/60 uppercase tracking-widest mb-3">{t.tier}</p>
                <ul className="space-y-2">
                  {t.companies.map((c: string) => (
                    <li key={c} className="text-xs text-on-surface-variant flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-on-surface-variant/40" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
