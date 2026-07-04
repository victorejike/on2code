import Link from 'next/link';

type CourseCard = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
};

async function getCourses(): Promise<CourseCard[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, { cache: 'no-store' });
    if (!response.ok) return [];
    const data = await response.json();
    return data.courses || [];
  } catch {
    return [];
  }
}

const COLORS = ['bg-[#a51c30]', 'bg-[#0077cc]', 'bg-[#1a7f5a]', 'bg-[#7c3aed]', 'bg-[#b45309]'];
const FILTERS = ['All', 'Computer Science', 'Web Development', 'Data Science', 'Cloud'];

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div>
      {/* Page header */}
      <section className="bg-[#003d6b] text-white px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-extrabold">Browse On2Code Courses</h1>
          <p className="mt-2 text-blue-200 text-sm max-w-xl">
            Explore structured programs built for developers who want to build products, validate skills, and earn proof of completion.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="border-b border-gray-200 bg-white px-6 sticky top-[57px] z-40">
        <div className="mx-auto max-w-7xl flex gap-1 overflow-x-auto">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition ${
                i === 0
                  ? 'border-[#0077cc] text-[#0077cc]'
                  : 'border-transparent text-gray-600 hover:text-[#0077cc]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Course grid */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">{courses.length || 3} results</p>
            <select className="text-sm border border-gray-300 rounded px-3 py-1.5 text-gray-700 outline-none focus:border-[#0077cc]">
              <option>Most popular</option>
              <option>Newest</option>
              <option>A–Z</option>
            </select>
          </div>

          {courses.length === 0 ? (
            /* Fallback demo cards when backend is offline */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[
                { title: 'CS50x: Introduction to Computer Science', subtitle: 'Harvard\'s intro to CS — adapted for On2Code learners.', slug: 'cs50x-2021', color: 'bg-[#a51c30]' },
                { title: 'Full-Stack Web Development', subtitle: 'Build modern web apps with React, Node.js, and PostgreSQL.', slug: 'cs50x-2021', color: 'bg-[#0077cc]' },
                { title: 'Cloud Engineering with AWS', subtitle: 'Deploy, scale, and monitor applications on AWS.', slug: 'cs50x-2021', color: 'bg-[#1a7f5a]' },
              ].map((c) => (
                <CourseCardUI key={c.title} title={c.title} subtitle={c.subtitle} slug={c.slug} color={c.color} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {courses.map((course, i) => (
                <CourseCardUI
                  key={course.id}
                  title={course.title}
                  subtitle={course.subtitle}
                  slug={course.slug}
                  color={COLORS[i % COLORS.length]}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function CourseCardUI({ title, subtitle, slug, color }: { title: string; subtitle: string; slug: string; color: string }) {
  return (
    <Link href={`/courses/${slug}`} className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
      <div className={`${color} h-32 flex items-center justify-center`}>
        <span className="text-white text-2xl font-extrabold opacity-25 select-none">On2Code</span>
      </div>
      <div className="p-4 flex flex-col flex-1 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="rounded bg-gray-100 px-2 py-0.5 font-medium">Course</span>
          <span>Introductory</span>
        </div>
        <h3 className="font-bold text-gray-900 group-hover:text-[#0077cc] transition text-sm leading-snug flex-1">{title}</h3>
        <p className="text-xs text-gray-500 line-clamp-2">{subtitle}</p>
        <p className="text-xs font-medium text-gray-400 mt-auto">On2Code</p>
      </div>
    </Link>
  );
}
