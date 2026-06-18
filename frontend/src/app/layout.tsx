import '../globals.css';

export const metadata = {
  title: 'On2Code | Professional online learning',
  description: 'On2Code offers career-ready online courses, bootcamps, and certifications for software engineers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <div className="min-h-screen">
          <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
              <div className="flex items-center gap-4">
                <a href="/" className="text-lg font-semibold text-white hover:text-indigo-300">
                  On2Code
                </a>
                <span className="hidden text-xs uppercase tracking-[0.32em] text-slate-500 sm:inline-block">Professional learning platform</span>
              </div>
              <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <a href="/courses" className="transition hover:text-white">
                  Programs
                </a>
                <a href="/courses" className="transition hover:text-white">
                  Bootcamps
                </a>
                <a href="/dashboard" className="transition hover:text-white">
                  Enterprise
                </a>
                <a href="/auth/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-800">
                  Sign in
                </a>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
