import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-6">
      <div className="text-center space-y-5 max-w-md">
        <p className="text-8xl font-extrabold text-[#0077cc]">404</p>
        <h1 className="text-2xl font-extrabold text-gray-900">Page not found</h1>
        <p className="text-gray-500 text-sm">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="rounded-full bg-[#0077cc] px-6 py-3 text-sm font-bold text-white hover:bg-[#005fa3] transition">
            Go home
          </Link>
          <Link href="/courses" className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            Browse courses
          </Link>
        </div>
      </div>
    </div>
  );
}
