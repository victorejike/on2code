'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setMessage('Passwords do not match.'); return; }
    setLoading(true); setMessage('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      if (!res.ok) { const err = await res.json(); setMessage(err?.message || 'Registration failed.'); return; }
      const data = await res.json();
      window.localStorage.setItem('on2code_token', data.accessToken);
      window.location.href = '/dashboard';
    } catch { setMessage('Unable to reach the server.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-[calc(100vh-57px)] bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-gray-900">Create your account</h1>
            <p className="mt-1 text-sm text-gray-500">Join On2Code and start learning for free.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full name</label>
              <input type="text" value={form.name} onChange={set('name')} placeholder="Your name" required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email address</label>
              <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input type="password" value={form.password} onChange={set('password')} placeholder="Min. 8 characters" required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm password</label>
              <input type="password" value={form.confirm} onChange={set('confirm')} placeholder="Repeat password" required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/20" />
            </div>

            {message && (
              <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-700">{message}</p>
            )}

            <button type="submit" disabled={loading}
              className="w-full rounded-full bg-[#0077cc] py-3 text-sm font-bold text-white hover:bg-[#005fa3] transition disabled:opacity-60">
              {loading ? 'Creating account…' : 'Create free account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold text-[#0077cc] hover:underline">Sign in</Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400">
          By registering you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
