import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const useMockStripe = process.env.NEXT_PUBLIC_USE_MOCK_STRIPE === "true";

export const stripe = stripeSecretKey && !useMockStripe
  ? new Stripe(stripeSecretKey, { apiVersion: "2026-07-29.dahlia" })
  : null;

export function getStripeCheckoutUrl(amount: number) {
  return `https://checkout.stripe.com/pay?amount=${Math.round(amount * 100)}`;
}

export function getCheckoutMode() {
  if (useMockStripe) return "mock";
  if (stripe) return "live";
  return "fallback";
}
