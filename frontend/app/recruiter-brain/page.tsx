"use client";

import React from 'react';
import NavBar from '@/components/credora/NavBar';

export default function RecruiterBrainPage() {
  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface font-body-md overflow-x-hidden starfield">
      <NavBar />

      <main className="ml-24 pt-24 min-h-screen atmospheric-void relative overflow-hidden">
        {/* Ambient Decorative Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-pulse/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-electric-glow/5 rounded-full blur-[100px]"></div>
        </div>

        <section className="max-w-7xl mx-auto px-gutter py-12 relative z-10 stream-in">
          {/* Hero Header */}
          <div className="mb-16">
            <h1 className="font-display-xl text-4xl md:text-5xl font-bold mb-4 text-on-surface tracking-tighter uppercase">
              RECRUITER BRAIN SIMULATION<span className="text-cyan-pulse">™</span>
            </h1>
            <p className="font-body-lg text-sm md:text-base text-on-surface-variant/70 max-w-2xl">
              Decoding the subconscious layers of human vetting. Deep-neural mapping of hesitation, intuition, and institutional preference.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-12 gap-8">
            {/* Primary Visualization Pane */}
            <div className="col-span-12 lg:col-span-8 glass-pane rounded-3xl p-12 relative overflow-hidden h-[600px] shadow-2xl">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 800 500">
                  <circle cx="400" cy="250" fill="none" r="150" stroke="#06B6D4" strokeDasharray="4 4" strokeWidth="0.5"></circle>
                  <circle cx="400" cy="250" fill="none" r="100" stroke="#3B82F6" strokeWidth="0.5"></circle>
                  <path d="M400 100 L450 200 L550 220 L480 300 L500 400 L400 350 L300 400 L320 300 L250 220 L350 200 Z" fill="rgba(6, 182, 212, 0.05)" stroke="#06B6D4" strokeWidth="1"></path>
                </svg>
              </div>

              {/* Floating Thought Clusters */}
              <div className="absolute top-20 left-10 p-4 border-l border-cyan-pulse bg-cyan-pulse/5 backdrop-blur-sm max-w-[200px] rounded-r-xl">
                <p className="font-mono-data text-cyan-pulse text-[10px] uppercase mb-1 tracking-widest">INTUITION LAYER</p>
                <p className="text-on-surface text-xs italic">"Projects look polished but lacks production maturity..."</p>
              </div>
              <div className="absolute top-1/2 right-12 p-4 border-r border-electric-glow bg-electric-glow/5 backdrop-blur-sm max-w-[220px] text-right rounded-l-xl">
                <p className="font-mono-data text-electric-glow text-[10px] uppercase mb-1 tracking-widest">PATTERN MATCHING</p>
                <p className="text-on-surface text-xs italic">"Trajectory mimics Top 1% of Engineering Leads at Google 2018-2022."</p>
              </div>
              <div className="absolute bottom-20 left-1/4 p-4 border-b border-primary/20 bg-primary/5 backdrop-blur-sm max-w-[250px] rounded-t-xl">
                <p className="font-mono-data text-primary text-[10px] uppercase mb-1 tracking-widest">CULTURAL DRIFT</p>
                <p className="text-on-surface text-xs italic">"Communication style indicates high autonomy but potential friction in matrixed orgs."</p>
              </div>

              {/* Central Focus Point */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full border border-cyan-pulse/40 flex items-center justify-center animate-pulse cyan-glow bg-cyan-pulse/5">
                  <span className="material-symbols-outlined text-cyan-pulse text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <div className="mt-6 text-center">
                  <p className="font-headline-md text-xl text-primary font-bold uppercase tracking-widest">NEURAL CORE</p>
                  <p className="font-label-caps text-[10px] text-tertiary uppercase mt-1">PROCESSING_INTUITION...</p>
                </div>
              </div>
            </div>

            {/* Side Stats Panel */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
              <div className="glass-pane p-8 rounded-3xl border-l-4 border-cyan-pulse">
                <h3 className="font-label-caps text-xs text-on-surface-variant mb-8 uppercase tracking-widest">Cognitive Bias Map</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Recency Bias', value: 'Minimal' },
                    { label: 'Prestige Filter', value: 'High' },
                    { label: 'Technical Skepticism', value: 'Moderate' },
                    { label: 'Longevity Concern', value: 'High' }
                  ].map((bias) => (
                    <div key={bias.label} className="flex justify-between items-center border-b border-glass-border pb-3">
                      <span className="font-mono-data text-xs text-on-surface-variant uppercase">{bias.label}</span>
                      <span className="font-mono-data text-xs text-white uppercase">{bias.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-pane p-8 rounded-3xl bg-surface-container-high/40">
                <h3 className="font-label-caps text-xs text-cyan-pulse mb-6 uppercase tracking-widest">Simulation Insights</h3>
                <div className="p-4 bg-black/40 rounded-xl border border-glass-border">
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    "Recruiters are currently hesitating on the 'Longevity' metric. While technical skills are Tier-1, the frequency of role transitions is triggering a high-mobility risk flag."
                  </p>
                </div>
                <button className="w-full mt-6 py-4 bg-cyan-pulse/10 border border-cyan-pulse/40 text-cyan-pulse font-label-caps text-[10px] font-bold tracking-widest rounded-xl hover:bg-cyan-pulse hover:text-midnight-deep transition-all duration-500 uppercase">
                  SIMULATE REBUTTAL
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Global Branding */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="font-label-caps text-[10px] text-on-surface-variant/20 tracking-[0.6em] uppercase">
            RECRUITER BRAIN SIMULATION™ | CREDORA NEURAL CORE
          </p>
        </div>
      </main>
    </div>
  );
}
