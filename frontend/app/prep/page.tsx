"use client";

import React, { useState } from 'react';
import NavBar from '@/components/credora/NavBar';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const DOMAINS = [
  { id: 'software', name: 'Software Engineering', icon: 'code', color: 'text-cyan-pulse' },
  { id: 'data', name: 'Data Science & AI', icon: 'analytics', color: 'text-electric-glow' },
  { id: 'cyber', name: 'Cybersecurity', icon: 'security', color: 'text-error' },
  { id: 'finance', name: 'Finance & Fintech', icon: 'payments', color: 'text-yellow-400' },
  { id: 'product', name: 'Product Management', icon: 'inventory_2', color: 'text-purple-400' },
  { id: 'design', name: 'UI/UX Design', icon: 'palette', color: 'text-pink-400' },
];

const COMPANIES: Record<string, any[]> = {
  software: [
    { id: 'google', name: 'Google', logo: 'https://www.google.com/favicon.ico', focus: 'Distributed Systems, Scale, DSA' },
    { id: 'meta', name: 'Meta', logo: 'https://www.facebook.com/favicon.ico', focus: 'Product Engineering, Move Fast, React' },
    { id: 'amazon', name: 'Amazon', logo: 'https://www.amazon.com/favicon.ico', focus: 'LPs, Scalability, Customer Obsession' },
    { id: 'stripe', name: 'Stripe', logo: 'https://stripe.com/favicon.ico', focus: 'API Design, Quality, Fintech' },
  ],
  data: [
    { id: 'openai', name: 'OpenAI', logo: 'https://openai.com/favicon.ico', focus: 'LLMs, PyTorch, Research' },
    { id: 'nvidia', name: 'NVIDIA', logo: 'https://www.nvidia.com/favicon.ico', focus: 'CUDA, GPU Optimization, DL' },
    { id: 'databricks', name: 'Databricks', logo: 'https://databricks.com/favicon.ico', focus: 'Spark, Data Lakes, MLops' },
  ]
};

