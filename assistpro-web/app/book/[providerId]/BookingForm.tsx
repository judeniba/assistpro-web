"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Provider } from "@/lib/types";
import { Calendar, Clock, CreditCard, FileText, ShieldCheck, Sparkles } from "lucide-react";

export default function BookingForm({ provider }: { provider: Provider }) {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mode, setMode] = useState<string>(provider.availableModes[0] ?? "daily");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const dateSummary = startDate && endDate ? `${startDate} → ${endDate}` : "Choose your preferred dates";
  const modeLabel = (mode ?? "daily").charAt(0).toUpperCase() + (mode ?? "daily").slice(1);
  const paymentAmount = useMemo(() => {
    const cleaned = provider.rate.replace(/[^\d.]/g, "");
    const parsed = Number.parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [provider.rate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!startDate || !endDate) { setError("Please select start and end dates."); return; }
    if (endDate < startDate)   { setError("End date must be on or after start date."); return; }
    if (!agreed) { setError("Please acknowledge the booking agreement, terms, and legal disclaimer."); return; }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ providerId: provider.id, startDate, endDate, mode, notes }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error ?? "Booking failed.");
        return;
      }
      const data = await res.json().catch(() => ({}));
      const paymentIntentId = data?.paymentIntent?.id;
      const checkoutUrl = data?.checkoutUrl;
      if (checkoutUrl) {
        window.location.assign(checkoutUrl as string);
        return;
      }
      router.push(`/dashboard?booked=1${paymentIntentId ? `&payment=${paymentIntentId}` : ""}`);
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ padding: "48px 0 80px" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="panel" style={{ padding: 24, marginBottom: 24 }}>
          <div className="heroKicker">
            <Sparkles size={13} /> Premium booking request
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div>
              <h1 className="sectionTitle" style={{ marginBottom: 8 }}>
                <span className="goldHover">Reserve</span> {provider.name}
              </h1>
              <p className="mutedText" style={{ margin: 0 }}>
                {provider.category} · {provider.location}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="goldHover" style={{ fontWeight: 900, fontSize: 22 }}>{provider.rate}</div>
              <div className="mutedText" style={{ fontSize: 12, marginTop: 4 }}>Flexible requests · Confirmed quickly</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="panel" style={{ display: "flex", flexDirection: "column", gap: 20, padding: 24 }}>
          <div className="panelSoft" style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ShieldCheck size={16} className="goldHover" />
              <div>
                <div style={{ fontWeight: 800, fontSize: 14 }}>Booking overview</div>
                <div className="mutedText" style={{ fontSize: 12 }}>{dateSummary}</div>
              </div>
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 999, background: "rgba(245, 211, 123, 0.12)", border: "1px solid rgba(245, 211, 123, 0.3)", fontSize: 12, fontWeight: 800 }}>
              {modeLabel} plan
            </div>
          </div>

          <div>
            <label>Booking Mode</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              {provider.availableModes.map((m) => (
                <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Calendar size={12} /> Start Date
              </label>
              <input type="date" required value={startDate} onChange={(e) => setStartDate(e.target.value)} min={today} />
            </div>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={12} /> End Date
              </label>
              <input type="date" required value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate || today} />
            </div>
          </div>

          <div className="panelSoft" style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <CreditCard size={16} className="goldHover" />
              <div>
                <div style={{ fontWeight: 800, fontSize: 14 }}>Secure payment authorization</div>
                <div className="mutedText" style={{ fontSize: 12 }}>A pending payment intent will be created for {provider.rate}</div>
              </div>
            </div>
            <div style={{ fontWeight: 900, fontSize: 16, color: "#f5d37b" }}>${paymentAmount.toFixed(0)} USD</div>
          </div>

          <div>
            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <FileText size={12} /> Notes (optional)
            </label>
            <textarea
              rows={4}
              placeholder="Event details, language preference, special requirements…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ resize: "vertical" }}
            />
          </div>

          <div className="panelSoft" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FileText size={16} className="goldHover" />
              <div style={{ fontWeight: 800, fontSize: 14 }}>Booking agreement & terms</div>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: "rgba(255,255,255,.72)", lineHeight: 1.7, fontSize: 13 }}>
              <li>I agree to the booking request terms, service scope, and any stated availability for the selected provider.</li>
              <li>I understand that the provider may require additional confirmation, identity verification, or event-specific instructions.</li>
              <li>I acknowledge that AssistPro provides a platform for introduction and coordination only and is not a direct employer or guarantor of the provider’s conduct.</li>
              <li>I accept that all bookings are subject to provider confirmation, applicable law, and the platform’s safety and conduct standards.</li>
            </ul>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: "rgba(255,255,255,.58)" }}>
              Legal disclaimer: By submitting this request, you confirm that you are acting lawfully and that any fees, service terms, and communications are entered into voluntarily. AssistPro disclaims liability for third-party acts, omissions, or service outcomes beyond reasonable platform administration.
            </div>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,.84)" }}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              I acknowledge and accept the booking agreement, terms, and legal disclaimer.
            </label>
            <Link href="/legal" style={{ fontSize: 12, color: "rgba(255,255,255,.58)" }}>
              Read full legal & booking terms →
            </Link>
          </div>

          {error && (
            <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.3)", color: "#f87171", fontSize: 13 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btnPrimary"
            style={{ padding: "16px", fontSize: 15, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            <span className="goldHover">{loading ? "Submitting…" : "Submit Booking Request →"}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
