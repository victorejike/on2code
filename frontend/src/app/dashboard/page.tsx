'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
const COLORS = ['bg-[#a51c30]', 'bg-[#0077cc]', 'bg-[#1a7f5a]', 'bg-[#7c3aed]'];

type User = { id: string; name: string; email: string; enrolledCourses?: string[] };
type Progress = { enrolledCourses: string[]; completedModules: number; completedAssignments: number; points: number };
type Course = { id: string; slug: string; title: string; subtitle: string };

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('on2code_token');
    if (!token) { setError('not_logged_in'); setLoading(false); return; }

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${API}/auth/me`, { headers }).then(r => r.ok ? r.json() : null),
      fetch(`${API}/courses`, { headers }).then(r => r.ok ? r.json() : null),
    ]).then(async ([meData, coursesData]) => {
      if (!meData) { setError('not_logged_in'); setLoading(false); return; }
      const u: User = meData.user;
      setUser(u);
      const allCourses: Course[] = coursesData?.courses || [];
      setCourses(allCourses);

      const prog = await fetch(`${API}/users/${u.id}/progress`, { headers }).then(r => r.ok ? r.json() : null);
      if (prog) setProgress(prog);
    }).catch(() => setError('error')).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-3">
        <div className="h-8 w-8 border-2 border-[#0077cc] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-500">Loading your dashboard…</p>
      </div>
    </div>
  );

  if (error === 'not_logged_in') return (
    <div className="flex items-center justify-center min-h-[60vh] px-6">
      <div className="text-center space-y-4 max-w-sm">
        <p className="text-2xl font-extrabold text-gray-900">Sign in to view your dashboard</p>
        <p className="text-gray-500 text-sm">You need to be logged in to access your learning progress.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/auth/login" className="rounded-full bg-[#0077cc] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#005fa3] transition">Sign in</Link>
          <Link href="/auth/register" className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">Register</Link>
        </div>
      </div>
    </div>
  );

  const enrolledIds: string[] = progress?.enrolledCourses || user?.enrolledCourses || [];
  const enrolledCourses = courses.filter(c => enrolledIds.includes(c.id) || enrolledIds.includes(c.slug));

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Welcome back, {user?.name || user?.email}!</h1>
            <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
          </div>
          <Link href="/courses" className="rounded-full bg-[#0077cc] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#005fa3] transition">
            Find more courses
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Courses enrolled', value: enrolledIds.length },
            { label: 'Modules completed', value: progress?.completedModules ?? 0 },
            { label: 'Assignments submitted', value: progress?.completedAssignments ?? 0 },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-3xl font-extrabold text-[#0077cc]">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Enrolled courses */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">My courses</h2>
          {enrolledCourses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center space-y-3">
              <p className="text-gray-500 text-sm">You haven't enrolled in any courses yet.</p>
              <Link href="/courses" className="inline-flex rounded-full bg-[#0077cc] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#005fa3] transition">
                Browse courses
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledCourses.map((course, i) => (
                <div key={course.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className={`${COLORS[i % COLORS.length]} sm:w-48 h-32 sm:h-auto flex items-center justify-center shrink-0`}>
                      <span className="text-white text-xl font-extrabold opacity-20 select-none">On2Code</span>
                    </div>
                    <div className="p-6 flex-1 space-y-3">
                      <div>
                        <p className="text-xs text-gray-400">On2Code</p>
                        <h3 className="font-bold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{course.subtitle}</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>{progress?.completedModules ?? 0} modules completed</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-[#0077cc] h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(100, ((progress?.completedModules ?? 0) / 11) * 100)}%` }} />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Link href={`/courses/${course.slug}/learn`}
                          className="inline-flex rounded-full bg-[#0077cc] px-4 py-2 text-xs font-bold text-white hover:bg-[#005fa3] transition">
                          Resume learning
                        </Link>
                        <Link href={`/courses/${course.slug}`}
                          className="inline-flex rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition">
                          Course details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All available courses if not enrolled in any */}
        {enrolledCourses.length === 0 && courses.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Available courses</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, i) => (
                <Link key={course.id} href={`/courses/${course.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                  <div className={`${COLORS[i % COLORS.length]} h-24 flex items-center justify-center`}>
                    <span className="text-white text-xl font-extrabold opacity-20 select-none">On2Code</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 group-hover:text-[#0077cc] text-sm">{course.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{course.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
