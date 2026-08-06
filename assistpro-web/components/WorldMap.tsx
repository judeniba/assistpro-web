"use client";

import { useEffect, useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import type { WorldMapPayload } from "@/lib/worldmap";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type MapGeography = {
  rsmKey: string;
};

export default function WorldMap() {
  const [data, setData] = useState<WorldMapPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/worldmap")
      .then((res) => res.json())
      .then((payload: WorldMapPayload) => {
        if (active) setData(payload);
      })
      .catch(() => {
        if (active) setData({ points: [], regions: [] });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const summary = useMemo(() => {
    if (!data) return null;
    return data.regions.slice(0, 6).map((region) => `${region.country} (${region.count})`).join(" · ");
  }, [data]);

  const pointsWithCoordinates = useMemo(() => data?.points.filter((point) => point.coordinates) ?? [], [data]);

  return (
    <section style={{ padding: "36px 0 72px" }}>
      <div className="container">
        <div className="panelSoft" style={{ padding: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
            <div>
              <div className="heroKicker">Global coverage</div>
              <h2 className="sectionTitle" style={{ fontSize: "clamp(22px, 2.4vw, 32px)", marginTop: 6 }}>
                Clients can book from anywhere in the world
              </h2>
            </div>
            <div style={{ opacity: 0.8, fontSize: 13 }}>
              {loading ? "Loading live provider footprint…" : summary ?? "No provider footprint available yet"}
            </div>
          </div>

          <div
            style={{
              marginTop: 20,
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 18,
              padding: 20,
              background: "linear-gradient(135deg, rgba(255,255,255,.06), rgba(215,169,58,.08))",
            }}
          >
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ fontSize: 14, opacity: 0.8 }}>
                Interactive map of verified providers with live location markers.
              </div>

              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1.4fr) minmax(240px, 0.7fr)" }}>
                <div style={{ minHeight: 320, borderRadius: 16, overflow: "hidden", background: "rgba(4, 8, 20, 0.72)", border: "1px solid rgba(255,255,255,.08)" }}>
                  <ComposableMap projection="geoEqualEarth" projectionConfig={{ scale: 180 }} style={{ width: "100%", height: 360 }}>
                    <Geographies geography={geoUrl}>
                      {({ geographies }: { geographies: MapGeography[] }) =>
                        geographies.map((geo: MapGeography) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="rgba(255,255,255,0.12)"
                            stroke="rgba(255,255,255,0.18)"
                            style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                          />
                        ))
                      }
                    </Geographies>
                    {pointsWithCoordinates.map((point) => (
                      <Marker
                        key={point.id}
                        coordinates={[point.coordinates!.lng, point.coordinates!.lat]}
                        onMouseEnter={() => setHoveredPoint(point.providerName)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <circle r={5} fill="#f5d37b" stroke="#111827" strokeWidth={1.2} />
                      </Marker>
                    ))}
                  </ComposableMap>
                </div>

                <div style={{ display: "grid", gap: 10, alignContent: "start" }}>
                  {pointsWithCoordinates.length ? (
                    pointsWithCoordinates.slice(0, 6).map((point) => (
                      <div key={point.id} style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,.05)", border: hoveredPoint === point.providerName ? "1px solid rgba(245,211,123,.55)" : "1px solid transparent" }}>
                        <div style={{ fontWeight: 800 }}>{point.providerName}</div>
                        <div style={{ marginTop: 4, fontSize: 13, opacity: 0.75 }}>{point.location}</div>
                        <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>{point.country} · {point.rating.toFixed(1)} ★</div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,.05)" }}>
                      No verified providers are currently mapped.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
