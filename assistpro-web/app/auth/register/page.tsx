"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { registerWithApi } from "@/lib/data";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [role,     setRole]     = useState<"client" | "provider">("client");
  const [investorCountry, setInvestorCountry] = useState("");
  const [investorBudget, setInvestorBudget] = useState("");
  const [investorOperatingExperience, setInvestorOperatingExperience] = useState("");
  const [investorNotes, setInvestorNotes] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const investorIntent = searchParams.get("intent") === "investor";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (investorIntent && role === "client" && (!investorCountry.trim() || !investorBudget.trim() || !investorOperatingExperience.trim())) {
      setError("Country, budget, and operating experience are required for investor applications.");
      return;
    }
    setLoading(true);
    try {
      const { redirectTo } = await registerWithApi({
        name,
        email,
        password,
        role,
        investorCountry: investorIntent ? investorCountry : undefined,
        investorBudget: investorIntent ? investorBudget : undefined,
        investorOperatingExperience: investorIntent ? investorOperatingExperience : undefined,
        investorNotes: investorIntent ? investorNotes : undefined,
      });
      router.refresh();
      router.push(investorIntent && role === "client" ? "/dashboard/investor" : redirectTo ?? (role === "provider" ? "/dashboard/provider" : "/dashboard"));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed.");
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ paddingTop: 64, minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ maxWidth: 460 }}>
        <div className="panel" style={{ padding: "36px 32px" }}>
          <div className="heroKicker">{investorIntent ? "Investor application" : "Create your account"}</div>
          <h1 className="sectionTitle" style={{ margin: "0 0 24px", fontSize: 26 }}>
            {investorIntent ? <>Apply for <span className="goldHover">investment access</span></> : <>Join <span className="goldHover">AssistPro</span></>}
          </h1>

          {investorIntent && (
            <p className="mutedText" style={{ margin: "0 0 24px" }}>
              Create a client account to submit your investor application and unlock your investment profile once approved.
            </p>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Role toggle */}
            <div>
              <label>I am a</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {(["client", "provider"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className="btn"
                    style={{
                      padding: "12px",
                      border: role === r ? "1px solid rgba(215,169,58,.5)" : "1px solid rgba(255,255,255,.14)",
                      background: role === r ? "rgba(215,169,58,.1)" : "rgba(255,255,255,.04)",
                      cursor: "pointer",
                    }}
                  >
                    {role === r ? <span className="goldHover">{r.charAt(0).toUpperCase() + r.slice(1)}</span> : r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label>Full Name</label>
              <input type="text" required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label>Email</label>
              <input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Password (min 8 characters)</label>
              <input type="password" required minLength={8} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {investorIntent && role === "client" && (
              <>
                <div>
                  <label>Target Country</label>
                  <input type="text" required placeholder="United Arab Emirates" value={investorCountry} onChange={(e) => setInvestorCountry(e.target.value)} />
                </div>
                <div>
                  <label>Investment Budget</label>
                  <input type="text" required placeholder="$250,000-$500,000" value={investorBudget} onChange={(e) => setInvestorBudget(e.target.value)} />
                </div>
                <div>
                  <label>Operating Experience</label>
                  <textarea required placeholder="Describe your background in hospitality, marketplaces, or country operations." value={investorOperatingExperience} onChange={(e) => setInvestorOperatingExperience(e.target.value)} rows={4} />
                </div>
                <div>
                  <label>Notes</label>
                  <textarea placeholder="Optional partnership context or rollout plans." value={investorNotes} onChange={(e) => setInvestorNotes(e.target.value)} rows={3} />
                </div>
              </>
            )}

            {error && (
              <div style={{ padding: "11px 14px", borderRadius: 10, background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.3)", color: "#f87171", fontSize: 13 }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btnPrimary"
              style={{ padding: "14px", fontSize: 14, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              <span className="goldHover">{loading ? "Creating account…" : "Create Account →"}</span>
            </button>
          </form>

          <p style={{ marginTop: 22, textAlign: "center", fontSize: 13, color: "rgba(255,255,255,.45)" }}>
            Already have an account?{" "}
            <Link href={investorIntent ? "/auth/login?intent=investor" : "/auth/login"} style={{ color: "rgba(215,169,58,.8)" }}>Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
