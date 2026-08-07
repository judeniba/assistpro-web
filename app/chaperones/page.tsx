"use client";

import Link from "next/link";

export default function ChaperonesPage() {
  return (
    <main>
      {/* Header Navigation */}
      <section style={{ padding: "26px 0", borderBottom: "1px solid rgba(255,255,255,.10)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,.16)",
                background: "rgba(255,255,255,.06)",
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
              }}
            >
              <span className="goldHover">AP</span>
            </div>
            <div>
              <div style={{ fontWeight: 900, letterSpacing: ".08em", fontSize: 12, color: "rgba(255,255,255,.76)" }}>
                ASSISTPRO
              </div>
            </div>
          </Link>
          <Link href="/" className="btn">
            Back to Home
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section style={{ padding: "80px 0 60px" }}>
        <div className="container">
          <div className="pill">
            <span className="goldHover">Professional Service</span>
          </div>
          <h1
            style={{
              margin: "18px 0 10px",
              fontSize: "clamp(38px, 4.2vw, 56px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="goldHover">Chaperones (Male)</span>
          </h1>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,.72)", maxWidth: 720 }}>
            Professional presence for events and travel. Verified, discreet, and policy-enforced. 
            Our male chaperones provide reliable accompaniment for business and social occasions.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section style={{ padding: "20px 0 60px" }}>
        <div className="container">
          <h2 style={{ margin: "0 0 24px", fontSize: 28, letterSpacing: "-0.02em" }}>
            <span className="goldHover">What We Offer</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                title: "Event Accompaniment",
                desc: "Professional presence for business events, galas, and social gatherings.",
              },
              {
                title: "Travel Support",
                desc: "Reliable accompaniment for domestic and international travel arrangements.",
              },
              {
                title: "Verified Professionals",
                desc: "All chaperones undergo rigorous background checks and admin verification.",
              },
              {
                title: "Policy-Enforced Standards",
                desc: "Strict adherence to professional conduct and discretion protocols.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                style={{
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(255,255,255,.04)",
                  borderRadius: 20,
                  padding: 24,
                }}
              >
                <div style={{ fontWeight: 950, fontSize: 17, marginBottom: 10 }}>{feature.title}</div>
                <div style={{ color: "rgba(255,255,255,.66)", lineHeight: 1.65, fontSize: 15 }}>
                  {feature.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "40px 0 80px" }}>
        <div className="container">
          <div className="hrGold" />
          <div style={{ paddingTop: 32, textAlign: "center" }}>
            <h3 style={{ margin: 0, fontSize: 28 }}>
              Ready to <span className="goldHover">Get Started?</span>
            </h3>
            <p style={{ marginTop: 12, color: "rgba(255,255,255,.66)", lineHeight: 1.7 }}>
              Download the AssistPro app to connect with verified male chaperones.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <a className="btn btnPrimary" href="/#download">
                <span className="goldHover">Download App</span>
              </a>
              <Link href="/" className="btn">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.10)", padding: "34px 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
          <div style={{ color: "rgba(255,255,255,.56)", fontSize: 12 }}>
            © {new Date().getFullYear()} AssistPro. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12, color: "rgba(255,255,255,.56)" }}>
            <a href="#" style={{ opacity: 0.9 }}>
              Privacy
            </a>
            <a href="#" style={{ opacity: 0.9 }}>
              Terms
            </a>
            <a href="#" style={{ opacity: 0.9 }}>
              Provider Standards
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
