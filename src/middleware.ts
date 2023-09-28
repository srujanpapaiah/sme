import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest, response: NextResponse) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token && path !== "/") {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/(.*)",
    "/email",
    "/email/(.*)",
    "/login",
    "/signup",
    "/verifyemail",
    "/rules",
    "/rules/(.*)",
    "/tickets/",
    "/tickets/(.*)",
  ],
};
