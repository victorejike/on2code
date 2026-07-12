'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const MODULES = [
  { title: 'Module 1: Foundations of Backend Engineering', href: '/curriculum/module-01-foundations' },
  { title: 'Module 2: Go Fundamentals and Core Programming', href: '/curriculum/module-02-go-fundamentals' },
  { title: 'Module 3: Data, Testing, and Persistence', href: '/curriculum/module-03-data-testing-and-persistence' },
  { title: 'Module 4: Databases and HTTP APIs', href: '/curriculum/module-04-databases-and-http-apis' },
  { title: 'Module 5: Advanced Backend Architecture and Scaling', href: '/curriculum/module-05-advanced-backend-architecture-and-scaling' },
  { title: 'Module 6: Production Backend Engineering and Professional Practices', href: '/curriculum/module-06-production-backend-engineering-and-professional-practices' },
  { title: 'Module 7: Capstone Project and Engineering Showcase', href: '/curriculum/module-07-capstone-project-and-engineering-showcase' },
];

export default function CurriculumPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-[#0077cc] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Subscribers only</h1>
        <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
          Access to the On2Code backend curriculum requires an active subscription. Please sign in or subscribe to continue.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/auth/login" className="rounded-full bg-[#0077cc] px-6 py-3 text-sm font-semibold text-white hover:bg-[#005fa3] transition">
            Sign in
          </Link>
          <Link href="/courses" className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition">
            Learn about plans
          </Link>
        </div>
      </div>
    );
  }

  if (!user.hasActiveSubscription) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Subscription required</h1>
        <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
          Your account must have an active subscription to access the backend curriculum. Renew or upgrade your subscription to continue.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/courses" className="rounded-full bg-[#0077cc] px-6 py-3 text-sm font-semibold text-white hover:bg-[#005fa3] transition">
            View subscription plans
          </Link>
          <Link href="/profile" className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition">
            Account settings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#08080f] shadow-sm p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#0077cc]">Curriculum</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Backend Engineering Curriculum</h1>
          <p className="mt-6 text-base leading-8 text-gray-600 dark:text-gray-300">
            As an active subscriber, you can access the full backend curriculum, including Go fundamentals, architecture, testing, deployment, production practices, and the capstone project.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {MODULES.map((module) => (
            <div key={module.title} className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{module.title}</h2>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                Access the lessons, labs, and assignments for this module as part of your active subscription.
              </p>
              <Link href={module.href} className="mt-4 inline-flex text-sm font-semibold text-[#0077cc] hover:text-[#005fa3]">
                View course details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
