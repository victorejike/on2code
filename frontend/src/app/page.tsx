import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-start gap-14 px-6 py-16 lg:px-8">
        <section className="space-y-8">
          <p className="inline-flex rounded-full border border-slate-700 bg-slate-900 px-4 py-1 text-sm text-slate-200">
            Launching On2Code
          </p>
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">The next generation coding education platform.</h1>
            <p className="text-xl text-slate-400">
              On2Code combines CS50-style learning, interactive coding, auto-grading, progress tracking, and AI assistance in one platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/courses" className="rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">
                View Courses
              </Link>
              <Link href="/auth/login" className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
                Student sign in
              </Link>
            </div>
          </div>
        </section>
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Student dashboard</p>
            <h2 className="mt-4 text-2xl font-semibold">Track progress, complete lessons, and earn certificates.</h2>
            <p className="mt-3 text-slate-400">A modern study experience for beginners and intermediate learners, with gamified learning paths and custom challenges.</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Instructor tools</p>
            <h2 className="mt-4 text-2xl font-semibold">Build courses, review assignments, and manage learners.</h2>
            <p className="mt-3 text-slate-400">Author structured modules, quizzes, and auto-graded code assignments in a single instructor experience.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
