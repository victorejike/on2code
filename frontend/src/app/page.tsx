import Link from 'next/link';

const SUBJECTS = ['Computer Science', 'Data Science', 'Web Development', 'Cloud & DevOps', 'Cybersecurity', 'AI & Machine Learning'];
const COLORS = ['bg-[#a51c30]', 'bg-[#0077cc]', 'bg-[#1a7f5a]', 'bg-[#7c3aed]', 'bg-[#b45309]'];

type Course = { id: string; slug: string; title: string; subtitle: string; level?: string };

async function getFeaturedCourses(): Promise<Course[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.courses || []).slice(0, 3);
  } catch { return []; }
}

export default async function HomePage() {
  const courses = await getFeaturedCourses();

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0077cc] text-white py-20 px-6">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Learn from the world's best instructors
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Advance your career with On2Code's professional courses, programs, and certifications — built for real-world engineers.
          </p>
          <div className="flex max-w-xl mx-auto mt-4">
            <input type="text" placeholder="What do you want to learn?"
              className="flex-1 rounded-l-full border-0 px-5 py-3 text-gray-900 text-sm outline-none" />
            <button className="rounded-r-full bg-[#003d6b] px-6 py-3 text-sm font-semibold text-white hover:bg-[#002a4d] transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Subject categories */}
      <section className="border-b border-gray-200 bg-white px-6 py-5">
        <div className="mx-auto max-w-7xl flex flex-wrap gap-3">
          {SUBJECTS.map((s) => (
            <Link key={s} href="/courses"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-[#0077cc] hover:text-[#0077cc] transition">
              {s}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured courses — live from API */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured courses</h2>
          {courses.length === 0 ? (
            <p className="text-gray-400 text-sm">Start the backend to see live courses: <code className="bg-gray-100 px-2 py-0.5 rounded">cd backend && go run main.go</code></p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, i) => (
                <Link key={course.id} href={`/courses/${course.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                  <div className={`${COLORS[i % COLORS.length]} h-36 flex items-center justify-center`}>
                    <span className="text-white text-3xl font-extrabold opacity-30 select-none">On2Code</span>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="rounded bg-gray-100 px-2 py-0.5 font-medium">Course</span>
                      <span>{course.level || 'Introductory'}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[#0077cc] transition leading-snug">{course.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{course.subtitle}</p>
                    <p className="text-xs font-medium text-gray-400">On2Code</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-8 text-center">
            <Link href="/courses" className="inline-flex rounded-full border border-[#0077cc] px-6 py-3 text-sm font-semibold text-[#0077cc] hover:bg-[#0077cc] hover:text-white transition">
              Browse all courses
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 border-y border-gray-200 px-6 py-12">
        <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-3 text-center">
          {[{ value: '7,000+', label: 'Learners worldwide' }, { value: '120+', label: 'Hours of content' }, { value: '95%', label: 'Completion rate' }].map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold text-[#0077cc]">{s.value}</p>
              <p className="mt-2 text-sm text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl space-y-5">
          <h2 className="text-3xl font-extrabold text-gray-900">Start learning today</h2>
          <p className="text-gray-600">Join thousands of learners building real skills with On2Code's structured programs.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/auth/register" className="rounded-full bg-[#0077cc] px-6 py-3 text-sm font-semibold text-white hover:bg-[#005fa3] transition">
              Create a free account
            </Link>
            <Link href="/courses" className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-gray-400 transition">
              Explore courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
