"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import TopRightSocialsAnimated from "../components/TopRightSocialsAnimated";
import WorldMap from "../components/WorldMap";
import type { Provider } from "@/lib/types";

interface MarketingSnapshot {
  heroTitle: string;
  heroSubtitle: string;
  channels: string[];
  campaignIdeas: string[];
  primaryCta: string;
  featuredProviderOrder?: string[];
  services?: Array<{ title: string; description: string }>;
  standards?: Array<{ label: string }>;
  featuredProvidersHeading?: string;
  featuredProvidersSubheading?: string;
  featuredProvidersCta?: string;
  investmentTitle?: string;
  investmentSubtitle?: string;
  investmentPrimaryCta?: string;
  investmentSecondaryCta?: string;
  investmentHighlights?: Array<{ label: string; value: string }>;
  investmentTerritories?: Array<{ country: string; status: string; summary: string }>;
  downloadTitle?: string;
  downloadSubtitle?: string;
  downloadPrimaryCta?: string;
  downloadSecondaryCta?: string;
  partnershipsTitle?: string;
  partnershipsSubtitle?: string;
  partnershipsPrimaryCta?: string;
  partnershipsSecondaryCta?: string;
  providerSectionTitle?: string;
  providerSectionSubtitle?: string;
  providerSectionEmail?: string;
  footerLinks?: Array<{ label: string; href: string }>;
}

const DEFAULT_FEATURED_CATEGORY_ORDER = [
  "Personal Assistant",
  "Driver",
  "Hostess",
  "Chaperone",
  "Artist",
] as const;

