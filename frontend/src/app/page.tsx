'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

type Course = { id: string; slug: string; title: string; subtitle: string; level?: string };

const SLIDES = [
  {
    bg: 'from-[#0c1728] to-[#03101c]',
    tag: 'Go Backend',
    headline: 'Go from beginner to advanced backend engineering',
    sub: 'Build production-grade Go services, APIs, testing, deployment, and reusable backend systems.',
    cta: 'Start the Go course',
    href: '/courses',
    img: '/cs_hero.png',
  },
  {
    bg: 'from-[#071612] to-[#010806]',
    tag: 'Web Development',
    headline: 'Build real products people use',
    sub: 'Full-stack development with React, Node.js, PostgreSQL, and cloud deployment.',
    cta: 'Explore courses',
    href: '/courses',
    img: '/webdev_hero.png',
  },
  {
    bg: 'from-[#120a24] to-[#06030c]',
    tag: 'AI & Machine Learning',
    headline: 'Shape the future with AI',
    sub: 'From Python fundamentals to neural networks — learn AI the right way.',
    cta: 'Get started',
    href: '/courses',
    img: '/ai_hero.png',
  },
  {
    bg: 'from-[#1a0f07] to-[#080402]',
    tag: 'Cloud & DevOps',
    headline: 'Deploy, scale, and ship faster',
    sub: 'AWS, Docker, Kubernetes, and CI/CD pipelines for modern engineering teams.',
    cta: 'View programs',
    href: '/courses',
    img: '/devops_hero.png',
  },
];

const SUBJECTS = ['All', 'Computer Science', 'Web Development', 'Data Science', 'Cloud & DevOps', 'Cybersecurity', 'AI & Machine Learning'];

