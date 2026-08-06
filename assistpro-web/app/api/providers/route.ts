import { NextResponse } from "next/server";
import { providers } from "@/lib/store";
import { fetchStrapi, isStrapiEnabled, normalizeStrapiProviders } from "@/lib/strapi";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const q = url.searchParams.get("q")?.toLowerCase().trim();

  if (isStrapiEnabled()) {
    try {
      const payload = await fetchStrapi<{ data: Array<{ id: number; attributes: Record<string, unknown> }> }>('/api/providers?populate=*');
      const list = normalizeStrapiProviders(payload as { data: Array<{ id: number; attributes: { name: string; category: any; bio: string; languages: string[]; location: string; rate: string; rating: number; reviewCount: number; verified: boolean; availableModes: any; userId: string } }> });
      const filtered = list.filter((provider) => provider.verified);
      const searched = q
        ? filtered.filter(
            (provider) =>
              provider.name.toLowerCase().includes(q) ||
              provider.bio.toLowerCase().includes(q) ||
              provider.location.toLowerCase().includes(q) ||
              provider.languages.some((language) => language.toLowerCase().includes(q))
          )
        : filtered;
      const finalList = category
        ? searched.filter((provider) => provider.category === category)
        : searched;
      return NextResponse.json(finalList);
    } catch {
      // Fall back to the local store if Strapi is unavailable.
    }
  }

  let list = Array.from(providers.values()).filter((p) => p.verified);

  if (category) {
    list = list.filter((p) => p.category === category);
  }
  if (q) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.bio.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.languages.some((l) => l.toLowerCase().includes(q))
    );
  }

  return NextResponse.json(list);
}
