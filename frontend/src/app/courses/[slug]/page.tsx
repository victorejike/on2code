import Link from 'next/link';
import { notFound } from 'next/navigation';

type CourseModule = {
  id: string;
  title: string;
  description: string;
  position: number;
};

type CourseDetail = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  modules: CourseModule[];
};

async function getCourse(slug: string): Promise<CourseDetail | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${slug}`, { cache: 'no-store' });
  if (!response.ok) {
    return null;
  }
  const course = await response.json();
  return course;
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);

  if (!course) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Course</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">{course.title}</h1>
              <p className="mt-4 max-w-2xl text-slate-400">{course.subtitle}</p>
              <p className="mt-4 max-w-2xl text-slate-400">{course.description}</p>
            </div>
            <div className="grid gap-4 rounded-3xl bg-slate-950/70 p-6 text-center">
              <div>
                <p className="text-xl font-semibold text-white">{course.modules.length}</p>
                <p className="text-sm text-slate-400">Modules</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-white">{Math.max(8, course.modules.length * 1.2)} weeks</p>
                <p className="text-sm text-slate-400">Estimated pace</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">
              Enroll now
            </button>
            <button className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
              Preview syllabus
            </button>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
            <h2 className="text-2xl font-semibold text-white">Course curriculum</h2>
            <p className="mt-3 text-slate-400">Study through a guided program with lessons, assignments, and practical modules designed for career-ready outcomes.</p>
            <div className="mt-8 space-y-4">
              {course.modules.map((module) => (
                <div key={module.id} className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Module {module.position}</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{module.title}</h3>
                    </div>
                    <Link
                      href={`/courses/${course.slug}/modules/${module.id}`}
                      className="rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-indigo-400"
                    >
                      View
                    </Link>
                  </div>
                  <p className="mt-3 text-slate-400">{module.description}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Course experience</p>
            <div className="mt-6 space-y-4 text-slate-300">
              <p>• Project-based assessments with instant grading.</p>
              <p>• Practical roadmap for software engineering skills.</p>
              <p>• Progress tracking, submissions, and certificates.</p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
