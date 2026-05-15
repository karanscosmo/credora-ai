"use client";

import React, { useState, useEffect } from 'react';
import NavBar from '@/components/credora/NavBar';
import { sessionStore } from '@/lib/api';

export default function TechnicalPulsePage() {
  const [keystrokes, setKeystrokes] = useState<string[]>([]);
  const [resume, setResume] = useState<any>(null);
  const [github, setGithub] = useState<any>(null);

  useEffect(() => {
    setResume(sessionStore.load<any>('resume'));
    setGithub(sessionStore.load<any>('github'));
    const logs = [
      '[SYSTEM] INITIALIZING INTERROGATION MODULE...',
      '[DATA] FETCHING CANDIDATE NEURAL PROFILE: 0x82FA...',
      '[VALIDATION] PACKET 452 RECEIVED: 200 OK',
      '[KEISTROKE] LATENCY MONITORING ACTIVE',
      '[SIGNAL] ENCRYPTED TUNNEL ESTABLISHED',
      '[PULSE] FREQUENCY MODULATION AT 45Hz',
      '[SYSTEM] CORE DUMP ANALYSIS COMMENCING',
      '[TRUTH] TRUST COEFFICIENT CALCULATING...',
      '[DATA] ASYNC STACK TRACE VALIDATED',
      '[KEISTROKE] DWELL TIME: 42ms',
    ];
    setKeystrokes(logs);
  }, []);

  const trustScore = resume?.trust_score ?? 89.4;
  const originality = github?.originality ?? 97.2;

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface font-body-md overflow-hidden starfield">
      <NavBar />

      {/* Live Validation Log (Background Layer) */}
      <div className="fixed right-0 top-24 bottom-0 w-1/4 p-8 opacity-20 pointer-events-none overflow-hidden font-mono-data text-[10px] text-tertiary select-none">
        <div className="space-y-1">
          {keystrokes.map((log: string, i: number) => (
            <p key={i}>{log}</p>
          ))}
          <p className="animate-pulse">_</p>
        </div>
      </div>

      <main className="ml-24 pt-24 min-h-screen relative flex flex-col items-center justify-center p-gutter">
        <section className="max-w-5xl w-full relative z-10 stream-in">
          {/* Trust Gauge Cluster */}
          <div className="flex flex-col md:flex-row justify-between items-stretch mb-12 gap-8">
            <div className="flex-1 glass-pane p-8 rounded-3xl relative overflow-hidden group border-t-2 border-electric-glow shadow-2xl">
              <div className="scan-line opacity-30"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-caps text-[10px] text-tertiary opacity-70 mb-2 uppercase tracking-widest">RECRUITER TRUST GAUGE</p>
                  <h2 className="font-display-xl text-4xl md:text-5xl text-on-surface font-bold tracking-tighter">{trustScore}%</h2>
                </div>
                <div className="flex gap-1 items-end h-16">
                  {[40, 60, 80, 50, 100, 70, 90, 60].map((h: number, i: number) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-electric-glow transition-all duration-500" 
                      style={{ height: `${h}%`, opacity: h/100 }}
                    ></div>
                  ))}
                </div>
              </div>
              <p className="font-mono-data text-[9px] mt-6 text-electric-glow/60 uppercase tracking-[0.3em]">
                Real-time keystroke integrity analysis active
              </p>
            </div>

            <div className="flex-1 glass-pane p-8 rounded-3xl border-t-2 border-cyan-pulse shadow-2xl">
               <div className="flex justify-between mb-6">
                  <p className="font-label-caps text-[10px] text-cyan-pulse opacity-70 uppercase tracking-widest">ORIGINALITY MATRIX</p>
                  <span className="material-symbols-outlined text-cyan-pulse text-xl">verified</span>
               </div>
               <div className="flex items-center gap-6">
                  <div className="text-4xl font-bold text-white tracking-tighter">{originality}%</div>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-pulse transition-all duration-1000" style={{ width: `${originality}%` }} />
                  </div>
               </div>
               <p className="font-mono-data text-[9px] mt-6 text-cyan-pulse/60 uppercase tracking-[0.3em]">
                 Cross-referenced with 12M+ tutorial repos
               </p>
            </div>
          </div>

          {/* Code Interrogation Terminal */}
          <div className="glass-pane p-8 rounded-3xl bg-midnight-deep/60 border border-glass-border shadow-2xl">
             <div className="flex items-center justify-between mb-6 border-b border-glass-border pb-4">
                <div className="flex items-center gap-3">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-error/40"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-pulse/40"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-electric-glow/40"></div>
                   </div>
                   <span className="font-mono-data text-[10px] text-on-surface-variant/60 uppercase tracking-widest">interrogation_terminal_v3.2</span>
                </div>
                <div className="font-label-caps text-[10px] text-electric-glow uppercase tracking-[0.3em]">ADAPTIVE_PULSE: ON</div>
             </div>
             
             <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-black/40 border border-glass-border">
                   <p className="font-mono-data text-xs text-on-surface-variant mb-4 opacity-60">// INTERROGATION_POINT_01: Error Handling in Async Flux</p>
                   <p className="font-body-md text-sm leading-relaxed">
                     "How would you optimize the back-pressure handling in the existing event stream to prevent memory exhaustion during a 10x traffic spike?"
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-4 rounded-xl border border-glass-border hover:border-cyan-pulse/40 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono-data text-[10px] text-cyan-pulse">A:</span>
                        <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">IMPLEMENT_TOKEN_BUCKET</span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">Leverage a sliding window approach with reactive back-pressure signaling to upstream producers.</p>
                   </div>
                   <div className="p-4 rounded-xl border border-cyan-pulse bg-cyan-pulse/5 group cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono-data text-[10px] text-cyan-pulse font-bold">B:</span>
                        <span className="font-label-caps text-[10px] text-on-surface uppercase font-bold">REACTIVE_STREAM_SHAPING</span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">Utilize non-blocking priority queues with TTL-based eviction for lower-tier telemetry data.</p>
                   </div>
                </div>
             </div>

             <div className="mt-8 flex justify-between items-center pt-6 border-t border-glass-border">
                <div className="flex gap-4">
                   <div className="flex flex-col">
                      <span className="text-[8px] font-mono-data text-on-surface-variant uppercase">THINKING_TIME</span>
                      <span className="text-xs font-mono-data text-cyan-pulse">1.24s</span>
                   </div>
                   <div className="flex flex-col border-l border-glass-border pl-4">
                      <span className="text-[8px] font-mono-data text-on-surface-variant uppercase">KEY_VELOCITY</span>
                      <span className="text-xs font-mono-data text-electric-glow">NORMAL</span>
                   </div>
                </div>
                <button className="px-8 py-3 bg-cyan-pulse text-midnight-deep font-label-caps text-[10px] font-bold tracking-[0.3em] rounded-lg hover:brightness-110 transition-all uppercase">
                  SUBMIT_NODE_RESPONSE
                </button>
             </div>
          </div>
        </section>

        {/* Floating Branding */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <p className="font-label-caps text-[10px] text-on-surface-variant/20 tracking-[0.6em] uppercase">
            ADAPTIVE TECHNICAL PULSE™ | CREDORA NEURAL CORE
          </p>
        </div>
      </main>
    </div>
  );
}
