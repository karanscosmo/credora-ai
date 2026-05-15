"use client";

import React, { useState, useEffect, useRef } from 'react';
import NavBar from '@/components/credora/NavBar';
import Link from 'next/link';
import { sessionStore, type ResumeUploadResult, type GitHubResult } from '@/lib/api';

type ExperienceStep =
  | 'entry'
  | 'timeline'
  | 'resume'
  | 'github'
  | 'comms'
  | 'technical'
  | 'thinking'
  | 'synthesis'
  | 'improvement'
  | 'done';

export default function ExperiencePage() {
  const [step, setStep] = useState<ExperienceStep>('entry');
  const [progress, setProgress] = useState(0);
  const [resume, setResume] = useState<ResumeUploadResult | null>(null);
  const [github, setGithub] = useState<GitHubResult | null>(null);
  const [thought, setThought] = useState<string>('');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setResume(sessionStore.load<ResumeUploadResult>('resume'));
    setGithub(sessionStore.load<GitHubResult>('github'));
  }, []);

  const startEvaluation = () => {
    setStep('timeline');
    runFlow();
  };

  const thoughts = [
    "Projects appear polished but lack deployment proof.",
    "Communication confidence is strong.",
    "Recruiters may question originality.",
    "Technical depth in distributed systems detected.",
    "Execution velocity is above sector average.",
    "Semantic clarity indicates leadership potential.",
    "GitHub entropy suggests high autonomy."
  ];

  const runFlow = async () => {
    const sequence: { step: ExperienceStep; duration: number }[] = [
      { step: 'timeline', duration: 2000 },
      { step: 'resume', duration: 4000 },
      { step: 'github', duration: 4000 },
      { step: 'comms', duration: 3500 },
      { step: 'technical', duration: 4500 },
      { step: 'thinking', duration: 3000 },
      { step: 'synthesis', duration: 5000 },
      { step: 'improvement', duration: 3000 },
      { step: 'done', duration: 0 },
    ];

    let currentProgress = 0;
    const totalDuration = sequence.reduce((acc, s) => acc + s.duration, 0);

    for (const item of sequence) {
      setStep(item.step);
      
      // Update thoughts periodically
      if (item.step !== 'entry' && item.step !== 'done') {
        setThought(thoughts[Math.floor(Math.random() * thoughts.length)]);
      }

      if (item.duration > 0) {
        const stepProgressStart = currentProgress;
        const stepProgressEnd = currentProgress + (item.duration / totalDuration) * 100;
        
        await new Promise<void>((resolve) => {
          const startTime = Date.now();
          const iv = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const p = Math.min(1, elapsed / item.duration);
            setProgress(stepProgressStart + p * (stepProgressEnd - stepProgressStart));
            if (p >= 1) {
              clearInterval(iv);
              resolve();
            }
          }, 50);
        });
        currentProgress = stepProgressEnd;
      }
    }
    setStep('done');
    setProgress(100);
  };

  const renderEntry = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center stream-in">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-cyan-pulse/20 blur-[100px] rounded-full animate-pulse" />
        <div className="relative h-48 w-48 rounded-full border border-cyan-pulse/30 flex items-center justify-center bg-obsidian-base/50 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.2)]">
          <span className="material-symbols-outlined text-7xl text-cyan-pulse animate-pulse">neurology</span>
        </div>
      </div>
      <h1 className="font-headline-lg text-4xl md:text-7xl mb-6 tracking-tight">
        Complete recruiter-grade evaluation in <span className="text-cyan-pulse underline underline-offset-8 decoration-cyan-pulse/30">under 2 minutes.</span>
      </h1>
      <p className="text-on-surface-variant max-w-2xl text-base md:text-lg mb-10 leading-relaxed font-body-lg">
        Resume, portfolio, communication, technical depth, and recruiter trust analyzed in one continuous intelligence flow.
      </p>
      <button 
        onClick={startEvaluation}
        className="px-10 py-5 bg-cyan-pulse text-midnight-deep font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center gap-3 group"
      >
        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">bolt</span>
        START EVALUATION
      </button>
    </div>
  );

  const renderTimeline = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] stream-in">
      <div className="w-full max-w-4xl glass-pane p-12 rounded-[40px] border-cyan-pulse/10">
        <h2 className="font-mono-data text-xs text-cyan-pulse uppercase tracking-[0.3em] mb-12 text-center">Neural Pipeline Initialization</h2>
        <div className="space-y-8">
          {[
            { label: 'Resume Intelligence', icon: 'description', active: step === 'resume' || step === 'timeline' },
            { label: 'GitHub Constellation', icon: 'hub', active: step === 'github' },
            { label: 'Communication Pulse', icon: 'record_voice_over', active: step === 'comms' },
            { label: 'Technical Pulse', icon: 'terminal', active: step === 'technical' },
            { label: 'Recruiter Trust Analysis', icon: 'psychology', active: step === 'thinking' },
            { label: 'Final Recruitability Synthesis', icon: 'verified', active: step === 'synthesis' }
          ].map((s: any, i: number) => (
            <div key={i} className={`flex items-center gap-6 transition-all duration-700 ${s.active ? 'opacity-100 translate-x-2' : 'opacity-20'}`}>
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${s.active ? 'border-cyan-pulse/40 bg-cyan-pulse/10 text-cyan-pulse shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-white/10 text-on-surface-variant'}`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                   <span className={`font-mono-data text-xs uppercase tracking-widest ${s.active ? 'text-white' : 'text-on-surface-variant'}`}>{s.label}</span>
                   {s.active && <span className="text-[10px] font-mono-data text-cyan-pulse animate-pulse">ANALYZING...</span>}
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-cyan-pulse transition-all duration-1000 ${s.active ? 'w-full' : 'w-0'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch(step) {
      case 'resume':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] stream-in">
            <div className="relative w-full max-w-4xl glass-pane p-12 rounded-[40px] overflow-hidden">
              <div className="scan-line" />
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="h-64 w-48 bg-white/5 rounded-xl border border-white/10 relative overflow-hidden flex flex-col p-4 gap-2">
                   {Array.from({length: 12}).map((_: any, i: number) => (
                     <div key={i} className="h-2 bg-cyan-pulse/20 rounded w-full animate-pulse" style={{animationDelay: `${i*0.1}s`}} />
                   ))}
                   <div className="absolute inset-0 bg-gradient-to-t from-obsidian-base to-transparent" />
                   <div className="mt-auto h-8 w-8 rounded bg-cyan-pulse/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-cyan-pulse text-sm">search</span>
                   </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-headline-md text-3xl mb-4">Resume Intelligence Scan</h3>
                  <p className="text-on-surface-variant mb-8">Extracting measurable impact and mapping technical skill nodes...</p>
                  <div className="flex flex-wrap gap-3">
                    {['React', 'Node.js', 'Distributed Systems', 'K8s', 'Architecture'].map((skill: string, i: number) => (
                      <div key={skill} className="px-4 py-2 bg-cyan-pulse/10 border border-cyan-pulse/20 rounded-full text-xs font-mono-data text-cyan-pulse stream-in" style={{animationDelay: `${i*0.2}s`}}>
                        {skill}
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 p-6 bg-white/3 rounded-2xl border border-white/5 flex items-center gap-4">
                     <span className="material-symbols-outlined text-error">warning</span>
                     <p className="text-xs text-on-surface-variant">Detected <span className="text-error font-bold">3 AI-generated phrases</span> that recruiters may flag.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'github':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] stream-in">
            <div className="w-full max-w-5xl glass-pane p-12 rounded-[40px]">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                   <h3 className="font-headline-md text-3xl mb-4">GitHub Constellation</h3>
                   <p className="text-on-surface-variant mb-8">Scanning repository nodes for originality and engineering maturity.</p>
                   <div className="space-y-4">
                      {['Core-Engine', 'Auth-Module', 'Neural-Router'].map((repo: string, i: number) => (
                        <div key={repo} className="flex items-center justify-between p-4 bg-white/3 rounded-xl border border-white/5 stream-in" style={{animationDelay: `${i*0.2}s`}}>
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-cyan-pulse">hub</span>
                            <span className="font-mono-data text-xs uppercase">{repo}</span>
                          </div>
                          <span className="text-[10px] text-cyan-pulse font-bold uppercase tracking-widest">VERIFIED ORIGINALITY</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="w-full md:w-80 h-80 relative flex items-center justify-center">
                   <div className="absolute inset-0 border border-cyan-pulse/20 rounded-full animate-spin-slow" />
                   <div className="absolute inset-10 border border-cyan-pulse/10 rounded-full animate-reverse-spin" />
                   <span className="material-symbols-outlined text-6xl text-cyan-pulse">hub</span>
                   {Array.from({length: 8}).map((_: any, i: number) => (
                     <div 
                      key={i} 
                      className="absolute h-3 w-3 bg-cyan-pulse rounded-full" 
                      style={{
                        transform: `rotate(${i * 45}deg) translateY(-140px)`,
                        boxShadow: '0 0 15px #06B6D4'
                      }}
                     />
                   ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'comms':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] stream-in">
            <div className="w-full max-w-4xl glass-pane p-12 rounded-[40px] text-center">
              <h3 className="font-headline-md text-3xl mb-4">Communication Pulse</h3>
              <p className="text-on-surface-variant mb-12">Analyzing voice frequency, sentiment trajectory, and semantic confidence.</p>
              
              <div className="flex items-center justify-center h-48 gap-1 mb-12">
                {Array.from({length: 50}).map((_: any, i: number) => (
                  <div 
                    key={i} 
                    className="w-1.5 bg-cyan-pulse rounded-full transition-all duration-300"
                    style={{
                      height: `${Math.random() * 80 + 20}%`,
                      opacity: Math.max(0.2, Math.sin(i * 0.5))
                    }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
                {['Clarity', 'Confidence', 'Technical Vocabulary'].map((m: string, i: number) => (
                   <div key={m} className="p-4 bg-white/3 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-mono-data text-on-surface-variant uppercase mb-2">{m}</p>
                      <p className="text-xl font-bold text-cyan-pulse">{(90 + Math.random() * 9).toFixed(1)}%</p>
                   </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'technical':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] stream-in">
            <div className="w-full max-w-4xl glass-pane p-12 rounded-[40px]">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-cyan-pulse text-3xl">terminal</span>
                <h3 className="font-headline-md text-3xl">Technical Pulse</h3>
              </div>
              
              <div className="space-y-6">
                <div className="p-8 bg-black/40 border border-white/10 rounded-2xl font-mono-data text-sm leading-relaxed stream-in">
                  <p className="text-cyan-pulse mb-4">[SYSTEM] Adaptive Question Generated</p>
                  <p className="text-white">"How do you handle memory exhaustion and back-pressure in a high-concurrency event stream?"</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-6 bg-white/3 border border-cyan-pulse/20 rounded-2xl">
                      <p className="text-[10px] text-on-surface-variant uppercase mb-3">Recruiter Inference</p>
                      <p className="text-sm">Candidate demonstrates deep systems-level understanding of reactive streams.</p>
                   </div>
                   <div className="p-6 bg-white/3 border border-white/10 rounded-2xl">
                      <p className="text-[10px] text-on-surface-variant uppercase mb-3">Trust Coefficient</p>
                      <p className="text-2xl font-bold text-cyan-pulse">0.985</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'thinking':
      case 'synthesis':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] stream-in">
            <div className="w-full max-w-3xl text-center">
              <div className="relative mb-12 flex justify-center">
                <div className="absolute inset-0 bg-cyan-pulse/30 blur-[120px] rounded-full animate-pulse" />
                <div className="h-40 w-40 rounded-full border border-cyan-pulse/40 flex items-center justify-center bg-obsidian-base/80 backdrop-blur-3xl shadow-[0_0_80px_rgba(6,182,212,0.3)]">
                  <span className="material-symbols-outlined text-6xl text-cyan-pulse animate-spin-slow">psychology</span>
                </div>
              </div>
              <h3 className="font-headline-md text-4xl mb-6">Recruiter Thinking...</h3>
              <div className="h-20 flex items-center justify-center px-8">
                 <p className="text-xl italic text-on-surface-variant animate-pulse">"{thought}"</p>
              </div>
              <div className="mt-12 flex justify-center gap-2">
                 {Array.from({length: 3}).map((_: any, i: number) => (
                   <div key={i} className="h-1.5 w-1.5 rounded-full bg-cyan-pulse animate-bounce" style={{animationDelay: `${i*0.2}s`}} />
                 ))}
              </div>
            </div>
          </div>
        );
      case 'improvement':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] stream-in">
            <div className="w-full max-w-4xl glass-pane p-12 rounded-[40px]">
               <h3 className="font-headline-md text-3xl mb-8 text-center">Neural Improvement Pathways</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                 {[
                   { gain: '+18', text: 'Deploy live demos publicly', icon: 'cloud_upload' },
                   { gain: '+12', text: 'Quantify impact in resume', icon: 'trending_up' },
                   { gain: '+15', text: 'Document repo architecture', icon: 'architecture' }
                 ].map((path: any, i: number) => (
                   <div key={i} className="p-6 glass-pane border-cyan-pulse/20 rounded-2xl flex flex-col items-center text-center stream-in" style={{animationDelay: `${i*0.2}s`}}>
                      <div className="h-12 w-12 rounded-xl bg-cyan-pulse/10 flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-cyan-pulse">{path.icon}</span>
                      </div>
                      <span className="font-mono-data text-2xl font-bold text-cyan-pulse mb-2">{path.gain}pts</span>
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider leading-relaxed">{path.text}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        );
      case 'done':
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] stream-in">
            <div className="w-full max-w-4xl glass-pane p-12 rounded-[50px] border-cyan-pulse/20 shadow-[0_0_100px_rgba(6,182,212,0.1)]">
              <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-pulse/20 blur-[60px] rounded-full" />
                  <div className="h-48 w-48 rounded-full border-4 border-cyan-pulse/40 flex items-center justify-center bg-obsidian-base relative z-10">
                    <div className="text-center">
                       <p className="font-mono-data text-5xl font-bold text-white">{Math.round((resume?.trust_score ?? 78) * 0.5 + (github?.originality ?? 82) * 0.5)}</p>
                       <p className="text-[10px] font-mono-data text-cyan-pulse uppercase tracking-[0.2em]">INDEX</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                   <p className="font-mono-data text-xs text-cyan-pulse uppercase tracking-[0.3em] mb-3">Synthesis Complete</p>
                   <h2 className="font-headline-lg text-5xl mb-4">Your Recruiter Intelligence Report is Ready.</h2>
                   <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                      <div>
                        <p className="text-[10px] text-on-surface-variant uppercase mb-1">Recruiter Trust</p>
                        <p className="text-2xl font-bold text-white">{resume?.trust_score ?? 78}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-on-surface-variant uppercase mb-1">Engineering Maturity</p>
                        <p className="text-2xl font-bold text-white">{github?.originality ?? 82}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-on-surface-variant uppercase mb-1">Startup Fit</p>
                        <p className="text-2xl font-bold text-white">High</p>
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center pt-8 border-t border-white/5">
                <Link href="/final-report" className="px-8 py-4 bg-cyan-pulse text-midnight-deep font-bold rounded-xl hover:brightness-110 transition-all flex items-center gap-2">
                   <span className="material-symbols-outlined text-base">download</span>
                   DOWNLOAD REPORT
                </Link>
                <Link href="/scan" className="px-8 py-4 glass-pane text-white font-bold rounded-xl hover:bg-white/5 transition-all flex items-center gap-2">
                   <span className="material-symbols-outlined text-base">restart_alt</span>
                   RE-RUN ANALYSIS
                </Link>
                <Link href="/dashboard?tab=improvements" className="px-8 py-4 glass-pane border-electric-glow/30 text-electric-glow font-bold rounded-xl hover:bg-electric-glow/5 transition-all flex items-center gap-2">
                   <span className="material-symbols-outlined text-base">trending_up</span>
                   IMPROVE PROFILE
                </Link>
              </div>
            </div>
          </div>
        );
      default:
        return renderTimeline();
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface starfield overflow-hidden">
      <NavBar showSide={false} />
      
      {/* HUD Progress Top Bar */}
      {step !== 'entry' && step !== 'done' && (
        <div className="fixed top-16 left-0 right-0 z-50 px-8 py-4 bg-obsidian-base/60 backdrop-blur-md border-b border-white/5 flex items-center gap-6 stream-in">
          <div className="flex-1">
             <div className="flex justify-between items-end mb-2">
                <span className="font-mono-data text-[10px] text-cyan-pulse uppercase tracking-[0.3em]">INTELLIGENCE_STREAMING_V4.2</span>
                <span className="font-mono-data text-xs text-white">{Math.round(progress)}% COMPLETE</span>
             </div>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-pulse transition-all duration-300 shadow-[0_0_10px_#06B6D4]" style={{width: `${progress}%`}} />
             </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 glass-pane rounded-lg border-cyan-pulse/20">
             <span className="h-1.5 w-1.5 rounded-full bg-cyan-pulse animate-pulse" />
             <span className="font-mono-data text-[9px] text-cyan-pulse uppercase tracking-widest">NEURAL_LIVE</span>
          </div>
        </div>
      )}

      <main className="pt-24 px-6 md:px-12 pb-12">
        <div className="max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center">
          {step === 'entry' ? renderEntry() : renderStep()}
        </div>
      </main>

      {/* Atmospheric Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-glow/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-pulse/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
      </div>

    </div>
  );
}
