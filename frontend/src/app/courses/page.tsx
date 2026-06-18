import Link from 'next/link';

type CourseCard = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
};

async function getCourses(): Promise<CourseCard[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, { cache: 'no-store' });
  if (!response.ok) {
    return [];
  }
  const data = await response.json();
  return data.courses || [];
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Programs</p>
          <h1 className="text-4xl font-semibold">Explore On2Code courses and learning paths.</h1>
          <p className="max-w-2xl text-slate-400">Choose from structured programs built for developers who want to build products, validate skills, and earn proof of completion.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.8fr_0.4fr]">
          <div className="grid gap-6 lg:grid-cols-2">
            {courses.length === 0 ? (
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-slate-400">
                Unable to load courses at the moment. Please ensure the backend is running.
              </div>
            ) : (
              courses.map((course) => (
                <article key={course.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-indigo-200">Featured</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">{course.title}</h2>
                  <p className="mt-3 text-slate-400">{course.subtitle}</p>
                  <p className="mt-4 text-slate-400">{course.description}</p>
                  <Link href={`/courses/${course.slug}`} className="mt-6 inline-flex rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">
                    View course
                  </Link>
                </article>
              ))
            )}
          </div>

          <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Why choose On2Code?</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Learn with confidence, practice with purpose, and prove your progress.</h2>
            <ul className="mt-6 space-y-4 text-slate-300">
              <li>• Hands-on projects for every major concept</li>
              <li>• Graded assignments with instant feedback</li>
              <li>• Practical skills in web, backend, and deployment</li>
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}
