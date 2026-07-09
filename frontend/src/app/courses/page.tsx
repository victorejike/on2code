'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

type Course = { id: string; slug: string; title: string; subtitle: string; description: string; level?: string };

const COLORS = ['bg-[#a51c30]', 'bg-[#0077cc]', 'bg-[#1a7f5a]', 'bg-[#7c3aed]', 'bg-[#b45309]'];
const FILTERS = ['All', 'Computer Science', 'Web Development', 'Data Science', 'Cloud'];
const SORT_OPTIONS = ['Most popular', 'Newest', 'A–Z'];

const FALLBACK: Course[] = [
  { id: '1', slug: 'cs50x-2021', title: 'CS50x: Introduction to Computer Science', subtitle: "Harvard's intro to CS — adapted for On2Code learners.", description: '', level: 'BEGINNER' },
  { id: '2', slug: 'cs50x-2021', title: 'Full-Stack Web Development', subtitle: 'Build modern web apps with React, Node.js, and PostgreSQL.', description: '', level: 'INTERMEDIATE' },
  { id: '3', slug: 'cs50x-2021', title: 'Cloud Engineering with AWS', subtitle: 'Deploy, scale, and monitor applications on AWS.', description: '', level: 'ADVANCED' },
];

function CoursesContent() {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sort, setSort] = useState('Most popular');

  useEffect(() => {
    fetch(`${API}/courses`, { cache: 'no-store' } as RequestInit)
      .then(r => r.ok ? r.json() : null)
      .then(d => setCourses(d?.courses?.length ? d.courses : FALLBACK))
      .catch(() => setCourses(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...courses];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
      );
    }
    if (activeFilter !== 'All') {
      const kw = activeFilter.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(kw) ||
        c.subtitle?.toLowerCase().includes(kw)
      );
    }
    if (sort === 'A–Z') list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [courses, query, activeFilter, sort]);

  return (
    <div>
      {/* Page header */}
      <section className="bg-[#003d6b] text-white px-6 py-12">
        <div className="mx-auto max-w-7xl space-y-4">
          <h1 className="text-3xl font-extrabold">Browse On2Code Courses</h1>
          <p className="text-blue-200 text-sm max-w-xl">
            Explore structured programs built for developers who want to build products, validate skills, and earn proof of completion.
          </p>
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search courses…"
              className="w-full rounded-xl bg-white/10 border border-white/20 pl-10 pr-10 py-3 text-sm text-white placeholder-white/50 outline-none focus:bg-white/20 focus:border-white/40 transition"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-xl leading-none">×</button>
            )}
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="border-b border-gray-200 bg-white px-6 sticky top-[57px] z-40">
        <div className="mx-auto max-w-7xl flex gap-1 overflow-x-auto scrollbar-hide">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                activeFilter === f
                  ? 'border-[#0077cc] text-[#0077cc]'
                  : 'border-transparent text-gray-600 hover:text-[#0077cc]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Course grid */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <p className="text-sm text-gray-500">
              {loading ? 'Loading…' : `${filtered.length} result${filtered.length !== 1 ? 's' : ''}${query ? ` for "${query}"` : ''}`}
            </p>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1.5 text-gray-700 outline-none focus:border-[#0077cc]"
            >
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                  <div className="h-32 bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-14 text-center space-y-3">
              <p className="text-2xl">🔍</p>
              <p className="font-semibold text-gray-700">No courses found</p>
              <p className="text-sm text-gray-400">Try a different search term or filter.</p>
              <button onClick={() => { setQuery(''); setActiveFilter('All'); }} className="text-sm text-[#0077cc] hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((course, i) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
                >
                  <div className={`${COLORS[i % COLORS.length]} h-32 flex items-center justify-center`}>
                    <span className="text-white text-2xl font-extrabold opacity-25 select-none">On2Code</span>
                  </div>
                  <div className="p-4 flex flex-col flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="rounded bg-gray-100 px-2 py-0.5 font-medium">Course</span>
                      <span>{course.level || 'Introductory'}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[#0077cc] transition text-sm leading-snug flex-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{course.subtitle}</p>
                    <p className="text-xs font-medium text-gray-400 mt-auto">On2Code</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 border-2 border-[#0077cc] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CoursesContent />
    </Suspense>
  );
}
