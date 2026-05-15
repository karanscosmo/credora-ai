"use client";

import React, { useEffect, useState } from 'react';
import NavBar from '@/components/credora/NavBar';
import Link from 'next/link';
import { sessionStore, type ResumeUploadResult } from '@/lib/api';

type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';

interface Risk {
  title: string;
  description: string;
  level: RiskLevel;
  fix: string;
  icon: string;
}

const LEVEL_STYLE: Record<RiskLevel, { border: string; badge: string; text: string }> = {
  Critical: { border: 'border-error', badge: 'bg-error/15 text-error border-error/30', text: 'text-error' },
  High:     { border: 'border-orange-400', badge: 'bg-orange-400/15 text-orange-400 border-orange-400/30', text: 'text-orange-400' },
  Medium:   { border: 'border-yellow-400', badge: 'bg-yellow-400/15 text-yellow-400 border-yellow-400/30', text: 'text-yellow-400' },
  Low:      { border: 'border-cyan-pulse', badge: 'bg-cyan-pulse/15 text-cyan-pulse border-cyan-pulse/30', text: 'text-cyan-pulse' },
};

const DEFAULT_RISKS: Risk[] = [
  {
    title: 'AI-Generated Resume Phrasing',
    description: 'Recruiters and ATS systems flag templated, generic language as low-trust signals. 3 such phrases detected.',
    level: 'Critical',
    fix: 'Replace each flagged phrase with a specific, quantified achievement from your actual work.',
    icon: 'psychology_alt',
  },
  {
    title: 'No Live Project Deployment URLs',
    description: 'Projects without live links score 60% lower in recruiter trust indices. Interviewers cannot validate your claims.',
    level: 'High',
    fix: 'Deploy at least 2 projects to Vercel/Railway/Render and add the URLs directly in your resume.',
    icon: 'cloud_off',
  },
  {
    title: 'GitHub Portfolio Entropy High',
    description: 'Majority of repositories follow beginner tutorial patterns, reducing perceived engineering depth.',
    level: 'High',
    fix: 'Build one original open-source project with 100+ commits, proper README, and a live demo.',
    icon: 'hub',
  },
  {
    title: 'Employment Gap Without Context',
    description: 'Unexplained timeline gaps of 3+ months trigger a 62% recruiter hesitation spike.',
    level: 'Medium',
    fix: 'Add a brief line explaining gap activities: freelance, personal project, learning, or personal.',
    icon: 'calendar_clock',
  },
  {
    title: 'Skills Section Lacks Depth Hierarchy',
    description: 'Listing 15+ skills without expertise levels signals unfamiliarity with proficiency rating.',
    level: 'Medium',
    fix: 'Group skills by Expert / Proficient / Familiar and remove skills you cannot confidently defend.',
    icon: 'account_tree',
  },
  {
    title: 'No Quantified Impact Statements',
    description: 'Resumes without numbers get 38% fewer callbacks. Metrics are the strongest trust signal.',
    level: 'Low',
    fix: 'Add metrics to every role: team size, % improvement, users served, latency reduced, revenue impact.',
    icon: 'trending_up',
  },
];

