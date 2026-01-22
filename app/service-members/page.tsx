"use client";

import Link from "next/link";
import { sampleServiceMembers } from "../../data/serviceMembers";

export default function ServiceMembersPage() {
  return (
    <main style={{ minHeight: "100vh" }}>
      {/* Header */}
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

      {/* Page Header */}
      <section style={{ padding: "40px 0 32px" }}>
        <div className="container">
          <h1 style={{ margin: 0, fontSize: 42, letterSpacing: "-0.02em" }}>
            <span className="goldHover">Verified</span> Service Providers
          </h1>
          <p style={{ marginTop: 12, color: "rgba(255,255,255,.66)", lineHeight: 1.7 }}>
            Browse our network of admin-verified professionals. Each member has been thoroughly vetted
            to meet AssistPro's luxury service standards.
          </p>
        </div>
      </section>

      {/* Service Members Grid */}
      <section style={{ padding: "0 0 60px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 18,
            }}
          >
            {sampleServiceMembers.map((member) => (
              <Link
                key={member.id}
                href={`/service-member/${member.id}`}
                style={{
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(255,255,255,.04)",
                  borderRadius: 20,
                  padding: 20,
                  transition: "all 150ms ease",
                  display: "block",
                }}
                className="serviceMemberCard"
              >
                {/* Badges */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 14,
                    flexWrap: "wrap",
                  }}
                >
                  {member.verified && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 10px",
                        borderRadius: 999,
                        background: "rgba(34, 197, 94, 0.15)",
                        border: "1px solid rgba(34, 197, 94, 0.3)",
                        fontSize: 11,
                        fontWeight: 800,
                        color: "rgba(34, 197, 94, 1)",
                      }}
                    >
                      ✓ VERIFIED
                    </span>
                  )}
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "rgba(215, 169, 58, 0.1)",
                      border: "1px solid rgba(215, 169, 58, 0.3)",
                      fontSize: 11,
                      fontWeight: 800,
                    }}
                    className="goldHover"
                  >
                    {member.category.toUpperCase()}
                  </span>
                </div>

                {/* Name */}
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: 22,
                    fontWeight: 950,
                  }}
                >
                  {member.name}
                </h3>

                {/* Bio */}
                {member.bio && (
                  <p
                    style={{
                      margin: "0 0 14px",
                      color: "rgba(255,255,255,.70)",
                      lineHeight: 1.6,
                      fontSize: 14,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {member.bio}
                  </p>
                )}

                {/* Languages */}
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                    marginBottom: 14,
                  }}
                >
                  {member.languages.slice(0, 3).map((lang) => (
                    <span
                      key={lang}
                      style={{
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: "rgba(0,0,0,.3)",
                        border: "1px solid rgba(255,255,255,.1)",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "rgba(255,255,255,.75)",
                      }}
                    >
                      {lang}
                    </span>
                  ))}
                  {member.languages.length > 3 && (
                    <span
                      style={{
                        padding: "6px 10px",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "rgba(255,255,255,.55)",
                      }}
                    >
                      +{member.languages.length - 3}
                    </span>
                  )}
                </div>

                {/* Rates */}
                <div
                  style={{
                    paddingTop: 14,
                    borderTop: "1px solid rgba(255,255,255,.08)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,.60)",
                      fontWeight: 600,
                    }}
                  >
                    Starting from
                  </span>
                  <span style={{ fontWeight: 900, fontSize: 16 }} className="goldHover">
                    ${member.hourlyRate || member.dailyRate || member.bookingFee}
                    {member.hourlyRate ? "/hr" : member.dailyRate ? "/day" : ""}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .serviceMemberCard:hover {
          transform: translateY(-2px);
          border-color: rgba(215, 169, 58, 0.35);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </main>
  );
}
