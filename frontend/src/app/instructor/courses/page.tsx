'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

type Course = { id: string; slug: string; title: string; subtitle: string; level: string; status: string };

function InstructorCoursesContent() {
  const searchParams = useSearchParams();
  const editSlug = searchParams.get('edit');

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(!!editSlug);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [form, setForm] = useState({ title: '', subtitle: '', description: '', level: 'BEGINNER' });

  useEffect(() => {
    fetch(`${API}/courses`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.courses) setCourses(d.courses); })
      .finally(() => setLoading(false));
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { setMsg('Title is required.'); return; }
    setSaving(true); setMsg('');
    // Course creation is Phase 1 (needs DB) — simulate success
    setTimeout(() => {
      setMsg('✅ Course saved! (Database integration required to persist)');
      setSaving(false);
      setShowForm(false);
      setForm({ title: '', subtitle: '', description: '', level: 'BEGINNER' });
    }, 800);
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="h-8 w-8 border-2 border-[#0077cc] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Link href="/admin" className="hover:text-[#0077cc]">Admin</Link>
              <span>/</span><span>Instructor</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Instructor Portal</h1>
          </div>
          <button
            onClick={() => { setShowForm(o => !o); setMsg(''); }}
            className="rounded-full bg-[#0077cc] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#005fa3] transition"
          >
            {showForm ? '✕ Cancel' : '+ New Course'}
          </button>
        </div>

        {/* Create course form */}
        {showForm && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <h2 className="font-bold text-gray-900">Create new course</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Course title *</label>
                  <input type="text" value={form.title} onChange={set('title')} placeholder="e.g. Introduction to Python"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/20" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Level</label>
                  <select value={form.level} onChange={set('level')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#0077cc]">
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subtitle</label>
                <input type="text" value={form.subtitle} onChange={set('subtitle')} placeholder="Short description shown on course cards"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/20" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={set('description')} rows={4} placeholder="Full course description…"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/20 resize-none" />
              </div>
              {msg && <p className={`text-sm ${msg.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}
              <div className="flex gap-3">
                <button type="submit" disabled={saving}
                  className="rounded-full bg-[#0077cc] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#005fa3] transition disabled:opacity-60">
                  {saving ? 'Saving…' : 'Save course'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing courses */}
        <div className="space-y-3">
          <h2 className="font-bold text-gray-900">Your courses ({courses.length})</h2>
          {courses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-400 text-sm">
              No courses yet. Create your first course above.
            </div>
          ) : (
            <div className="space-y-3">
              {courses.map(c => (
                <div key={c.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-gray-900">{c.title}</p>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        c.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                        c.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                      }`}>{c.status || 'DRAFT'}</span>
                      <span className="text-xs text-gray-400 capitalize">{c.level?.toLowerCase()}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 truncate">{c.subtitle}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link href={`/courses/${c.slug}`}
                      className="rounded-full border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition">
                      Preview
                    </Link>
                    <Link href={`/courses/${c.slug}/learn`}
                      className="rounded-full bg-[#0077cc] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#005fa3] transition">
                      Manage
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InstructorCoursesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="h-8 w-8 border-2 border-[#0077cc] border-t-transparent rounded-full animate-spin" /></div>}>
      <InstructorCoursesContent />
    </Suspense>
  );
}
