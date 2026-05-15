"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', organization: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Please fill in all required fields.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await authApi.signup(form.name, form.email, form.password, form.organization);
      if (res.access_token) localStorage.setItem('credora_token', res.access_token);
      router.push('/scan');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Signup failed. Redirecting to scan as guest...');
      setTimeout(() => router.push('/scan'), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface starfield flex flex-col">
      <header className="flex items-center justify-between px-8 h-16 border-b border-white/[0.06]">
        <Link href="/" className="font-display-xl text-xl font-bold tracking-tight text-primary">CREDORA AI</Link>
        <span className="font-mono-data text-[10px] text-on-surface-variant/50 uppercase tracking-widest hidden md:block">Recruiter Network Access</span>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-pulse/6 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-md stream-in">
          <div className="glass-pane-heavy p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-pulse/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-pulse/30 rounded-br-3xl" />

            <div className="mb-8">
              <h1 className="font-headline-md text-on-surface font-bold mb-2">Join the network</h1>
              <p className="text-sm text-on-surface-variant">Create your intelligence profile and get a free neural evaluation.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="font-mono-data text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">Full Name *</label>
                  <input type="text" value={form.name} onChange={set('name')} placeholder="Jane Smith"
                    className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-cyan-pulse/50 transition-colors" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="font-mono-data text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">Organization</label>
                  <input type="text" value={form.organization} onChange={set('organization')} placeholder="Acme Corp"
                    className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-cyan-pulse/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="font-mono-data text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">Email *</label>
                <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.ai"
                  className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-cyan-pulse/50 transition-colors" />
              </div>
              <div>
                <label className="font-mono-data text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">Password *</label>
                <input type="password" value={form.password} onChange={set('password')} placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-cyan-pulse/50 transition-colors" />
              </div>

              {error && <p className="text-xs text-error bg-error/10 border border-error/20 rounded-lg px-4 py-2">{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-cyan-pulse text-midnight-deep font-semibold text-sm rounded-xl hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
                {loading ? <span className="h-4 w-4 border-2 border-midnight-deep border-t-transparent rounded-full animate-spin" /> : 'Create Account & Start Scan'}
              </button>
            </form>

            <p className="text-center text-xs text-on-surface-variant/50 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-cyan-pulse hover:text-white transition-colors">Sign in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
