'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true); setError('');
    // Phase 2: real token-based reset — simulate success for now
    setTimeout(() => { setDone(true); setLoading(false); }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-57px)] bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
          {done ? (
            <div className="text-center space-y-4">
              <div className="text-5xl">✅</div>
              <h1 className="text-2xl font-extrabold text-gray-900">Password reset!</h1>
              <p className="text-sm text-gray-500">Your password has been updated. You can now sign in.</p>
              <Link href="/auth/login"
                className="inline-flex rounded-full bg-[#0077cc] px-6 py-3 text-sm font-bold text-white hover:bg-[#005fa3] transition">
                Sign in
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h1 className="text-2xl font-extrabold text-gray-900">Set new password</h1>
                <p className="mt-1 text-sm text-gray-500">Choose a strong password for your account.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">New password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 characters" required minLength={8}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/20" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm password</label>
                  <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                    placeholder="Repeat password" required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/20" />
                </div>
                {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full rounded-full bg-[#0077cc] py-3 text-sm font-bold text-white hover:bg-[#005fa3] transition disabled:opacity-60">
                  {loading ? 'Saving…' : 'Reset password'}
                </button>
              </form>
              <p className="text-center text-sm text-gray-600">
                <Link href="/auth/login" className="font-semibold text-[#0077cc] hover:underline">← Back to sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
