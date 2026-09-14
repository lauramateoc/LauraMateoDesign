import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE, ACCESS_VALUE } from "@/lib/access";

export function proxy(request: NextRequest) {
  const unlocked =
    request.cookies.get(ACCESS_COOKIE)?.value === ACCESS_VALUE;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/unlock")) {
    return NextResponse.next();
  }

  if (!unlocked) {
    return NextResponse.rewrite(new URL("/gate", request.url));
  }

  if (pathname === "/gate") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|ico)$).*)",
  ],
};
