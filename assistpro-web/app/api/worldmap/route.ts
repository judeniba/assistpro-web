import { NextResponse } from "next/server";
import { getLiveProviders } from "@/lib/data";
import { buildWorldMapPayload } from "@/lib/worldmap";

export async function GET() {
  const providers = await getLiveProviders();
  const payload = await buildWorldMapPayload(providers);
  return NextResponse.json(payload);
}
