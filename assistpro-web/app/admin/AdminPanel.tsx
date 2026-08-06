"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Provider, Booking, InvestorApplication, InvestorStatus } from "@/lib/types";
import { Shield, ShieldOff, Check, X } from "lucide-react";
import { updateInvestorStatus } from "@/lib/data";

interface Props {
  initialProviders: Provider[];
  initialBookings: Booking[];
  initialInvestors: InvestorApplication[];
}

export default function AdminPanel({ initialProviders, initialBookings, initialInvestors }: Props) {
  const router = useRouter();
  const [providersList, setProviders] = useState(initialProviders);
  const [investorsList, setInvestors] = useState(initialInvestors);
  const [loading, setLoading] = useState<string | null>(null);
  const [tab, setTab] = useState<"providers" | "bookings" | "investors">("providers");

  async function toggleVerify(providerId: string, verified: boolean) {
    setLoading(providerId);
    try {
      const res = await fetch(`/api/admin/providers/${providerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified }),
      });
      if (res.ok) {
        setProviders((prev) =>
          prev.map((p) => (p.id === providerId ? { ...p, verified } : p))
        );
        router.refresh();
      }
    } finally {
      setLoading(null);
    }
  }

  async function setInvestorReviewStatus(userId: string, status: InvestorStatus) {
    setLoading(userId);
    try {
      const updated = await updateInvestorStatus(userId, status);
      setInvestors((prev) => prev.map((investor) => (investor.userId === userId ? updated : investor)));
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  const verified   = providersList.filter((p) =>  p.verified);
  const unverified = providersList.filter((p) => !p.verified);
  const approvedInvestors = investorsList.filter((investor) => investor.investorProfile.status === "approved");
  const reviewInvestors = investorsList.filter((investor) => investor.investorProfile.status !== "approved");

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {(["providers", "bookings", "investors"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="btn"
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              border: tab === t ? "1px solid rgba(215,169,58,.5)" : "1px solid rgba(255,255,255,.14)",
              background: tab === t ? "rgba(215,169,58,.1)" : "rgba(255,255,255,.04)",
            }}
          >
            {tab === t ? <span className="goldHover">{t.charAt(0).toUpperCase() + t.slice(1)}</span> : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "providers" && (
        <div>
          {/* Pending verification */}
          {unverified.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#fbbf24", letterSpacing: ".06em" }}>
                PENDING VERIFICATION ({unverified.length})
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {unverified.map((p) => (
                  <ProviderRow key={p.id} provider={p} loading={loading === p.id} onToggle={toggleVerify} />
                ))}
              </div>
            </div>
          )}

          {/* Verified */}
          <div>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#34d399", letterSpacing: ".06em" }}>
              VERIFIED ({verified.length})
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {verified.map((p) => (
                <ProviderRow key={p.id} provider={p} loading={loading === p.id} onToggle={toggleVerify} />
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "bookings" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {initialBookings.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,.4)", textAlign: "center", padding: "40px 0" }}>No bookings.</p>
          ) : (
            initialBookings.map((b) => (
              <div
                key={b.id}
                className="panelSoft"
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 3 }}>
                    {b.clientName} → {b.providerName}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>
                    {b.category} · {b.mode} · {b.startDate}
                    {b.startDate !== b.endDate ? ` – ${b.endDate}` : ""}
                  </div>
                  <div style={{ marginTop: 10, padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#f5d37b", marginBottom: 6 }}>Booking agreement</div>
                    <div style={{ fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,.62)" }}>
                      Service terms, provider confirmation, and safety standards apply. AssistPro provides platform coordination only and disclaims liability for third-party conduct beyond reasonable platform administration.
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className={`statusBadge ${b.status}`}>{b.status}</span>
                  <span className="goldHover" style={{ fontWeight: 800, fontSize: 14 }}>{b.totalCost}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "investors" && (
        <div style={{ display: "grid", gap: 28 }}>
          <div>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#93c5fd", letterSpacing: ".06em" }}>
              IN REVIEW ({reviewInvestors.length})
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {reviewInvestors.length ? reviewInvestors.map((investor) => (
                <InvestorRow key={investor.userId} investor={investor} loading={loading === investor.userId} onStatusChange={setInvestorReviewStatus} />
              )) : <p style={{ color: "rgba(255,255,255,.4)" }}>No pending investor applications.</p>}
            </div>
          </div>
          <div>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#34d399", letterSpacing: ".06em" }}>
              APPROVED ({approvedInvestors.length})
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {approvedInvestors.length ? approvedInvestors.map((investor) => (
                <InvestorRow key={investor.userId} investor={investor} loading={loading === investor.userId} onStatusChange={setInvestorReviewStatus} />
              )) : <p style={{ color: "rgba(255,255,255,.4)" }}>No approved investor applications yet.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function statusStyles(status: InvestorStatus) {
  if (status === "approved") return { color: "#34d399", borderColor: "rgba(52,211,153,.3)" };
  if (status === "under-review") return { color: "#93c5fd", borderColor: "rgba(147,197,253,.3)" };
  return { color: "#f5d37b", borderColor: "rgba(245,211,123,.3)" };
}

function InvestorRow({
  investor,
  loading,
  onStatusChange,
}: {
  investor: InvestorApplication;
  loading: boolean;
  onStatusChange: (userId: string, status: InvestorStatus) => void;
}) {
  const styles = statusStyles(investor.investorProfile.status);

  return (
    <div
      className="panelSoft"
      style={{
        padding: "16px 20px",
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, minWidth: 260 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ fontWeight: 800, fontSize: 15 }}>{investor.name}</div>
          <span className="btn" style={{ padding: "4px 10px", fontSize: 11, ...styles, textTransform: "uppercase", letterSpacing: ".08em" }}>
            {investor.investorProfile.status}
          </span>
        </div>
        <div style={{ marginTop: 4, fontSize: 12, color: "rgba(255,255,255,.5)" }}>{investor.email}</div>
        <div style={{ marginTop: 10, fontSize: 13, color: "rgba(255,255,255,.72)" }}>
          <strong>Country:</strong> {investor.investorProfile.country} · <strong>Budget:</strong> {investor.investorProfile.budget}
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color: "rgba(255,255,255,.62)", lineHeight: 1.6 }}>
          {investor.investorProfile.operatingExperience}
        </div>
        {investor.investorProfile.notes && (
          <div style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,.52)" }}>
            Notes: {investor.investorProfile.notes}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", flexWrap: "wrap" }}>
        {investor.investorProfile.status !== "under-review" && (
          <button onClick={() => onStatusChange(investor.userId, "under-review")} disabled={loading} className="btn" style={{ padding: "6px 14px", fontSize: 12, cursor: "pointer", color: "#93c5fd", borderColor: "rgba(147,197,253,.3)", opacity: loading ? 0.6 : 1 }}>
            Review
          </button>
        )}
        {investor.investorProfile.status !== "approved" && (
          <button onClick={() => onStatusChange(investor.userId, "approved")} disabled={loading} className="btn" style={{ padding: "6px 14px", fontSize: 12, cursor: "pointer", color: "#34d399", borderColor: "rgba(52,211,153,.3)", opacity: loading ? 0.6 : 1 }}>
            Approve
          </button>
        )}
        {investor.investorProfile.status !== "submitted" && (
          <button onClick={() => onStatusChange(investor.userId, "submitted")} disabled={loading} className="btn" style={{ padding: "6px 14px", fontSize: 12, cursor: "pointer", color: "#f5d37b", borderColor: "rgba(245,211,123,.3)", opacity: loading ? 0.6 : 1 }}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

function ProviderRow({
  provider,
  loading,
  onToggle,
}: {
  provider: Provider;
  loading: boolean;
  onToggle: (id: string, verified: boolean) => void;
}) {
  return (
    <div
      className="panelSoft"
      style={{
        padding: "14px 18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {provider.verified ? (
          <Shield size={16} style={{ color: "#34d399", flexShrink: 0 }} />
        ) : (
          <ShieldOff size={16} style={{ color: "#fbbf24", flexShrink: 0 }} />
        )}
        <div>
          <div style={{ fontWeight: 800, fontSize: 14 }}>{provider.name}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>
            {provider.category} · {provider.location}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {provider.verified ? (
          <button
            onClick={() => onToggle(provider.id, false)}
            disabled={loading}
            className="btn"
            style={{ padding: "6px 14px", fontSize: 12, cursor: "pointer", color: "#f87171", borderColor: "rgba(239,68,68,.3)", opacity: loading ? 0.6 : 1 }}
          >
            <X size={12} style={{ display: "inline", marginRight: 4 }} />Revoke
          </button>
        ) : (
          <button
            onClick={() => onToggle(provider.id, true)}
            disabled={loading}
            className="btn"
            style={{ padding: "6px 14px", fontSize: 12, cursor: "pointer", color: "#34d399", borderColor: "rgba(52,211,153,.3)", opacity: loading ? 0.6 : 1 }}
          >
            <Check size={12} style={{ display: "inline", marginRight: 4 }} />Approve
          </button>
        )}
      </div>
    </div>
  );
}
