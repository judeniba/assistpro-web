"use client";

import { PaymentBreakdown } from "../types";

interface PaymentBreakdownDisplayProps {
  breakdown: PaymentBreakdown;
}

export default function PaymentBreakdownDisplay({
  breakdown,
}: PaymentBreakdownDisplayProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,.12)",
        background: "rgba(255,255,255,.04)",
        borderRadius: 20,
        padding: 24,
        backdropFilter: "blur(10px)",
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
        PAYMENT BREAKDOWN
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Booking Fee */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 12,
            borderBottom: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <span style={{ color: "rgba(255,255,255,.85)", fontWeight: 600 }}>
            Booking Fee
          </span>
          <span style={{ fontWeight: 900, fontSize: 18 }}>
            {formatCurrency(breakdown.subtotal)}
          </span>
        </div>

        {/* Commission Breakdown */}
        <div
          style={{
            background: "rgba(215, 169, 58, 0.05)",
            border: "1px solid rgba(215, 169, 58, 0.2)",
            borderRadius: 12,
            padding: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,.70)",
                fontSize: 14,
              }}
            >
              Service Provider (85%)
            </span>
            <span style={{ fontWeight: 700 }} className="goldHover">
              {formatCurrency(breakdown.serviceMemberEarnings)}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                color: "rgba(255,255,255,.70)",
                fontSize: 14,
              }}
            >
              AssistPro Commission (15%)
            </span>
            <span style={{ fontWeight: 700, color: "rgba(255,255,255,.85)" }}>
              {formatCurrency(breakdown.parentCompanyCommission)}
            </span>
          </div>
        </div>

        {/* Additional Fees */}
        {(breakdown.taxes > 0 || breakdown.transactionFees > 0) && (
          <>
            {breakdown.taxes > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(255,255,255,.70)",
                  fontSize: 14,
                }}
              >
                <span>Taxes</span>
                <span>{formatCurrency(breakdown.taxes)}</span>
              </div>
            )}
            {breakdown.transactionFees > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(255,255,255,.70)",
                  fontSize: 14,
                }}
              >
                <span>Transaction Fees</span>
                <span>{formatCurrency(breakdown.transactionFees)}</span>
              </div>
            )}
          </>
        )}

        {/* Total */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 12,
            borderTop: "1px solid rgba(255,255,255,.12)",
          }}
        >
          <span style={{ fontWeight: 900, fontSize: 16 }}>Total Due</span>
          <span style={{ fontWeight: 900, fontSize: 20 }} className="goldHover">
            {formatCurrency(breakdown.total)}
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          padding: 12,
          background: "rgba(0,0,0,.3)",
          borderRadius: 8,
          fontSize: 12,
          color: "rgba(255,255,255,.56)",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "rgba(255,255,255,.76)" }}>Note:</strong> The
        15% commission is calculated on the booking fee before taxes and
        transaction fees. The service provider receives 85% of the booking fee.
      </div>
    </div>
  );
}
