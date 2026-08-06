import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { users, hashPassword } from "@/lib/store";
import { createSession, getDefaultRedirect, SESSION_COOKIE } from "@/lib/auth";
import { fetchStrapi, isStrapiEnabled, upsertStrapiInvestorApplication } from "@/lib/strapi";
import type { Role } from "@/lib/types";
import { notifyInvestorSubmission } from "@/lib/notifications";

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    investorCountry?: string;
    investorBudget?: string;
    investorOperatingExperience?: string;
    investorNotes?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, password, role = "client", investorCountry, investorBudget, investorOperatingExperience, investorNotes } = body;

  if (!name?.trim() || !email?.trim() || !password) {
    return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }
  if (role !== "client" && role !== "provider") {
    return NextResponse.json({ error: "Role must be client or provider" }, { status: 400 });
  }

  const normalEmail = email.toLowerCase().trim();

  if (isStrapiEnabled()) {
    try {
      await fetchStrapi(`/api/auth/local/register`, {
        method: "POST",
        body: JSON.stringify({
          username: name.trim(),
          email: normalEmail,
          password,
          role,
        }),
      });
    } catch {
      // Fall back to the local store if Strapi registration is not available.
    }
  }

  if (Array.from(users.values()).some((u) => u.email === normalEmail)) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const id = crypto.randomUUID();
  const investorProfile =
    role === "client" && investorCountry?.trim() && investorBudget?.trim() && investorOperatingExperience?.trim()
      ? {
          country: investorCountry.trim(),
          budget: investorBudget.trim(),
          operatingExperience: investorOperatingExperience.trim(),
          notes: investorNotes?.trim() || undefined,
          status: "submitted" as const,
          appliedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      : undefined;

  users.set(id, {
    id,
    name: name.trim(),
    email: normalEmail,
    passwordHash: hashPassword(password),
    role: role as Role,
    createdAt: new Date().toISOString(),
    investorProfile,
  });

  const token = createSession(id);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
    secure: process.env.NODE_ENV === "production",
  });

  if (investorProfile) {
    if (isStrapiEnabled()) {
      try {
        await upsertStrapiInvestorApplication({
          userId: id,
          name: name.trim(),
          email: normalEmail,
          investorProfile,
        });
      } catch {
        // Fall back to the local store copy if Strapi sync fails.
      }
    }

    await notifyInvestorSubmission({ name: name.trim(), email: normalEmail }, investorProfile, "submitted");
  }

  return NextResponse.json(
    { user: { id, name: name.trim(), email: normalEmail, role }, redirectTo: getDefaultRedirect(role as Role) },
    { status: 201 }
  );
}
