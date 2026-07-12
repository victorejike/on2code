import Link from 'next/link';
import {
  BarChart,
  Users,
  BookOpen,
  FileQuestion,
  ClipboardList,
  Settings,
  Bell,
} from 'lucide-react';

const navigation = [
  { name: 'Analytics', href: '/admin', icon: BarChart },
  { name: 'Students & Users', href: '/admin/users', icon: Users },
  { name: 'Course Builder', href: '/admin/courses', icon: BookOpen },
  { name: 'Quizzes', href: '/admin/quizzes', icon: FileQuestion },
  { name: 'Assignments', href: '/admin/assignments', icon: ClipboardList },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-50/50 dark:bg-background">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-white dark:bg-card md:flex">
        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
          <nav className="flex-1 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <item.icon
                  className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-8 space-y-1">
            <Link
              href="/admin/announcements"
              className="group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <Bell className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
              Announcements
            </Link>
            <Link
              href="/admin/settings"
              className="group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <Settings className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
