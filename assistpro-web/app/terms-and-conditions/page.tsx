import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions - AssistPro",
  description: "Terms and conditions for using AssistPro services",
};

export default function TermsAndConditions() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <Link href="/" style={{ display: "inline-block", marginBottom: "32px", color: "var(--muted)" }}>
          ← Back to Home
        </Link>
        
        <h1 className="goldHover" style={{ fontSize: "48px", marginBottom: "16px" }}>
          Terms and Conditions
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: "48px" }}>
          Last updated: January 2026
        </p>

        <div style={{ color: "var(--fg)", lineHeight: "1.8", maxWidth: "800px" }}>
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>1. Acceptance of Terms</h2>
            <p style={{ marginBottom: "16px" }}>
              By accessing and using AssistPro's services, you accept and agree to be bound by the terms
              and provisions of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>2. Service Description</h2>
            <p style={{ marginBottom: "16px" }}>
              AssistPro provides professional assistance services including but not limited to:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Personal assistant services</li>
              <li>Professional driver services</li>
              <li>Event chaperone services</li>
              <li>Hospitality and hostess services</li>
              <li>Verified artist bookings</li>
            </ul>
            <p style={{ marginBottom: "16px" }}>
              All services are subject to availability and proper booking procedures.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>3. User Obligations</h2>
            <p style={{ marginBottom: "16px" }}>
              As a user of AssistPro services, you agree to:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Provide accurate and complete information during booking</li>
              <li>Treat all service providers with respect and professionalism</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Pay all fees and charges in accordance with the agreed terms</li>
              <li>Notify us promptly of any issues or concerns</li>
            </ul>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>4. Booking and Cancellation Policy</h2>
            <p style={{ marginBottom: "16px" }}>
              <strong>Booking Confirmation:</strong> All bookings must be confirmed in writing and are subject
              to availability.
            </p>
            <p style={{ marginBottom: "16px" }}>
              <strong>Cancellation:</strong> Cancellations made more than 48 hours before the scheduled service
              will receive a full refund. Cancellations made within 48 hours may be subject to a cancellation fee.
            </p>
            <p style={{ marginBottom: "16px" }}>
              <strong>No-Show Policy:</strong> Failure to show up for a scheduled service without prior
              cancellation will result in forfeiture of the full booking amount.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>5. Payment Terms</h2>
            <p style={{ marginBottom: "16px" }}>
              Payment is required at the time of booking unless otherwise arranged. We accept major credit cards
              and approved payment methods. All prices are in USD and include applicable taxes unless stated otherwise.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>6. Liability and Disclaimers</h2>
            <p style={{ marginBottom: "16px" }}>
              AssistPro strives to provide high-quality services. However, we are not liable for:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Acts or omissions of third-party service providers</li>
              <li>Indirect, incidental, or consequential damages</li>
              <li>Events beyond our reasonable control (force majeure)</li>
              <li>Loss or damage to personal property</li>
            </ul>
            <p style={{ marginBottom: "16px" }}>
              Our maximum liability is limited to the amount paid for the specific service in question.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>7. Confidentiality</h2>
            <p style={{ marginBottom: "16px" }}>
              We respect your privacy and maintain strict confidentiality of all client information.
              Service providers are required to sign confidentiality agreements and adhere to professional
              standards of discretion.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>8. Intellectual Property</h2>
            <p style={{ marginBottom: "16px" }}>
              All content on the AssistPro website, including text, graphics, logos, and software, is the
              property of AssistPro and protected by copyright laws. Unauthorized use is prohibited.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>9. Modifications to Terms</h2>
            <p style={{ marginBottom: "16px" }}>
              AssistPro reserves the right to modify these terms at any time. Changes will be effective
              immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>10. Governing Law</h2>
            <p style={{ marginBottom: "16px" }}>
              These terms are governed by and construed in accordance with applicable laws. Any disputes
              shall be resolved through binding arbitration in accordance with commercial arbitration rules.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>11. Contact Information</h2>
            <p style={{ marginBottom: "16px" }}>
              For questions about these terms, please contact us at:
              <br />
              Email: legal@assistpro.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