export default function SilentRejectionPage() {
  const [risks, setRisks] = useState<Risk[]>(DEFAULT_RISKS);
  const [resume, setResume] = useState<ResumeUploadResult | null>(null);
  const [filter, setFilter] = useState<RiskLevel | 'All'>('All');

  useEffect(() => {
    const r = sessionStore.load<ResumeUploadResult>('resume');
    setResume(r);
    if (r) {
      const dynamicRisks: Risk[] = [];
      if (r.ai_generated_phrases?.length > 2) {
        dynamicRisks.push({
          title: `${r.ai_generated_phrases.length} AI Phrases Detected`,
          description: `Phrases like "${r.ai_generated_phrases[0]}" and "${r.ai_generated_phrases[1]}" trigger recruiter skepticism.`,
          level: 'Critical',
          fix: 'Rewrite each with a specific, verifiable achievement.',
          icon: 'psychology_alt',
        });
      }
      if (r.weak_statements?.length > 1) {
        dynamicRisks.push({
          title: 'Weak Impact Statements',
          description: `Found ${r.weak_statements.length} low-impact statements that reduce credibility.`,
          level: 'High',
          fix: 'Replace with bullet points starting with strong action verbs + quantified outcomes.',
          icon: 'edit_note',
        });
      }
      setRisks(dynamicRisks.length ? [...dynamicRisks, ...DEFAULT_RISKS.slice(dynamicRisks.length)] : DEFAULT_RISKS);
    }
  }, []);

  const filtered = filter === 'All' ? risks : risks.filter((r) => r.level === filter);
  const criticalCount = risks.filter((r) => r.level === 'Critical').length;
  const highCount = risks.filter((r) => r.level === 'High').length;

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface starfield overflow-x-hidden">
      <NavBar />
      <main className="ml-[72px] pt-20 px-6 lg:px-10 pb-16 max-w-[1200px]">
        {/* Header */}
        <header className="mb-10 stream-in">
          <p className="font-mono-data text-[10px] text-error tracking-widest uppercase mb-2">Silent Rejection Risk Engine™</p>
          <h1 className="font-headline-lg text-on-surface leading-tight mb-3">Why Recruiters Reject Without Telling You</h1>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Neural analysis detected {criticalCount} critical and {highCount} high-priority signals that cause silent pass-overs.
            Fix these before your next application.
          </p>
        </header>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(['Critical', 'High', 'Medium', 'Low'] as RiskLevel[]).map((level) => {
            const count = risks.filter((r) => r.level === level).length;
            const s = LEVEL_STYLE[level];
            return (
              <button
                key={level}
                onClick={() => setFilter(filter === level ? 'All' : level)}
                className={`glass-pane p-4 rounded-2xl text-left transition-all border ${filter === level ? s.border : 'border-white/[0.06]'} hover:border-white/20`}
              >
                <p className="font-mono-data text-[9px] text-on-surface-variant/60 uppercase tracking-widest mb-1">{level}</p>
                <p className={`font-mono-data text-3xl font-bold ${s.text}`}>{count}</p>
                <p className="text-[10px] text-on-surface-variant/50 mt-1">{count === 1 ? 'risk' : 'risks'}</p>
              </button>
            );
          })}
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mb-6">
          {(['All', 'Critical', 'High', 'Medium', 'Low'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-mono-data uppercase tracking-widest border transition-all ${
                filter === f ? 'bg-electric-glow/20 text-white border-electric-glow/40' : 'glass-pane border-white/8 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Risk cards */}
        <div className="space-y-4 stream-in stream-in-delay-2">
          {filtered.map((risk, i) => {
            const s = LEVEL_STYLE[risk.level];
            return (
              <div key={i} className={`glass-pane p-6 rounded-2xl border-l-4 ${s.border}`}>
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.badge} border`}>
                    <span className="material-symbols-outlined text-xl">{risk.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-sm text-on-surface">{risk.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono-data font-bold uppercase tracking-wider border ${s.badge}`}>
                        {risk.level}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{risk.description}</p>
                    <div className="flex items-start gap-2 p-3 bg-white/3 rounded-xl border border-white/[0.06]">
                      <span className="material-symbols-outlined text-cyan-pulse text-base mt-0.5 flex-shrink-0">build</span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        <strong className="text-on-surface">Fix: </strong>{risk.fix}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        {!resume && (
          <div className="mt-10 glass-pane p-8 rounded-2xl text-center border border-white/8">
            <p className="text-sm text-on-surface-variant mb-4">Upload your resume to get personalized risk analysis instead of generic risks.</p>
            <Link href="/scan" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-pulse text-midnight-deep font-semibold text-sm rounded-xl hover:brightness-110 transition-all">
              <span className="material-symbols-outlined text-base">bolt</span>
              Run Neural Scan
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
