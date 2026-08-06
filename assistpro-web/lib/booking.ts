import type { Booking, BookingMode, PaymentIntent, Provider } from "./types";

export interface BookingInput {
  providerId?: string;
  startDate?: string;
  endDate?: string;
  mode?: string;
  notes?: string;
}

export interface BookingValidationResult {
  error?: string;
  normalized?: {
    providerId: string;
    startDate: string;
    endDate: string;
    mode: BookingMode;
    notes?: string;
  };
}

const VALID_MODES: BookingMode[] = ["daily", "weekly", "event"];

export function normalizeBookingMode(mode: string): BookingMode | undefined {
  return VALID_MODES.find((value) => value === mode);
}

export function validateBookingInput(input: BookingInput): BookingValidationResult {
  const { providerId, startDate, endDate, mode, notes } = input;

  if (!providerId || !startDate || !endDate || !mode) {
    return { error: "providerId, startDate, endDate, and mode are required." };
  }

  if (!normalizeBookingMode(mode)) {
    return { error: "Booking mode must be daily, weekly, or event." };
  }

  if (new Date(endDate) < new Date(startDate)) {
    return { error: "End date must be on or after the start date." };
  }

  return {
    normalized: {
      providerId,
      startDate,
      endDate,
      mode: mode as BookingMode,
      notes: notes?.trim() || undefined,
    },
  };
}

export function hasBookingConflict(
  bookings: Pick<Booking, "providerId" | "startDate" | "endDate" | "status">[],
  providerId: string,
  startDate: string,
  endDate: string
): boolean {
  const requestedStart = new Date(startDate);
  const requestedEnd = new Date(endDate);

  return bookings.some((booking) => {
    if (booking.providerId !== providerId || booking.status === "cancelled") return false;

    const existingStart = new Date(booking.startDate);
    const existingEnd = new Date(booking.endDate);

    return requestedStart <= existingEnd && requestedEnd >= existingStart;
  });
}

export function getBookingSummary(provider: Provider, booking: Pick<Booking, "mode" | "startDate" | "endDate">): string {
  return `${provider.name} • ${booking.mode} • ${booking.startDate} → ${booking.endDate}`;
}

export function createPaymentIntent(booking: Pick<Booking, "id" | "totalCost">): PaymentIntent {
  const amount = Number.parseFloat(booking.totalCost.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Invalid booking total");
  }

  return {
    id: `pi_${booking.id}`,
    bookingId: booking.id,
    amount,
    currency: "USD",
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}

export function capturePaymentIntent(intent: PaymentIntent): PaymentIntent {
  if (intent.status !== "pending") {
    throw new Error("Only pending payment intents can be captured");
  }

  return { ...intent, status: "captured" };
}
