"use client";

import React, { useState, Suspense } from 'react';
import NavBar from '@/components/credora/NavBar';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const PREP_TABS = [
  { id: 'roadmap', name: 'Roadmap', icon: 'route' },
  { id: 'questions', name: 'Question Bank', icon: 'quiz' },
  { id: 'mock', name: 'Mock Interview', icon: 'mic' },
];

function InterviewPrepContent() {
  const searchParams = useSearchParams();
  const company = searchParams.get('company') || 'Target Company';
  const [activeTab, setActiveTab] = useState('roadmap');

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface starfield">
      <NavBar />

      <main className="ml-0 md:ml-[72px] pt-24 px-6 lg:px-12 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 stream-in">
            <div>
               <p className="font-mono-data text-[10px] text-electric-glow tracking-widest uppercase mb-2">Hiring Intelligence Active</p>
               <h1 className="font-headline-lg text-4xl md:text-5xl tracking-tight">Prepare for <span className="text-electric-glow">{company}.</span></h1>
            </div>
            <div className="flex gap-2 p-1 glass-pane rounded-xl border-white/5">
               {PREP_TABS.map((tab: any) => (
                 <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-mono-data uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-electric-glow text-midnight-deep font-bold' : 'text-on-surface-variant hover:text-white'}`}
                 >
                   <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                   {tab.name}
                 </button>
               ))}
            </div>
          </header>

          <AnimatePresence mode="wait">
             {activeTab === 'roadmap' && <RoadmapView company={company} />}
             {activeTab === 'questions' && <QuestionBankView company={company} />}
             {activeTab === 'mock' && <MockInterviewView company={company} />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function InterviewPrepPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-obsidian-base flex items-center justify-center font-mono-data text-electric-glow uppercase tracking-[0.3em]">Initializing Hiring Intel...</div>}>
      <InterviewPrepContent />
    </Suspense>
  );
}

function RoadmapView({ company }: { company: string }) {
  const steps = [
    { title: 'Resume Filtering', duration: 'Round 1', desc: 'AI-based resume parsing focusing on keyword density and project impact.' },
    { title: 'Technical Screen', duration: 'Round 2', desc: '45-minute coding round on platforms like CoderPad. Focus on DSA.' },
    { title: 'System Design', duration: 'Round 3', desc: 'Scalability focused discussion on distributed systems architecture.' },
    { title: 'Behavioral & Leadership', duration: 'Round 4', desc: 'Assessing cultural alignment and leadership principles.' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s: any, i: number) => (
            <div key={i} className="glass-pane p-6 rounded-[32px] border-t-2 border-electric-glow relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <span className="text-6xl font-bold font-display-xl">{i+1}</span>
               </div>
               <span className="text-[10px] font-mono-data text-electric-glow uppercase tracking-widest mb-4 block">{s.duration}</span>
               <h3 className="font-bold text-lg mb-3">{s.title}</h3>
               <p className="text-xs text-on-surface-variant leading-relaxed">{s.desc}</p>
            </div>
          ))}
       </div>
       
       <div className="glass-pane p-10 rounded-[40px] border border-white/5 flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 space-y-6">
             <h3 className="font-headline-md text-3xl">Neural Prep Checklist</h3>
             <div className="space-y-4">
                {[
                  `Master DSA patterns commonly asked at ${company}.`,
                  'Prepare 3 "Impact Stories" using STAR method.',
                  'Verify System Design fundamentals: CAP Theorem, Load Balancing.',
                  `Deep-dive into ${company}'s specific tech stack documentation.`
                ].map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                     <div className="h-5 w-5 rounded border border-white/20 flex items-center justify-center group-hover:border-cyan-pulse transition-colors">
                        <span className="material-symbols-outlined text-[10px] text-cyan-pulse opacity-0 group-hover:opacity-100">check</span>
                     </div>
                     <span className="text-sm text-on-surface-variant group-hover:text-white transition-colors">{item}</span>
                  </div>
                ))}
             </div>
          </div>
          <div className="w-full md:w-80 h-48 rounded-3xl bg-gradient-to-br from-electric-glow/20 to-cyan-pulse/20 border border-white/10 flex flex-col items-center justify-center text-center p-6">
             <p className="font-mono-data text-[10px] uppercase mb-2 tracking-[0.2em]">Prep Readiness</p>
             <div className="text-5xl font-bold tracking-tighter">42%</div>
             <p className="text-[9px] mt-4 text-white/50 uppercase tracking-widest">3 days until target interview</p>
          </div>
       </div>
    </motion.div>
  );
}

