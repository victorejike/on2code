import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Dashboard</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">Your learning progress</h1>
              <p className="mt-4 text-slate-400 max-w-2xl">
                Track your program progress, upcoming lessons, and project milestones in a modern learner dashboard.
              </p>
            </div>
            <Link
              href="/courses"
              className="inline-flex rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              Browse courses
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Current course</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Software Engineering Path</h2>
            <p className="mt-3 text-slate-400">Continue from the module you left off and complete your next project milestone.</p>
            <div className="mt-6 space-y-3 text-slate-300">
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Next module</p>
                <p className="mt-2 font-semibold text-white">Module 3: API development</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Progress</p>
                <p className="mt-2 font-semibold text-white">3 / 11 modules completed</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Upcoming lessons</p>
            <div className="mt-6 space-y-4 text-slate-300">
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="font-semibold text-white">Lecture: API design and security</p>
                <p className="mt-1 text-slate-400">Learn how to build scalable endpoints with authentication.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="font-semibold text-white">Lab: Deploy a backend service</p>
                <p className="mt-1 text-slate-400">Deploy your app to a cloud environment with live monitoring.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Achievements</p>
            <div className="mt-6 space-y-4 text-slate-300">
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="font-semibold text-white">Project milestone</p>
                <p className="mt-1 text-slate-400">Completed your first end-to-end application.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="font-semibold text-white">First submission</p>
                <p className="mt-1 text-slate-400">Submitted your first graded assignment successfully.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
