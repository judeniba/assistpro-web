import { bookings, providers } from "@/lib/store";
import { getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { updateBookingStatus } from "@/app/actions";
import type { Booking } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Provider Dashboard — AssistPro" };

export default async function ProviderDashboard() {
  const session = await getCurrentSession();
  if (!session) redirect("/auth/login");
  if (session.role === "client") redirect("/dashboard");
  if (session.role === "admin")  redirect("/admin");

  const profile = Array.from(providers.values()).find((p) => p.userId === session.userId);

  const myBookings = profile
    ? Array.from(bookings.values())
        .filter((b) => b.providerId === profile.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    : [];

  const stats = {
    pending:   myBookings.filter((b) => b.status === "pending").length,
    confirmed: myBookings.filter((b) => b.status === "confirmed").length,
    completed: myBookings.filter((b) => b.status === "completed").length,
  };

  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ padding: "48px 0 80px" }}>
        <div className="container">
          <div className="heroKicker">Provider workspace</div>
          <h1 className="sectionTitle" style={{ margin: "0 0 8px", fontSize: 28 }}>
            <span className="goldHover">Provider</span> Dashboard
          </h1>
          <p className="mutedText" style={{ margin: "0 0 24px" }}>
            {session.name}{profile ? ` · ${profile.category}` : ""}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Pending",   value: stats.pending,   color: "#fbbf24" },
              { label: "Confirmed", value: stats.confirmed, color: "#34d399" },
              { label: "Completed", value: stats.completed, color: "#818cf8" },
            ].map(({ label, value, color }) => (
              <div key={label} className="panelSoft" style={{ padding: "18px 20px" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color }}>{value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 4, fontWeight: 700, letterSpacing: ".05em" }}>{label.toUpperCase()}</div>
              </div>
            ))}
          </div>

          {!profile && (
            <div style={{ padding: "20px", borderRadius: 14, background: "rgba(251,191,36,.08)", border: "1px solid rgba(251,191,36,.25)", color: "#fbbf24", fontSize: 14, marginBottom: 20 }}>
              Your provider profile has not been set up yet. Contact admin@assistpro.com to get verified.
            </div>
          )}

          {myBookings.length === 0 && profile ? (
            <div className="emptyState">
              <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,.75)" }}>No booking requests yet.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {myBookings.map((booking) => (
                <BookingRow key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  return (
    <div
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
          <span style={{ fontWeight: 900, fontSize: 16 }}>{booking.clientName}</span>
          <span className={`statusBadge ${booking.status}`}>{booking.status}</span>
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", marginBottom: 4 }}>
          {booking.mode} · {booking.startDate}{booking.startDate !== booking.endDate ? ` → ${booking.endDate}` : ""}
        </div>
        {booking.notes && (
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.45)", fontStyle: "italic" }}>"{booking.notes}"</div>
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
        <div style={{ display: "flex", gap: 8 }}>
          {booking.status === "pending" && (
            <form action={updateBookingStatus.bind(null, booking.id, "confirmed")}>
              <button type="submit" className="btn" style={{ padding: "6px 14px", fontSize: 12, cursor: "pointer", color: "#34d399", borderColor: "rgba(52,211,153,.3)" }}>
                Confirm
              </button>
            </form>
          )}
          {booking.status === "confirmed" && (
            <form action={updateBookingStatus.bind(null, booking.id, "completed")}>
              <button type="submit" className="btn" style={{ padding: "6px 14px", fontSize: 12, cursor: "pointer", color: "#818cf8", borderColor: "rgba(99,102,241,.3)" }}>
                Mark Complete
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
