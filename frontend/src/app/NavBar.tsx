'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
type Course = { id: string; slug: string; title: string; subtitle: string };

type NavItem = { label: string; href: string };

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [results, setResults] = useState<Course[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const searchRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { label: 'Courses', href: '/courses' },
    ...(user?.hasActiveSubscription ? [{ label: 'Curriculum', href: '/curriculum' }] : []),
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Leaderboard', href: '/leaderboard' },
  ];

  const mobileItems: NavItem[] = [
    { label: 'Courses', href: '/courses' },
    ...(user?.hasActiveSubscription ? [{ label: 'Curriculum', href: '/curriculum' }] : []),
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Admin', href: '/admin' },
  ];

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark') || 
                   (localStorage.getItem('on2code_theme') === 'dark') ||
                   (!localStorage.getItem('on2code_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setTheme(isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('on2code_theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  useEffect(() => { setMobileOpen(false); setUserMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  useEffect(() => {
    fetch(`${API}/courses`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.courses) setCourses(d.courses); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) { setResults([]); setShowResults(false); return; }
    setResults(courses.filter(c =>
      c.title.toLowerCase().includes(q) || c.subtitle?.toLowerCase().includes(q)
    ));
    setShowResults(true);
  }, [query, courses]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowResults(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/courses?q=${encodeURIComponent(query.trim())}`);
      setShowResults(false);
      setQuery('');
    }
  };

  const handleLogout = () => {
    logout();
  };

  const isLearn = pathname?.includes('/learn');

  return (
    <header
      className={`sticky top-0 z-50 shrink-0 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-black/8 dark:border-white/8 shadow-sm'
          : 'bg-white/60 dark:bg-[#0a0a0f]/60 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="h-7 w-7 rounded-lg bg-[#0077cc] flex items-center justify-center shadow-sm group-hover:shadow-[#0077cc]/40 group-hover:shadow-md transition-shadow">
            <span className="text-white text-xs font-black">O2</span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">On2Code</span>
        </Link>

        {/* Search */}
        {!isLearn && (
          <div ref={searchRef} className="flex-1 max-w-md mx-4 hidden sm:block relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onFocus={() => results.length > 0 && setShowResults(true)}
                  placeholder="Search courses…"
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100/80 dark:bg-white/5 py-2 pl-9 pr-4 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-[#0077cc]/50 focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-[#0077cc]/15 transition-all"
                />
              </div>
            </form>
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 glass rounded-xl z-50 max-h-64 overflow-y-auto">
                {results.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-gray-400">No results for "{query}"</p>
                ) : results.map(c => (
                  <Link key={c.id} href={`/courses/${c.slug}`}
                    onClick={() => { setShowResults(false); setQuery(''); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#0077cc]/5 transition border-b border-black/5 dark:border-white/5 last:border-0">
                    <div className="h-8 w-8 rounded-lg bg-[#0077cc]/10 flex items-center justify-center shrink-0">
                      <svg className="h-4 w-4 text-[#0077cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{c.title}</p>
                      <p className="text-xs text-gray-400 truncate">{c.subtitle}</p>
                    </div>
                  </Link>
                ))}
                <Link href={`/courses?q=${encodeURIComponent(query)}`}
                  onClick={() => { setShowResults(false); setQuery(''); }}
                  className="block px-4 py-2.5 text-xs font-semibold text-[#0077cc] hover:bg-[#0077cc]/5 border-t border-black/5 dark:border-white/5 transition">
                  See all results →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium ml-auto">
          {navItems.map(({ label, href }) => (
            <Link key={href} href={href}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname === href
                  ? 'bg-[#0077cc]/10 text-[#0077cc] dark:bg-[#0077cc]/20'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/4 hover:text-gray-900 dark:hover:text-gray-100'
              }`}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="ml-auto lg:ml-3 flex items-center gap-2 shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(o => !o)}
                className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-2.5 py-1.5 hover:bg-gray-50 dark:hover:bg-white/4 transition shadow-sm"
              >
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-[#0077cc] to-[#005fa3] flex items-center justify-center text-white text-xs font-bold">
                  {(user.name || user.email)[0].toUpperCase()}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[90px] truncate">
                  {user.name || user.email}
                </span>
                <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 glass rounded-xl z-50 py-1 overflow-hidden">
                  <Link href="/dashboard" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#0077cc]/8 transition">Dashboard</Link>
                  <Link href="/profile" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#0077cc]/8 transition">Profile</Link>
                  <Link href="/certificates" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#0077cc]/8 transition">Certificates</Link>
                  <div className="border-t border-black/8 dark:border-white/8 mt-1 pt-1">
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition">
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="hidden sm:inline-flex text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/4 transition">
                Sign in
              </Link>
              <Link href="/auth/register" className="inline-flex rounded-xl bg-[#0077cc] px-4 py-2 text-sm font-semibold text-white hover:bg-[#005fa3] transition shadow-sm shadow-[#0077cc]/25">
                Get started
              </Link>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/4 transition shadow-sm text-gray-600 dark:text-gray-300"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden ml-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/4 transition"
            aria-label="Menu"
          >
            <svg className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-black/8 dark:border-white/8 bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-xl px-4 py-4 space-y-1">
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search courses…"
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#0077cc]/50 dark:text-gray-200"
              />
            </div>
          </form>
          {mobileItems.map(({ label, href }) => (
            <Link key={href} href={href} className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/4 transition">{label}</Link>
          ))}
          {user ? (
            <>
              <Link href="/profile" className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/4 transition">Profile</Link>
              <Link href="/certificates" className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/4 transition">Certificates</Link>
              <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition">Sign out</button>
            </>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link href="/auth/login" className="flex-1 text-center rounded-xl border border-gray-200 dark:border-white/10 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/4 transition">Sign in</Link>
              <Link href="/auth/register" className="flex-1 text-center rounded-xl bg-[#0077cc] py-2.5 text-sm font-semibold text-white hover:bg-[#005fa3] transition">Get started</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
