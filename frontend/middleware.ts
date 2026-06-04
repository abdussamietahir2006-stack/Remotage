import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set('x-pathname', req.nextUrl.pathname);

  // if you have protected /admin routes:
  if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const token = req.cookies.get('token')?.value;
    if (!token || !(await verifyToken(token))) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};