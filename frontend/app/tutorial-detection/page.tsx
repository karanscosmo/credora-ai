"use client";

import React from 'react';
import NavBar from '@/components/credora/NavBar';

export default function TutorialDetectionPage() {
  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface font-body-md overflow-x-hidden starfield">
      <NavBar />

      <main className="ml-24 pt-32 px-gutter pb-16 transition-all duration-700">
        {/* Hero Section */}
        <div className="relative mb-20 stream-in">
          <div className="max-w-4xl">
            <div className="font-label-caps text-xs md:text-sm text-cyan-pulse mb-6 tracking-[0.4em] uppercase font-bold">SYSTEM STATUS: ANALYZING PROJECT AUTHENTICITY</div>
            <h1 className="font-display-xl text-4xl md:text-6xl text-white mb-8 leading-[1.1] font-bold tracking-tighter uppercase">Differentiating Handcrafted Logic from Templated Output</h1>
            <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
              Deploying Neural Pattern Matching to detect boilerplate tutorial structures. Identifying architectural anomalies and divergent creative implementation in the source codebase.
            </p>
          </div>
          
          {/* Global Scoring Gauge (Hidden on Mobile) */}
          <div className="absolute top-0 right-0 hidden lg:flex glass-pane p-10 rounded-3xl flex-col items-center justify-center border-electric-glow/20 shadow-2xl">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-surface-container-high" cx="96" cy="96" fill="none" r="85" stroke="currentColor" strokeWidth="10"></circle>
                <circle className="text-electric-glow drop-shadow-[0_0_12px_#3B82F6]" cx="96" cy="96" fill="none" r="85" stroke="currentColor" strokeDasharray="534" strokeDashoffset="133" strokeWidth="10"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display-xl text-5xl font-bold">78%</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant mt-2 uppercase tracking-widest">AUTHENTICITY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-8 h-full stream-in" style={{ animationDelay: '0.2s' }}>
          {/* Architecture Fingerprints */}
          <div className="col-span-12 lg:col-span-8 glass-pane rounded-3xl p-10 relative overflow-hidden h-[650px] shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            
            <div className="flex justify-between items-start mb-16 relative z-20">
              <div>
                <h2 className="font-headline-md text-2xl text-primary uppercase tracking-wider font-bold">Architecture Fingerprints</h2>
                <p className="font-label-caps text-[10px] text-on-surface-variant mt-2 uppercase tracking-widest">PROJECT_ID: NEURAL_RECRUIT_X9</p>
              </div>
              <div className="flex gap-3">
                <span className="px-4 py-2 bg-error/20 border border-error/40 text-error text-[10px] font-bold rounded-full uppercase tracking-wider">HIGH SIMILARITY DETECTED</span>
              </div>
            </div>

            {/* Code Structure Diagram Mockup */}
            <div className="relative w-full h-[400px] flex items-center justify-center">
               <div className="w-28 h-28 rounded-full glass-pane border-primary/40 flex items-center justify-center z-30 shadow-[0_0_30px_rgba(195,198,215,0.2)]">
                  <span className="material-symbols-outlined text-5xl text-primary">deployed_code</span>
               </div>
               
               {/* Orbital Indicators */}
               <div className="absolute top-[10%] left-[25%] flex flex-col items-center group">
                  <div className="w-5 h-5 rounded-full bg-error animate-pulse mb-3 shadow-[0_0_15px_rgba(239,68,68,0.6)]"></div>
                  <div className="glass-pane p-4 rounded-xl border-error/40 bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="font-mono-data font-bold text-xs">auth-middleware.js</div>
                     <div className="text-[10px] text-error font-semibold mt-1">98% Match: Firebase Tutorial</div>
                  </div>
               </div>

               <div className="absolute bottom-[10%] right-[20%] flex flex-col items-center group">
                  <div className="w-5 h-5 rounded-full bg-cyan-pulse animate-pulse mb-3 shadow-[0_0_15px_rgba(6,182,212,0.6)]"></div>
                  <div className="glass-pane p-4 rounded-xl border-cyan-pulse/40 bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="font-mono-data font-bold text-xs">neural-processor.ts</div>
                     <div className="text-[10px] text-cyan-pulse font-semibold mt-1">0% Match: Unique Architecture</div>
                  </div>
               </div>

               <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                  <line x1="50%" y1="50%" x2="25%" y2="15%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <line x1="50%" y1="50%" x2="80%" y2="85%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
               </svg>
            </div>
          </div>

          {/* Boilerplate Detection Stream */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
             <div className="glass-pane p-8 rounded-3xl bg-surface-container-high/40 flex-1">
                <h3 className="font-label-caps text-xs text-on-surface-variant mb-8 uppercase tracking-widest">Similarity Log</h3>
                <div className="space-y-4 font-mono-data text-[10px] uppercase">
                   {[
                     { file: 'app/api/auth/route.ts', status: 'MATCH', source: 'NextJS_Auth_Tutorial', prob: '94%' },
                     { file: 'lib/db.ts', status: 'MATCH', source: 'Prisma_Official_Docs', prob: '100%' },
                     { file: 'components/UI/Card.tsx', status: 'UNIQUE', source: 'Handcrafted', prob: '12%' },
                     { file: 'services/engine.ts', status: 'UNIQUE', source: 'Handcrafted', prob: '0%' }
                   ].map((log, i) => (
                     <div key={i} className="p-4 bg-black/40 border border-glass-border rounded-xl flex flex-col gap-2">
                        <div className="flex justify-between">
                           <span className="text-on-surface-variant truncate max-w-[150px]">{log.file}</span>
                           <span className={log.status === 'MATCH' ? 'text-error font-bold' : 'text-cyan-pulse font-bold'}>{log.status}</span>
                        </div>
                        <div className="text-[8px] text-on-surface-variant/40 flex justify-between uppercase">
                           <span>{log.source}</span>
                           <span>S_PROB: {log.prob}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="glass-pane p-8 rounded-3xl border-t-2 border-cyan-pulse">
                <h3 className="font-label-caps text-xs text-cyan-pulse mb-4 uppercase tracking-widest">Architectural Depth</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6 italic">
                  "Analysis confirms the core intelligence modules are unique, though secondary infrastructure relies heavily on common patterns."
                </p>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-pulse w-3/4"></div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
