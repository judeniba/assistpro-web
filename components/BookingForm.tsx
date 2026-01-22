"use client";

import { useState } from "react";
import { ServiceMember, calculatePaymentBreakdown } from "../types";
import PaymentBreakdownDisplay from "./PaymentBreakdownDisplay";

interface BookingFormProps {
  serviceMember: ServiceMember;
}

export default function BookingForm({ serviceMember }: BookingFormProps) {
  const [bookingType, setBookingType] = useState<
    "hourly" | "daily" | "weekly" | "event"
  >("daily");
  const [duration, setDuration] = useState(1);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Calculate booking fee based on type and duration
  const calculateBookingFee = () => {
    switch (bookingType) {
      case "hourly":
        return (serviceMember.hourlyRate || 0) * duration;
      case "daily":
        return (serviceMember.dailyRate || 0) * duration;
      case "weekly":
        return (serviceMember.weeklyRate || 0) * duration;
      case "event":
        return serviceMember.bookingFee;
      default:
        return 0;
    }
  };

  const bookingFee = calculateBookingFee();
  const taxes = bookingFee * 0.1; // Example: 10% tax
  const transactionFees = bookingFee * 0.029 + 0.3; // Example: Stripe fees (2.9% + $0.30)
  const breakdown = calculatePaymentBreakdown(bookingFee, taxes, transactionFees);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would integrate with Stripe or another payment gateway
    alert(
      `Booking request submitted!\n\nService: ${serviceMember.name}\nType: ${bookingType}\nDuration: ${duration}\nTotal: $${breakdown.total.toFixed(2)}\n\nThis would redirect to payment gateway (Stripe/Flutterwave) in production.`
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            border: "1px solid rgba(255,255,255,.12)",
            background: "rgba(255,255,255,.04)",
            borderRadius: 20,
            padding: 24,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontWeight: 900,
              letterSpacing: ".08em",
              fontSize: 12,
              color: "rgba(255,255,255,.70)",
              marginBottom: 16,
            }}
          >
            BOOKING DETAILS
          </div>

          {/* Booking Type */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                fontSize: 14,
                color: "rgba(255,255,255,.85)",
              }}
            >
              Booking Type
            </label>
            <select
              value={bookingType}
              onChange={(e) =>
                setBookingType(
                  e.target.value as "hourly" | "daily" | "weekly" | "event"
                )
              }
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,.12)",
                background: "rgba(0,0,0,.3)",
                color: "rgba(255,255,255,.92)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {serviceMember.hourlyRate && (
                <option value="hourly">
                  Hourly - ${serviceMember.hourlyRate}/hr
                </option>
              )}
              {serviceMember.dailyRate && (
                <option value="daily">
                  Daily - ${serviceMember.dailyRate}/day
                </option>
              )}
              {serviceMember.weeklyRate && (
                <option value="weekly">
                  Weekly - ${serviceMember.weeklyRate}/week
                </option>
              )}
              <option value="event">
                Event-based - ${serviceMember.bookingFee}
              </option>
            </select>
          </div>

          {/* Duration */}
          {bookingType !== "event" && (
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 600,
                  fontSize: 14,
                  color: "rgba(255,255,255,.85)",
                }}
              >
                Duration ({bookingType === "hourly" ? "hours" : bookingType === "daily" ? "days" : "weeks"})
              </label>
              <input
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(0,0,0,.3)",
                  color: "rgba(255,255,255,.92)",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              />
            </div>
          )}

          {/* Quick Summary */}
          <div
            style={{
              background: "rgba(215, 169, 58, 0.08)",
              border: "1px solid rgba(215, 169, 58, 0.25)",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 600, color: "rgba(255,255,255,.85)" }}>
                Booking Fee
              </span>
              <span style={{ fontWeight: 900, fontSize: 18 }} className="goldHover">
                ${bookingFee.toFixed(2)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
                fontSize: 14,
                color: "rgba(255,255,255,.70)",
              }}
            >
              <span>Total with fees & taxes</span>
              <span style={{ fontWeight: 700 }}>${breakdown.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Show/Hide Breakdown Button */}
          <button
            type="button"
            onClick={() => setShowBreakdown(!showBreakdown)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,.12)",
              background: "rgba(255,255,255,.04)",
              color: "rgba(255,255,255,.85)",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: 16,
            }}
          >
            {showBreakdown ? "Hide" : "View"} Payment Breakdown
          </button>
        </div>

        {/* Payment Breakdown */}
        {showBreakdown && (
          <div style={{ marginBottom: 20 }}>
            <PaymentBreakdownDisplay breakdown={breakdown} />
          </div>
        )}

        {/* Payment Gateway Info */}
        <div
          style={{
            border: "1px solid rgba(255,255,255,.12)",
            background: "rgba(255,255,255,.04)",
            borderRadius: 20,
            padding: 24,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontWeight: 900,
              letterSpacing: ".08em",
              fontSize: 12,
              color: "rgba(255,255,255,.70)",
              marginBottom: 12,
            }}
          >
            PAYMENT OPTIONS
          </div>
          <div style={{ color: "rgba(255,255,255,.70)", lineHeight: 1.7, fontSize: 14 }}>
            <p style={{ margin: "0 0 12px" }}>
              Secure payment processing via <strong>Stripe</strong> (credit/debit cards) or{" "}
              <strong>Flutterwave</strong> (MTN MoMo / Orange Money)
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,.56)" }}>
              🔒 Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btnPrimary"
          style={{
            width: "100%",
            padding: "16px",
            fontSize: 16,
            fontWeight: 900,
          }}
        >
          <span className="goldHover">Proceed to Payment Gateway</span>
        </button>
      </form>
    </div>
  );
}
