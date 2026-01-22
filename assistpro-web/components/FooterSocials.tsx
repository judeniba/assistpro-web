"use client";

export default function FooterSocials() {
  const socials = [
    { label: "Instagram", href: "https://instagram.com/assistpro", icon: "IG" },
    { label: "TikTok", href: "https://tiktok.com/@assistpro", icon: "TT" },
    { label: "Facebook", href: "https://facebook.com/assistpro", icon: "FB" },
    { label: "LinkedIn", href: "https://linkedin.com/company/assistpro", icon: "IN" },
  ];

  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            border: "1px solid rgba(255,255,255,.12)",
            background: "rgba(255,255,255,.04)",
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 700,
            color: "rgba(255,255,255,.72)",
            transition: "all 150ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,.08)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,.04)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <span className="goldHover" style={{ fontWeight: 900, fontSize: 11 }}>
            {s.icon}
          </span>
          <span>{s.label}</span>
        </a>
      ))}
    </div>
  );
}
