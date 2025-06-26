import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  // Allow public routes
  if (req.nextUrl.pathname.startsWith('/login')) {
    if (token) {
      // Redirect logged in users from login to home
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  // Protect other routes
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/menu-items/:path*', '/orders/:path*', '/reservations/:path*', '/dashboard/:path*', '/'], // paths to protect
};
