import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, Shield, Calendar } from "lucide-react";
import { getLiveProviderById } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getLiveProviderById(id);
  return { title: p ? `${p.name} — AssistPro` : "Provider — AssistPro" };
}

export default async function ProviderProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = await getLiveProviderById(id);
  if (!provider) notFound();

  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ padding: "48px 0 80px" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {/* Back */}
          <Link href="/providers" style={{ fontSize: 13, color: "rgba(255,255,255,.5)", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
            ← Back to providers
          </Link>

          {/* Profile header */}
          <div className="panel" style={{ padding: "30px 32px", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>{provider.name}</h1>
                  {provider.verified && (
                    <span title="Admin-verified" style={{ color: "#34d399", display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 700 }}>
                      <Shield size={14} /> Verified
                    </span>
                  )}
                </div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    background: "rgba(215,169,58,.14)",
                    border: "1px solid rgba(215,169,58,.3)",
                    color: "#f5d37b",
                  }}
                >
                  {provider.category}
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="goldHover" style={{ fontWeight: 900, fontSize: 22 }}>{provider.rate}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", marginTop: 4 }}>
                  <Star size={14} fill="currentColor" style={{ color: "#f5d37b" }} />
                  <span style={{ fontWeight: 800 }}>{provider.rating}</span>
                  <span style={{ color: "rgba(255,255,255,.45)", fontSize: 13 }}>({provider.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="hrGold" style={{ margin: "22px 0" }} />

            <p style={{ margin: "0 0 20px", fontSize: 15, color: "rgba(255,255,255,.72)", lineHeight: 1.75 }}>
              {provider.bio}
            </p>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "rgba(255,255,255,.6)" }}>
                <MapPin size={14} /> {provider.location}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "rgba(255,255,255,.6)" }}>
                <Calendar size={14} /> {provider.availableModes.join(" · ")}
              </div>
            </div>

            <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {provider.languages.map((lang) => (
                <span
                  key={lang}
                  style={{
                    border: "1px solid rgba(255,255,255,.12)",
                    background: "rgba(255,255,255,.06)",
                    padding: "5px 12px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "rgba(255,255,255,.7)",
                  }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: 12 }}>
            <Link href={`/book/${provider.id}`} className="btn btnPrimary" style={{ flex: 1, justifyContent: "center", padding: "16px", fontSize: 15 }}>
              <span className="goldHover">Book {provider.name.split(" ")[0]} →</span>
            </Link>
            <Link href="/providers" className="btn" style={{ padding: "16px 22px" }}>
              Browse others
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
