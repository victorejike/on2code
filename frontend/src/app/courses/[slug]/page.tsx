import { notFound } from 'next/navigation';

const courseCatalog = [
  {
    slug: 'cs50-bootcamp',
    title: 'CS50-style Programming Bootcamp',
    description: 'Build your coding foundation with interactive problems, lectures, and projects.',
    modules: 12,
    duration: '8 weeks'
  }
];

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = courseCatalog.find((item) => item.slug === params.slug);
  if (!course) return notFound();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-xl shadow-slate-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Course</p>
              <h1 className="mt-4 text-4xl font-semibold">{course.title}</h1>
              <p className="mt-4 max-w-2xl text-slate-400">{course.description}</p>
            </div>
            <div className="grid gap-4 rounded-3xl bg-slate-950/70 p-6 text-center">
              <div>
                <p className="text-xl font-semibold text-white">{course.modules}</p>
                <p className="text-sm text-slate-400">Modules</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-white">{course.duration}</p>
                <p className="text-sm text-slate-400">Program length</p>
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
      </div>
    </main>
  );
}
