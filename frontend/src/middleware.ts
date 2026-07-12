import { NextRequest, NextResponse } from 'next/server';

// Routes that require authentication
const PROTECTED_PREFIXES = [
  '/dashboard',
  '/profile',
  '/admin',
  '/instructor',
  '/curriculum',
];

// Routes that should redirect logged-in users away (e.g. login page)
const AUTH_ONLY_PATHS = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('on2code_token')?.value;

  const isProtected = PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix));
  const isAuthPage = AUTH_ONLY_PATHS.some(p => pathname.startsWith(p));

  // Bypass redirects during build-time static pre-rendering
  const ua = request.headers.get('user-agent') || '';
  const isPrerender = ua.includes('Next.js') || 
                      ua.includes('Prerender') || 
                      request.headers.has('x-prerender-revalidate') ||
                      request.headers.has('x-nextjs-prerender');

  if (isPrerender) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access protected routes
  if (isProtected && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Optional: redirect already logged-in users away from login/register
  // (Uncomment if desired)
  // if (isAuthPage && token) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all routes except static assets and API routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
