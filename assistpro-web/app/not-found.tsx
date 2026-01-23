"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        color: "var(--fg)",
      }}
    >
      <div className="container" style={{ textAlign: "center", maxWidth: 600 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          <span className="goldHover">404</span>
        </div>
        <h1 style={{ fontSize: 32, margin: "0 0 16px", fontWeight: 900 }}>
          Page Not Found
        </h1>
        <p
          style={{
            color: "var(--muted)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btnPrimary">
          <span className="goldHover">Back to Home</span>
        </Link>
      </div>
    </main>
  );
}
