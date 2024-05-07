import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authTokens = request.cookies.get("authTokens")?.value;

  if (authTokens && request.nextUrl.pathname.startsWith("/login")) {
    const response = NextResponse.redirect(new URL("/", request.url));
    return response;
  }
  if (
    request.nextUrl.pathname.startsWith("/") &&
    !request.nextUrl.pathname.match("/login") &&
    !request.nextUrl.pathname.match("/signup") &&
    !authTokens
  ) {
    // const response = NextResponse.redirect(new URL("/login", request.url));
    console.log('ir a login')
    // response.cookies.delete("authTokens");
    // return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/(.*)", "/login"],
};