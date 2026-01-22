import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - AssistPro",
  description: "Privacy policy for AssistPro services",
};

export default function PrivacyPolicy() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <Link href="/" style={{ display: "inline-block", marginBottom: "32px", color: "var(--muted)" }}>
          ← Back to Home
        </Link>
        
        <h1 className="goldHover" style={{ fontSize: "48px", marginBottom: "16px" }}>
          Privacy Policy
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: "48px" }}>
          Last updated: January 2026
        </p>

        <div style={{ color: "var(--fg)", lineHeight: "1.8", maxWidth: "800px" }}>
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>1. Information We Collect</h2>
            <p style={{ marginBottom: "16px" }}>
              We collect information that you provide directly to us, including:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Name, email address, and phone number</li>
              <li>Billing and payment information</li>
              <li>Service preferences and requirements</li>
              <li>Communication records and correspondence</li>
              <li>Booking history and service feedback</li>
            </ul>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>2. How We Use Your Information</h2>
            <p style={{ marginBottom: "16px" }}>
              We use the information we collect to:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Provide, maintain, and improve our services</li>
              <li>Process bookings and payments</li>
              <li>Send service confirmations and updates</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>3. Information Sharing</h2>
            <p style={{ marginBottom: "16px" }}>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Service providers who assist in delivering our services</li>
              <li>Payment processors for transaction handling</li>
              <li>Professional advisors and consultants</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>4. Data Security</h2>
            <p style={{ marginBottom: "16px" }}>
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>5. Your Rights</h2>
            <p style={{ marginBottom: "16px" }}>
              You have the right to:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to certain processing activities</li>
            </ul>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>6. Contact Us</h2>
            <p style={{ marginBottom: "16px" }}>
              For privacy-related questions or requests:
              <br />
              Email: privacy@assistpro.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
