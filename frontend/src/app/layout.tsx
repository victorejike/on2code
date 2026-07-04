import '../globals.css';

export const metadata = {
  title: 'On2Code | Professional online learning',
  description: 'On2Code offers career-ready online courses, bootcamps, and certifications for software engineers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col">
          {/* Top nav */}
          <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shrink-0">
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3 lg:px-8">
              <a href="/" className="flex items-center gap-2 shrink-0">
                <span className="text-2xl font-extrabold text-[#0077cc]">On2Code</span>
              </a>
              <div className="flex-1 max-w-xl mx-4 hidden sm:block">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                  <input type="text" placeholder="What do you want to learn?" className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-[#0077cc] focus:ring-2 focus:ring-[#0077cc]/20" />
                </div>
              </div>
              <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
                <a href="/courses" className="hover:text-[#0077cc] transition">Courses</a>
                <a href="/courses" className="hover:text-[#0077cc] transition">Programs</a>
                <a href="/dashboard" className="hover:text-[#0077cc] transition">Dashboard</a>
              </nav>
              <div className="ml-auto flex items-center gap-3 shrink-0">
                <a href="/auth/login" className="hidden sm:inline-flex text-sm font-semibold text-[#0077cc] hover:underline">Sign In</a>
                <a href="/auth/register" className="inline-flex rounded-full bg-[#0077cc] px-4 py-2 text-sm font-semibold text-white hover:bg-[#005fa3] transition">Register</a>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-hidden">{children}</main>

          {/* Footer — hidden on /learn pages via CSS */}
          <footer className="border-t border-gray-200 bg-gray-50 learn-hide">
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm text-gray-600">
                <div>
                  <p className="font-bold text-gray-900 mb-3">On2Code</p>
                  <p>Career-focused online learning for software engineers.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-3">Learn</p>
                  <ul className="space-y-2">
                    <li><a href="/courses" className="hover:text-[#0077cc]">All Courses</a></li>
                    <li><a href="/courses" className="hover:text-[#0077cc]">Programs</a></li>
                    <li><a href="/courses" className="hover:text-[#0077cc]">Bootcamps</a></li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-3">Account</p>
                  <ul className="space-y-2">
                    <li><a href="/auth/login" className="hover:text-[#0077cc]">Sign In</a></li>
                    <li><a href="/auth/login" className="hover:text-[#0077cc]">Register</a></li>
                    <li><a href="/dashboard" className="hover:text-[#0077cc]">Dashboard</a></li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-3">Support</p>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-[#0077cc]">Help Center</a></li>
                    <li><a href="#" className="hover:text-[#0077cc]">Contact Us</a></li>
                    <li><a href="#" className="hover:text-[#0077cc]">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
              <p className="mt-8 text-xs text-gray-400">© {new Date().getFullYear()} On2Code. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
