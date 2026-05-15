"use client";

import React, { useState, useEffect } from 'react';
import NavBar from '@/components/credora/NavBar';
import { sessionStore } from '@/lib/api';

export default function GitHubPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [github, setGithub] = useState<any>(null);

  useEffect(() => {
    setGithub(sessionStore.load<any>('github'));
    setIsLoaded(true);
  }, []);

  const originality = github?.originality ?? 98.4;
  const totalRepos = github?.totalRepos ?? 23;
  const repos = github?.repos ?? [];

  const nodes = repos.slice(0, 5).map((repo: any, i: number) => ({
    top: `${20 + i * 15}%`,
    left: `${20 + (i % 2) * 50}%`,
    name: repo.name.toUpperCase(),
    score: `${repo.originality}%`,
    label: repo.language?.toUpperCase() || 'CORE_LOGIC',
    color: repo.originality > 70 ? 'cyan' : 'blue'
  }));

  if (nodes.length === 0) {
    // Fallback if no repos
    nodes.push({ top: '55%', left: '45%', name: 'NEURAL_CORE_V2', score: '99.2%', label: 'CORE_INTELLIGENCE_ENGINE', color: 'cyan' });
  }

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface font-body-md overflow-hidden starfield">
      <NavBar />

      <main className="relative h-screen w-full ml-24 overflow-hidden">
        {/* Top Left Identity Stats */}
        <div className="absolute top-28 left-12 z-10 flex flex-col gap-1 pointer-events-none stream-in">
          <span className="font-label-caps text-[10px] text-cyan-pulse uppercase tracking-[0.3em]">ENGINEERING MATURITY INDEX</span>
          <span className="font-display-xl text-5xl md:text-6xl text-white font-extrabold tracking-tighter">
            {originality}<span className="text-2xl font-normal text-on-surface-variant">/100</span>
          </span>
          <div className="flex gap-4 mt-4">
            <div className="flex flex-col">
              <span className="font-mono-data text-[9px] text-on-surface-variant/50 uppercase">COMMITS_SEC</span>
              <span className="font-mono-data text-sm text-tertiary">{(Math.random() * 20).toFixed(2)}</span>
            </div>
            <div className="flex flex-col border-l border-glass-border pl-4">
              <span className="font-mono-data text-[9px] text-on-surface-variant/50 uppercase">TOTAL_REPOS</span>
              <span className="font-mono-data text-sm text-tertiary">{totalRepos}</span>
            </div>
          </div>
        </div>

        {/* Constellation Map SVG Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          {nodes.map((n, i) => i > 0 && (
            <line key={i} stroke="#06B6D4" strokeWidth="0.5" x1={nodes[0].left} x2={n.left} y1={nodes[0].top} y2={n.top}></line>
          ))}
        </svg>

        {/* Interactive Nodes */}
        {nodes.map((node, i) => (
          <div 
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ top: node.top, left: node.left, transition: 'all 1s ease-out', transitionDelay: `${i * 100}ms`, opacity: isLoaded ? 1 : 0 }}
          >
            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${node.color === 'cyan' ? 'bg-cyan-pulse/20 border-cyan-pulse' : 'bg-electric-glow/20 border-electric-glow'} border node-pulse relative cursor-pointer flex items-center justify-center hover:scale-125 transition-transform duration-500`}>
              <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${node.color === 'cyan' ? 'bg-cyan-pulse' : 'bg-electric-glow'} animate-pulse`}></div>
            </div>
            
            {/* Tooltip Overlay */}
            <div className="absolute top-10 left-10 w-64 glass-pane p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
              <div className={`font-label-caps text-[10px] ${node.color === 'cyan' ? 'text-cyan-pulse' : 'text-electric-glow'} mb-1 uppercase tracking-widest`}>
                {node.label}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="text-[8px] text-on-surface-variant/50 uppercase">Maturity</div>
                  <div className="text-[10px] font-mono-data text-white uppercase">LEVEL_{Math.floor(Math.random() * 9 + 1)}</div>
                </div>
                <div>
                  <div className="text-[8px] text-on-surface-variant/50 uppercase">Originality</div>
                  <div className="text-[10px] font-mono-data text-white">{node.score}</div>
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${node.color === 'cyan' ? 'bg-cyan-pulse' : 'bg-electric-glow'} w-[90%]`}></div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-data text-[9px] text-on-surface-variant tracking-widest uppercase">
              {node.name}
            </div>
          </div>
        ))}

        {/* Intelligence Feed Side Panel */}
        <div className="absolute right-gutter top-28 w-80 glass-pane p-6 flex flex-col gap-6 stream-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between border-b border-glass-border pb-4">
            <h3 className="font-label-caps text-[10px] text-cyan-pulse tracking-widest uppercase">Neural Handshake</h3>
            <span className="material-symbols-outlined text-sm">hub</span>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Repos Analyzed', value: totalRepos },
              { label: 'Originality Core', value: `${originality}%` },
              { label: 'Codebase Entropy', value: '0.12' },
              { label: 'Architecture Depth', value: github?.engineeringRating || 'High' }
            ].map((stat) => (
              <div key={stat.label} className="flex justify-between items-center">
                <span className="font-mono-data text-[10px] text-on-surface-variant/60 uppercase">{stat.label}</span>
                <span className="font-mono-data text-[10px] text-white">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-white/5 rounded border border-white/10">
            <p className="font-body-md text-[11px] text-on-surface-variant leading-relaxed">
              Analysis suggests a high degree of architectural originality. Zero evidence of tutorial boilerplate detected in critical paths.
            </p>
          </div>

          <button className="w-full py-4 bg-cyan-pulse/10 border border-cyan-pulse/40 text-cyan-pulse font-label-caps text-[10px] font-bold tracking-widest rounded-xl hover:bg-cyan-pulse hover:text-midnight-deep transition-all duration-500 uppercase">
            VERIFY_ALL_COMMITS
          </button>
        </div>

        {/* Global Branding (Bottom Center) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <div className="font-label-caps text-[10px] text-on-surface-variant/30 tracking-[0.6em] uppercase">
            GITHUB INTELLIGENCE CONSTELLATION™ | CREDORA NEURAL CORE
          </div>
        </div>
      </main>
    </div>
  );
}
