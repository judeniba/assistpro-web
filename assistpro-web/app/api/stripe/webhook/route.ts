import { NextResponse } from "next/server";
import { bookings } from "@/lib/store";
import { stripe, getCheckoutMode } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (getCheckoutMode() === "mock") {
    const body = await request.json().catch(() => ({}));
    const bookingId = typeof body?.bookingId === "string" ? body.bookingId : undefined;
    if (bookingId) {
      const booking = bookings.get(bookingId);
      if (booking) {
        bookings.set(bookingId, { ...booking, status: "confirmed" });
      }
    }
    return NextResponse.json({ ok: true, mode: "mock" });
  }

  if (!stripe) {
    return NextResponse.json({ ok: false, error: "Stripe not configured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, error: "Missing signature or secret" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { metadata?: { bookingId?: string } };
    const bookingId = session.metadata?.bookingId;
    if (bookingId) {
      const booking = bookings.get(bookingId);
      if (booking) {
        bookings.set(bookingId, { ...booking, status: "confirmed" });
      }
    }
  }

  return NextResponse.json({ ok: true });
}