export default function HomePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Course[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching] = useState(false);

  // Fetch courses once
  useEffect(() => {
    fetch(`${API}/courses`, { cache: 'no-store' } as RequestInit)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.courses) setCourses(d.courses); })
      .catch(() => {});
  }, []);

  // Auto-advance slider
  const next = useCallback(() => setSlide(s => (s + 1) % SLIDES.length), []);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [paused, next]);

  // Search
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) { setResults([]); setShowResults(false); return; }
    setSearching(true);
    const filtered = courses.filter(
      c => c.title.toLowerCase().includes(q) || c.subtitle?.toLowerCase().includes(q)
    );
    setResults(filtered);
    setShowResults(true);
    setSearching(false);
  }, [query, courses]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/courses?q=${encodeURIComponent(query.trim())}`);
      setShowResults(false);
    }
  };

  const goCourse = courses.find((course) =>
    course.title.toLowerCase().includes('go') || course.subtitle?.toLowerCase().includes('go')
  );

  const featuredCourse = goCourse ?? {
    id: 'go-backend-course',
    slug: 'courses',
    title: 'Go Backend Engineering – Beginner to Advanced',
    subtitle: 'Complete the full Go backend course from fundamentals through production-ready architecture and deployment.',
    level: 'Full program',
  };

  const s = SLIDES[slide];

  return (
    <div className="bg-white dark:bg-[#0a0a0f] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* ── HERO SLIDER ── full viewport height */}
      <section
        className={`relative w-full bg-gradient-to-br ${s.bg} transition-all duration-700 overflow-hidden flex items-center`}
        style={{ minHeight: 'calc(100vh - 57px)' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Background grid design */}
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />

        {/* Slide Content */}
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-16 lg:px-8 grid lg:grid-cols-12 gap-12 items-center text-left">
          {/* Left panel: Title, desc, and flex search */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <span className="self-start rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              {s.tag}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
              {s.headline}
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
              {s.sub}
            </p>

            {/* Flex Search bar */}
            <form onSubmit={handleSearch} className="relative w-full max-w-xl group">
              <div className="flex items-center rounded-2xl overflow-hidden shadow-2xl bg-white/95 dark:bg-gray-900/90 border border-white/25 dark:border-white/10 focus-within:border-[#0077cc]/60 focus-within:ring-4 focus-within:ring-[#0077cc]/25 transition-all duration-300 backdrop-blur-md">
                <div className="flex items-center flex-1 px-4 py-3">
                  <svg className="h-5 w-5 text-gray-400 mr-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => results.length > 0 && setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 150)}
                    placeholder="Search courses, topics, skills…"
                    className="w-full text-gray-900 dark:text-white text-sm outline-none bg-transparent placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#0077cc] hover:bg-[#005fa3] active:scale-95 transition-all duration-200 px-6 py-4 text-white font-bold text-sm shrink-0 flex items-center gap-1.5"
                >
                  {searching ? '…' : 'Search'}
                  <span className="text-xs opacity-75">→</span>
                </button>
              </div>

              {/* Dropdown results */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 z-50 max-h-72 overflow-y-auto text-left backdrop-blur-xl">
                  {results.length === 0 ? (
                    <p className="px-5 py-4 text-sm text-gray-400">No courses found for "{query}"</p>
                  ) : (
                    results.map(c => (
                      <Link
                        key={c.id}
                        href={`/courses/${c.slug}`}
                        className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-white/4 transition border-b border-gray-50 dark:border-white/5 last:border-0"
                      >
                        <span className="text-lg">📚</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.title}</p>
                          <p className="text-xs text-gray-400 line-clamp-1">{c.subtitle}</p>
                        </div>
                      </Link>
                    ))
                  )}
                  <Link
                    href={`/courses?q=${encodeURIComponent(query)}`}
                    className="block px-5 py-3 text-xs font-semibold text-[#0077cc] hover:bg-blue-50 dark:hover:bg-white/4 transition border-t border-gray-100 dark:border-white/10"
                  >
                    See all results for "{query}" →
                  </Link>
                </div>
              )}
            </form>
          </div>

          {/* Right panel: Full image visuals resembling video panel */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black/40 group hover:scale-[1.02] hover:shadow-3xl hover:border-white/40 transition-all duration-500">
              <img
                src={s.img}
                alt={s.tag}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 flex items-center justify-center transition-all duration-300">
                <div className="h-16 w-16 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/35 shadow-lg cursor-pointer transform hover:scale-110 active:scale-95 transition-all duration-300">
                  <svg className="h-6 w-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Course Detail Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-2xl flex items-center justify-between border border-white/10 transform translate-y-2 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-300">
                <div className="min-w-0 flex-1 pr-3">
                  <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Preview Lesson</p>
                  <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">{s.headline}</h4>
                </div>
                <Link href={s.href} className="text-xs font-bold bg-white text-[#0077cc] px-4 py-2 rounded-xl shadow-md hover:bg-gray-100 active:scale-95 transition-all duration-200 shrink-0">
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setSlide(i); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
              className={`rounded-full transition-all duration-300 ${i === slide ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'} h-2.5`}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={() => { setSlide(s => (s - 1 + SLIDES.length) % SLIDES.length); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md border border-white/10"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={() => { next(); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md border border-white/10"
          aria-label="Next slide"
        >
          ›
        </button>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white dark:bg-[#0f0f18] border-b border-gray-200 dark:border-white/10 px-6 py-10 transition-colors duration-300">
        <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-3 text-center">
          {[
            { value: '7,000+', label: 'Learners worldwide' },
            { value: '120+', label: 'Hours of content' },
            { value: '95%', label: 'Completion rate' },
          ].map(s => (
            <div key={s.label} className="group p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/4 transition-all duration-300">
              <p className="text-4xl font-extrabold text-[#0077cc] dark:text-[#0088ff] group-hover:scale-105 transition-transform duration-300">{s.value}</p>
              <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      <section className="bg-white dark:bg-[#0a0a0f] px-6 py-14 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured courses</h2>
            <Link href="/courses" className="text-sm font-semibold text-[#0077cc] dark:text-[#0088ff] hover:underline flex items-center gap-1 group">
              Browse all <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          {courses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-white/20 p-10 text-center">
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Start the backend to see live courses:{' '}
                <code className="bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded text-[#0077cc]">cd backend && .\on2code-backend.exe</code>
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.slice(0, 3).map((course, i) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12121e] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className={`${['bg-[#a51c30]', 'bg-[#0077cc]', 'bg-[#1a7f5a]'][i % 3]} h-36 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
                    <span className="text-white text-3xl font-extrabold opacity-30 select-none tracking-wider group-hover:scale-110 transition-transform duration-500">On2Code</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="rounded bg-gray-100 dark:bg-white/5 px-2 py-0.5 font-semibold text-gray-700 dark:text-gray-300">Course</span>
                        <span>{course.level || 'Introductory'}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#0077cc] dark:group-hover:text-[#0088ff] transition leading-snug">{course.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{course.subtitle}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-gray-50 dark:bg-[#0f0f18] border-y border-gray-200 dark:border-white/10 px-6 py-14 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">How On2Code works</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '📚', title: 'Enroll in a course', desc: 'Choose from structured programs built by expert instructors.' },
              { icon: '🎬', title: 'Watch & read', desc: 'Video lectures, notes, and resources — learn at your own pace.' },
              { icon: '💻', title: 'Code in VS Code', desc: 'Write and submit code directly in a browser-based VS Code environment.' },
              { icon: '🏆', title: 'Earn certificates', desc: 'Complete assignments, pass assessments, and get verified certificates.' },
            ].map((step, idx) => (
              <div key={step.title} className="group text-center space-y-3 p-6 rounded-2xl hover:bg-white dark:hover:bg-[#12121e] hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-white/5">
                <div className="text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">{step.icon}</div>
                <p className="font-bold text-gray-900 dark:text-white group-hover:text-[#0077cc] dark:group-hover:text-[#0088ff] transition-colors">{step.title}</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white dark:bg-[#0a0a0f] px-6 py-20 text-center transition-colors duration-300">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Ready to start coding?</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm sm:text-base leading-relaxed">Join thousands of learners building real skills with On2Code's structured programs.</p>
          <div className="flex justify-center gap-4 flex-wrap pt-2">
            {user ? (
              <button
                onClick={logout}
                className="rounded-full bg-[#e11d48] hover:bg-[#be123c] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#e11d48]/20 active:scale-95 transition-all duration-200"
              >
                Logout
              </button>
            ) : (
              <Link href="/auth/register" className="rounded-full bg-[#0077cc] hover:bg-[#005fa3] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0077cc]/20 active:scale-95 transition-all duration-200">
                Create a free account
              </Link>
            )}
            <Link href={user ? '/courses' : '/courses'} className="rounded-full border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 px-8 py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/4 active:scale-95 transition-all duration-200">
              {user ? 'Continue learning' : 'Explore courses'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
