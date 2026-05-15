"use client";

import React, { useState, useEffect } from 'react';
import NavBar from '@/components/credora/NavBar';
import { sessionStore } from '@/lib/api';

export default function CommunicationPulsePage() {
  const [pulseLevel, setPulseLevel] = useState(0);
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    setResume(sessionStore.load<any>('resume'));
    const interval = setInterval(() => {
      setPulseLevel(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const waveform = Array.from({ length: 40 }, (_, i) => Math.random() * 80 + 20);
  
  // Dynamic metrics based on resume trust
  const trust = resume?.trust_score ?? 78;
  const metrics = [
    { name: 'Semantic Clarity', val: Math.min(99, trust + 5) },
    { name: 'Technical Fluency', val: Math.min(99, trust + 12) },
    { name: 'Response Latency', val: 14 },
    { name: 'Emotional Intelligence', val: Math.min(99, trust - 4) }
  ];

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface font-body-md overflow-x-hidden starfield">
      <NavBar />

      <main className="ml-24 pt-24 px-gutter pb-gutter min-h-screen flex flex-col gap-8">
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 stream-in">
          <div>
            <h1 className="font-display-xl text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white">
              Communication Pulse<span className="text-electric-glow">™</span>
            </h1>
            <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-2xl mt-2">
              Neural behavioral intelligence mapping voice frequency, sentiment trajectory, and semantic confidence in real-time.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="glass-pane px-6 py-3 rounded-full flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-electric-glow animate-pulse"></div>
              <span className="font-mono-data text-xs text-electric-glow uppercase tracking-widest">LIVE ANALYSIS ACTIVE</span>
            </div>
          </div>
        </header>

        {/* Communication Pulse Content */}
        <section className="flex-1 grid grid-cols-12 gap-8 stream-in" style={{ animationDelay: '0.2s' }}>
          {/* Central Intelligence: Neural Voice Orb & Waveforms */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            <div className="glass-pane rounded-3xl h-[500px] relative overflow-hidden flex flex-col items-center justify-center group shadow-2xl">
              {/* Background Atmospheric Glow */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-glow/20 rounded-full blur-[120px]"></div>
              </div>
              
              {/* Neural Voice Orb */}
              <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-tertiary to-electric-glow shadow-[0_0_100px_rgba(59,130,246,0.6)] flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30"></div>
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-midnight-deep/60 backdrop-blur-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl md:text-5xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
                </div>
              </div>

              {/* Real-time Waveforms */}
              <div className="absolute bottom-12 w-full px-12 flex items-end justify-center gap-1 h-32">
                {waveform.map((h, i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-gradient-to-t from-tertiary/20 via-electric-glow/60 to-cyan-pulse transition-all duration-300"
                    style={{ height: `${h}%`, opacity: Math.max(0.2, Math.sin((i + pulseLevel) * 0.2)) }}
                  ></div>
                ))}
              </div>

              {/* Top HUD Metrics */}
              <div className="absolute top-8 left-8 right-8 flex justify-between">
                <div className="flex flex-col">
                  <span className="font-label-caps text-[10px] text-on-surface-variant tracking-[0.3em] uppercase">SAMPLE FREQUENCY</span>
                  <span className="font-mono-data text-xl md:text-2xl text-white">44.1 KHZ</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-caps text-[10px] text-on-surface-variant tracking-[0.3em] uppercase">NEURAL CONFIDENCE</span>
                  <span className="font-mono-data text-xl md:text-2xl text-cyan-pulse">98.4%</span>
                </div>
              </div>
            </div>

            {/* Transcription Feed */}
            <div className="glass-pane p-8 rounded-3xl bg-surface-container-lowest/30">
               <h3 className="font-label-caps text-xs text-on-surface-variant mb-6 uppercase tracking-widest">Semantic Stream</h3>
               <div className="space-y-4 max-h-48 overflow-y-auto pr-4 scrollbar-hide">
                  <p className="text-sm font-body-md text-on-surface-variant border-l-2 border-cyan-pulse pl-4 py-1">
                    "When we scaled the architecture to support 10M concurrent users, the primary bottleneck shifted from IOPS to memory pressure..."
                  </p>
                  <p className="text-sm font-body-md text-cyan-pulse border-l-2 border-electric-glow pl-4 py-1 font-bold">
                    [CONFIDENCE_PEAK] [SENTIMENT: ANALYTICAL]
                  </p>
                  <p className="text-sm font-body-md text-on-surface-variant border-l-2 border-glass-border pl-4 py-1">
                    "I implemented a distributed cache layer with write-behind persistence to mitigate the latency spikes during peak loads."
                  </p>
               </div>
            </div>
          </div>

          {/* Behavioral Stats Panel */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            <div className="glass-pane p-8 rounded-3xl border-t-4 border-electric-glow">
              <h3 className="font-label-caps text-xs text-on-surface-variant mb-8 uppercase tracking-widest">Behavioral Archetype</h3>
              <div className="flex items-center gap-6 mb-8">
                <div className="h-16 w-16 rounded-2xl bg-electric-glow/20 flex items-center justify-center border border-electric-glow/30">
                  <span className="material-symbols-outlined text-electric-glow text-3xl">psychology_alt</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-lg text-white font-bold uppercase">SYSTEMS_VISIONARY</h4>
                  <p className="font-label-caps text-[10px] text-cyan-pulse uppercase">Tier-1 Communicator</p>
                </div>
              </div>
              <div className="space-y-6">
                 {metrics.map((m, i) => (
                   <div key={m.name} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono-data uppercase">
                        <span className="text-on-surface-variant">{m.name}</span>
                        <span className="text-white">{m.val}%</span>
                      </div>
                      <div className="h-1 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-electric-glow transition-all duration-1000" style={{ width: `${m.val}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="glass-pane p-8 rounded-3xl bg-midnight-deep/40 border border-glass-border">
               <h3 className="font-label-caps text-xs text-on-surface-variant mb-6 uppercase tracking-widest">Linguistic Anomalies</h3>
               <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-glass-border bg-white/5 flex items-center gap-4">
                    <span className="material-symbols-outlined text-cyan-pulse">verified</span>
                    <span className="text-xs font-mono-data text-on-surface uppercase">ZERO FILLER WORDS DETECTED</span>
                  </div>
                  <div className="p-4 rounded-xl border border-glass-border bg-white/5 flex items-center gap-4">
                    <span className="material-symbols-outlined text-cyan-pulse">trending_up</span>
                    <span className="text-xs font-mono-data text-on-surface uppercase">POSITIVE SEMANTIC MOMENTUM</span>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
