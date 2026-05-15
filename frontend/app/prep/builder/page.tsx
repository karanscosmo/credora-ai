"use client";

import React, { useState, useEffect, Suspense } from 'react';
import NavBar from '@/components/credora/NavBar';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type ResumeData = {
  summary: string;
  skills: string[];
  projects: any[];
  experience: any[];
  certifications: string[];
};

const TEMPLATES = [
  { id: 'minimal', name: 'Minimalist' },
  { id: 'modern', name: 'Modern Tech' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'executive', name: 'Executive' },
];

function BuilderContent() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get('company') || 'Target Company';
  
  const [data, setData] = useState<ResumeData>({
    summary: '',
    skills: ['React', 'TypeScript', 'Node.js'],
    projects: [
      { name: 'E-commerce Engine', desc: 'Built a scalable engine with 40% faster checkout.' }
    ],
    experience: [],
    certifications: ['AWS Certified Developer'],
  });

  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [atsScore, setAtsScore] = useState(65);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Simulate AI analysis based on company
    setSuggestions([
      `Add "Distributed Systems" to match ${companyId}'s stack.`,
      "Quantify your first project's impact with a metric (e.g., latency reduction).",
      `The role at ${companyId} prioritizes System Design—consider adding a dedicated section.`
    ]);
  }, [companyId]);

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface starfield">
      <NavBar showSide={false} />

      <main className="pt-20 h-screen flex overflow-hidden">
        {/* Left: Editor Form */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-6 md:p-10 border-r border-white/5 scrollbar-hide">
          <div className="max-w-xl mx-auto space-y-10">
            <header className="mb-10">
               <div className="flex items-center gap-3 mb-2">
                 <span className="px-2 py-0.5 bg-cyan-pulse/10 border border-cyan-pulse/30 rounded text-[9px] font-mono-data text-cyan-pulse uppercase">Customizing for {companyId}</span>
               </div>
               <h1 className="font-headline-md text-3xl">Neural Resume Builder</h1>
            </header>

            {/* Template Selector */}
            <section className="space-y-4">
               <p className="font-mono-data text-[10px] text-on-surface-variant uppercase tracking-widest">01. Select Template</p>
               <div className="flex gap-2">
                 {TEMPLATES.map((t: any) => (
                   <button
                    key={t.id}
                    onClick={() => setActiveTemplate(t.id)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-mono-data uppercase tracking-widest border transition-all ${activeTemplate === t.id ? 'bg-cyan-pulse text-midnight-deep border-cyan-pulse font-bold' : 'glass-pane border-white/10 text-on-surface-variant hover:border-white/30'}`}
                   >
                     {t.name}
                   </button>
                 ))}
               </div>
            </section>

            {/* Form Sections */}
            <div className="space-y-8">
              {/* Summary */}
              <div className="space-y-3">
                 <label className="font-mono-data text-[10px] text-on-surface-variant uppercase tracking-widest">Professional Summary</label>
                 <textarea 
                  value={data.summary}
                  onChange={(e) => setData({...data, summary: e.target.value})}
                  className="w-full h-32 bg-white/3 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-cyan-pulse/50 transition-colors placeholder:text-on-surface-variant/30"
                  placeholder="Tell your story..."
                 />
              </div>

              {/* Skills */}
              <div className="space-y-3">
                 <label className="font-mono-data text-[10px] text-on-surface-variant uppercase tracking-widest">Core Skills</label>
                 <div className="flex flex-wrap gap-2">
                   {data.skills.map((skill: string, i: number) => (
                     <div key={i} className="px-3 py-1.5 glass-pane border border-white/10 rounded-full text-xs flex items-center gap-2 group">
                        {skill}
                        <button onClick={() => setData({...data, skills: data.skills.filter((_, idx) => idx !== i)})} className="opacity-40 group-hover:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                     </div>
                   ))}
                   <button className="px-3 py-1.5 border border-dashed border-cyan-pulse/30 rounded-full text-[10px] font-mono-data text-cyan-pulse uppercase hover:bg-cyan-pulse/5 transition-all">
                     + Add Skill
                   </button>
                 </div>
              </div>

              {/* Projects */}
              <div className="space-y-4">
                 <label className="font-mono-data text-[10px] text-on-surface-variant uppercase tracking-widest">Key Projects</label>
                 {data.projects.map((p: any, i: number) => (
                   <div key={i} className="p-5 glass-pane border border-white/10 rounded-2xl space-y-3">
                      <input 
                        value={p.name}
                        className="w-full bg-transparent border-none text-sm font-bold focus:outline-none text-white"
                        placeholder="Project Name"
                      />
                      <textarea 
                        value={p.desc}
                        className="w-full bg-transparent border-none text-xs text-on-surface-variant focus:outline-none h-16 resize-none"
                        placeholder="Project description and impact..."
                      />
                   </div>
                 ))}
                 <button className="w-full py-3 border border-dashed border-white/10 rounded-2xl text-[10px] font-mono-data text-on-surface-variant uppercase hover:border-white/30 transition-all">
                   + Add Project
                 </button>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-10 sticky bottom-0 bg-obsidian-base/80 backdrop-blur-md pb-10">
               <button className="w-full py-5 bg-cyan-pulse text-midnight-deep font-bold rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center justify-center gap-3 group">
                  <span className="material-symbols-outlined">magic_button</span>
                  OPTIMIZE FOR {companyId.toUpperCase()}
               </button>
            </div>
          </div>
        </div>

        {/* Right: Live Preview & AI Intelligence */}
        <div className="hidden lg:flex flex-col w-1/2 bg-black/30 border-l border-white/5 overflow-hidden">
          {/* Top HUD: ATS Meter */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
             <div className="flex items-center gap-6">
                <div className="relative h-20 w-20 flex items-center justify-center">
                   <svg className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                      <circle cx="40" cy="40" r="35" fill="none" stroke="#06B6D4" strokeWidth="6" strokeDasharray={`${(atsScore/100) * 220} 220`} strokeLinecap="round" />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center font-mono-data text-xl font-bold">{atsScore}%</div>
                </div>
                <div>
                   <p className="font-mono-data text-[10px] text-cyan-pulse uppercase tracking-widest mb-1">ATS COMPATIBILITY</p>
                   <p className="text-xs text-on-surface-variant max-w-[200px]">Your resume matches 84% of the core requirements for {companyId}.</p>
                </div>
             </div>
             <button className="px-5 py-2.5 bg-white text-midnight-deep text-[10px] font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-sm">download</span>
                EXPORT PDF
             </button>
          </div>

          <div className="flex-1 flex gap-4 p-8 overflow-hidden">
             {/* Resume Canvas */}
             <div className="flex-1 bg-white rounded shadow-2xl overflow-y-auto p-10 text-midnight-deep origin-top scale-[0.9] scrollbar-hide">
                <div className="space-y-6">
                   <div className="border-b-2 border-black pb-4 text-center">
                      <h2 className="text-3xl font-bold uppercase tracking-tighter">KARAN SHARMA</h2>
                      <p className="text-[10px] mt-1 text-gray-600 font-medium">Software Engineer | Engineering Student</p>
                   </div>
                   
                   <section className="space-y-2">
                      <h4 className="text-[10px] font-bold uppercase border-b border-gray-200">Summary</h4>
                      <p className="text-[9px] leading-relaxed italic">{data.summary || "Highly motivated engineer focused on building high-performance systems and neural-ready interfaces."}</p>
                   </section>

                   <section className="space-y-2">
                      <h4 className="text-[10px] font-bold uppercase border-b border-gray-200">Core Intelligence</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {data.skills.map((s: string) => <span key={s} className="text-[9px] font-bold">• {s}</span>)}
                      </div>
                   </section>

                   <section className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase border-b border-gray-200">Strategic Projects</h4>
                      {data.projects.map((p: any, i: number) => (
                        <div key={i} className="space-y-1">
                           <div className="flex justify-between items-baseline">
                              <h5 className="text-[10px] font-bold uppercase">{p.name}</h5>
                              <span className="text-[8px] italic">2024</span>
                           </div>
                           <p className="text-[9px] leading-relaxed">• {p.desc}</p>
                        </div>
                      ))}
                   </section>
                </div>
             </div>

             {/* AI Suggestion Panel */}
             <div className="w-64 flex flex-col gap-4">
                <p className="font-mono-data text-[9px] text-on-surface-variant uppercase tracking-widest px-2">Neural Suggestions</p>
                <div className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-hide">
                   {suggestions.map((s: string, i: number) => (
                     <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-xl bg-cyan-pulse/5 border border-cyan-pulse/20 text-[10px] leading-relaxed text-on-surface-variant relative overflow-hidden"
                     >
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-cyan-pulse/40" />
                        {s}
                     </motion.div>
                   ))}
                </div>
                
                <div className="p-4 rounded-2xl bg-electric-glow/10 border border-electric-glow/20">
                   <p className="text-[9px] font-bold text-electric-glow uppercase mb-2">Hiring Probability</p>
                   <div className="text-2xl font-mono-data font-bold text-white">72%</div>
                   <p className="text-[8px] text-on-surface-variant mt-1 italic">Probability score based on {companyId} profile match.</p>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ResumeBuilderPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-obsidian-base flex items-center justify-center font-mono-data text-cyan-pulse uppercase tracking-[0.3em]">Calibrating Neural Builder...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
