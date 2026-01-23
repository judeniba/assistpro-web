"use client";

export default function Loading() {
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
      <div style={{ textAlign: "center" }}>
        <div
          className="loader"
          style={{
            width: 48,
            height: 48,
            border: "3px solid rgba(255, 255, 255, 0.1)",
            borderTopColor: "#d7a93a",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto",
          }}
        />
        <p
          style={{
            marginTop: 16,
            color: "var(--muted)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Loading...
        </p>
      </div>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
