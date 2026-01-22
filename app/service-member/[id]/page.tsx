"use client";

import { useEffect, useState } from "react";
import { ServiceMember } from "../../../types";
import { getServiceMemberById } from "../../../data/serviceMembers";
import BookingForm from "../../../components/BookingForm";
import Link from "next/link";

export default function ServiceMemberProfile({ params }: { params: { id: string } }) {
  const [serviceMember, setServiceMember] = useState<ServiceMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would fetch from an API
    const member = getServiceMemberById(params.id);
    setServiceMember(member || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", padding: "80px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", color: "rgba(255,255,255,.70)" }}>
            Loading...
          </div>
        </div>
      </main>
    );
  }

  if (!serviceMember) {
    return (
      <main style={{ minHeight: "100vh", padding: "80px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: 32, marginBottom: 16 }}>Service Member Not Found</h1>
            <Link href="/" className="btn btnPrimary">
              <span className="goldHover">Back to Home</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* Header with back button */}
      <section style={{ padding: "26px 0", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div className="container">
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "rgba(255,255,255,.70)",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <span>←</span> Back to Home
          </Link>
        </div>
      </section>

      {/* Profile Section */}
      <section style={{ padding: "40px 0 60px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 32,
            }}
          >
            {/* Profile Info */}
            <div>
              {/* Profile Header */}
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
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  {serviceMember.verified && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 12px",
                        borderRadius: 999,
                        background: "rgba(34, 197, 94, 0.15)",
                        border: "1px solid rgba(34, 197, 94, 0.3)",
                        fontSize: 12,
                        fontWeight: 800,
                        color: "rgba(34, 197, 94, 1)",
                      }}
                    >
                      ✓ VERIFIED
                    </span>
                  )}
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: 999,
                      background: "rgba(215, 169, 58, 0.1)",
                      border: "1px solid rgba(215, 169, 58, 0.3)",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                    className="goldHover"
                  >
                    {serviceMember.category.toUpperCase()}
                  </span>
                </div>

                <h1
                  style={{
                    margin: "0 0 12px",
                    fontSize: 32,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {serviceMember.name}
                </h1>

                {serviceMember.bio && (
                  <p
                    style={{
                      margin: 0,
                      color: "rgba(255,255,255,.70)",
                      lineHeight: 1.7,
                    }}
                  >
                    {serviceMember.bio}
                  </p>
                )}
              </div>

              {/* Languages */}
              {serviceMember.languages.length > 0 && (
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
                    LANGUAGES
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {serviceMember.languages.map((lang) => (
                      <span
                        key={lang}
                        style={{
                          padding: "8px 14px",
                          borderRadius: 999,
                          background: "rgba(0,0,0,.3)",
                          border: "1px solid rgba(255,255,255,.12)",
                          fontSize: 13,
                          fontWeight: 700,
                          color: "rgba(255,255,255,.85)",
                        }}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability */}
              {serviceMember.availability.length > 0 && (
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
                    AVAILABILITY
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {serviceMember.availability.map((avail) => (
                      <span
                        key={avail}
                        style={{
                          padding: "8px 14px",
                          borderRadius: 999,
                          background: "rgba(0,0,0,.3)",
                          border: "1px solid rgba(255,255,255,.12)",
                          fontSize: 13,
                          fontWeight: 700,
                          color: "rgba(255,255,255,.85)",
                        }}
                      >
                        {avail}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Rate Card */}
              <div
                style={{
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(255,255,255,.04)",
                  borderRadius: 20,
                  padding: 24,
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
                  RATES
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {serviceMember.hourlyRate && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "rgba(255,255,255,.70)" }}>Hourly</span>
                      <span style={{ fontWeight: 900 }} className="goldHover">
                        ${serviceMember.hourlyRate}/hr
                      </span>
                    </div>
                  )}
                  {serviceMember.dailyRate && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "rgba(255,255,255,.70)" }}>Daily</span>
                      <span style={{ fontWeight: 900 }} className="goldHover">
                        ${serviceMember.dailyRate}/day
                      </span>
                    </div>
                  )}
                  {serviceMember.weeklyRate && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "rgba(255,255,255,.70)" }}>Weekly</span>
                      <span style={{ fontWeight: 900 }} className="goldHover">
                        ${serviceMember.weeklyRate}/week
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <BookingForm serviceMember={serviceMember} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
