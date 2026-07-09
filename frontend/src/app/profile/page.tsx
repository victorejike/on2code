'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

type User = { id: string; name: string; email: string; enrolledCourses?: string[] };

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('on2code_token');
    if (!token) { setLoading(false); return; }
    fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.user) { setUser(d.user); setName(d.user.name || ''); } })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setMsg('');
    const token = localStorage.getItem('on2code_token');
    try {
      const res = await fetch(`${API}/users/${user!.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        const d = await res.json();
        setUser(d.user);
        setMsg('✅ Profile updated!');
      } else {
        setMsg('Failed to update profile.');
      }
    } catch { setMsg('Could not reach the server.'); }
    finally { setSaving(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('on2code_token');
    window.location.href = '/';
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-8 w-8 border-2 border-[#0077cc] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) return (
    <div className="flex items-center justify-center min-h-[60vh] px-6">
      <div className="text-center space-y-4">
        <p className="text-xl font-bold text-gray-900">Sign in to view your profile</p>
        <Link href="/auth/login" className="inline-flex rounded-full bg-[#0077cc] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#005fa3] transition">
          Sign in
        </Link>
      </div>
    </div>
  );

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account settings</p>
        </div>

        <div className="flex items-center gap-5">
          <div className="h-16 w-16 rounded-full bg-[#0077cc] flex items-center justify-center text-white text-2xl font-extrabold shrink-0">
            {(user.name || user.email)[0].toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-gray-900">{user.name || '—'}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-gray-900">Account details</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
            </div>
            {msg && <p className="text-sm text-green-600">{msg}</p>}
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#0077cc] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#005fa3] transition disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-900">Learning stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-2xl font-extrabold text-[#0077cc]">{user.enrolledCourses?.length ?? 0}</p>
              <p className="text-xs text-gray-500 mt-1">Courses enrolled</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-2xl font-extrabold text-[#0077cc]">0</p>
              <p className="text-xs text-gray-500 mt-1">Certificates earned</p>
            </div>
          </div>
          <Link href="/certificates" className="block text-sm text-[#0077cc] hover:underline">
            View my certificates →
          </Link>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 space-y-3">
          <h2 className="font-bold text-red-700">Sign out</h2>
          <p className="text-sm text-red-600">You will be signed out of your account on this device.</p>
          <button
            onClick={handleLogout}
            className="rounded-full border border-red-300 bg-white px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
