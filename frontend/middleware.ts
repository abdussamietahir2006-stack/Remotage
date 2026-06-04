import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'remotage_jwt_secret_key_2024'
);

async function verifyTokenEdge(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', req.nextUrl.pathname);

  if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const token = req.cookies.get('token')?.value;
    if (!token || !(await verifyTokenEdge(token))) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};