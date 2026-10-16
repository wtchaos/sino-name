import type { Metadata, Viewport } from "next";
import "@fontsource-variable/source-sans-3/wght.css";
import "@fontsource/ma-shan-zheng/400.css";
import "@fontsource/noto-serif-sc/600.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Chinese Name Generator with Meaning | SinoName",
    template: "%s | SinoName",
  },
  description:
    "Create a natural Chinese name shaped by your name and values. Explore its pronunciation, character meanings, poetic imagery, and cultural context in English.",
  applicationName: "SinoName",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "0wDIbMVw2vzXZ2wYVIU_v8hPZyzhxwQe8k9aL-GJ29E",
  },
  openGraph: {
    title: "Chinese Name Generator with Meaning | SinoName",
    description:
      "Create one natural, personalized Chinese name and discover its pronunciation, character meanings, poetic imagery, and cultural context.",
    url: "/",
    siteName: "SinoName",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Chinese Name Generator with Meaning | SinoName",
    description:
      "Create one natural Chinese name with pronunciation, character meanings, poetic imagery, and cultural context.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
