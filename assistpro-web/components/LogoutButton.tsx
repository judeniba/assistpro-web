"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="btn"
      style={{ padding: "8px 14px", fontSize: 13, cursor: "pointer", background: "none", border: "1px solid rgba(255,255,255,.14)" }}
    >
      Sign Out
    </button>
  );
}