export default function Home() {
  const [videoReady, setVideoReady] = useState(false);
  const [marketing, setMarketing] = useState<MarketingSnapshot | null>(null);
  const [featuredProviders, setFeaturedProviders] = useState<Provider[]>([]);

  useEffect(() => {
    fetch("/api/marketing")
      .then((res) => res.json())
      .then((data) => setMarketing(data))
      .catch(() => undefined);

    fetch("/api/providers")
      .then((res) => res.json())
      .then((data) => {
        const providers = Array.isArray(data) ? data : [];
        const categoryOrder = (marketing?.featuredProviderOrder?.length ? marketing.featuredProviderOrder : DEFAULT_FEATURED_CATEGORY_ORDER) as string[];
        const selected = categoryOrder
          .map((category) => {
            const matches = providers.filter((provider: Provider) => provider.category === category);
            return matches.sort((a: Provider, b: Provider) => b.rating - a.rating)[0];
          })
          .filter((provider): provider is Provider => Boolean(provider));

        setFeaturedProviders(selected.length > 0 ? selected : providers.slice(0, 5));
      })
      .catch(() => setFeaturedProviders([]));
  }, [marketing?.featuredProviderOrder]);

  const services = useMemo(() => {
    const items = marketing?.services?.length ? marketing.services : [
      {
        title: "Personal Assistants",
        description: "Daily, weekly, or long-term support for travel, scheduling, and lifestyle operations.",
      },
      {
        title: "Drivers (Client Vehicle)",
        description: "Professional drivers operating the client’s vehicle—executive standard, safety-first.",
      },
      {
        title: "Chaperones (Male)",
        description: "Professional presence for events and travel. Verified, discreet, and policy-enforced.",
      },
      {
        title: "Hostesses (Female)",
        description: "Event-facing hospitality professionals for VIP guest management, conferences, and launches.",
      },
      {
        title: "Artists",
        description: "Verified talent for performances and events—portfolio-based, brand-safe.",
      },
    ];

    return items.map((service) => ({ title: service.title, desc: service.description }));
  }, [marketing?.services]);

  const investmentHighlights = marketing?.investmentHighlights?.length ? marketing.investmentHighlights : [
    { label: "License model", value: "Exclusive country operating rights" },
    { label: "Revenue mix", value: "Booking fees, premium verification, enterprise partnerships" },
    { label: "Support", value: "Brand system, onboarding playbook, and product roadmap access" },
  ];

  const investmentTerritories = marketing?.investmentTerritories?.length ? marketing.investmentTerritories : [
    { country: "United Arab Emirates", status: "Open", summary: "High concierge demand, hospitality partnerships, and premium traveler traffic." },
    { country: "France", status: "Open", summary: "Luxury retail, events, and executive travel create recurring marketplace demand." },
    { country: "Morocco", status: "Reserved for review", summary: "Tourism growth and multilingual service coverage suit an early operator launch." },
  ];

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
                <span className="goldHover">{marketing?.heroTitle ? "CMS-powered hero" : "Luxury Fashion Gold"}</span>
                <span style={{ opacity: 0.55 }}>•</span>
                <span style={{ opacity: 0.85 }}>{marketing?.heroSubtitle ? "Updated from Strapi" : "Verified providers only"}</span>
              </div>

              <h1
                style={{
                  margin: "18px 0 10px",
                  fontSize: "clamp(42px, 4.6vw, 68px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.02em",
                }}
              >
                <span className="goldHover">{marketing?.heroTitle ?? "Elite"}</span>
                <br />
                {marketing?.heroSubtitle ? "Curated for premium bookings and concierge experiences." : "professionals for events, presence, and performance."}
              </h1>

              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,.72)" }}>
                {marketing?.heroSubtitle ?? "Find verified Personal Assistants, Drivers (client vehicle), Chaperones (Male), Hostesses (Female), and Artists. Multilingual. Discreet. Policy-enforced."}
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
                <a className="btn btnPrimary" href="#download">
                  <span className="goldHover">{marketing?.primaryCta ?? "Download AssistPro"}</span>
                </a>
                <a className="btn" href="#partners">
                  {marketing?.primaryCta ? "Explore partnerships" : "Partner with Hotels"}
                </a>
                <a className="btn" href="#providers">
                  {marketing?.primaryCta ? "Meet the network" : "Become Verified"}
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
            {(marketing?.standards?.length ? marketing.standards : [{ label: "Admin-approved verification" }, { label: "Discretion-first standards" }, { label: "No minors permitted" }, { label: "Global multilingual service" }]).map(
              (item) => (
                <div
                  key={item.label}
                  className="panelSoft"
                  style={{
                    padding: 18,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{ fontWeight: 900, letterSpacing: ".08em", fontSize: 12, color: "rgba(255,255,255,.70)" }}>
                    STANDARD
                  </div>
                  <div style={{ marginTop: 8, fontSize: 16, fontWeight: 900 }}>
                    <span className="goldHover">{item.label}</span>
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
                className="panelSoft"
                style={{
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

      <WorldMap />

      {/* Featured providers */}
      <section id="featured-providers" style={{ padding: "8px 0 56px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 999, background: "rgba(245,211,123,0.14)", border: "1px solid rgba(245,211,123,0.28)", color: "#f5d37b", fontSize: 11, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>
                <span>★</span> Top Rated
              </div>
              <h2 style={{ margin: "10px 0 8px", fontSize: 30, letterSpacing: "-0.02em" }}>
                <span className="goldHover">Most trusted</span> {marketing?.featuredProvidersHeading ?? "providers on the front page"}
              </h2>
              <p style={{ margin: 0, color: "rgba(255,255,255,.66)", lineHeight: 1.7, maxWidth: 760 }}>
                {marketing?.featuredProvidersSubheading ?? "Clients can browse a curated showcase of verified personal assistants, drivers, hostesses, chaperones, and artists with real ratings and profile photos."}
              </p>
            </div>
            <Link href="/providers" className="btn btnPrimary" style={{ padding: "10px 16px" }}>
              <span className="goldHover">{marketing?.featuredProvidersCta ?? "View all providers"}</span>
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
              marginTop: 22,
            }}
          >
            {featuredProviders.map((provider) => (
              <Link key={provider.id} href={`/providers/${provider.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <article className="panelSoft" style={{ padding: 0, overflow: "hidden", height: "100%" }}>
                  <div style={{ position: "relative", height: 220, background: "linear-gradient(135deg, rgba(245,211,123,0.22), rgba(255,255,255,0.04))" }}>
                    <Image
                      src={`/profiles/${provider.category.toLowerCase().replace(/\s+/g, "")}.svg`}
                      alt={`${provider.name} profile`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)" }} />
                    <div style={{ position: "absolute", left: 14, bottom: 14, right: 14 }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 999, background: "rgba(7, 11, 20, 0.72)", border: "1px solid rgba(255,255,255,.14)" }}>
                        <span className="goldHover" style={{ fontWeight: 900, fontSize: 12 }}>{provider.category}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <div>
                        <div style={{ fontWeight: 900, fontSize: 17 }}>{provider.name}</div>
                        <div style={{ marginTop: 4, color: "rgba(255,255,255,.58)", fontSize: 13 }}>{provider.location}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: 14 }}>{provider.rating.toFixed(1)} ★</div>
                        <div style={{ color: "rgba(255,255,255,.45)", fontSize: 11 }}>{provider.reviewCount} reviews</div>
                      </div>
                    </div>
                    <p style={{ margin: 0, color: "rgba(255,255,255,.64)", fontSize: 13, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {provider.bio}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                      <div className="goldHover" style={{ fontWeight: 900, fontSize: 15 }}>{provider.rate}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>{provider.availableModes.join(" · ")}</div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing snapshot */}
      <section id="download" style={{ padding: "56px 0" }}>
        <div className="container">
          <div className="panel" style={{ padding: 24 }}>
            <div className="heroKicker">Media marketing layer</div>
            <h3 className="sectionTitle" style={{ fontSize: 28, marginBottom: 10 }}>
              <span className="goldHover">Campaign-ready</span> positioning for partners
            </h3>
            <p className="mutedText" style={{ margin: 0, maxWidth: 760 }}>
              AssistPro can be positioned as a premium service network for luxury travel, hospitality, and executive environments with multilingual outreach and concierge-friendly messaging.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 16 }}>
              <div className="panelSoft" style={{ padding: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 12, textTransform: "uppercase", color: "rgba(245, 211, 123, 0.95)" }}>Channels</div>
                <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {(marketing?.channels ?? ["Instagram", "LinkedIn"]).map((channel) => (
                    <span key={channel} style={{ padding: "6px 10px", borderRadius: 999, background: "rgba(255,255,255,.06)", fontSize: 12 }}>
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
              <div className="panelSoft" style={{ padding: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 12, textTransform: "uppercase", color: "rgba(245, 211, 123, 0.95)" }}>Campaign ideas</div>
                <ul style={{ margin: "8px 0 0", paddingLeft: 16, color: "rgba(255,255,255,.72)", lineHeight: 1.6 }}>
                  {(marketing?.campaignIdeas ?? ["Launch a hospitality partner week"]).map((idea) => (
                    <li key={idea}>{idea}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment portfolio */}
      <section id="investors" style={{ padding: "8px 0 56px" }}>
        <div className="container">
          <div className="panel" style={{ padding: 24 }}>
            <div className="heroKicker">Private investor portfolio</div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(280px, .7fr)", gap: 18, alignItems: "start" }}>
              <div>
                <h3 className="sectionTitle" style={{ fontSize: 28, marginBottom: 10 }}>
                  <span className="goldHover">{marketing?.investmentTitle ?? "Investment portfolio"}</span>
                </h3>
                <p className="mutedText" style={{ margin: 0, maxWidth: 760 }}>
                  {marketing?.investmentSubtitle ?? "Private investors can secure exclusive national rights to launch, market, and monetize AssistPro in their territories with central brand, product, and compliance support."}
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
                  <Link className="btn btnPrimary" href="/auth/register?intent=investor">
                    <span className="goldHover">Apply for investment access</span>
                  </Link>
                  <Link className="btn" href="/auth/login?intent=investor">
                    Access investment profile
                  </Link>
                  <a className="btn" href="mailto:seaointeralia@gmail.com?subject=AssistPro%20Investment%20Portfolio">
                    {marketing?.investmentPrimaryCta ?? "Request portfolio deck"}
                  </a>
                  <a className="btn" href="mailto:seaointeralia@gmail.com?subject=AssistPro%20Country%20Rights">
                    {marketing?.investmentSecondaryCta ?? "Discuss country rights"}
                  </a>
                </div>
              </div>
              <div className="panelSoft" style={{ padding: 18 }}>
                <div style={{ fontWeight: 900, letterSpacing: ".08em", fontSize: 12, color: "rgba(255,255,255,.70)" }}>
                  INVESTOR SUMMARY
                </div>
                <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
                  {investmentHighlights.map((item) => (
                    <div key={item.label}>
                      <div style={{ color: "rgba(245,211,123,.95)", fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>{item.label}</div>
                      <div style={{ marginTop: 4, color: "rgba(255,255,255,.78)", lineHeight: 1.6 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
              {investmentTerritories.map((territory) => (
                <article key={territory.country} className="panelSoft" style={{ padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
                    <div style={{ fontWeight: 900, fontSize: 18 }}>{territory.country}</div>
                    <span style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(245,211,123,.28)", background: "rgba(245,211,123,.12)", color: "#f5d37b", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em" }}>
                      {territory.status}
                    </span>
                  </div>
                  <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,.68)", lineHeight: 1.7 }}>
                    {territory.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" style={{ padding: "8px 0 56px" }}>
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
                <span className="goldHover">{marketing?.downloadTitle ? marketing.downloadTitle.split(" ")[0] : "Download"}</span>{" "}{marketing?.downloadTitle ? marketing.downloadTitle.replace(/^\S+\s/, "") : "AssistPro"}
              </h3>
              <p style={{ marginTop: 10, color: "rgba(255,255,255,.66)", lineHeight: 1.7 }}>
                {marketing?.downloadSubtitle ?? "Replace the buttons with your App Store and Play Store links when ready."}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a className="btn btnPrimary" href="#">
                  <span className="goldHover">{marketing?.downloadPrimaryCta ?? "App Store"}</span>
                </a>
                <a className="btn" href="#">
                  {marketing?.downloadSecondaryCta ?? "Google Play"}
                </a>
              </div>
            </div>
            <div className="panelSoft" style={{ borderRadius: 24, padding: 22 }}>
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
            <span className="goldHover">{marketing?.partnershipsTitle ? marketing.partnershipsTitle.split(" & ")[0] : "Enterprise"}</span>{marketing?.partnershipsTitle ? ` ${marketing.partnershipsTitle.includes(" & ") ? "&" : ""} ${marketing.partnershipsTitle.split(" & ").slice(1).join(" & ")}` : " & hotel partnerships"}
          </h3>
          <p style={{ marginTop: 10, color: "rgba(255,255,255,.66)", lineHeight: 1.7 }}>
            {marketing?.partnershipsSubtitle ?? "Offer verified professionals to VIP guests via concierge teams. Pilot-ready in 30 days."}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn btnPrimary" href="mailto:seaointeralia@gmail.com?subject=AssistPro%20Hotel%20Partnership">
              <span className="goldHover">{marketing?.partnershipsPrimaryCta ?? "Partner Inquiry"}</span>
            </a>
            <a className="btn" href="#providers">
              {marketing?.partnershipsSecondaryCta ?? "Provider Network"}
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
              {marketing?.providerSectionTitle ? marketing.providerSectionTitle.replace("verified", "<span className=\"goldHover\">verified</span>") : "Become <span className=\"goldHover\">verified</span>"}
            </h3>
            <p style={{ marginTop: 10, color: "rgba(255,255,255,.66)", lineHeight: 1.7 }}>
              {marketing?.providerSectionSubtitle ?? "Providers are searchable only after admin verification. This protects clients and preserves brand standards."}
            </p>
            <div style={{ color: "rgba(255,255,255,.56)", fontSize: 13, lineHeight: 1.65 }}>
              Admin email: <b>{marketing?.providerSectionEmail ?? "seaointeralia@gmail.com"}</b>
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
            {(marketing?.footerLinks ?? [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }, { label: "Provider Standards", href: "#" }]).map((link) => (
              <a key={link.label} href={link.href} style={{ opacity: 0.9 }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
