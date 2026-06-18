import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-sm text-indigo-200">
              On2Code professional learning paths
            </div>
            <div className="space-y-5">
              <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Launch your software career with real, industry-ready projects.</h1>
              <p className="max-w-2xl text-xl text-slate-400">
                On2Code delivers online programs built for modern engineers, featuring graded lessons, mentor review, and certificate-ready outcomes.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/courses" className="inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">
                Browse programs
              </Link>
              <Link href="/auth/login" className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
                Sign in
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-emerald-300">On2Code</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Career-focused courses for web, backend, and cloud engineering.</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-3xl font-semibold text-white">7,000+</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-400">Learners</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-3xl font-semibold text-white">120+</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-400">Hours of live content</p>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Program highlights</p>
                <ul className="mt-4 space-y-3 text-slate-300">
                  <li>• Project-based learning with real-world technical deliverables</li>
                  <li>• Instant feedback on assignments and progress tracking</li>
                  <li>• Certificate-ready outcomes for resumes and portfolios</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Build real skills</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">Hands-on roadmaps</h3>
            <p className="mt-3 text-slate-400">Complete guided pathways that connect theory to product-ready applications.</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Verified progress</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">Assessments + certificates</h3>
            <p className="mt-3 text-slate-400">Earn credentials through graded assignments, quizzes, and completion milestones.</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Flexible learning</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">Study at your pace</h3>
            <p className="mt-3 text-slate-400">Progress through modules on your own schedule, with support for both self-paced and cohort learning.</p>
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-xl shadow-slate-950/40">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Program snapshot</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">A polished learning experience for developers.</h2>
            </div>
            <Link href="/courses" className="inline-flex rounded-full border border-indigo-500/40 bg-indigo-500/10 px-5 py-3 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/20">
              View programs
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Foundations: Web fundamentals',
              'Backend: APIs and databases',
              'Cloud: deployment and scaling',
              'Team skills: Git, testing, CI/CD'
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
