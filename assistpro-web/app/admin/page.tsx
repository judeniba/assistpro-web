import { getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminPanel from "./AdminPanel";
import { getAdminData } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin — AssistPro" };

export default async function AdminPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/auth/login");
  if (session.role !== "admin") redirect("/dashboard");

  const { providers: allProviders, bookings: allBookings, investors } = await getAdminData();
  const sortedBookings = [...allBookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const sortedInvestors = [...investors].sort((a, b) => b.investorProfile.updatedAt.localeCompare(a.investorProfile.updatedAt));

  const stats = {
    providers:  allProviders.length,
    verified:   allProviders.filter((p) =>  p.verified).length,
    unverified: allProviders.filter((p) => !p.verified).length,
    bookings:   sortedBookings.length,
    pending:    sortedBookings.filter((b) => b.status === "pending").length,
    investors:  sortedInvestors.length,
    review:     sortedInvestors.filter((investor) => investor.investorProfile.status !== "approved").length,
  };

  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ padding: "48px 0 80px" }}>
        <div className="container">
          {/* Header */}
          <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 900 }}>
            <span className="goldHover">Admin</span> Panel
          </h1>
          <p style={{ margin: "0 0 28px", color: "rgba(255,255,255,.5)", fontSize: 14 }}>
            Signed in as {session.name}
          </p>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 36 }}>
            {[
              { label: "Providers",  value: stats.providers,  color: "rgba(255,255,255,.8)" },
              { label: "Verified",   value: stats.verified,   color: "#34d399" },
              { label: "Unverified", value: stats.unverified, color: "#fbbf24" },
              { label: "Bookings",   value: stats.bookings,   color: "rgba(255,255,255,.8)" },
              { label: "Pending",    value: stats.pending,    color: "#818cf8" },
              { label: "Investors",  value: stats.investors,  color: "#f5d37b" },
              { label: "Review",     value: stats.review,     color: "#93c5fd" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ fontSize: 26, fontWeight: 900, color }}>{value}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", marginTop: 3, fontWeight: 700, letterSpacing: ".06em" }}>{label.toUpperCase()}</div>
              </div>
            ))}
          </div>

          <AdminPanel initialProviders={allProviders} initialBookings={sortedBookings} initialInvestors={sortedInvestors} />
        </div>
      </section>
    </main>
  );
}
