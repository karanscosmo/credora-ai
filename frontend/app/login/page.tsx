"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi, sessionStore } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await authApi.login(email, password);
      if (res.access_token) {
        sessionStore.save('token', res.access_token);
        localStorage.setItem('credora_token', res.access_token);
      }
      router.push('/dashboard');
    } catch (err: unknown) {
      // Backend may not be running — still allow demo access
      setError(err instanceof Error ? err.message : 'Login failed. Using demo mode.');
      setTimeout(() => router.push('/dashboard'), 1500);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => router.push('/scan');

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface starfield flex flex-col">
      {/* Top brand bar */}
      <header className="flex items-center justify-between px-8 h-16 border-b border-white/[0.06]">
        <Link href="/" className="font-display-xl text-xl font-bold tracking-tight text-primary">
          CREDORA AI
        </Link>
        <span className="font-mono-data text-[10px] text-on-surface-variant/50 uppercase tracking-widest hidden md:block">
          Intelligence Access Terminal
        </span>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-glow/6 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-md stream-in">
          {/* Card */}
          <div className="glass-pane-heavy p-8 rounded-3xl border border-white/10 shadow-2xl">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-electric-glow/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-electric-glow/30 rounded-br-3xl" />

            <div className="mb-8">
              <h1 className="font-headline-md text-on-surface font-bold mb-2">Welcome back</h1>
              <p className="text-sm text-on-surface-variant">Sign in to access your neural intelligence dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-mono-data text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.ai"
                  className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-electric-glow/50 transition-colors"
                />
              </div>
              <div>
                <label className="font-mono-data text-[10px] text-on-surface-variant uppercase tracking-widest block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-electric-glow/50 transition-colors"
                />
              </div>

              {error && (
                <p className="text-xs text-error font-mono-data bg-error/10 border border-error/20 rounded-lg px-4 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-electric-glow text-white font-semibold text-sm rounded-xl hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-transparent font-mono-data text-[9px] text-on-surface-variant/40 uppercase tracking-widest">or</span>
              </div>
            </div>

            <button
              onClick={handleGuest}
              className="w-full py-3.5 glass-pane text-on-surface-variant font-semibold text-sm rounded-xl hover:text-on-surface hover:bg-white/8 active:scale-[0.98] transition-all duration-200 border border-white/8 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              Continue as Guest
            </button>

            <p className="text-center text-xs text-on-surface-variant/50 mt-6">
              No account?{' '}
              <Link href="/signup" className="text-electric-glow hover:text-white transition-colors">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
