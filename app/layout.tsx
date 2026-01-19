import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AssistPro — Verified Elite Professionals",
  description:
    "AssistPro connects you with verified Personal Assistants, Drivers, Chaperones, Hostesses, and Artists.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
