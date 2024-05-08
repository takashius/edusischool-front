import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authTokens = request.cookies.get("authToken")?.value;

  if (authTokens && request.nextUrl.pathname.startsWith("/login")) {
    const response = NextResponse.redirect(new URL("/", request.url));
    return response;
  } else if (!authTokens && (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup"))) {
  } else if (
    request.nextUrl.pathname.startsWith("/") &&
    !authTokens
  ) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("authTokens");
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
    {
      source: '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
      has: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
    {
      source: '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    }, "/login", "/signup"],

};