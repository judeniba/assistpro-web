import ProviderCard from "@/components/ProviderCard";
import type { ServiceCategory } from "@/lib/types";
import { getLiveProviders } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = { title: "Providers — AssistPro" };

const CATEGORIES: ServiceCategory[] = [
  "Personal Assistant",
  "Driver",
  "Chaperone",
  "Hostess",
  "Artist",
];

export default async function ProvidersPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; topRated?: string }>;
}) {
  const { category, q, topRated } = await searchParams;
  const query = q?.toLowerCase().trim();
  const showTopRatedOnly = topRated === "1";

  let list = await getLiveProviders({
    category: category && CATEGORIES.includes(category as ServiceCategory) ? category : undefined,
    q: query ?? undefined,
  });

  if (showTopRatedOnly) {
    list = list.filter((provider) => provider.rating >= 4.8);
  }

  return (
    <main style={{ paddingTop: 64 }}>
      {/* Header */}
      <section style={{ padding: "48px 0 32px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div className="container">
          <div className="heroKicker">Verified network</div>
          <h1 className="sectionTitle" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            <span className="goldHover">Verified</span> providers
          </h1>
          <p className="mutedText" style={{ marginTop: 10 }}>
            {list.length} provider{list.length !== 1 ? "s" : ""} available
            {category ? ` · ${category}` : ""}
          </p>

          <form method="get" action="/providers" className="panelSoft" style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap", padding: 16 }}>
            <select
              name="category"
              defaultValue={category ?? ""}
              style={{ width: "auto", flexShrink: 0 }}
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              name="q"
              type="search"
              placeholder="Search name, language, location…"
              defaultValue={q ?? ""}
              style={{ maxWidth: 320 }}
            />
            <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,.72)" }}>
              <input type="checkbox" name="topRated" value="1" defaultChecked={showTopRatedOnly} />
              Top Rated
            </label>
            <button type="submit" className="btn btnPrimary" style={{ width: "auto", padding: "12px 22px" }}>
              <span className="goldHover">Search</span>
            </button>
            {(category || q || showTopRatedOnly) && (
              <a href="/providers" className="btn" style={{ padding: "12px 18px" }}>Clear</a>
            )}
          </form>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          {list.length === 0 ? (
            <div className="emptyState" style={{ marginTop: 18 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>—</div>
              <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,.78)" }}>No providers match your search.</p>
              <a href="/providers" style={{ display: "inline-block", marginTop: 16, color: "rgba(215,169,58,.8)" }}>
                Clear filters
              </a>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 18,
              }}
            >
              {list.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
