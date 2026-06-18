import { notFound } from 'next/navigation';

type CourseModule = {
  title: string;
  description: string;
  lessons: string[];
};

const modules: Record<string, CourseModule> = {
  'module-0': {
    title: 'Week 0: Scratch',
    description: 'Visual programming fundamentals with Scratch.',
    lessons: ['Scratch sprites, stories, and interactive games.']
  },
  'module-1': {
    title: 'Week 1: C',
    description: 'Introduction to C, data types, and basic algorithms.',
    lessons: ['Variables, operators, and control flow in C.']
  },
  'module-2': {
    title: 'Week 2: Arrays',
    description: 'Learn arrays, memory layout, and simple searching.',
    lessons: ['Array traversal, linear search, and basic pointer usage.']
  }
};

export default function ModulePage({ params }: { params: { slug: string; moduleId: string } }) {
  const module = modules[params.moduleId];

  if (!module) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-xl shadow-slate-950/40">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Module detail</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">{module.title}</h1>
          <p className="mt-4 text-slate-400">{module.description}</p>
          <div className="mt-8 space-y-6">
            {module.lessons.map((lesson, index) => (
              <div key={index} className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Lesson {index + 1}</p>
                <p className="mt-2 text-lg font-semibold text-white">{lesson}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
