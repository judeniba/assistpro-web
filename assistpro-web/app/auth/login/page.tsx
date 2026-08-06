"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginWithApi } from "@/lib/data";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const investorIntent = searchParams.get("intent") === "investor";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { user, redirectTo } = await loginWithApi({ email, password });
      router.refresh();
      router.push(investorIntent && user.role === "client" ? "/dashboard/investor" : redirectTo ?? (user.role === "admin" ? "/admin" : user.role === "provider" ? "/dashboard/provider" : "/dashboard"));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed.");
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ paddingTop: 64, minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ maxWidth: 440 }}>
        <div className="panel" style={{ padding: "36px 32px" }}>
          <div className="heroKicker">{investorIntent ? "Investor sign in" : "Secure access"}</div>
          <h1 className="sectionTitle" style={{ margin: "0 0 8px", fontSize: 26 }}>
            {investorIntent ? <><span className="goldHover">Access</span> your investment profile</> : <><span className="goldHover">Sign in</span> to AssistPro</>}
          </h1>
          <p className="mutedText" style={{ margin: "0 0 28px" }}>
            {investorIntent
              ? "Use your approved client account to review your investor access and portfolio details."
              : <><span>Demo: </span><span style={{ color: "rgba(245, 211, 123, 0.95)" }}>james@example.com</span><span> / </span><span style={{ color: "rgba(245, 211, 123, 0.95)" }}>demo123!</span></>}
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label>Email</label>
              <input type="email" required autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Password</label>
              <input type="password" required autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

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
              <span className="goldHover">{loading ? "Signing in…" : "Sign In →"}</span>
            </button>
          </form>

          <p style={{ marginTop: 22, textAlign: "center", fontSize: 13, color: "rgba(255,255,255,.45)" }}>
            No account?{" "}
            <Link href={investorIntent ? "/auth/register?intent=investor" : "/auth/register"} style={{ color: "rgba(215,169,58,.8)" }}>
              Join AssistPro
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
