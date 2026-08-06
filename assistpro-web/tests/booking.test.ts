import test from "node:test";
import assert from "node:assert/strict";

import { validateBookingInput, hasBookingConflict } from "../lib/booking.ts";

test("rejects end dates before start dates", () => {
  const result = validateBookingInput({
    providerId: "p1",
    startDate: "2026-08-10",
    endDate: "2026-08-08",
    mode: "daily",
  });

  assert.equal(result.error, "End date must be on or after the start date.");
});

test("rejects unsupported booking modes", () => {
  const result = validateBookingInput({
    providerId: "p1",
    startDate: "2026-08-10",
    endDate: "2026-08-12",
    mode: "monthly",
  });

  assert.equal(result.error, "Booking mode must be daily, weekly, or event.");
});

test("detects overlapping bookings for the same provider", () => {
  const existingBookings = [
    {
      id: "bk1",
      providerId: "p1",
      status: "confirmed" as const,
      startDate: "2026-08-10",
      endDate: "2026-08-12",
    },
  ];

  const result = hasBookingConflict(existingBookings, "p1", "2026-08-11", "2026-08-13");

  assert.equal(result, true);
});
