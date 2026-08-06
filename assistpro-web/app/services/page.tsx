import Link from "next/link";

export const metadata = {
  title: "Services — AssistPro",
  description: "Browse AssistPro's five verified service categories.",
};

const SERVICES = [
  {
    category: "Personal Assistants",
    slug: "Personal Assistant",
    tagline: "Your operations, handled.",
    desc: "Daily, weekly, or long-term support covering travel logistics, calendar management, correspondence, and lifestyle operations. All PAs are multilingual and background-verified.",
    highlights: ["Executive travel coordination", "Diary & inbox management", "Vendor & vendor liaison", "Multilingual service"],
    modes: ["Daily", "Weekly", "Long-term"],
    rate: "From $250/day",
  },
  {
    category: "Drivers (Client Vehicle)",
    slug: "Driver",
    tagline: "Precision driving. Total discretion.",
    desc: "Professionally trained drivers who operate your vehicle to executive-standard. Defensive-driving certified, familiar with 20+ major cities, and policy-enforced on privacy.",
    highlights: ["Client vehicle only", "Defensive-driving certified", "Route & logistics planning", "24/7 availability options"],
    modes: ["Daily", "Event"],
    rate: "From $220/day",
  },
  {
    category: "Chaperones (Male)",
    slug: "Chaperone",
    tagline: "Professional presence. Verified discretion.",
    desc: "Discrete male chaperones for events, executive travel, and private engagements. Background-checked, CPR/First-Aid certified, and policy-enforced for client safety.",
    highlights: ["Background & ID verified", "CPR / First-Aid certified", "Executive travel support", "Multilingual options"],
    modes: ["Daily", "Weekly", "Event"],
    rate: "From $260/day",
  },
  {
    category: "Hostesses (Female)",
    slug: "Hostess",
    tagline: "Elite hospitality. Brand-safe presence.",
    desc: "Event-facing hospitality professionals for VIP guest management, product launches, conferences, and private superyacht charters. Native or fluent in the language of your choice.",
    highlights: ["VIP & guest management", "Product launches & conferences", "Fluent in 3+ languages avg.", "Brand-safe & policy-verified"],
    modes: ["Event", "Daily"],
    rate: "From $300/day",
  },
  {
    category: "Artists",
    slug: "Artist",
    tagline: "Curated talent. Verified portfolios.",
    desc: "Verified performers and creative talent for private events, corporate entertainment, and brand activations. Portfolio-reviewed and brand-safe — from musicians to visual artists.",
    highlights: ["Portfolio-reviewed talent", "Musicians, visual artists & more", "Corporate & private events", "Brand-safe policy"],
    modes: ["Event"],
    rate: "From $800/event",
  },
];

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: 64 }}>
      {/* Hero */}
      <section style={{ padding: "56px 0 42px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div className="container">
          <div className="pill" style={{ marginBottom: 20 }}>
            <span className="goldHover">Five service categories</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span style={{ opacity: 0.8 }}>Admin-verified providers</span>
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 1.04, letterSpacing: "-0.02em" }}>
            <span className="goldHover">Services</span> built for<br />premium clients.
          </h1>
          <p style={{ marginTop: 16, fontSize: 16, color: "rgba(255,255,255,.66)", lineHeight: 1.7, maxWidth: 560 }}>
            Every provider is background-checked, admin-approved, and held to our
            discretion-first standards. No exceptions.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section style={{ padding: "48px 0 80px" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {SERVICES.map((svc) => (
            <div
              key={svc.slug}
              className="panel"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 24,
                padding: "28px 32px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>
                    <span className="goldHover">{svc.category}</span>
                  </h2>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)", fontWeight: 600 }}>
                    {svc.tagline}
                  </span>
                </div>
                <p style={{ margin: "0 0 16px", fontSize: 14, color: "rgba(255,255,255,.65)", lineHeight: 1.7, maxWidth: 640 }}>
                  {svc.desc}
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {svc.highlights.map((h) => (
                    <li
                      key={h}
                      style={{
                        border: "1px solid rgba(255,255,255,.1)",
                        background: "rgba(255,255,255,.05)",
                        borderRadius: 8,
                        padding: "5px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "rgba(255,255,255,.7)",
                      }}
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", minWidth: 160 }}>
                <div style={{ textAlign: "right" }}>
                  <div className="goldHover" style={{ fontWeight: 900, fontSize: 16 }}>{svc.rate}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.45)", marginTop: 4 }}>
                    {svc.modes.join(" · ")}
                  </div>
                </div>
                <Link
                  href={`/providers?category=${encodeURIComponent(svc.slug)}`}
                  className="btn btnPrimary"
                  style={{ marginTop: 16, whiteSpace: "nowrap" }}
                >
                  <span className="goldHover">Browse Providers →</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
