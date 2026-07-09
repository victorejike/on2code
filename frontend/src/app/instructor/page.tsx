import Link from 'next/link';

export default function InstructorPage() {
  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-2xl bg-gradient-to-br from-[#0077cc] to-[#003d6b] text-white p-10 space-y-4">
          <div className="text-4xl">🎓</div>
          <h1 className="text-3xl font-extrabold">Instructor Portal</h1>
          <p className="text-blue-100 max-w-xl">
            Create and manage courses, track student progress, review submissions, and build the next generation of engineers.
          </p>
          <Link href="/instructor/courses"
            className="inline-flex rounded-full bg-white text-[#0077cc] font-bold px-6 py-3 text-sm hover:bg-gray-100 transition">
            Manage my courses →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: '📚', title: 'My Courses', desc: 'Create, edit, and publish your courses', href: '/instructor/courses' },
            { icon: '👥', title: 'Students', desc: 'View enrolled students and their progress', href: '/admin/users' },
            { icon: '📊', title: 'Analytics', desc: 'Track engagement and completion rates', href: '/admin/analytics' },
            { icon: '📝', title: 'Assignments', desc: 'Review student submissions and grades', href: '/admin/courses' },
            { icon: '🏆', title: 'Leaderboard', desc: 'See top performing students', href: '/leaderboard' },
            { icon: '⚙️', title: 'Settings', desc: 'Manage your instructor profile', href: '/profile' },
          ].map(item => (
            <Link key={item.title} href={item.href}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition space-y-2">
              <div className="text-2xl">{item.icon}</div>
              <p className="font-bold text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
