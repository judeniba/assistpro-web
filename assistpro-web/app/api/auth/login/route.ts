import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { users, verifyPassword } from "@/lib/store";
import { createSession, getDefaultRedirect, SESSION_COOKIE } from "@/lib/auth";
import { fetchStrapi, isStrapiEnabled, normalizeStrapiUser } from "@/lib/strapi";
import type { Role } from "@/lib/types";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, password } = body;
  if (!email?.trim() || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (isStrapiEnabled()) {
    try {
      const payload = await fetchStrapi<{ data: Array<{ id: number; attributes: { email: string; name?: string; username?: string; password?: string; role?: Role; createdAt?: string } }> }>(`/api/auth/local?identifier=${encodeURIComponent(normalizedEmail)}&password=${encodeURIComponent(password)}`);
      const user = normalizeStrapiUser((payload.data[0] as { id: number; attributes: { email: string; name?: string; username?: string; password?: string; role?: Role; createdAt?: string } }));
      const token = createSession(user.id);
      const jar = await cookies();
      jar.set(SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
        secure: process.env.NODE_ENV === "production",
      });
      return NextResponse.json({
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        redirectTo: getDefaultRedirect(user.role),
      });
    } catch {
      // Fall back to the local store if Strapi auth is not available.
    }
  }

  const user = Array.from(users.values()).find(
    (u) => u.email === normalizedEmail
  );
  // Same error for missing user or wrong password — prevents user enumeration
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createSession(user.id);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    redirectTo: getDefaultRedirect(user.role),
  });
}
