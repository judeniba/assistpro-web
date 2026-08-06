import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { users } from "@/lib/store";
import type { InvestorStatus } from "@/lib/types";
import { isStrapiEnabled, updateStrapiInvestorApplicationStatus } from "@/lib/strapi";
import { notifyInvestorStatusChange } from "@/lib/notifications";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const user = users.get(id);
  if (!user?.investorProfile) {
    return NextResponse.json({ error: "Investor profile not found" }, { status: 404 });
  }

  let body: { status?: InvestorStatus };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.status || !["submitted", "under-review", "approved"].includes(body.status)) {
    return NextResponse.json({ error: "Invalid investor status" }, { status: 400 });
  }

  const previousStatus = user.investorProfile.status;
  const investorProfile = {
    ...user.investorProfile,
    status: body.status,
    updatedAt: new Date().toISOString(),
  };

  users.set(id, {
    ...user,
    investorProfile,
  });

  let investor = {
    userId: id,
    name: user.name,
    email: user.email,
    investorProfile,
  };

  if (isStrapiEnabled()) {
    try {
      const updated = await updateStrapiInvestorApplicationStatus(id, body.status);
      if (updated) investor = updated;
    } catch {
      // Keep local update when Strapi sync fails.
    }
  }

  await notifyInvestorStatusChange(investor, previousStatus);

  return NextResponse.json({ investor });
}