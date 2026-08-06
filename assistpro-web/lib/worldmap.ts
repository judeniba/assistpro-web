import type { Provider } from "./types";

export interface WorldMapPoint {
  id: string;
  providerId: string;
  providerName: string;
  category: Provider["category"];
  location: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  rating: number;
}

export interface WorldMapPayload {
  points: WorldMapPoint[];
  regions: Array<{
    country: string;
    count: number;
  }>;
}

const fallbackCoordinates: Record<string, { lat: number; lng: number }> = {
  "United Kingdom": { lat: 55.3781, lng: -3.436 },
  "UAE": { lat: 23.4241, lng: 53.8478 },
  "United States": { lat: 37.0902, lng: -95.7129 },
  "Canada": { lat: 56.1304, lng: -106.3468 },
  "France": { lat: 46.2276, lng: 2.2137 },
  "Italy": { lat: 41.8719, lng: 12.5674 },
  "Spain": { lat: 40.4637, lng: -3.7492 },
  "Germany": { lat: 51.1657, lng: 10.4515 },
  "Singapore": { lat: 1.3521, lng: 103.8198 },
  "Australia": { lat: -25.2744, lng: 133.7751 },
  "India": { lat: 20.5937, lng: 78.9629 },
  "Japan": { lat: 36.2048, lng: 138.2529 },
};

function extractCountry(location: string): string {
  const normalized = location.trim();
  const match = normalized.match(/,\s*([A-Za-z .()&'-]+)$/);
  return match?.[1]?.trim() || normalized;
}

function inferCoordinates(location: string) {
  const country = extractCountry(location);
  return fallbackCoordinates[country] ?? fallbackCoordinates["United Kingdom"];
}

export async function buildWorldMapPayload(providers: Provider[]): Promise<WorldMapPayload> {
  const points = providers
    .filter((provider) => provider.verified)
    .map((provider) => {
      const country = extractCountry(provider.location);
      return {
        id: `${provider.id}-map`,
        providerId: provider.id,
        providerName: provider.name,
        category: provider.category,
        location: provider.location,
        country,
        coordinates: inferCoordinates(provider.location),
        rating: provider.rating,
      } satisfies WorldMapPoint;
    });

  const regions = Array.from(new Map(points.map((point) => [point.country, 0])).keys()).map((country) => ({
    country,
    count: points.filter((point) => point.country === country).length,
  }));

  return { points, regions };
}
