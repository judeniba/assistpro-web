"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Driver {
  id: string;
  name: string;
  rating: number;
  experience: string;
  languages: string[];
  hourlyRate: number;
  verified: boolean;
  image: string;
}

export default function BookingPage() {
  const router = useRouter();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    hours: "4",
  });

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch("/api/drivers");
      const data = await response.json();
      setDrivers(data.drivers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedDriver) return { subtotal: 0, commission: 0, total: 0, driverEarnings: 0 };
    const hours = parseInt(formData.hours) || 0;
    const subtotal = selectedDriver.hourlyRate * hours;
    const commission = subtotal * 0.15; // 15% commission
    const driverEarnings = subtotal - commission;
    return { subtotal, commission, total: subtotal, driverEarnings };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDriver) return;

    setSubmitting(true);

    try {
      // Create booking
      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driverId: selectedDriver.id,
          driverName: selectedDriver.name,
          hours: parseInt(formData.hours),
          hourlyRate: selectedDriver.hourlyRate,
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          clientPhone: formData.clientPhone,
        }),
      });

      const bookingData = await bookingResponse.json();

      if (!bookingData.success) {
        throw new Error("Booking failed");
      }

      // Process payment
      const paymentResponse = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: bookingData.booking.id,
          amount: bookingData.booking.total,
          paymentMethod: "card",
        }),
      });

      const paymentData = await paymentResponse.json();

      if (paymentData.success) {
        setBookingDetails(bookingData.booking);
        setBookingSuccess(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const costs = calculateTotal();

  if (bookingSuccess && bookingDetails) {
    return (
      <main style={{ minHeight: "100vh", padding: "60px 0" }}>
        <div className="container">
          <div
            style={{
              maxWidth: 600,
              margin: "0 auto",
              border: "1px solid rgba(255,255,255,.12)",
              background: "rgba(255,255,255,.04)",
              borderRadius: 24,
              padding: 40,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "rgba(76, 175, 80, 0.2)",
                  border: "2px solid #4CAF50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: 30,
                }}
              >
                ✓
              </div>
              <h1 style={{ margin: 0, fontSize: 32 }}>
                <span className="goldHover">Booking Confirmed!</span>
              </h1>
              <p style={{ marginTop: 10, color: "rgba(255,255,255,.66)" }}>
                Your driver has been successfully hired
              </p>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: 20 }}>
              <h3 style={{ fontSize: 18, marginBottom: 15 }}>Booking Details</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,.66)" }}>Booking ID:</span>
                  <span style={{ fontWeight: 700 }}>{bookingDetails.id}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,.66)" }}>Driver:</span>
                  <span style={{ fontWeight: 700 }}>{bookingDetails.driverName}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,.66)" }}>Client:</span>
                  <span style={{ fontWeight: 700 }}>{bookingDetails.clientName}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,.66)" }}>Hours:</span>
                  <span style={{ fontWeight: 700 }}>{bookingDetails.hours} hours</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,.66)" }}>Hourly Rate:</span>
                  <span style={{ fontWeight: 700 }}>${bookingDetails.hourlyRate}</span>
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", marginTop: 20, paddingTop: 20 }}>
                <h3 style={{ fontSize: 18, marginBottom: 15 }}>Payment Breakdown</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "rgba(255,255,255,.66)" }}>Subtotal:</span>
                    <span>${bookingDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "rgba(255,255,255,.66)" }}>Company Commission (15%):</span>
                    <span className="goldHover" style={{ fontWeight: 700 }}>
                      ${bookingDetails.commission.toFixed(2)}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "rgba(255,255,255,.66)" }}>Driver Earnings:</span>
                    <span>${bookingDetails.driverEarnings.toFixed(2)}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid rgba(255,255,255,.12)",
                      paddingTop: 12,
                      marginTop: 8,
                    }}
                  >
                    <span style={{ fontSize: 18, fontWeight: 700 }}>Total Paid:</span>
                    <span style={{ fontSize: 18, fontWeight: 700 }} className="goldHover">
                      ${bookingDetails.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 30,
                  padding: 15,
                  background: "rgba(76, 175, 80, 0.1)",
                  border: "1px solid rgba(76, 175, 80, 0.3)",
                  borderRadius: 12,
                  fontSize: 14,
                  color: "rgba(255,255,255,.8)",
                }}
              >
                ✓ Payment processed successfully
                <br />✓ Confirmation email sent to {bookingDetails.clientEmail}
              </div>

              <div style={{ marginTop: 30, display: "flex", gap: 12 }}>
                <button
                  className="btn btnPrimary"
                  onClick={() => router.push("/")}
                  style={{ flex: 1, cursor: "pointer" }}
                >
                  <span className="goldHover">Back to Home</span>
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setBookingSuccess(false);
                    setSelectedDriver(null);
                    setFormData({ clientName: "", clientEmail: "", clientPhone: "", hours: "4" });
                  }}
                  style={{ flex: 1, cursor: "pointer" }}
                >
                  New Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", padding: "60px 0" }}>
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ margin: 0, fontSize: 42 }}>
            <span className="goldHover">Book a Driver</span>
          </h1>
          <p style={{ marginTop: 10, color: "rgba(255,255,255,.66)", fontSize: 16 }}>
            Professional drivers for your client vehicle • 15% commission to AssistPro
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>Loading drivers...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 30, maxWidth: 900, margin: "0 auto" }}>
            {/* Driver Selection */}
            <div>
              <h2 style={{ fontSize: 24, marginBottom: 20 }}>Select a Driver</h2>
              <div style={{ display: "grid", gap: 14 }}>
                {drivers.map((driver) => (
                  <div
                    key={driver.id}
                    onClick={() => setSelectedDriver(driver)}
                    style={{
                      border: selectedDriver?.id === driver.id ? "2px solid #d7a93a" : "1px solid rgba(255,255,255,.12)",
                      background: selectedDriver?.id === driver.id ? "rgba(215, 169, 58, 0.1)" : "rgba(255,255,255,.04)",
                      borderRadius: 20,
                      padding: 20,
                      cursor: "pointer",
                      transition: "all 150ms ease",
                    }}
                  >
                    <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 24,
                        }}
                      >
                        👤
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 20, fontWeight: 700 }}>{driver.name}</span>
                          {driver.verified && (
                            <span
                              style={{
                                background: "rgba(76, 175, 80, 0.2)",
                                border: "1px solid rgba(76, 175, 80, 0.5)",
                                padding: "4px 8px",
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 700,
                              }}
                            >
                              VERIFIED
                            </span>
                          )}
                        </div>
                        <div style={{ marginTop: 5, color: "rgba(255,255,255,.66)", fontSize: 14 }}>
                          ⭐ {driver.rating} • {driver.experience} • {driver.languages.join(", ")}
                        </div>
                        <div style={{ marginTop: 8, fontSize: 18, fontWeight: 700 }} className="goldHover">
                          ${driver.hourlyRate}/hour
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            {selectedDriver && (
              <div
                style={{
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(255,255,255,.04)",
                  borderRadius: 20,
                  padding: 30,
                }}
              >
                <h2 style={{ fontSize: 24, marginBottom: 20 }}>Booking Details</h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 700 }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: 12,
                          border: "1px solid rgba(255,255,255,.12)",
                          background: "rgba(255,255,255,.06)",
                          color: "#fff",
                          fontSize: 16,
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 700 }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: 12,
                          border: "1px solid rgba(255,255,255,.12)",
                          background: "rgba(255,255,255,.06)",
                          color: "#fff",
                          fontSize: 16,
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 700 }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: 12,
                          border: "1px solid rgba(255,255,255,.12)",
                          background: "rgba(255,255,255,.06)",
                          color: "#fff",
                          fontSize: 16,
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 700 }}>
                        Number of Hours *
                      </label>
                      <select
                        required
                        value={formData.hours}
                        onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: 12,
                          border: "1px solid rgba(255,255,255,.12)",
                          background: "rgba(255,255,255,.06)",
                          color: "#fff",
                          fontSize: 16,
                          cursor: "pointer",
                        }}
                      >
                        {[2, 4, 6, 8, 10, 12].map((h) => (
                          <option key={h} value={h} style={{ background: "#050505" }}>
                            {h} hours
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Cost Breakdown */}
                    <div
                      style={{
                        borderTop: "1px solid rgba(255,255,255,.12)",
                        paddingTop: 18,
                        marginTop: 10,
                      }}
                    >
                      <h3 style={{ fontSize: 18, marginBottom: 12 }}>Cost Breakdown</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "rgba(255,255,255,.66)" }}>
                            Subtotal ({formData.hours} hours × ${selectedDriver.hourlyRate}):
                          </span>
                          <span>${costs.subtotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "rgba(255,255,255,.66)" }}>Company Commission (15%):</span>
                          <span className="goldHover" style={{ fontWeight: 700 }}>
                            ${costs.commission.toFixed(2)}
                          </span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "rgba(255,255,255,.66)" }}>Driver Receives:</span>
                          <span>${costs.driverEarnings.toFixed(2)}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderTop: "1px solid rgba(255,255,255,.12)",
                            paddingTop: 8,
                            marginTop: 8,
                          }}
                        >
                          <span style={{ fontSize: 18, fontWeight: 700 }}>Total:</span>
                          <span style={{ fontSize: 18, fontWeight: 700 }} className="goldHover">
                            ${costs.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btnPrimary"
                      style={{
                        width: "100%",
                        padding: "16px",
                        fontSize: 16,
                        cursor: submitting ? "not-allowed" : "pointer",
                        opacity: submitting ? 0.6 : 1,
                      }}
                    >
                      <span className="goldHover">{submitting ? "Processing..." : "Confirm & Pay"}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
