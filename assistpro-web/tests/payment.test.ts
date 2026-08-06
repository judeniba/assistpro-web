import test from "node:test";
import assert from "node:assert/strict";

import { createPaymentIntent, capturePaymentIntent } from "../lib/booking.ts";

test("creates a payment intent from a booking total", () => {
  const intent = createPaymentIntent({ id: "bk1", totalCost: "$1,600" });

  assert.equal(intent.status, "pending");
  assert.equal(intent.amount, 1600);
  assert.equal(intent.currency, "USD");
});

test("captures a pending payment intent", () => {
  const intent = createPaymentIntent({ id: "bk2", totalCost: "$380" });
  const captured = capturePaymentIntent(intent);

  assert.equal(captured.status, "captured");
});

test("rejects capturing a non-pending payment intent", () => {
  const intent = createPaymentIntent({ id: "bk3", totalCost: "$280" });

  assert.throws(() => capturePaymentIntent({ ...intent, status: "captured" }), /Only pending payment intents can be captured/);
});
