import Link from "next/link";
import type { Provider } from "@/lib/types";
import { Star, MapPin } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  "Personal Assistant": "rgba(215,169,58,.18)",
  Driver:               "rgba(96,165,250,.14)",
  Chaperone:            "rgba(167,139,250,.14)",
  Hostess:              "rgba(249,168,212,.14)",
  Artist:               "rgba(110,231,183,.14)",
};

export default function ProviderCard({ provider }: { provider: Provider }) {
  const isTopRated = provider.rating >= 4.8;

  return (
    <div
      className="panel"
      style={{
        padding: 22,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          {isTopRated && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 999,
                marginBottom: 8,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                color: "#f5d37b",
                background: "rgba(245, 211, 123, 0.14)",
                border: "1px solid rgba(245, 211, 123, 0.28)",
              }}
            >
              <Star size={12} fill="currentColor" />
              Top Rated
            </div>
          )}
          <div style={{ fontWeight: 900, fontSize: 17 }}>{provider.name}</div>
          <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                display: "inline-block",
                padding: "3px 10px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".05em",
                background: CATEGORY_COLORS[provider.category] ?? "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              {provider.category}
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
            <Star size={13} fill="currentColor" style={{ color: "#f5d37b" }} />
            <span style={{ fontWeight: 800, fontSize: 14 }}>{provider.rating}</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", marginTop: 2 }}>
            {provider.reviewCount} reviews
          </div>
        </div>
      </div>

      {/* Bio */}
      <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,.62)", lineHeight: 1.65, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {provider.bio}
      </p>

      {/* Meta */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(255,255,255,.55)" }}>
          <MapPin size={12} />
          {provider.location}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)" }}>
          {provider.languages.join(" · ")}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 4 }}>
        <div>
          <div className="goldHover" style={{ fontWeight: 900, fontSize: 15 }}>{provider.rate}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 1 }}>
            {provider.availableModes.join(" · ")}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href={`/providers/${provider.id}`} className="btn" style={{ padding: "8px 14px", fontSize: 13 }}>
            Profile
          </Link>
          <Link href={`/book/${provider.id}`} className="btn btnPrimary" style={{ padding: "8px 14px", fontSize: 13 }}>
            <span className="goldHover">Book</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
