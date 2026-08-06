"use server";

import { bookings, providers } from "@/lib/store";
import { getCurrentSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { BookingStatus } from "@/lib/types";

function revalidateDashboardPaths() {
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/provider");
  revalidatePath("/admin");
}

export async function cancelBooking(bookingId: string) {
  const session = await getCurrentSession();
  if (!session || session.role !== "client") throw new Error("Forbidden");

  const booking = bookings.get(bookingId);
  if (!booking || booking.clientId !== session.userId) throw new Error("Not found");
  if (booking.status !== "pending") throw new Error("Only pending bookings can be cancelled");

  bookings.set(bookingId, { ...booking, status: "cancelled" });
  revalidateDashboardPaths();
}

export async function updateBookingStatus(bookingId: string, status: "confirmed" | "completed") {
  const session = await getCurrentSession();
  if (!session || session.role !== "provider") throw new Error("Forbidden");

  const profile = Array.from(providers.values()).find((p) => p.userId === session.userId);
  const booking = bookings.get(bookingId);
  if (!booking || booking.providerId !== profile?.id) throw new Error("Not found");

  bookings.set(bookingId, { ...booking, status: status as BookingStatus });
  revalidateDashboardPaths();
}

export async function toggleProviderVerification(providerId: string, verified: boolean) {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") throw new Error("Forbidden");

  const provider = providers.get(providerId);
  if (!provider) throw new Error("Not found");

  providers.set(providerId, { ...provider, verified });
  revalidateDashboardPaths();
}
