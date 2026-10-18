import { StructuredData } from "@/components/StructuredData";
import { BackToTop } from "@/components/BackToTop";
import { siteUrl } from "@/lib/site";
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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chinese Name Generator, Name Seals & Zodiac | SinoName",
    template: "%s | SinoName",
  },
  description:
    "Discover Chinese culture through a name made for you. Explore its meaning, pronunciation, a digital name seal, and your Chinese zodiac animal and folk tale.",
  applicationName: "SinoName",
  verification: {
    google: "0wDIbMVw2vzXZ2wYVIU_v8hPZyzhxwQe8k9aL-GJ29E",
  },
  openGraph: {
    title: "Chinese Name Generator, Name Seals & Zodiac | SinoName",
    description:
      "Discover Chinese culture through a name made for you. Explore its meaning, pronunciation, a digital name seal, and your Chinese zodiac animal and folk tale.",
    url: "/",
    siteName: "SinoName",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinese Name Generator, Name Seals & Zodiac | SinoName",
    description:
      "Discover Chinese culture through a name made for you. Explore its meaning, pronunciation, a digital name seal, and your Chinese zodiac animal and folk tale.",
  },
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
      <body>
        <StructuredData data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${siteUrl}/#publisher`,
          name: "SinoName",
          url: siteUrl,
          email: "tchaos.w@gmail.com",
          publishingPrinciples: `${siteUrl}/about#editorial`,
        }} />
        {children}
        <BackToTop />
      </body>
      {analyticsEnabled && googleAnalyticsId ? (
        <GoogleAnalytics gaId={googleAnalyticsId} />
      ) : null}
    </html>
  );
}
