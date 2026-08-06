import { NextResponse } from "next/server";
import { getMarketingContent } from "@/lib/marketing";
import { fetchStrapi, isStrapiEnabled, normalizeStrapiMarketingContent } from "@/lib/strapi";

export async function GET() {
  if (isStrapiEnabled()) {
    try {
      const contentType = process.env.STRAPI_MARKETING_CONTENT_TYPE ?? "marketing-contents";
      const payload = await fetchStrapi<{ data: Array<{ id: number; attributes: Record<string, unknown> }> }>(`/api/${contentType}?populate=*`);
      const content = normalizeStrapiMarketingContent(payload as { data: Array<{ id: number; attributes: { heroTitle?: string; heroSubtitle?: string; channels?: string[]; campaignIdeas?: string[]; primaryCta?: string; title?: string; subtitle?: string; cta?: string } }> });
      if (content) return NextResponse.json(content);
    } catch {
      // Fall back to the bundled marketing content.
    }
  }

  return NextResponse.json(getMarketingContent());
}
