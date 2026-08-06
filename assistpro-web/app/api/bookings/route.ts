import { NextResponse } from "next/server";
import { bookings, providers } from "@/lib/store";
import { getCurrentSession } from "@/lib/auth";
import { createPaymentIntent, hasBookingConflict, validateBookingInput } from "@/lib/booking";
import { stripe, getStripeCheckoutUrl, getCheckoutMode } from "@/lib/stripe";
import { fetchStrapi, isStrapiEnabled, normalizeStrapiBookings } from "@/lib/strapi";
import type { BookingMode } from "@/lib/types";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (isStrapiEnabled()) {
    try {
      const payload = await fetchStrapi<{ data: Array<{ id: number; attributes: Record<string, unknown> }> }>('/api/bookings?populate=*');
      const list = normalizeStrapiBookings(payload as { data: Array<{ id: number; attributes: { clientId: string; clientName: string; providerId: string; providerName: string; category: any; startDate: string; endDate: string; mode: any; status: any; notes?: string; totalCost: string; createdAt: string } }> });
      const filtered = session.role === "client"
        ? list.filter((booking) => booking.clientId === session.userId)
        : session.role === "provider"
          ? list.filter((booking) => booking.providerId === session.userId || booking.providerId === session.userId)
          : list;
      return NextResponse.json(filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    } catch {
      // Fall back to the local store if Strapi is unavailable.
    }
  }

  let list = Array.from(bookings.values());

  if (session.role === "client") {
    list = list.filter((b) => b.clientId === session.userId);
  } else if (session.role === "provider") {
    const profile = Array.from(providers.values()).find((p) => p.userId === session.userId);
    list = profile ? list.filter((b) => b.providerId === profile.id) : [];
  }
  // admin sees all

  return NextResponse.json(
    list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  );
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "client") {
    return NextResponse.json({ error: "Only clients can create bookings" }, { status: 403 });
  }

  let body: { providerId?: string; startDate?: string; endDate?: string; mode?: string; notes?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const validation = validateBookingInput(body);
  if (validation.error || !validation.normalized) {
    return NextResponse.json({ error: validation.error ?? "Invalid booking request" }, { status: 400 });
  }

  const { providerId, startDate, endDate, mode, notes } = validation.normalized;
  const provider = providers.get(providerId);
  if (!provider?.verified) {
    return NextResponse.json({ error: "Provider not found" }, { status: 404 });
  }
  if (!provider.availableModes.includes(mode as BookingMode)) {
    return NextResponse.json({ error: "Provider does not support this booking mode" }, { status: 400 });
  }

  const existingBookings = Array.from(bookings.values()).filter((booking) => booking.providerId === providerId);
  if (hasBookingConflict(existingBookings, providerId, startDate, endDate)) {
    return NextResponse.json({ error: "This provider already has a booking overlapping those dates." }, { status: 409 });
  }

  const id = crypto.randomUUID();
  const booking = {
    id,
    clientId: session.userId,
    clientName: session.name,
    providerId,
    providerName: provider.name,
    category: provider.category,
    startDate,
    endDate,
    mode,
    status: "pending" as const,
    notes,
    totalCost: provider.rate,
    createdAt: new Date().toISOString(),
  };

  const paymentIntent = createPaymentIntent(booking);
  let checkoutUrl: string | null = null;

  if (getCheckoutMode() === "mock") {
    checkoutUrl = `/stripe/success?mock=1`;
  } else if (stripe) {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/stripe/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/stripe/cancel`,
        metadata: { bookingId: id },
        line_items: [
          {
            price_data: {
              currency: paymentIntent.currency.toLowerCase(),
              product_data: { name: `${provider.name} booking` },
              unit_amount: Math.round(paymentIntent.amount * 100),
            },
            quantity: 1,
          },
        ],
      });
      checkoutUrl = session.url;
    } catch {
      checkoutUrl = getStripeCheckoutUrl(paymentIntent.amount);
    }
  } else {
    checkoutUrl = getStripeCheckoutUrl(paymentIntent.amount);
  }

  bookings.set(id, booking);
  return NextResponse.json({ booking, paymentIntent, checkoutUrl }, { status: 201 });
}
