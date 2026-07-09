'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState({ users: 0, courses: 0, submissions: 0, points: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('on2code_token');
    Promise.all([
      fetch(`${API}/courses`).then(r => r.ok ? r.json() : null),
      token ? fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : null) : Promise.resolve(null),
    ]).then(([coursesData, meData]) => {
      const courses = coursesData?.courses?.length || 0;
      if (meData?.user) {
        fetch(`${API}/users/${meData.user.id}/submissions`, { headers: { Authorization: `Bearer ${token}` } })
          .then(r => r.ok ? r.json() : null)
          .then(s => {
            const subs = s?.submissions?.length || 0;
            setStats({ users: 1, courses, submissions: subs, points: subs * 10 });
          });
      } else {
        setStats(prev => ({ ...prev, courses }));
      }
    }).finally(() => setLoading(false));
  }, []);

  const METRICS = [
    { label: 'Total Users', value: stats.users, icon: '👥', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Courses', value: stats.courses, icon: '📚', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Submissions', value: stats.submissions, icon: '📤', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total XP Earned', value: stats.points, icon: '⭐', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ];

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="h-8 w-8 border-2 border-[#0077cc] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Link href="/admin" className="hover:text-[#0077cc]">Admin</Link>
              <span>/</span><span>Analytics</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Analytics</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/users" className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">Users</Link>
            <Link href="/admin/courses" className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">Courses</Link>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map(m => (
            <div key={m.label} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${m.bg} text-xl mb-4`}>
                {m.icon}
              </div>
              <p className={`text-3xl font-extrabold ${m.color}`}>{m.value}</p>
              <p className="text-sm text-gray-500 mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Activity chart placeholder */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900">Submission activity</h2>
          <div className="flex items-end gap-2 h-32">
            {[20, 45, 30, 60, 40, 75, 55, 80, 65, 90, 70, 85].map((h, i) => (
              <div key={i} className="flex-1 bg-[#0077cc] rounded-t opacity-70 hover:opacity-100 transition" style={{ height: `${h}%` }} title={`${h} submissions`} />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <p className="text-xs text-gray-400">Chart shows demo data. Connect PostgreSQL for real analytics.</p>
        </div>

        {/* Quick links */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: 'Manage Users', desc: 'View and manage all registered learners', href: '/admin/users', icon: '👥' },
            { title: 'Manage Courses', desc: 'Edit, publish, or archive courses', href: '/admin/courses', icon: '📚' },
            { title: 'Leaderboard', desc: 'See top performing students', href: '/leaderboard', icon: '🏆' },
          ].map(l => (
            <Link key={l.title} href={l.href} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition space-y-2">
              <div className="text-2xl">{l.icon}</div>
              <p className="font-bold text-gray-900">{l.title}</p>
              <p className="text-xs text-gray-500">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