export default function PrepLandingPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const companies = selectedDomain ? (COMPANIES[selectedDomain] || []) : [];

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface starfield overflow-x-hidden">
      <NavBar />

      <main className="ml-0 md:ml-[72px] pt-24 px-6 lg:px-12 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-12 stream-in">
            <p className="font-mono-data text-[10px] text-cyan-pulse tracking-widest uppercase mb-2">AI Prep Engine v1.0</p>
            <h1 className="font-headline-lg text-4xl md:text-6xl mb-4 leading-tight">
              Strategize Your <span className="text-cyan-pulse">Hiring Success.</span>
            </h1>
            <p className="text-on-surface-variant max-w-2xl text-base md:text-lg">
              Don't just apply. Build a company-specific resume and prepare for the exact interview rounds used by world-class engineering teams.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Domain Selection */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="font-mono-data text-[11px] text-on-surface-variant uppercase tracking-widest mb-6">01. Select Your Domain</h3>
              <div className="grid grid-cols-1 gap-3">
                {DOMAINS.map((domain: any) => (
                  <button
                    key={domain.id}
                    onClick={() => { setSelectedDomain(domain.id); setSelectedCompany(null); }}
                    className={`
                      flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group
                      ${selectedDomain === domain.id 
                        ? 'bg-cyan-pulse/10 border-cyan-pulse/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                        : 'glass-pane border-white/5 hover:border-white/20'}
                    `}
                  >
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 ${domain.color}`}>
                      <span className="material-symbols-outlined">{domain.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${selectedDomain === domain.id ? 'text-white' : 'text-on-surface-variant group-hover:text-white'}`}>
                        {domain.name}
                      </p>
                    </div>
                    {selectedDomain === domain.id && (
                      <span className="material-symbols-outlined text-cyan-pulse animate-pulse">check_circle</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Company Selection */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {selectedDomain ? (
                  <motion.div
                    key={selectedDomain}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="font-mono-data text-[11px] text-on-surface-variant uppercase tracking-widest mb-6">02. Choose Target Company</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {companies.map((company: any) => (
                        <button
                          key={company.id}
                          onClick={() => setSelectedCompany(company.id)}
                          className={`
                            p-6 rounded-3xl border transition-all text-left relative overflow-hidden group
                            ${selectedCompany === company.id 
                              ? 'bg-electric-glow/10 border-electric-glow/40 shadow-[0_0_30px_rgba(59,130,246,0.2)]' 
                              : 'glass-pane border-white/5 hover:border-white/20'}
                          `}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-2xl bg-white p-2 flex items-center justify-center">
                              <img src={company.logo} alt={company.name} className="h-full w-full object-contain" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">{company.name}</h4>
                              <p className="text-[10px] text-cyan-pulse font-mono-data uppercase tracking-widest">Hiring Pattern Active</p>
                            </div>
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                            Focus: <span className="text-white/80">{company.focus}</span>
                          </p>
                          
                          <div className="flex gap-2">
                             {['ATS Optimized', 'DSA Heavy', 'Culture Fit'].map((tag: string) => (
                               <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono-data text-on-surface-variant/70 uppercase">
                                 {tag}
                               </span>
                             ))}
                          </div>

                          {selectedCompany === company.id && (
                            <motion.div 
                              layoutId="active-bg"
                              className="absolute inset-0 border-2 border-electric-glow/50 rounded-3xl pointer-events-none" 
                            />
                          )}
                        </button>
                      ))}
                      
                      {/* Custom Company Placeholder */}
                      <button className="p-6 rounded-3xl border border-dashed border-white/10 hover:border-cyan-pulse/40 hover:bg-cyan-pulse/5 transition-all text-center flex flex-col items-center justify-center gap-2 group">
                        <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-cyan-pulse">add_circle</span>
                        <p className="text-xs font-mono-data uppercase tracking-widest text-on-surface-variant">Custom Company</p>
                      </button>
                    </div>

                    {selectedCompany && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-10 flex flex-col sm:flex-row gap-4"
                      >
                        <Link 
                          href={`/prep/builder?company=${selectedCompany}&domain=${selectedDomain}`}
                          className="flex-1 px-8 py-5 bg-cyan-pulse text-midnight-deep font-bold rounded-2xl hover:brightness-110 transition-all text-center flex items-center justify-center gap-3 group"
                        >
                          <span className="material-symbols-outlined">edit_document</span>
                          BUILD COMPANY RESUME
                          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                        <Link 
                          href={`/prep/interview?company=${selectedCompany}`}
                          className="flex-1 px-8 py-5 glass-pane border-electric-glow/40 text-electric-glow font-bold rounded-2xl hover:bg-electric-glow/10 transition-all text-center flex items-center justify-center gap-3"
                        >
                          <span className="material-symbols-outlined">psychology</span>
                          HIRING PREP ENGINE
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <div className="h-full min-h-[400px] rounded-[40px] border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12 stream-in">
                    <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4">rocket_launch</span>
                    <h3 className="text-xl font-bold text-on-surface-variant/40 mb-2">Ready to Launch Your Prep?</h3>
                    <p className="text-sm text-on-surface-variant/30 max-w-xs">
                      Select a technical domain from the left to unlock company-specific intelligence and preparation tracks.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Recent Prep History */}
          <section className="mt-20 pt-10 border-t border-white/5">
             <h3 className="font-mono-data text-[11px] text-on-surface-variant uppercase tracking-widest mb-8 text-center">Your Recent Preparation Tracks</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { company: 'Google', role: 'L3 Software Engineer', progress: 65, date: '2 days ago' },
                  { company: 'NVIDIA', role: 'DL Systems Engineer', progress: 20, date: '5 days ago' },
                  { company: 'Stripe', role: 'Backend Engineer', progress: 90, date: 'Yesterday' },
                ].map((track: any, i: number) => (
                  <Link key={i} href="/prep/dashboard" className="glass-pane p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all group">
                     <div className="flex justify-between items-start mb-4">
                        <p className="font-bold text-sm">{track.company}</p>
                        <span className="text-[10px] text-on-surface-variant/50 font-mono-data">{track.date}</span>
                     </div>
                     <p className="text-xs text-on-surface-variant mb-4">{track.role}</p>
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-mono-data uppercase">
                           <span className="text-cyan-pulse">Readiness</span>
                           <span className="text-white">{track.progress}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-cyan-pulse" style={{ width: `${track.progress}%` }} />
                        </div>
                     </div>
                  </Link>
                ))}
             </div>
          </section>
        </div>
      </main>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-pulse/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-electric-glow/5 rounded-full blur-[150px]" />
      </div>
    </div>
  );
}
