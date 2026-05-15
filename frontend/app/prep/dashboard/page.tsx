"use client";

import React from 'react';
import NavBar from '@/components/credora/NavBar';
import { motion } from 'framer-motion';

export default function StudentPrepDashboard() {
  const stats = [
    { label: 'Target Companies', val: '12', trend: '+2 this week' },
    { label: 'Interview Readiness', val: '74%', trend: 'Above avg' },
    { label: 'Resume Score', val: '88/100', trend: 'Excellent' },
    { label: 'Mock Rounds', val: '8', trend: 'Last 30 days' },
  ];

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface starfield">
      <NavBar />

      <main className="ml-0 md:ml-[72px] pt-24 px-6 lg:px-12 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Top Header */}
          <header className="mb-12 flex justify-between items-end stream-in">
            <div>
               <p className="font-mono-data text-[10px] text-cyan-pulse tracking-widest uppercase mb-2">Student Portal</p>
               <h1 className="font-headline-lg text-4xl md:text-5xl tracking-tight">Your Hiring <span className="text-cyan-pulse">Control Center.</span></h1>
            </div>
            <div className="hidden md:block text-right">
               <p className="text-[10px] text-on-surface-variant font-mono-data uppercase mb-1">Current Focus</p>
               <p className="text-sm font-bold text-white">Full Stack @ Stripe Prep</p>
            </div>
          </header>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
             {stats.map((s, i) => (
               <div key={i} className="glass-pane p-6 rounded-[32px] border border-white/5 stream-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <p className="text-[10px] font-mono-data text-on-surface-variant uppercase tracking-widest mb-2">{s.label}</p>
                  <div className="text-3xl font-bold text-white mb-2">{s.val}</div>
                  <p className="text-[9px] text-cyan-pulse font-mono-data uppercase">{s.trend}</p>
               </div>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             {/* Main Chart/Tracking */}
             <div className="lg:col-span-8 space-y-8">
                <div className="glass-pane p-8 rounded-[40px] border border-white/5 relative overflow-hidden">
                   <div className="flex justify-between items-start mb-10">
                      <div>
                        <h3 className="font-bold text-xl">Preparation Velocity</h3>
                        <p className="text-xs text-on-surface-variant">Daily readiness score tracking across all modules.</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-cyan-pulse/10 text-cyan-pulse text-[10px] font-mono-data rounded-lg uppercase">30 Days</span>
                      </div>
                   </div>
                   
                   {/* Mock Chart Area */}
                   <div className="h-64 flex items-end gap-2 md:gap-4">
                      {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                           <div 
                            className="w-full bg-cyan-pulse/20 rounded-t-lg transition-all duration-1000 group-hover:bg-cyan-pulse/40 relative"
                            style={{ height: `${h}%` }}
                           >
                              {i === 9 && <div className="absolute -top-1 w-full h-1 bg-cyan-pulse shadow-[0_0_10px_#06B6D4]" />}
                           </div>
                           <span className="text-[8px] font-mono-data text-on-surface-variant/40">D{i+1}</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Applied / Target Companies List */}
                <div className="glass-pane p-8 rounded-[40px] border border-white/5">
                   <h3 className="font-bold text-xl mb-8">Target Pipelines</h3>
                   <div className="space-y-4">
                      {[
                        { company: 'Stripe', role: 'Backend Engineer', status: 'In Prep', readiness: 84, color: 'bg-indigo-500' },
                        { company: 'Google', role: 'L3 Software Engineer', status: 'Ready', readiness: 92, color: 'bg-red-500' },
                        { company: 'Meta', role: 'Frontend Engineer', status: 'Review', readiness: 68, color: 'bg-blue-500' },
                      ].map((p, i) => (
                        <div key={i} className="p-4 bg-white/3 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-6 group hover:bg-white/5 transition-all">
                           <div className={`h-10 w-10 rounded-xl ${p.color} flex items-center justify-center font-bold text-white text-xs`}>
                              {p.company[0]}
                           </div>
                           <div className="flex-1 text-center md:text-left">
                              <p className="font-bold text-sm">{p.company}</p>
                              <p className="text-[10px] text-on-surface-variant font-mono-data uppercase">{p.role}</p>
                           </div>
                           <div className="w-full md:w-48 space-y-1">
                              <div className="flex justify-between text-[8px] font-mono-data uppercase">
                                 <span>Readiness</span>
                                 <span>{p.readiness}%</span>
                              </div>
                              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full bg-cyan-pulse" style={{ width: `${p.readiness}%` }} />
                              </div>
                           </div>
                           <span className={`px-3 py-1 rounded-full text-[9px] font-mono-data uppercase ${p.status === 'Ready' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                              {p.status}
                           </span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Right Sidebar: Skill Gaps & Tasks */}
             <div className="lg:col-span-4 space-y-8">
                <div className="glass-pane p-8 rounded-[40px] border border-white/5">
                   <h3 className="font-bold text-lg mb-6">Critical Skill Gaps</h3>
                   <div className="space-y-4">
                      {[
                        { skill: 'Redis Caching', gap: 'High', priority: 'Critical' },
                        { skill: 'System Design', gap: 'Med', priority: 'Medium' },
                        { skill: 'STAR Method', gap: 'Low', priority: 'Quick Fix' },
                      ].map((s, i) => (
                        <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/3 border border-white/5">
                           <div>
                              <p className="text-xs font-bold">{s.skill}</p>
                              <p className="text-[9px] text-on-surface-variant uppercase font-mono-data">{s.gap} Gap</p>
                           </div>
                           <span className="text-[8px] px-2 py-0.5 bg-cyan-pulse/10 text-cyan-pulse rounded border border-cyan-pulse/20 font-mono-data uppercase">{s.priority}</span>
                        </div>
                      ))}
                   </div>
                   <button className="w-full mt-6 py-3 border border-white/10 rounded-xl text-[10px] font-mono-data text-cyan-pulse uppercase hover:bg-cyan-pulse/5 transition-all">
                      Personalized Learning Roadmap
                   </button>
                </div>

                <div className="glass-pane p-8 rounded-[40px] border border-t-2 border-electric-glow">
                   <h3 className="font-bold text-lg mb-6">Today's Missions</h3>
                   <div className="space-y-4">
                      {[
                        'Complete Mock Interview for Google',
                        'Refine Project section for Stripe',
                        'Master CAP Theorem basics',
                      ].map((t, i) => (
                        <div key={i} className="flex gap-4 group cursor-pointer">
                           <div className="h-5 w-5 rounded-full border border-white/10 flex items-center justify-center group-hover:border-electric-glow transition-colors">
                              <span className="material-symbols-outlined text-[10px] text-electric-glow opacity-0 group-hover:opacity-100">flash_on</span>
                           </div>
                           <p className="text-xs text-on-surface-variant group-hover:text-white transition-colors">{t}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
