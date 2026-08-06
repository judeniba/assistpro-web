import { getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cancelBooking } from "@/app/actions";
import Link from "next/link";
import type { Booking } from "@/lib/types";
import { getLiveBookings } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard — AssistPro" };

function statusClass(status: Booking["status"]) {
  return `statusBadge ${status}`;
}

export default async function ClientDashboard({
  searchParams,
}: {
  searchParams: Promise<{ booked?: string; payment?: string }>;
}) {
  const session = await getCurrentSession();
  if (!session) redirect("/auth/login");
  if (session.role === "provider") redirect("/dashboard/provider");
  if (session.role === "admin")    redirect("/admin");

  const { booked, payment } = await searchParams;

  const bookings = await getLiveBookings();
  const myBookings = bookings
    .filter((b) => b.clientId === session.userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ padding: "48px 0 80px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            <div>
              <div className="heroKicker">Client dashboard</div>
              <h1 className="sectionTitle">
                Welcome, <span className="goldHover">{session.name.split(" ")[0]}</span>
              </h1>
              <p className="mutedText" style={{ margin: "8px 0 0" }}>
                {myBookings.length} booking{myBookings.length !== 1 ? "s" : ""} total · Manage upcoming requests in one place.
              </p>
            </div>
            <Link href="/providers" className="btn btnPrimary" style={{ padding: "12px 22px" }}>
              <span className="goldHover">+ New Booking</span>
            </Link>
          </div>

          {booked === "1" && (
            <div style={{ marginBottom: 24, padding: "14px 18px", borderRadius: 14, background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.3)", color: "#34d399", fontSize: 14 }}>
              ✓ Booking submitted — your request is now waiting for confirmation.
              {payment && (
                <span style={{ display: "block", marginTop: 6, color: "rgba(255,255,255,.7)" }}>
                  Payment intent created: {payment}
                </span>
              )}
            </div>
          )}

          {myBookings.length === 0 ? (
            <div className="emptyState">
              <p style={{ margin: "0 0 16px", fontSize: 15, color: "rgba(255,255,255,.75)" }}>No bookings yet.</p>
              <Link href="/providers" className="btn btnPrimary" style={{ padding: "12px 22px" }}>
                <span className="goldHover">Browse Providers</span>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {myBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="panel"
                  style={{
                    padding: "20px 24px",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 16,
                    alignItems: "start",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontWeight: 900, fontSize: 16 }}>{booking.providerName}</span>
                      <span className={statusClass(booking.status)}>{booking.status}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", marginBottom: 4 }}>
                      {booking.category} · {booking.mode} · {booking.startDate} → {booking.endDate}
                    </div>
                    {booking.notes && (
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,.45)", fontStyle: "italic" }}>
                        "{booking.notes}"
                      </div>
                    )}
                    <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#f5d37b", marginBottom: 6 }}>Booking agreement</div>
                      <div style={{ fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,.62)" }}>
                        Service terms, provider confirmation, and safety standards apply. AssistPro provides platform coordination only and disclaims liability for third-party conduct beyond reasonable platform administration.
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <div className="goldHover" style={{ fontWeight: 900, fontSize: 15 }}>{booking.totalCost}</div>
                    {booking.status === "pending" && (
                      <form action={cancelBooking.bind(null, booking.id)}>
                        <button type="submit" className="btn" style={{ padding: "6px 14px", fontSize: 12, cursor: "pointer", color: "#f87171", borderColor: "rgba(239,68,68,.3)" }}>
                          Cancel
                        </button>
                      </form>
                    )}
                    <Link href={`/providers/${booking.providerId}`} style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>
                      View provider →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
