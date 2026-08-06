import Link from "next/link";

export const metadata = { title: "Payment Canceled — AssistPro" };

export default function StripeCancelPage() {
  return (
    <main style={{ paddingTop: 96, minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: 620 }}>
        <div className="panel" style={{ padding: 32 }}>
          <div className="heroKicker">Payment canceled</div>
          <h1 className="sectionTitle" style={{ marginBottom: 10 }}>
            <span className="goldHover">No charge was made</span>
          </h1>
          <p className="mutedText" style={{ marginBottom: 20 }}>
            Your booking request is still available to try again whenever you are ready.
          </p>
          <Link href="/dashboard" className="btn btnPrimary" style={{ padding: "12px 20px" }}>
            <span className="goldHover">Back to dashboard</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
