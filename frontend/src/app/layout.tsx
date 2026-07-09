import type { Metadata } from 'next';
import '../globals.css';
import NavBar from './NavBar';
import ThemeProvider from './ThemeProvider';
import CookieBanner from './CookieBanner';

export const metadata: Metadata = {
  title: 'On2Code | Professional online learning',
  description: 'On2Code offers career-ready online courses, bootcamps, and certifications for software engineers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-[#0a0a0f] text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300">
        <ThemeProvider />
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0d0d14]">
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-3">On2Code</p>
                  <p>Career-focused online learning for software engineers.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-3">Learn</p>
                  <ul className="space-y-2">
                    <li><a href="/courses" className="hover:text-[#0077cc] transition">All Courses</a></li>
                    <li><a href="/leaderboard" className="hover:text-[#0077cc] transition">Leaderboard</a></li>
                    <li><a href="/certificates" className="hover:text-[#0077cc] transition">Certificates</a></li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-3">Account</p>
                  <ul className="space-y-2">
                    <li><a href="/auth/login" className="hover:text-[#0077cc] transition">Sign In</a></li>
                    <li><a href="/auth/register" className="hover:text-[#0077cc] transition">Register</a></li>
                    <li><a href="/dashboard" className="hover:text-[#0077cc] transition">Dashboard</a></li>
                    <li><a href="/profile" className="hover:text-[#0077cc] transition">Profile</a></li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-3">Support</p>
                  <ul className="space-y-2">
                    <li><a href="/auth/forgot-password" className="hover:text-[#0077cc] transition">Reset Password</a></li>
                    <li><a href="#" className="hover:text-[#0077cc] transition">Help Center</a></li>
                    <li><a href="#" className="hover:text-[#0077cc] transition">Contact Us</a></li>
                    <li><a href="#" className="hover:text-[#0077cc] transition">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
              <p className="mt-8 text-xs text-gray-400">© {new Date().getFullYear()} On2Code. All rights reserved.</p>
            </div>
          </footer>
        </div>
        <CookieBanner />
      </body>
    </html>
  );
}
