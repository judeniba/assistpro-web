import Link from "next/link";

export const metadata = { title: "Payment Success — AssistPro" };

export default async function StripeSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ mock?: string }>;
}) {
  const params = await searchParams;
  const isMock = params?.mock === "1";

  return (
    <main style={{ paddingTop: 96, minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: 620 }}>
        <div className="panel" style={{ padding: 32 }}>
          <div className="heroKicker">Payment complete</div>
          <h1 className="sectionTitle" style={{ marginBottom: 10 }}>
            <span className="goldHover">Thanks for booking</span>
          </h1>
          <p className="mutedText" style={{ marginBottom: 20 }}>
            {isMock
              ? "This was a local mock checkout. Your booking flow is ready for real Stripe once credentials are configured."
              : "Your payment was received and your booking request is now confirmed."}
          </p>
          <div className="panelSoft" style={{ padding: 16, marginBottom: 18, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontWeight: 800, fontSize: 14 }}>Booking agreement recap</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: "rgba(255,255,255,.72)", lineHeight: 1.7, fontSize: 13 }}>
              <li>You agreed to the booking request terms, service scope, and stated availability for the selected provider.</li>
              <li>You understand that the provider may require additional confirmation, identity verification, or event-specific instructions.</li>
              <li>You acknowledge that AssistPro provides a platform for introduction and coordination only and is not a direct employer or guarantor of the provider’s conduct.</li>
              <li>You accept that all bookings remain subject to provider confirmation, applicable law, and the platform’s safety and conduct standards.</li>
            </ul>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: "rgba(255,255,255,.58)" }}>
              Legal disclaimer: By completing this booking, you confirm that you are acting lawfully and that any fees, service terms, and communications are entered into voluntarily. AssistPro disclaims liability for third-party acts, omissions, or service outcomes beyond reasonable platform administration.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
            <Link href="/legal" className="btn" style={{ padding: "12px 18px" }}>
              Read full terms
            </Link>
            <Link href="/dashboard" className="btn btnPrimary" style={{ padding: "12px 20px" }}>
              <span className="goldHover">Go to dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