function QuestionBankView({ company }: { company: string }) {
  const categories = ['Technical', 'System Design', 'Behavioral', 'Aptitude'];
  const [selectedCat, setSelectedCat] = useState('Technical');

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
       <div className="flex gap-4 border-b border-white/5 pb-4">
          {categories.map((c: string) => (
            <button 
              key={c} 
              onClick={() => setSelectedCat(c)}
              className={`text-xs font-mono-data uppercase tracking-widest pb-2 transition-all ${selectedCat === c ? 'text-cyan-pulse border-b border-cyan-pulse' : 'text-on-surface-variant'}`}
            >
              {c}
            </button>
          ))}
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({length: 6}).map((_: any, i: number) => (
            <div key={i} className="p-6 glass-pane border border-white/5 rounded-2xl hover:border-white/20 transition-all cursor-help group">
               <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-mono-data text-on-surface-variant uppercase">Question {i+1}</span>
                  <span className="material-symbols-outlined text-on-surface-variant/30 text-sm">visibility</span>
               </div>
               <p className="text-sm font-medium mb-4 group-hover:text-cyan-pulse transition-colors">
                 {i === 0 ? "Explain how you would design a rate limiter for a distributed API." : "What is the difference between a process and a thread in a Node.js environment?"}
               </p>
               <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                     <span className="material-symbols-outlined text-xs text-yellow-500">star</span>
                     <span className="material-symbols-outlined text-xs text-yellow-500">star</span>
                     <span className="material-symbols-outlined text-xs text-on-surface-variant/20">star</span>
                  </div>
                  <button className="text-[10px] font-mono-data text-cyan-pulse uppercase underline underline-offset-4">View Ideal Answer</button>
               </div>
            </div>
          ))}
       </div>
    </motion.div>
  );
}

function MockInterviewView({ company }: { company: string }) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const startSimulation = () => {
    setIsSimulating(true);
    setFeedback(null);
    setTimeout(() => {
      setIsSimulating(false);
      setFeedback("Simulation Complete: Your technical responses were strong, but try to speak more slowly during the System Design discussion.");
    }, 4000);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[50vh] text-center">
       <div className="relative mb-10">
          <div className="absolute inset-0 bg-cyan-pulse/30 blur-[100px] rounded-full animate-pulse" />
          <div className="h-48 w-48 rounded-full border-2 border-cyan-pulse/40 bg-obsidian-base relative z-10 flex flex-col items-center justify-center gap-2">
             <span className={`material-symbols-outlined text-5xl text-cyan-pulse ${isSimulating ? 'animate-bounce' : ''}`}>
               {isSimulating ? 'graphic_eq' : 'mic'}
             </span>
             <p className="text-[10px] font-mono-data text-cyan-pulse uppercase tracking-widest">
               {isSimulating ? 'Listening...' : 'Neural Evaluator Ready'}
             </p>
          </div>
       </div>
       <h3 className="font-headline-md text-3xl mb-4">
         {isSimulating ? 'Interview in Progress' : 'Ready for a Mock Round?'}
       </h3>
       <p className="text-on-surface-variant max-w-md text-sm mb-10">
         {isSimulating 
           ? "The AI is currently analyzing your speech patterns and technical accuracy." 
           : `Our AI Recruiter will conduct a 15-minute voice/text interview specifically based on ${company}'s hiring patterns and your resume.`}
       </p>
       
       <AnimatePresence>
         {feedback && (
           <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 glass-pane border-cyan-pulse/30 rounded-2xl max-w-lg text-sm text-cyan-pulse font-medium italic"
           >
             "{feedback}"
           </motion.div>
         )}
       </AnimatePresence>

       <button 
        onClick={startSimulation}
        disabled={isSimulating}
        className={`px-10 py-5 bg-white text-midnight-deep font-bold rounded-2xl transition-all flex items-center gap-3 ${isSimulating ? 'opacity-50 grayscale' : 'hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]'}`}
       >
          <span className="material-symbols-outlined">{isSimulating ? 'hourglass_top' : 'play_circle'}</span>
          {isSimulating ? 'SIMULATING...' : 'START SIMULATION'}
       </button>
       
       <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          {[
            { label: 'Voice Quality', val: isSimulating ? 'Active' : 'Detecting...' },
            { label: 'Latency', val: '42ms' },
            { label: 'Evaluation Mode', val: 'Strict' }
          ].map((m: any, i: number) => (
            <div key={i} className="p-4 glass-pane border border-white/5 rounded-xl">
               <p className="text-[9px] font-mono-data text-on-surface-variant uppercase mb-1">{m.label}</p>
               <p className="text-xs font-bold text-white">{m.val}</p>
            </div>
          ))}
       </div>
    </motion.div>
  );
}
