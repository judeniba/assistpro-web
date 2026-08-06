import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "AssistPro — Verified Elite Professionals",
  description:
    "AssistPro connects you with verified Personal Assistants, Drivers, Chaperones, Hostesses, and Artists.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh", background: "radial-gradient(circle at top, rgba(215,169,58,0.16), transparent 34%), var(--bg)" }}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
