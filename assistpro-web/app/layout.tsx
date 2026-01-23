import "./globals.css";
import type { Metadata } from "next";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "AssistPro — Verified Elite Professionals",
  description:
    "AssistPro connects you with verified Personal Assistants, Drivers, Chaperones, Hostesses, and Artists. Global multilingual service with discretion-first standards.",
  keywords: [
    "personal assistant",
    "professional drivers",
    "chaperone services",
    "event hostesses",
    "verified professionals",
    "luxury services",
    "elite concierge",
  ],
  authors: [{ name: "AssistPro" }],
  creator: "AssistPro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://assistpro.com",
    title: "AssistPro — Verified Elite Professionals",
    description:
      "AssistPro connects you with verified Personal Assistants, Drivers, Chaperones, Hostesses, and Artists. Global multilingual service with discretion-first standards.",
    siteName: "AssistPro",
  },
  twitter: {
    card: "summary_large_image",
    title: "AssistPro — Verified Elite Professionals",
    description:
      "AssistPro connects you with verified Personal Assistants, Drivers, Chaperones, Hostesses, and Artists.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification tokens when available
    // google: "",
    // yandex: "",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050505" />
        <Analytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
