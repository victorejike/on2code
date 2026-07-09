import Link from 'next/link';
import { notFound } from 'next/navigation';
import PreviewLink from './PreviewLink';

type CourseModule = { id: string; title: string; description: string; position: number };
type CourseDetail = { id: string; slug: string; title: string; subtitle: string; description: string; modules: CourseModule[] };

const FALLBACK: CourseDetail = {
  id: 'cs50x-2021', slug: 'cs50x-2021',
  title: 'CS50x: Introduction to Computer Science',
  subtitle: "Harvard's introduction to the intellectual enterprises of computer science and the art of programming.",
  description: 'Learn to think algorithmically and solve problems efficiently. Topics include abstraction, algorithms, data structures, encapsulation, resource management, security, software engineering, and web development.',
  modules: [
    { id: 'module-0', title: 'Week 0: Scratch', description: 'Visual programming with Scratch.', position: 0 },
    { id: 'module-1', title: 'Week 1: C', description: 'Introduction to C programming.', position: 1 },
    { id: 'module-2', title: 'Week 2: Arrays', description: 'Arrays, strings, and memory.', position: 2 },
  ],
};

async function getCourse(slug: string): Promise<CourseDetail> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${slug}`, { cache: 'no-store' });
    if (!res.ok) return FALLBACK;
    return res.json();
  } catch { return FALLBACK; }
}

const PRICING = [
  {
    name: 'Free Audit',
    price: '$0',
    period: '',
    color: 'border-gray-200',
    btn: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    features: ['Access to all lectures', 'Community forum', 'No certificate'],
  },
  {
    name: 'Certificate',
    price: '$199',
    period: 'one-time',
    color: 'border-[#0077cc] ring-2 ring-[#0077cc]/20',
    btn: 'bg-[#0077cc] text-white hover:bg-[#005fa3]',
    badge: 'Most popular',
    features: ['Everything in Free', 'Graded assignments', 'Verified certificate', 'Instructor feedback'],
  },
  {
    name: 'Full-Time Bootcamp',
    price: '$499',
    period: 'per month',
    color: 'border-[#a51c30]',
    btn: 'bg-[#a51c30] text-white hover:bg-[#8b1525]',
    features: ['Everything in Certificate', 'Live sessions (Mon–Fri)', 'Career coaching', '1-on-1 mentorship', 'Job placement support'],
  },
];

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);
  if (!course) return notFound();

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1a1a1a] text-white px-6 py-14">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Link href="/courses" className="hover:text-white">Courses</Link>
              <span>/</span>
              <span className="text-gray-300 truncate">{course.title}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{course.title}</h1>
            <p className="text-gray-300 text-base max-w-2xl">{course.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                <span className="ml-1">4.9 · 12,400 learners</span>
              </span>
              <span>·</span>
              <span>{course.modules.length} weeks</span>
              <span>·</span>
              <span>Self-paced + Full-time option</span>
            </div>
            <p className="text-xs text-gray-500">Offered by <span className="text-white font-semibold">On2Code</span></p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={`/courses/${course.slug}/learn`} className="rounded-full bg-[#0077cc] px-6 py-3 text-sm font-bold text-white hover:bg-[#005fa3] transition">
                Start learning free
              </Link>
              <Link href="#pricing" className="rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10 transition">
                View pricing
              </Link>
            </div>
          </div>

          {/* Quick enroll card */}
          <div className="hidden lg:block">
            <div className="rounded-2xl bg-white text-gray-900 shadow-2xl overflow-hidden">
              <div className="bg-[#a51c30] h-36 flex items-center justify-center">
                <span className="text-white text-4xl font-extrabold opacity-20 select-none">On2Code</span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Starting from</p>
                  <p className="text-3xl font-extrabold text-gray-900">Free <span className="text-base font-normal text-gray-400">· or $199 for certificate</span></p>
                </div>
                <Link href={`/courses/${course.slug}/learn`} className="block w-full text-center rounded-full bg-[#0077cc] py-3 text-sm font-bold text-white hover:bg-[#005fa3] transition">
                  Enroll now
                </Link>
                <ul className="text-xs text-gray-500 space-y-1.5 pt-2 border-t border-gray-100">
                  <li>✓ Self-paced or full-time bootcamp</li>
                  <li>✓ Graded assignments + auto-feedback</li>
                  <li>✓ Verified certificate on completion</li>
                  <li>✓ Lifetime access to course materials</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="px-6 py-10 border-b border-gray-200">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">What you'll learn</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-700">
              {['Core programming concepts', 'Data structures & algorithms', 'Web development fundamentals', 'Problem-solving techniques', 'Version control with Git', 'Deploying real applications', 'Writing clean, readable code', 'Debugging and testing'].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <svg className="h-4 w-4 text-[#0077cc] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="px-6 py-10 border-b border-gray-200">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Course curriculum</h2>
            <p className="text-sm text-gray-500 mb-6">{course.modules.length} weeks · Lectures, labs, and problem sets</p>
            <div className="space-y-2">
              {course.modules.map((mod) => (
                <details key={mod.id} className="group rounded-xl border border-gray-200 overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition list-none">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 w-8">W{mod.position}</span>
                      <span className="font-semibold text-gray-900 text-sm">{mod.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <PreviewLink href={`/courses/${course.slug}/modules/${mod.id}`} />
                      <svg className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </summary>
                  <div className="px-5 py-4 text-sm text-gray-600 border-t border-gray-200 space-y-2">
                    <p>{mod.description}</p>
                    <div className="flex gap-4 text-xs text-gray-400 pt-1">
                      <span>📹 1 Lecture</span>
                      <span>🧪 1 Lab</span>
                      <span>📝 1 Problem Set</span>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Requirements sidebar */}
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-3">Requirements</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• No prior programming experience needed</li>
                <li>• A computer with internet access</li>
                <li>• Curiosity and willingness to learn</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-3">This course includes</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>📹 120+ hours of video lectures</li>
                <li>🧪 Hands-on labs every week</li>
                <li>📝 Graded problem sets</li>
                <li>🏆 Verified certificate</li>
                <li>♾️ Lifetime access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-14 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Choose your learning path</h2>
            <p className="mt-2 text-gray-500 text-sm">Start free, upgrade when you're ready.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {PRICING.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl border bg-white p-6 shadow-sm flex flex-col ${plan.color}`}>
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0077cc] px-3 py-1 text-xs font-bold text-white">
                    {plan.badge}
                  </span>
                )}
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">{plan.name}</p>
                <div className="mt-3 mb-1">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-sm text-gray-400 ml-1">/ {plan.period}</span>}
                </div>
                <ul className="mt-4 mb-6 space-y-2 text-sm text-gray-600 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <svg className="h-4 w-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/courses/${course.slug}/learn`} className={`block w-full text-center rounded-full py-3 text-sm font-bold transition ${plan.btn}`}>
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
