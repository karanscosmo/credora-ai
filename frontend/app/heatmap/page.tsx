"use client";

import React from 'react';
import NavBar from '@/components/credora/NavBar';

export default function HeatmapPage() {
  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface font-body-md overflow-x-hidden starfield">
      <NavBar />

      <main className="ml-24 pt-24 min-h-screen relative overflow-hidden flex">
        {/* Left Sidebar: Metrics */}
        <aside className="w-96 hidden md:flex flex-col gap-8 p-10 border-r border-glass-border z-10 stream-in">
          <div className="mb-2">
            <h2 className="font-label-caps text-xs text-primary mb-3 uppercase tracking-widest">SIMULATION ENGINE</h2>
            <p className="font-display-xl text-3xl leading-tight tracking-tighter text-white uppercase font-bold">RECRUITER ATTENTION<span className="text-cyan-pulse">™</span></p>
          </div>
          
          {/* Trust-Drop ZOnes */}
          <div className="glass-pane p-8 rounded-2xl relative group border-l-4 border-l-error shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">TRUST-DROP ZONES</span>
              <span className="bg-error/20 text-error px-2 py-0.5 rounded text-[10px] font-bold uppercase">CRITICAL</span>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono-data uppercase">
                  <span className="text-on-surface">Employment Gap</span>
                  <span className="text-error font-bold">82% Drop</span>
                </div>
                <div className="h-1.5 bg-surface-container w-full rounded-full overflow-hidden">
                  <div className="h-full bg-error w-[82%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono-data uppercase">
                  <span className="text-on-surface">Skill Mismatch</span>
                  <span className="text-orange-400 font-bold">45% Drop</span>
                </div>
                <div className="h-1.5 bg-surface-container w-full rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 w-[45%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Attention Decay */}
          <div className="glass-pane p-8 rounded-2xl shadow-xl">
            <span className="font-label-caps text-[10px] text-on-surface-variant mb-8 block uppercase tracking-widest">ATTENTION DECAY (SECONDS)</span>
            <div className="flex items-end gap-3 h-32">
              {[90, 70, 40, 20, 10].map((h, i) => (
                <div key={i} className={`flex-1 ${i === 2 ? 'bg-cyan-pulse/60 border-t-2 border-cyan-pulse' : 'bg-cyan-pulse/20'} rounded-t-sm`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <p className="text-xs mt-6 text-on-surface-variant/80 italic leading-relaxed">
              "Neural patterns indicate the first 6 seconds determine candidate retention in the screening pipeline."
            </p>
          </div>
        </aside>

        {/* Center Canvas: The Heatmap */}
        <section className="flex-1 relative p-12 overflow-y-auto scrollbar-hide stream-in" style={{ animationDelay: '0.2s' }}>
          <div className="max-w-4xl mx-auto space-y-12 pb-24">
            <header className="flex justify-between items-center border-b border-glass-border pb-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full border border-cyan-pulse flex items-center justify-center">
                  <span className="material-symbols-outlined text-cyan-pulse text-xl">visibility</span>
                </div>
                <div>
                  <h3 className="font-label-caps text-xs text-on-surface uppercase tracking-widest font-bold">ATTENTION_HEATMAP_V4</h3>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">RELIABILITY: 98.2%</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="px-4 py-1.5 glass-pane rounded-full text-[10px] font-mono-data text-cyan-pulse uppercase">MODE: HUMAN_VETTING</div>
              </div>
            </header>

            {/* Resume Layout Mockup with Heatmap Orbs */}
            <div className="relative glass-pane p-16 rounded-3xl min-h-[1000px] shadow-2xl">
               <div className="scan-line" style={{ top: '15%', animationDuration: '6s' }}></div>
               
               {/* Heatmap Orbs */}
               <div className="absolute top-24 left-1/4 w-48 h-48 bg-error/30 rounded-full blur-[60px] animate-pulse"></div>
               <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-pulse/20 rounded-full blur-[80px]"></div>
               <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-electric-glow/30 rounded-full blur-[50px] animate-pulse"></div>
               
               {/* Mock Content */}
               <div className="relative z-10 space-y-20">
                  <div className="border-b border-glass-border pb-8">
                     <div className="h-8 w-64 bg-white/10 rounded mb-4"></div>
                     <div className="h-4 w-full bg-white/5 rounded"></div>
                  </div>
                  
                  <div className="space-y-8">
                     <div className="flex justify-between items-start">
                        <div className="h-6 w-48 bg-cyan-pulse/20 rounded"></div>
                        <div className="h-4 w-32 bg-white/5 rounded"></div>
                     </div>
                     <div className="space-y-4">
                        <div className="h-4 w-full bg-white/5 rounded"></div>
                        <div className="h-4 w-full bg-white/5 rounded"></div>
                        <div className="h-4 w-3/4 bg-white/5 rounded"></div>
                     </div>
                  </div>

                  <div className="space-y-8 border-l-2 border-error/50 pl-8 bg-error/5 py-8 rounded-r-xl relative">
                     <div className="absolute -left-3 top-8 h-6 w-6 rounded-full bg-error flex items-center justify-center text-white text-[10px] font-bold">!</div>
                     <div className="h-6 w-48 bg-error/20 rounded"></div>
                     <div className="space-y-4">
                        <div className="h-4 w-full bg-white/5 rounded"></div>
                        <div className="h-4 w-2/3 bg-white/5 rounded"></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar: Legend & Controls */}
        <aside className="w-80 hidden lg:flex flex-col gap-8 p-10 border-l border-glass-border z-10 stream-in" style={{ animationDelay: '0.4s' }}>
           <div className="glass-pane p-6 rounded-2xl">
              <h4 className="font-label-caps text-[10px] text-on-surface-variant mb-6 uppercase tracking-widest">Attention Legend</h4>
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-error shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
                    <span className="font-mono-data text-[10px] uppercase">HYPER_FOCUS</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-cyan-pulse shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                    <span className="font-mono-data text-[10px] uppercase">SUSTAINED_SCAN</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-electric-glow/40"></div>
                    <span className="font-mono-data text-[10px] uppercase">PERIPHERAL_DRIFT</span>
                 </div>
              </div>
           </div>

           <div className="mt-auto">
              <button className="w-full py-4 bg-cyan-pulse text-midnight-deep font-label-caps text-[10px] font-bold tracking-widest rounded-xl hover:scale-[1.02] transition-all uppercase">
                 EXPORT_NEURAL_PDF
              </button>
           </div>
        </aside>
      </main>
    </div>
  );
}
