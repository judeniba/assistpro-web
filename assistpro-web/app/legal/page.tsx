import Link from "next/link";

export const metadata = { title: "Legal & Booking Terms — AssistPro" };

export default function LegalPage() {
  return (
    <main style={{ paddingTop: 96, minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <div className="panel" style={{ padding: 32 }}>
          <div className="heroKicker">Legal & booking terms</div>
          <h1 className="sectionTitle" style={{ marginBottom: 10 }}>
            <span className="goldHover">AssistPro</span> booking agreement
          </h1>
          <p className="mutedText" style={{ marginBottom: 24 }}>
            These terms govern the use of the AssistPro booking platform and all service requests submitted through it.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <section className="panelSoft" style={{ padding: 18 }}>
              <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>1. Booking agreement</h2>
              <p style={{ margin: 0, color: "rgba(255,255,255,.72)", lineHeight: 1.7 }}>
                By submitting a booking request, the client agrees to the requested service scope, timing, and any stated availability for the selected provider. Provider confirmation remains required before the booking is considered fully accepted.
              </p>
            </section>

            <section className="panelSoft" style={{ padding: 18 }}>
              <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>2. Terms & conditions</h2>
              <ul style={{ margin: 0, paddingLeft: 18, color: "rgba(255,255,255,.72)", lineHeight: 1.7 }}>
                <li>All bookings are subject to provider availability, identity verification, and compliance with applicable law.</li>
                <li>Clients are responsible for providing accurate event details, contact information, and any safety or access requirements.</li>
                <li>AssistPro acts as a platform for introduction and coordination only and is not a direct employer or guarantor of provider conduct.</li>
                <li>Any payment authorization is processed through the configured payment gateway and is subject to its own terms and conditions.</li>
              </ul>
            </section>

            <section className="panelSoft" style={{ padding: 18 }}>
              <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>3. Legal disclaimer</h2>
              <p style={{ margin: 0, color: "rgba(255,255,255,.72)", lineHeight: 1.7 }}>
                AssistPro disclaims liability for third-party acts, omissions, service outcomes, or disputes arising between clients and providers beyond reasonable platform administration. By using the platform, the client confirms that they are acting lawfully and entering into the booking voluntarily.
              </p>
            </section>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            <Link href="/providers" className="btn btnPrimary" style={{ padding: "12px 18px" }}>
              <span className="goldHover">Browse providers</span>
            </Link>
            <Link href="/dashboard" className="btn" style={{ padding: "12px 18px" }}>
              Return to dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
