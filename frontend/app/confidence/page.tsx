"use client";

import React from 'react';
import NavBar from '@/components/credora/NavBar';

export default function ConfidencePage() {
  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface font-body-md overflow-hidden starfield">
      <NavBar />

      <main className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Atmospheric Layer */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(10,14,26,0.8)_0%,rgba(2,4,8,1)_100%)]"></div>
        
        {/* ENGINE VISUALIZATION */}
        <div className="relative z-10 w-full max-w-7xl h-full flex flex-col md:flex-row items-center justify-between px-gutter stream-in">
          
          {/* CONFIDENCE STREAM (Left) */}
          <div className="relative w-full md:w-1/3 flex flex-col items-start space-y-12">
            <div className="space-y-2">
              <h2 className="font-display-xl text-4xl md:text-5xl font-extrabold text-cyan-pulse uppercase tracking-tighter">CONFIDENCE</h2>
              <p className="font-label-caps text-[10px] text-on-surface-variant/60 tracking-[0.3em] uppercase">CANDIDATE CLAIMS / NEURAL ECHO</p>
            </div>
            
            <div className="w-full space-y-6">
              {[
                { id: '01', label: 'LEADERSHIP SCALABILITY', value: 75, color: 'cyan' },
                { id: '02', label: 'ARCHITECTURAL DEPTH', value: 85, color: 'cyan' },
                { id: '03', label: 'STRATEGIC EXIT RADAR', value: 100, color: 'error' }
              ].map((claim) => (
                <div key={claim.id} className={`glass-pane p-6 w-full flex items-center gap-6 border-l-4 ${claim.color === 'cyan' ? 'border-cyan-pulse/50' : 'border-error/50'} rounded-xl shadow-lg hover:bg-white/5 transition-all`}>
                  <span className={`font-mono-data text-sm ${claim.color === 'cyan' ? 'text-cyan-pulse' : 'text-error'} font-bold`}>{claim.id}</span>
                  <span className="font-headline-md text-sm text-on-surface uppercase font-bold tracking-widest">{claim.label}</span>
                  <div className="ml-auto w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${claim.color === 'cyan' ? 'bg-cyan-pulse' : 'bg-error'} transition-all duration-1000`} style={{ width: `${claim.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Collision Energy Streamers */}
            <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 pointer-events-none opacity-40">
              <div className="h-[1px] w-[200px] bg-gradient-to-r from-transparent via-cyan-pulse to-transparent blur-[1px]"></div>
              <div className="h-[1px] w-[300px] bg-gradient-to-r from-transparent via-cyan-pulse to-transparent blur-[2px]"></div>
            </div>
          </div>

          {/* CENTRAL COLLISION CORE */}
          <div className="relative w-full md:w-1/3 h-[400px] md:h-full flex flex-col items-center justify-center">
            {/* Visual Instability (Glitch Layer) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-error/20 scale-125 mix-blend-screen animate-pulse blur-xl"></div>
            </div>

            {/* The Main Engine Orb */}
            <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full glass-pane flex flex-col items-center justify-center shadow-[0_0_80px_rgba(59,130,246,0.3)] border-2 border-white/10 group">
               <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric-glow/20 via-transparent to-cyan-pulse/20 animate-spin-slow"></div>
               <div className="relative z-20 text-center">
                  <div className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.4em] mb-2">SYNTHESIS_CORE</div>
                  <div className="font-display-xl text-6xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">88</div>
                  <div className="font-mono-data text-[10px] text-cyan-pulse uppercase mt-2">TRUE_SCORE_IDENTIFIED</div>
               </div>
               
               {/* Orbital Particles */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-pulse rounded-full shadow-[0_0_15px_rgba(6,182,212,1)] animate-bounce"></div>
            </div>

            {/* Verification Tag */}
            <div className="mt-12 glass-pane px-8 py-3 rounded-full border border-electric-glow/40 flex items-center gap-3">
               <span className="material-symbols-outlined text-electric-glow text-xl">verified</span>
               <span className="font-label-caps text-[10px] text-white uppercase tracking-widest">NEURAL VERIFICATION: PASS</span>
            </div>
          </div>

          {/* EVIDENCE ENGINE (Right) */}
          <div className="relative w-full md:w-1/3 flex flex-col items-end space-y-12">
            <div className="space-y-2 text-right">
              <h2 className="font-display-xl text-4xl md:text-5xl font-extrabold text-electric-glow uppercase tracking-tighter">EVIDENCE</h2>
              <p className="font-label-caps text-[10px] text-on-surface-variant/60 tracking-[0.3em] uppercase">GITHUB / LINKEDIN / STACK_TRACE</p>
            </div>

            <div className="w-full space-y-6">
              {[
                { label: '3,248 COMMITS VERIFIED', score: 98, meta: 'ORIGINAL_AUTH' },
                { label: '14 DEPLOYMENT CYCLES', score: 82, meta: 'OPS_MATURITY' },
                { label: 'SEMANTIC CONSISTENCY', score: 94, meta: 'NLI_SCAN' }
              ].map((evidence, i) => (
                <div key={i} className="glass-pane p-6 w-full flex flex-col gap-3 border-r-4 border-electric-glow/50 rounded-xl shadow-lg hover:bg-white/5 transition-all text-right items-end">
                   <div className="font-mono-data text-[8px] text-electric-glow uppercase tracking-widest">{evidence.meta}</div>
                   <div className="font-headline-md text-sm text-on-surface uppercase font-bold tracking-widest">{evidence.label}</div>
                   <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-electric-glow transition-all duration-1000" style={{ width: `${evidence.score}%` }}></div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
}
