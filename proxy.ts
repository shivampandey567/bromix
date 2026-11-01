import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/app"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const isProtected = PROTECTED_PATHS.some((p) =>
    request.nextUrl.pathname.startsWith(p)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};