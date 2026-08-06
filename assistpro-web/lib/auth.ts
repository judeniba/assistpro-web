import { cookies } from "next/headers";
import { sessions, users } from "./store";
import type { Session } from "./types";

export const SESSION_COOKIE = "ap_sid";
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000;

export function createSession(userId: string): string {
  const user = users.get(userId);
  if (!user) throw new Error("User not found");
  const token = crypto.randomUUID();
  sessions.set(token, {
    userId,
    role: user.role,
    name: user.name,
    email: user.email,
    expiresAt: Date.now() + SESSION_TTL,
  });
  return token;
}

export function getDefaultRedirect(role: Session["role"]): string {
  if (role === "admin") return "/admin";
  if (role === "provider") return "/dashboard/provider";
  return "/dashboard";
}

export function deleteSession(token: string) {
  sessions.delete(token);
}

export async function getCurrentSession(): Promise<Session | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return session;
}
