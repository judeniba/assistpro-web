import { NextResponse } from "next/server";
import { bookings, providers } from "@/lib/store";
import { getCurrentSession } from "@/lib/auth";
import type { BookingStatus } from "@/lib/types";

const VALID_STATUSES: BookingStatus[] = ["pending", "confirmed", "cancelled", "completed"];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const booking = bookings.get(id);
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const newStatus = body.status as BookingStatus;
  if (!VALID_STATUSES.includes(newStatus)) {
    return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
  }

  const providerProfile = Array.from(providers.values()).find((p) => p.userId === session.userId);
  const isAdmin = session.role === "admin";
  const isClientCancelling = session.role === "client" && booking.clientId === session.userId && newStatus === "cancelled";
  const isProviderAdvance = session.role === "provider" && providerProfile?.id === booking.providerId && ["confirmed", "completed"].includes(newStatus);
  const isOwner = isAdmin || isClientCancelling || isProviderAdvance;

  if (!isOwner) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = { ...booking, status: newStatus };
  bookings.set(id, updated);
  return NextResponse.json(updated);
}
