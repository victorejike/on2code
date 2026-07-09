'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
const COLORS = ['bg-[#a51c30]', 'bg-[#0077cc]', 'bg-[#1a7f5a]', 'bg-[#7c3aed]'];

type User = { id: string; name: string; email: string; enrolledCourses?: string[] };
type Progress = { enrolledCourses: string[]; completedModules: number; completedAssignments: number; points: number };
type Course = { id: string; slug: string; title: string; subtitle: string };
type Submission = { id: string; assignmentId: string; score: number; status: string; language: string; createdAt: string };

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('on2code_token');
    if (!token) { setError('not_logged_in'); setLoading(false); return; }
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${API}/auth/me`, { headers }).then(r => r.ok ? r.json() : null),
      fetch(`${API}/courses`).then(r => r.ok ? r.json() : null),
    ]).then(async ([meData, coursesData]) => {
      if (!meData) { setError('not_logged_in'); setLoading(false); return; }
      const u: User = meData.user;
      setUser(u);
      setCourses(coursesData?.courses || []);

      const [prog, subs] = await Promise.all([
        fetch(`${API}/users/${u.id}/progress`, { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${API}/users/${u.id}/submissions`, { headers }).then(r => r.ok ? r.json() : null),
      ]);
      if (prog) setProgress(prog);
      if (subs?.submissions) setSubmissions(subs.submissions.slice(0, 5));
    }).catch(() => setError('error')).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-8 w-8 border-2 border-[#0077cc] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error === 'not_logged_in') return (
    <div className="flex items-center justify-center min-h-[60vh] px-6">
      <div className="text-center space-y-4 max-w-sm">
        <div className="text-5xl">🔒</div>
        <p className="text-2xl font-extrabold text-gray-900">Sign in to continue</p>
        <p className="text-gray-500 text-sm">Access your courses, progress, and certificates.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/auth/login" className="rounded-full bg-[#0077cc] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#005fa3] transition">Sign in</Link>
          <Link href="/auth/register" className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">Register</Link>
        </div>
      </div>
    </div>
  );

  const enrolledIds: string[] = progress?.enrolledCourses || user?.enrolledCourses || [];
  const enrolledCourses = courses.filter(c => enrolledIds.includes(c.id) || enrolledIds.includes(c.slug));
  const points = progress?.points ?? 0;
  const level = points < 100 ? 'Beginner' : points < 300 ? 'Intermediate' : points < 600 ? 'Advanced' : 'Expert';
  const nextLevel = points < 100 ? 100 : points < 300 ? 300 : points < 600 ? 600 : 1000;
  const xpPercent = Math.min(100, Math.round((points / nextLevel) * 100));

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-[calc(100vh-57px)]">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-[#0077cc] flex items-center justify-center text-white text-2xl font-extrabold shrink-0">
              {(user?.name || user?.email || 'U')[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Welcome back, {user?.name?.split(' ')[0] || 'Learner'}!</h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <Link href="/courses" className="rounded-full bg-[#0077cc] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#005fa3] transition">
            + Enroll in a course
          </Link>
        </div>

        {/* XP / Level bar */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="font-bold text-gray-900">{level}</p>
                <p className="text-xs text-gray-400">{points} XP earned</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">{nextLevel - points} XP to next level</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div className="bg-[#0077cc] h-2.5 rounded-full transition-all" style={{ width: `${xpPercent}%` }} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: 'Courses enrolled', value: enrolledIds.length, icon: '📚' },
            { label: 'Modules completed', value: progress?.completedModules ?? 0, icon: '✅' },
            { label: 'Assignments done', value: progress?.completedAssignments ?? 0, icon: '📝' },
            { label: 'XP points', value: points, icon: '⭐' },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-3xl font-extrabold text-[#0077cc]">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* My courses */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">My courses</h2>
            {enrolledCourses.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center space-y-3">
                <div className="text-4xl">📚</div>
                <p className="text-gray-500 text-sm">You haven't enrolled in any courses yet.</p>
                <Link href="/courses" className="inline-flex rounded-full bg-[#0077cc] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#005fa3] transition">
                  Browse courses
                </Link>
              </div>
            ) : (
              enrolledCourses.map((course, i) => (
                <div key={course.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className={`${COLORS[i % COLORS.length]} sm:w-40 h-28 sm:h-auto flex items-center justify-center shrink-0`}>
                      <span className="text-white text-lg font-extrabold opacity-20 select-none">On2Code</span>
                    </div>
                    <div className="p-5 flex-1 space-y-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{course.subtitle}</p>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{progress?.completedModules ?? 0} modules completed</span>
                          <span>{Math.min(100, Math.round(((progress?.completedModules ?? 0) / 3) * 100))}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-[#0077cc] h-1.5 rounded-full transition-all"
                            style={{ width: `${Math.min(100, Math.round(((progress?.completedModules ?? 0) / 3) * 100))}%` }} />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/courses/${course.slug}/learn`}
                          className="rounded-full bg-[#0077cc] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#005fa3] transition">
                          Resume →
                        </Link>
                        <Link href={`/courses/${course.slug}`}
                          className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition">
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Available courses when not enrolled */}
            {enrolledCourses.length === 0 && courses.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-gray-900">Available courses</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {courses.map((course, i) => (
                    <Link key={course.id} href={`/courses/${course.slug}`}
                      className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                      <div className={`${COLORS[i % COLORS.length]} h-24 flex items-center justify-center`}>
                        <span className="text-white text-lg font-extrabold opacity-20 select-none">On2Code</span>
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

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Recent submissions */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
              <h2 className="font-bold text-gray-900">Recent submissions</h2>
              {submissions.length === 0 ? (
                <p className="text-sm text-gray-400">No submissions yet. Start a course to submit assignments.</p>
              ) : (
                <div className="space-y-2">
                  {submissions.map(s => (
                    <div key={s.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-700 truncate">{s.assignmentId}</p>
                        <p className="text-xs text-gray-400">{s.language} · {new Date(s.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`shrink-0 ml-2 rounded-full px-2 py-0.5 text-xs font-bold ${
                        s.score >= 90 ? 'bg-green-100 text-green-700' :
                        s.score >= 70 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>{s.score}/100</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-2">
              <h2 className="font-bold text-gray-900 mb-3">Quick links</h2>
              {[
                { label: '🏆 Leaderboard', href: '/leaderboard' },
                { label: '🏅 My Certificates', href: '/certificates' },
                { label: '👤 Edit Profile', href: '/profile' },
                { label: '📚 Browse Courses', href: '/courses' },
              ].map(l => (
                <Link key={l.label} href={l.href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm text-gray-700">
                  <span>{l.label}</span>
                  <span className="text-gray-400">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
