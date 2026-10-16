import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@fontsource-variable/source-sans-3/wght.css";
import "@fontsource/ma-shan-zheng/400.css";
import "@fontsource/noto-serif-sc/600.css";
import "./globals.css";

const configuredAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;
const googleAnalyticsId =
  configuredAnalyticsId && /^G-[A-Z0-9]+$/.test(configuredAnalyticsId)
    ? configuredAnalyticsId
    : null;

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
  const analyticsEnabled =
    process.env.NODE_ENV === "production" && googleAnalyticsId !== null;

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
      {analyticsEnabled && googleAnalyticsId ? (
        <GoogleAnalytics gaId={googleAnalyticsId} />
      ) : null}
    </html>
  );
}
