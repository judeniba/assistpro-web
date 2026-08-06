import { NextResponse } from "next/server";
import { providers } from "@/lib/store";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const provider = providers.get(id);
  if (!provider || !provider.verified) {
    return NextResponse.json({ error: "Provider not found" }, { status: 404 });
  }
  return NextResponse.json(provider);
}
