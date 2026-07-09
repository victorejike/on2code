import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your On2Code platform</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Users', desc: 'View and manage all registered learners', href: '/admin/users', icon: '👥', color: 'bg-blue-50 border-blue-100' },
            { title: 'Courses', desc: 'Edit, publish, or archive courses', href: '/admin/courses', icon: '📚', color: 'bg-green-50 border-green-100' },
            { title: 'Analytics', desc: 'Platform metrics and submission stats', href: '/admin/analytics', icon: '📊', color: 'bg-purple-50 border-purple-100' },
            { title: 'Leaderboard', desc: 'Top performing students', href: '/leaderboard', icon: '🏆', color: 'bg-yellow-50 border-yellow-100' },
            { title: 'Instructor Portal', desc: 'Create and manage course content', href: '/instructor/courses', icon: '🎓', color: 'bg-orange-50 border-orange-100' },
            { title: 'Certificates', desc: 'View issued certificates', href: '/certificates', icon: '🏅', color: 'bg-red-50 border-red-100' },
          ].map(item => (
            <Link key={item.title} href={item.href}
              className={`rounded-2xl border ${item.color} p-6 hover:shadow-md transition space-y-3`}>
              <div className="text-3xl">{item.icon}</div>
              <div>
                <p className="font-bold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
