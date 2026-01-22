import Link from "next/link";

export const metadata = {
  title: "Service Agreement - AssistPro",
  description: "Service agreement for AssistPro clients",
};

export default function ServiceAgreement() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <Link href="/" style={{ display: "inline-block", marginBottom: "32px", color: "var(--muted)" }}>
          ← Back to Home
        </Link>
        
        <h1 className="goldHover" style={{ fontSize: "48px", marginBottom: "16px" }}>
          Service Agreement
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: "48px" }}>
          Last updated: January 2026
        </p>

        <div style={{ color: "var(--fg)", lineHeight: "1.8", maxWidth: "800px" }}>
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Agreement Overview</h2>
            <p style={{ marginBottom: "16px" }}>
              This Service Agreement ("Agreement") is entered into between AssistPro ("Provider") and the
              client ("Client") for the provision of professional assistance services. By booking services
              through AssistPro, the Client agrees to the terms outlined in this Agreement.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>1. Scope of Services</h2>
            <p style={{ marginBottom: "16px" }}>
              AssistPro agrees to provide the following services as requested and confirmed in the booking:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li><strong>Personal Assistant Services:</strong> Scheduling, travel coordination, and lifestyle management support</li>
              <li><strong>Driver Services:</strong> Professional chauffeur services using client-provided vehicles</li>
              <li><strong>Chaperone Services:</strong> Professional accompaniment for events and travel</li>
              <li><strong>Hostess Services:</strong> Event hospitality and VIP guest management</li>
              <li><strong>Artist Services:</strong> Verified talent for performances and events</li>
            </ul>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>2. Service Standards</h2>
            <p style={{ marginBottom: "16px" }}>
              AssistPro commits to:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Provide thoroughly vetted and verified service professionals</li>
              <li>Ensure all service providers undergo background checks and verification processes</li>
              <li>Maintain the highest standards of professionalism and discretion</li>
              <li>Respond to service requests and inquiries within 24 hours during business days</li>
              <li>Provide replacement personnel if scheduled providers are unavailable due to emergencies</li>
            </ul>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>3. Client Responsibilities</h2>
            <p style={{ marginBottom: "16px" }}>
              The Client agrees to:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Provide accurate service requirements and booking details</li>
              <li>Ensure a safe and professional work environment for service providers</li>
              <li>Treat all service professionals with respect and professionalism</li>
              <li>Make timely payments according to the agreed schedule</li>
              <li>Provide necessary access, equipment, and resources for service delivery</li>
              <li>Give reasonable notice for any changes or cancellations</li>
            </ul>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>4. Pricing and Payment</h2>
            <p style={{ marginBottom: "16px" }}>
              <strong>Service Rates:</strong> Rates are provided at the time of booking and vary based on
              service type, duration, and specific requirements.
            </p>
            <p style={{ marginBottom: "16px" }}>
              <strong>Payment Schedule:</strong> Payment is due at the time of booking unless a different
              arrangement has been approved in writing.
            </p>
            <p style={{ marginBottom: "16px" }}>
              <strong>Additional Charges:</strong> Any additional services or extended hours requested during
              service delivery will be billed at the agreed hourly rate.
            </p>
            <p style={{ marginBottom: "16px" }}>
              <strong>Late Payments:</strong> Late payments may be subject to a 5% monthly finance charge.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>5. Cancellation and Rescheduling</h2>
            <p style={{ marginBottom: "16px" }}>
              <strong>Client Cancellations:</strong>
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>More than 48 hours notice: Full refund</li>
              <li>24-48 hours notice: 50% cancellation fee</li>
              <li>Less than 24 hours notice: 100% cancellation fee</li>
            </ul>
            <p style={{ marginBottom: "16px" }}>
              <strong>Provider Cancellations:</strong> If AssistPro cancels a confirmed booking, the Client
              will receive a full refund and, where possible, alternative service arrangements.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>6. Confidentiality and Non-Disclosure</h2>
            <p style={{ marginBottom: "16px" }}>
              Both parties agree to maintain strict confidentiality regarding:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Personal information and private matters</li>
              <li>Business information and trade secrets</li>
              <li>Service arrangements and locations</li>
              <li>Any sensitive information learned during service provision</li>
            </ul>
            <p style={{ marginBottom: "16px" }}>
              All service providers are required to sign separate confidentiality agreements.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>7. Insurance and Liability</h2>
            <p style={{ marginBottom: "16px" }}>
              AssistPro maintains appropriate liability insurance for service provision. However:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>The Client is responsible for their own property and valuables</li>
              <li>AssistPro is not liable for consequential or indirect damages</li>
              <li>Claims must be reported within 7 days of the incident</li>
              <li>Maximum liability is limited to the service fee paid</li>
            </ul>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>8. Code of Conduct</h2>
            <p style={{ marginBottom: "16px" }}>
              AssistPro operates under a strict professional code of conduct. Any inappropriate behavior,
              harassment, or violation of professional boundaries by either party will result in immediate
              termination of services without refund.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>9. Term and Termination</h2>
            <p style={{ marginBottom: "16px" }}>
              This Agreement remains in effect for the duration of each booked service. Either party may
              terminate ongoing services with 7 days written notice. Termination does not affect payment
              obligations for services already rendered.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>10. Dispute Resolution</h2>
            <p style={{ marginBottom: "16px" }}>
              Any disputes arising from this Agreement shall first be addressed through good faith negotiation.
              If unresolved, disputes will be settled through binding arbitration in accordance with commercial
              arbitration rules.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>11. Amendments</h2>
            <p style={{ marginBottom: "16px" }}>
              This Agreement may only be amended in writing and signed by both parties. AssistPro reserves
              the right to update standard terms, with notice provided to active clients.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Agreement Acceptance</h2>
            <p style={{ marginBottom: "16px" }}>
              By proceeding with booking, the Client acknowledges that they have read, understood, and agree
              to be bound by this Service Agreement and all terms referenced herein.
            </p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Contact Information</h2>
            <p style={{ marginBottom: "16px" }}>
              For questions about this Service Agreement:
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
