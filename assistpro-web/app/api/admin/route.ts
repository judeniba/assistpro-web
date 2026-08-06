import { NextResponse } from "next/server";
import { providers, bookings, users } from "@/lib/store";
import { getCurrentSession } from "@/lib/auth";
import { getStrapiInvestorApplications, isStrapiEnabled } from "@/lib/strapi";

export async function GET() {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const localInvestors = Array.from(users.values())
    .filter((user) => user.investorProfile)
    .map((user) => ({
      userId: user.id,
      name: user.name,
      email: user.email,
      investorProfile: user.investorProfile!,
    }));

  let investors = localInvestors;
  if (isStrapiEnabled()) {
    try {
      const remoteInvestors = await getStrapiInvestorApplications();
      if (remoteInvestors.length) investors = remoteInvestors;
    } catch {
      // Fall back to local persisted investors.
    }
  }

  return NextResponse.json({
    providers: Array.from(providers.values()),
    bookings: Array.from(bookings.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    investors: investors.sort((a, b) => b.investorProfile.updatedAt.localeCompare(a.investorProfile.updatedAt)),
  });
}
