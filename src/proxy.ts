import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PATHS = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_PATHS.some((p) => pathname === p);
  const isProtected = !isAuthRoute;

  const accessToken = request.cookies.get("access_token")?.value;
  const isAuthenticated = Boolean(accessToken);

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.(?:png|svg|ico|jpg|jpeg|webp)$).*)",
  ],
};
