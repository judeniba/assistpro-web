"use client";

import { useState } from "react";
import type { InvestorProfile } from "@/lib/types";
import { saveInvestorProfile } from "@/lib/data";

export default function InvestorApplicationForm({ initialProfile }: { initialProfile: InvestorProfile | null }) {
  const [country, setCountry] = useState(initialProfile?.country ?? "");
  const [budget, setBudget] = useState(initialProfile?.budget ?? "");
  const [operatingExperience, setOperatingExperience] = useState(initialProfile?.operatingExperience ?? "");
  const [notes, setNotes] = useState(initialProfile?.notes ?? "");
  const [status, setStatus] = useState<InvestorProfile["status"] | null>(initialProfile?.status ?? null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const saved = await saveInvestorProfile({ country, budget, operatingExperience, notes });
      setStatus(saved.status);
      setMessage(saved.status === "approved" ? "Investment profile updated and remains approved." : "Investment application saved. Our team will review your profile." );
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save investor profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panelSoft" style={{ padding: 22, display: "grid", gap: 16 }}>
      <div>
        <div className="heroKicker">Investor application</div>
        <h2 className="sectionTitle" style={{ margin: "6px 0 8px", fontSize: 26 }}>
          {initialProfile ? <>Manage your <span className="goldHover">investment profile</span></> : <>Apply for <span className="goldHover">country rights</span></>}
        </h2>
        <p className="mutedText" style={{ margin: 0 }}>
          Submit your target territory, capital range, and operating background to open or update your investor profile.
        </p>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Target Country</label>
        <input type="text" required value={country} onChange={(event) => setCountry(event.target.value)} placeholder="United Arab Emirates" />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Investment Budget</label>
        <input type="text" required value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="$250,000-$500,000" />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Operating Experience</label>
        <textarea required rows={5} value={operatingExperience} onChange={(event) => setOperatingExperience(event.target.value)} placeholder="Describe your experience building hospitality, marketplace, or country operations." />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Notes</label>
        <textarea rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Optional launch plan, local partnership pipeline, or diligence notes." />
      </div>

      {status && (
        <div style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(245,211,123,.2)", background: "rgba(245,211,123,.08)", color: "rgba(255,255,255,.78)", fontSize: 13 }}>
          Current status: <span className="goldHover" style={{ fontWeight: 800, textTransform: "uppercase" }}>{status}</span>
        </div>
      )}

      {message && (
        <div style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(52,211,153,.28)", background: "rgba(52,211,153,.1)", color: "#6ee7b7", fontSize: 13 }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(239,68,68,.28)", background: "rgba(239,68,68,.1)", color: "#f87171", fontSize: 13 }}>
          {error}
        </div>
      )}

      <button type="submit" className="btn btnPrimary" disabled={loading} style={{ padding: "14px 18px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.75 : 1 }}>
        <span className="goldHover">{loading ? "Saving…" : initialProfile ? "Update investment profile" : "Submit investor application"}</span>
      </button>
    </form>
  );
}