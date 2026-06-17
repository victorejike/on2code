import Link from 'next/link';

const courses = [
  {
    id: 'course-1',
    slug: 'cs50-bootcamp',
    title: 'CS50-style Programming Bootcamp',
    description: 'A hands-on curriculum for software delivery, problem solving, and web development.'
  }
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Courses</p>
          <h1 className="text-4xl font-semibold">Learn coding with practical assignments and real-world projects.</h1>
          <p className="max-w-2xl text-slate-400">Start with structured modules, watch lectures, complete exercises, and track progress through a unified student dashboard.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {courses.map((course) => (
            <article key={course.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-indigo-200">Featured</span>
              </div>
              <h2 className="text-2xl font-semibold text-white">{course.title}</h2>
              <p className="mt-4 text-slate-400">{course.description}</p>
              <Link href={`/courses/${course.slug}`} className="mt-6 inline-flex rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">
                Explore course
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
