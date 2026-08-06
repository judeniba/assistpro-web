import { getCurrentSession } from "@/lib/auth";
import { users } from "@/lib/store";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function NavBar() {
  const session = await getCurrentSession();
  const currentUser = session ? users.get(session.userId) : null;
  const investmentHref = session?.role === "client" ? "/dashboard/investor" : "/#investors";
  const investmentLabel = currentUser?.investorProfile ? "Investment Profile" : "Investment";

  const dashHref =
    session?.role === "admin"
      ? "/admin"
      : session?.role === "provider"
      ? "/dashboard/provider"
      : "/dashboard";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 8,
        background: "rgba(5,5,5,0.80)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      {/* Brand */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
        <div
          style={{
            width: 34, height: 34, borderRadius: 10,
            border: "1px solid rgba(255,255,255,.16)",
            background: "rgba(255,255,255,.06)",
            display: "grid", placeItems: "center",
            fontWeight: 900, fontSize: 12,
          }}
        >
          <span className="goldHover">AP</span>
        </div>
        <span style={{ fontWeight: 900, letterSpacing: ".08em", fontSize: 13, color: "rgba(255,255,255,.76)" }}>
          ASSISTPRO
        </span>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 2, marginLeft: 24, flexWrap: "wrap" }}>
        {[
          { href: "/",          label: "Home" },
          { href: "/services",  label: "Services" },
          { href: "/providers", label: "Providers" },
          { href: investmentHref, label: investmentLabel },
          { href: "/stripe/mock", label: "Mock Stripe" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              padding: "8px 14px", borderRadius: 10,
              fontSize: 14, fontWeight: 600,
              color: "rgba(255,255,255,.65)",
              textDecoration: "none",
              transition: "background 150ms ease, color 150ms ease",
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
        {session ? (
          <>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)", marginRight: 2, display: "none" }}>
              {session.name}
            </span>
            <Link
              href={dashHref}
              className="btn"
              style={{ padding: "8px 14px", fontSize: 13 }}
            >
              Dashboard
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/auth/login"    className="btn"          style={{ padding: "8px 14px", fontSize: 13 }}>Sign In</Link>
            <Link href="/auth/register" className="btn btnPrimary" style={{ padding: "8px 14px", fontSize: 13 }}>
              <span className="goldHover">Join</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
