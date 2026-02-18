import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("supervisorId")?.value;
  const { pathname } = request.nextUrl;

  if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/sessions"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const response = NextResponse.next();

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/sessions")) {
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/sessions/:path*", "/login"],
};