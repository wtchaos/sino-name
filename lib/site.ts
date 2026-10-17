import type { Metadata } from "next";

const configuredUrl = process.env.NEXT_SITE_URL ?? "http://localhost:3000";
export const siteUrl = new URL(configuredUrl).origin;

export function cultureMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | SinoName`, description, url: path, siteName: "SinoName", locale: "en_US", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SinoName: Chinese names, digital seals, and zodiac stories" }] },
    twitter: { card: "summary_large_image", title: `${title} | SinoName`, description, images: ["/twitter-image"] },
  };
}
