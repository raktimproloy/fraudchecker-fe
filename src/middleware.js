import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the route is an admin route
  if (pathname.startsWith('/admin')) {
    // Skip middleware for admin login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check if user is authenticated as admin
    const adminToken = request.cookies.get('adminAccessToken')?.value;
    const isAdmin = request.cookies.get('isAdmin')?.value;

    if (!adminToken || isAdmin !== 'true') {
      // Redirect to admin login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
