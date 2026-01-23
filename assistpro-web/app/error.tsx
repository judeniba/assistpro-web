"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

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
          <span className="goldHover">Oops!</span>
        </div>
        <h1 style={{ fontSize: 32, margin: "0 0 16px", fontWeight: 900 }}>
          Something went wrong
        </h1>
        <p
          style={{
            color: "var(--muted)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}
        >
          We&apos;re sorry for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="btn btnPrimary"
          style={{ cursor: "pointer" }}
        >
          <span className="goldHover">Try Again</span>
        </button>
      </div>
    </main>
  );
}
