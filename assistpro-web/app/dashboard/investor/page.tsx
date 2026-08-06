import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { users } from "@/lib/store";
import InvestorApplicationForm from "./InvestorApplicationForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Investment Profile — AssistPro" };

function statusTone(status: "submitted" | "under-review" | "approved") {
  if (status === "approved") return { border: "1px solid rgba(52,211,153,.28)", background: "rgba(52,211,153,.1)", color: "#6ee7b7" };
  if (status === "under-review") return { border: "1px solid rgba(96,165,250,.28)", background: "rgba(96,165,250,.1)", color: "#93c5fd" };
  return { border: "1px solid rgba(245,211,123,.28)", background: "rgba(245,211,123,.1)", color: "#f5d37b" };
}

export default async function InvestorDashboardPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/auth/login?intent=investor");
  if (session.role === "provider") redirect("/dashboard/provider");
  if (session.role === "admin") redirect("/admin");

  const user = users.get(session.userId);
  if (!user) redirect("/auth/login?intent=investor");

  const profile = user.investorProfile ?? null;
  const profileStatus = profile ? statusTone(profile.status) : null;

  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ padding: "48px 0 80px" }}>
        <div className="container" style={{ display: "grid", gap: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div className="heroKicker">Investor access</div>
              <h1 className="sectionTitle" style={{ margin: "8px 0" }}>
                <span className="goldHover">{session.name.split(" ")[0]}</span>, your investment profile
              </h1>
              <p className="mutedText" style={{ margin: 0, maxWidth: 780 }}>
                Apply for exclusive country rights, track review status, and keep your market thesis current for the AssistPro expansion team.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/#investors" className="btn" style={{ padding: "12px 18px" }}>Back to investment offer</Link>
              <Link href="/dashboard" className="btn btnPrimary" style={{ padding: "12px 18px" }}>
                <span className="goldHover">Client dashboard</span>
              </Link>
            </div>
          </div>

          {profile ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
              <div className="panelSoft" style={{ padding: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".08em", color: "rgba(255,255,255,.62)" }}>TARGET MARKET</div>
                <div style={{ marginTop: 8, fontWeight: 900, fontSize: 22 }}>{profile.country}</div>
              </div>
              <div className="panelSoft" style={{ padding: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".08em", color: "rgba(255,255,255,.62)" }}>CAPITAL RANGE</div>
                <div style={{ marginTop: 8, fontWeight: 900, fontSize: 22 }}>{profile.budget}</div>
              </div>
              <div className="panelSoft" style={{ padding: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".08em", color: "rgba(255,255,255,.62)" }}>STATUS</div>
                <div style={{ marginTop: 8, display: "inline-flex", padding: "8px 12px", borderRadius: 999, textTransform: "uppercase", fontWeight: 800, fontSize: 12, letterSpacing: ".08em", ...(profileStatus ?? {}) }}>
                  {profile.status}
                </div>
              </div>
            </div>
          ) : null}

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 0.8fr)", gap: 18 }}>
            <InvestorApplicationForm initialProfile={profile} />

            <aside className="panelSoft" style={{ padding: 22, display: "grid", gap: 16, alignContent: "start" }}>
              <div>
                <div className="heroKicker">What happens next</div>
                <h2 className="sectionTitle" style={{ margin: "6px 0 0", fontSize: 24 }}>
                  Review path for <span className="goldHover">country operators</span>
                </h2>
              </div>
              <div style={{ color: "rgba(255,255,255,.72)", lineHeight: 1.7 }}>
                Submitted profiles are reviewed for capital readiness, local operating leverage, and distribution fit across hospitality, executive travel, and premium service demand.
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  "1. Submit your preferred country and budget range.",
                  "2. Our team reviews your operating experience and partnership fit.",
                  "3. Approved investors receive territory discussions and rollout materials.",
                ].map((item) => (
                  <div key={item} style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.7)" }}>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(245,211,123,.2)", background: "rgba(245,211,123,.08)" }}>
                <div style={{ fontWeight: 800, color: "#f5d37b", marginBottom: 6 }}>Direct contact</div>
                <a href="mailto:seaointeralia@gmail.com?subject=AssistPro%20Investor%20Review" style={{ color: "rgba(255,255,255,.82)" }}>
                  seaointeralia@gmail.com
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}