"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import TopRightSocialsAnimated from "../components/TopRightSocialsAnimated";

export default function Home() {
  const [videoReady, setVideoReady] = useState(false);

  const services = useMemo(
    () => [
      {
        title: "Personal Assistants",
        desc: "Daily, weekly, or long-term support for travel, scheduling, and lifestyle operations.",
      },
      {
        title: "Drivers (Client Vehicle)",
        desc: "Professional drivers operating the client’s vehicle—executive standard, safety-first.",
      },
      {
        title: "Chaperones (Male)",
        desc: "Professional presence for events and travel. Verified, discreet, and policy-enforced.",
      },
      {
        title: "Hostesses (Female)",
        desc: "Event-facing hospitality professionals for VIP guest management, conferences, and launches.",
      },
      {
        title: "Artists",
        desc: "Verified talent for performances and events—portfolio-based, brand-safe.",
      },
    ],
    []
  );

  return (
    <main>
      {/* Top-right socials, synced to hero video readiness */}
      <TopRightSocialsAnimated ready={videoReady} />

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          {/* Replace with your actual hero video file */}
          <source src="/videos/hero-arrival.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,.70) 0%, rgba(0,0,0,.45) 50%, rgba(0,0,0,.78) 100%)",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1, height: "100%" }}>
          {/* Top-left brand */}
          <div style={{ paddingTop: 26, display: "flex", alignItems: "center", gap: 12 }}>
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
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)", marginTop: 2 }}>
                Verified • Discreet • Global
              </div>
            </div>
          </div>

          {/* Hero content */}
          <div
            style={{
              height: "calc(100% - 90px)",
              display: "flex",
              alignItems: "center",
              paddingBottom: 40,
            }}
          >
            <div style={{ maxWidth: 720 }}>
              <div className="pill">
                <span className="goldHover">Luxury Fashion Gold</span>
                <span style={{ opacity: 0.55 }}>•</span>
                <span style={{ opacity: 0.85 }}>Verified providers only</span>
              </div>

              <h1
                style={{
                  margin: "18px 0 10px",
                  fontSize: "clamp(42px, 4.6vw, 68px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.02em",
                }}
              >
                <span className="goldHover">Elite</span> professionals for
                <br />
                events, presence, and performance.
              </h1>

              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,.72)" }}>
                Find verified <b>Personal Assistants</b>, <b>Drivers</b> (client vehicle), <b>Chaperones (Male)</b>, <b>Hostesses (Female)</b>, and
                <b> Artists</b>. Multilingual. Discreet. Policy-enforced.
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
                <Link className="btn btnPrimary" href="/booking">
                  <span className="goldHover">Book Now</span>
                </Link>
                <a className="btn" href="#partners">
                  Partner with Hotels
                </a>
                <a className="btn" href="#providers">
                  Become Verified
                </a>
              </div>

              <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["English", "French", "Spanish", "Italian", "Mandarin"].map((l) => (
                  <span
                    key={l}
                    style={{
                      border: "1px solid rgba(255,255,255,.12)",
                      background: "rgba(0,0,0,.28)",
                      padding: "9px 12px",
                      borderRadius: 999,
                      fontWeight: 800,
                      fontSize: 12,
                      letterSpacing: ".06em",
                      color: "rgba(255,255,255,.72)",
                    }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Precision strip */}
      <section style={{ padding: "42px 0" }}>
        <div className="container">
          <div className="hrGold" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              paddingTop: 22,
            }}
          >
            {["Admin-approved verification", "Discretion-first standards", "No minors permitted", "Global multilingual service"].map(
              (t) => (
                <div
                  key={t}
                  style={{
                    border: "1px solid rgba(255,255,255,.12)",
                    background: "rgba(255,255,255,.04)",
                    borderRadius: 18,
                    padding: 18,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{ fontWeight: 900, letterSpacing: ".08em", fontSize: 12, color: "rgba(255,255,255,.70)" }}>
                    STANDARD
                  </div>
                  <div style={{ marginTop: 8, fontSize: 16, fontWeight: 900 }}>
                    <span className="goldHover">{t}</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "18px 0 56px" }}>
        <div className="container">
          <h2 style={{ margin: 0, fontSize: 34, letterSpacing: "-0.02em" }}>
            <span className="goldHover">Core services</span>
          </h2>
          <p style={{ marginTop: 10, color: "rgba(255,255,255,.66)", lineHeight: 1.7 }}>
            Built for premium clients, corporate travel, and hospitality partners.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
              marginTop: 18,
            }}
          >
            {services.map((s) => (
              <div
                key={s.title}
                style={{
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(255,255,255,.04)",
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <div style={{ fontWeight: 950, fontSize: 18 }}>{s.title}</div>
                <div style={{ marginTop: 10, color: "rgba(255,255,255,.66)", lineHeight: 1.65 }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" style={{ padding: "56px 0" }}>
        <div className="container">
          <div className="hrGold" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 18,
              paddingTop: 24,
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: 28 }}>
                <span className="goldHover">Download</span> AssistPro
              </h3>
              <p style={{ marginTop: 10, color: "rgba(255,255,255,.66)", lineHeight: 1.7 }}>
                Replace the buttons with your App Store and Play Store links when ready.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a className="btn btnPrimary" href="#">
                  <span className="goldHover">App Store</span>
                </a>
                <a className="btn" href="#">
                  Google Play
                </a>
              </div>
            </div>
            <div
              style={{
                border: "1px solid rgba(255,255,255,.12)",
                background: "rgba(255,255,255,.04)",
                borderRadius: 24,
                padding: 22,
              }}
            >
              <div style={{ fontWeight: 900, letterSpacing: ".08em", fontSize: 12, color: "rgba(255,255,255,.70)" }}>
                BOOKING OPTIONS
              </div>
              <div style={{ marginTop: 12, color: "rgba(255,255,255,.70)", lineHeight: 1.7 }}>
                Daily • Weekly • Long-term • Event-based
              </div>
              <div style={{ marginTop: 12, color: "rgba(255,255,255,.56)", fontSize: 13, lineHeight: 1.6 }}>
                Payments: Stripe + Flutterwave (MTN MoMo / Orange Money) — activates when keys are added.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" style={{ padding: "40px 0 56px" }}>
        <div className="container">
          <h3 style={{ margin: 0, fontSize: 28 }}>
            <span className="goldHover">Enterprise</span> & hotel partnerships
          </h3>
          <p style={{ marginTop: 10, color: "rgba(255,255,255,.66)", lineHeight: 1.7 }}>
            Offer verified professionals to VIP guests via concierge teams. Pilot-ready in 30 days.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn btnPrimary" href="mailto:seaointeralia@gmail.com?subject=AssistPro%20Hotel%20Partnership">
              <span className="goldHover">Partner Inquiry</span>
            </a>
            <a className="btn" href="#providers">
              Provider Network
            </a>
          </div>
        </div>
      </section>

      {/* Providers */}
      <section id="providers" style={{ padding: "0 0 70px" }}>
        <div className="container">
          <div className="hrGold" />
          <div style={{ paddingTop: 24 }}>
            <h3 style={{ margin: 0, fontSize: 28 }}>
              Become <span className="goldHover">verified</span>
            </h3>
            <p style={{ marginTop: 10, color: "rgba(255,255,255,.66)", lineHeight: 1.7 }}>
              Providers are searchable only after admin verification. This protects clients and preserves brand standards.
            </p>
            <div style={{ color: "rgba(255,255,255,.56)", fontSize: 13, lineHeight: 1.65 }}>
              Admin email: <b>seaointeralia@gmail.com</b>
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
            <Link href="/privacy-policy" style={{ opacity: 0.9 }}>
              Privacy
            </Link>
            <Link href="/terms-and-conditions" style={{ opacity: 0.9 }}>
              Terms
            </Link>
            <Link href="/service-agreement" style={{ opacity: 0.9 }}>
              Service Agreement
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
