import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ user: null });
  return NextResponse.json({
    user: {
      userId: session.userId,
      name: session.name,
      email: session.email,
      role: session.role,
    },
  });
}
