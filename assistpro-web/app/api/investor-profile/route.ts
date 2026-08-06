import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { users } from "@/lib/store";
import type { InvestorProfile } from "@/lib/types";
import { isStrapiEnabled, getStrapiInvestorApplicationByUserId, upsertStrapiInvestorApplication } from "@/lib/strapi";
import { notifyInvestorSubmission } from "@/lib/notifications";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "client") return NextResponse.json({ error: "Only clients can access investor profiles" }, { status: 403 });

  const user = users.get(session.userId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (isStrapiEnabled()) {
    try {
      const remote = await getStrapiInvestorApplicationByUserId(user.id);
      if (remote) {
        if (JSON.stringify(user.investorProfile ?? null) !== JSON.stringify(remote.investorProfile)) {
          users.set(user.id, {
            ...user,
            investorProfile: remote.investorProfile,
          });
        }
        return NextResponse.json({ investorProfile: remote.investorProfile });
      }
    } catch {
      // Fall back to the local store if Strapi retrieval fails.
    }
  }

  return NextResponse.json({ investorProfile: user.investorProfile ?? null });
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "client") return NextResponse.json({ error: "Only clients can apply for investor access" }, { status: 403 });

  const user = users.get(session.userId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  let body: { country?: string; budget?: string; operatingExperience?: string; notes?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.country?.trim() || !body.budget?.trim() || !body.operatingExperience?.trim()) {
    return NextResponse.json({ error: "Country, budget, and operating experience are required" }, { status: 400 });
  }

  const existing = user.investorProfile;
  const now = new Date().toISOString();
  const investorProfile: InvestorProfile = {
    country: body.country.trim(),
    budget: body.budget.trim(),
    operatingExperience: body.operatingExperience.trim(),
    notes: body.notes?.trim() || undefined,
    status: existing?.status === "approved" ? "approved" : existing?.status === "under-review" ? "under-review" : "submitted",
    appliedAt: existing?.appliedAt ?? now,
    updatedAt: now,
  };

  users.set(user.id, {
    ...user,
    investorProfile,
  });

  if (isStrapiEnabled()) {
    try {
      await upsertStrapiInvestorApplication({
        userId: user.id,
        name: user.name,
        email: user.email,
        investorProfile,
      });
    } catch {
      // Keep local persistence when Strapi sync fails.
    }
  }

  await notifyInvestorSubmission({ name: user.name, email: user.email }, investorProfile, existing ? "updated" : "submitted");

  return NextResponse.json({ investorProfile });
}