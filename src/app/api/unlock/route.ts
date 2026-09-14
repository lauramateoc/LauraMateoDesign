import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  ACCESS_VALUE,
} from "@/lib/access";

const PASSWORD = process.env.SITE_PASSWORD ?? "password";

function isValid(password: unknown) {
  return typeof password === "string" && password === PASSWORD;
}

function grant(response: NextResponse) {
  response.cookies.set(ACCESS_COOKIE, ACCESS_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });
  return response;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => null)) as {
      password?: unknown;
    } | null;

    if (!isValid(body?.password)) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    return grant(NextResponse.json({ ok: true }));
  }

  const form = await request.formData().catch(() => null);
  const password = form?.get("password");
  const next = new URL("/", request.url);

  if (!isValid(password)) {
    next.searchParams.set("locked", "1");
    return NextResponse.redirect(next, { status: 303 });
  }

  return grant(NextResponse.redirect(next, { status: 303 }));
}
