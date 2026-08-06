"use client";

import { useState } from "react";

export default function MockStripePage() {
  const [bookingId, setBookingId] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!bookingId.trim()) {
      setStatus("Please enter a booking ID.");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/stripe/webhook", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ bookingId: bookingId.trim() }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || "Unable to simulate checkout.");
      }

      setStatus(`Mock checkout completed for booking ${bookingId.trim()}.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(63,94,251,0.18),_transparent_55%)] px-4 py-16 text-slate-100">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Local testing</p>
          <h1 className="text-3xl font-semibold">Mock Stripe checkout simulator</h1>
          <p className="text-sm text-slate-400">
            Use this page to confirm a booking locally as if Stripe completed checkout. It is meant for development and demo flows only.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
          <label htmlFor="bookingId" className="text-sm font-medium text-slate-300">
            Booking ID
          </label>
          <input
            id="bookingId"
            value={bookingId}
            onChange={(event) => setBookingId(event.target.value)}
            placeholder="Enter a booking ID"
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-cyan-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Confirming..." : "Trigger mock success"}
          </button>
        </form>

        {status ? (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            {status}
          </div>
        ) : null}
      </div>
    </main>
  );
}
