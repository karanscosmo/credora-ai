"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { name: '2-Minute Flow', path: '/experience', icon: 'auto_awesome' },
  { name: 'Dashboard', path: '/dashboard', icon: 'grid_view' },
  { name: 'Neural Scan', path: '/scan', icon: 'document_scanner' },
  { name: 'GitHub Intel', path: '/github', icon: 'hub' },
  { name: 'Comms Pulse', path: '/communication-pulse', icon: 'record_voice_over' },
  { name: 'Technical Pulse', path: '/adaptive-technical-pulse', icon: 'terminal' },
  { name: 'Recruiter Brain', path: '/recruiter-brain', icon: 'psychology' },
  { name: 'Attention Heatmap', path: '/heatmap', icon: 'visibility' },
  { name: 'Confidence Engine', path: '/confidence', icon: 'verified' },
  { name: 'Tutorial Detection', path: '/tutorial-detection', icon: 'deployed_code' },
  { name: 'Rejection Risks', path: '/silent-rejection', icon: 'warning' },
  { name: 'Startup vs MNC', path: '/startup-mnc-fit', icon: 'business' },
  { name: 'Final Report', path: '/final-report', icon: 'summarize' },
];


interface NavBarProps {
  showSide?: boolean;
}

export default function NavBar({ showSide = true }: NavBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* ── Top Bar ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16 bg-obsidian-base/80 backdrop-blur-xl border-b border-white/[0.06]">
        <Link
          href="/"
          className="font-display-xl text-xl font-bold tracking-tight text-primary drop-shadow-[0_0_12px_rgba(59,130,246,0.35)] select-none"
        >
          CREDORA AI
        </Link>

        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 glass-pane rounded-full border-cyan-pulse/20">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-pulse animate-pulse" />
          <span className="font-mono-data text-[10px] text-cyan-pulse tracking-widest uppercase">System Active</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-on-surface-variant hover:text-white transition-colors" aria-label="Notifications">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="md:hidden p-2 text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
          <Link href="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#06B6D4,#3B82F6)', fontSize: 13, fontWeight: 700, color: '#020408', border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0, textDecoration: 'none' }}>
            C
          </Link>
        </div>
      </header>

      {/* ── Side HUD ────────────────────────────────────────── */}
      {showSide && (
        <>
          {/* Mobile Overlay */}
          <div 
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity md:hidden ${expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setExpanded(false)}
          />
          
          <aside
            onMouseEnter={() => window.innerWidth > 768 && setExpanded(true)}
            onMouseLeave={() => window.innerWidth > 768 && setExpanded(false)}
            className={`
              fixed left-0 top-0 h-full z-40 flex flex-col
              bg-obsidian-base/95 backdrop-blur-2xl border-r border-white/[0.06]
              transition-all duration-500 ease-in-out overflow-hidden
              ${expanded ? 'w-64' : 'w-0 md:w-[72px]'}
            `}
          >
            {/* Mobile Close Button */}
            <button 
              onClick={() => setExpanded(false)}
              className="absolute top-4 right-4 md:hidden text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          {/* HUD brand */}
          <div className="flex items-center gap-3 px-5 pt-20 pb-6">
            <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
              <p className="font-semibold text-sm text-primary uppercase tracking-wide leading-tight whitespace-nowrap">Neural HUD</p>
              <p className="text-[9px] text-on-surface-variant/50 uppercase tracking-widest">V 0.4 Active</p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 flex flex-col gap-0.5 px-2 overflow-y-auto scrollbar-hide pb-2">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                    ${active ? 'bg-electric-glow/15 text-white' : 'text-on-surface-variant/60 hover:text-on-surface hover:bg-white/5'}
                  `}
                >
                  {active && (
                    <span className="absolute right-0 top-1/4 bottom-1/4 w-0.5 bg-electric-glow rounded-l-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  )}
                  <span className={`material-symbols-outlined text-xl flex-shrink-0 ${active ? 'text-cyan-pulse' : ''}`}>
                    {item.icon}
                  </span>
                  <span className={`text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${expanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                    {item.name}
                  </span>
                  {!expanded && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-surface-container border border-white/10 rounded-lg text-[10px] text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-2xl">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom CTA */}
          <div className="px-2 pb-6 pt-4 border-t border-white/[0.06]">
            <button
              onClick={() => router.push('/scan')}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-xl
                bg-cyan-pulse/10 border border-cyan-pulse/30 text-cyan-pulse
                hover:bg-cyan-pulse hover:text-midnight-deep transition-all duration-300
              `}
            >
              <span className="material-symbols-outlined text-xl flex-shrink-0">bolt</span>
              <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>
                Initiate Scan
              </span>
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
