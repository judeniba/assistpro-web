import Link from "next/link";
import BookingForm from "../../components/forms/BookingForm";

export const metadata = {
  title: "Book a Service - AssistPro",
  description: "Book professional assistance services with AssistPro",
};

export default function BookingPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="container" style={{ paddingTop: "80px", paddingBottom: "100px" }}>
        <Link href="/" style={{ display: "inline-block", marginBottom: "32px", color: "var(--muted)" }}>
          ← Back to Home
        </Link>

        <div style={{ marginBottom: "60px" }}>
          <h1 className="goldHover" style={{ fontSize: "56px", marginBottom: "16px" }}>
            Book Your Service
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "18px", maxWidth: "700px" }}>
            Complete the form below to request a booking. Our team will review your request and
            contact you within 24 hours to confirm availability and finalize the details.
          </p>
        </div>

        <div className="hrGold" style={{ marginBottom: "60px" }} />

        <BookingForm />

        <div style={{ marginTop: "60px", padding: "32px", background: "rgba(255, 255, 255, 0.03)", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <h3 style={{ fontSize: "20px", marginBottom: "16px", fontWeight: "600" }}>
            What happens next?
          </h3>
          <div style={{ color: "var(--muted)", lineHeight: "1.8" }}>
            <p style={{ marginBottom: "12px" }}>
              <strong>1.</strong> Our team reviews your booking request and checks provider availability
            </p>
            <p style={{ marginBottom: "12px" }}>
              <strong>2.</strong> We'll contact you within 24 hours to confirm details and pricing
            </p>
            <p style={{ marginBottom: "12px" }}>
              <strong>3.</strong> Once confirmed, you'll receive a booking confirmation with payment instructions
            </p>
            <p>
              <strong>4.</strong> Your verified service professional will arrive at the scheduled time
            </p>
          </div>
        </div>

        <div style={{ marginTop: "40px", textAlign: "center", color: "var(--muted2)", fontSize: "14px" }}>
          <p>
            Questions? Contact us at{" "}
            <a href="mailto:bookings@assistpro.com" className="goldHover" style={{ textDecoration: "underline" }}>
              bookings@assistpro.com
            </a>{" "}
            or call{" "}
            <a href="tel:+15551234567" className="goldHover" style={{ textDecoration: "underline" }}>
              +1 (555) 123-4567
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
