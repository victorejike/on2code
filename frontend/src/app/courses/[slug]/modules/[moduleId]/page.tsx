import Link from 'next/link';
import { notFound } from 'next/navigation';

const modules: Record<string, { title: string; description: string; lessons: { title: string; duration: string; type: string }[] }> = {
  'module-0': {
    title: 'Week 0: Scratch',
    description: 'Visual programming fundamentals with Scratch. Build interactive stories, animations, and games.',
    lessons: [
      { title: 'Lecture: Introduction to Scratch', duration: '1h 15m', type: 'Video' },
      { title: 'Lab: Build a Scratch story', duration: '45m', type: 'Lab' },
      { title: 'Problem Set 0', duration: '2h', type: 'Assignment' },
    ],
  },
  'module-1': {
    title: 'Week 1: C',
    description: 'Introduction to C, data types, variables, operators, and basic algorithms.',
    lessons: [
      { title: 'Lecture: C syntax and compilation', duration: '1h 30m', type: 'Video' },
      { title: 'Shorts: Data types, operators, conditionals', duration: '30m', type: 'Video' },
      { title: 'Lab: Hello, World in C', duration: '30m', type: 'Lab' },
      { title: 'Problem Set 1: Mario', duration: '3h', type: 'Assignment' },
    ],
  },
  'module-2': {
    title: 'Week 2: Arrays',
    description: 'Learn arrays, memory layout, strings, and simple searching and sorting algorithms.',
    lessons: [
      { title: 'Lecture: Arrays and memory', duration: '1h 20m', type: 'Video' },
      { title: 'Shorts: Arrays, strings, command-line args', duration: '25m', type: 'Video' },
      { title: 'Lab: Scrabble', duration: '45m', type: 'Lab' },
      { title: 'Problem Set 2: Caesar cipher', duration: '3h', type: 'Assignment' },
    ],
  },
};

const TYPE_COLORS: Record<string, string> = {
  Video: 'bg-blue-100 text-blue-700',
  Lab: 'bg-green-100 text-green-700',
  Assignment: 'bg-orange-100 text-orange-700',
};

export default function ModulePage({ params }: { params: { slug: string; moduleId: string } }) {
  const module = modules[params.moduleId];
  if (!module) return notFound();

  return (
    <div>
      {/* Module header */}
      <section className="bg-[#1a1a1a] text-white px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/courses" className="hover:text-gray-900 dark:hover:text-gray-200 transition">Courses</Link>
            <span>/</span>
            <Link href={`/courses/${params.slug}`} className="hover:text-gray-900 dark:hover:text-gray-200 transition">CS50x</Link>
            <span>/</span>
            <span className="text-gray-300">{module.title}</span>
          </div>
          <h1 className="text-3xl font-extrabold">{module.title}</h1>
          <p className="text-gray-300 max-w-2xl text-sm">{module.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Lesson list */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">Module content</h2>
            <p className="text-sm text-gray-500">{module.lessons.length} items</p>
            <div className="space-y-2 mt-4">
              {module.lessons.map((lesson, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 hover:bg-gray-50 transition cursor-pointer">
                  {/* Icon */}
                  <div className="shrink-0 h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                    {lesson.type === 'Video' ? (
                      <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                    ) : lesson.type === 'Lab' ? (
                      <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    ) : (
                      <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{lesson.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{lesson.duration}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[lesson.type]}`}>
                    {lesson.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900 mb-3">Your progress</p>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-[#0077cc] h-2 rounded-full" style={{ width: '0%' }} />
              </div>
              <p className="text-xs text-gray-500">0 / {module.lessons.length} completed</p>
              <button className="mt-4 w-full rounded-full bg-[#0077cc] py-2.5 text-sm font-bold text-white hover:bg-[#005fa3] transition">
                Start module
              </button>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm text-sm text-gray-600 space-y-2">
              <p className="font-semibold text-gray-900">Module details</p>
              <p>• {module.lessons.length} lessons</p>
              <p>• Graded assignment included</p>
              <p>• Self-paced</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
