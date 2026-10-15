import type { Metadata, Viewport } from "next";
import "@fontsource-variable/source-sans-3/wght.css";
import "@fontsource/noto-serif-sc/600.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Named in Hanzi — A Chinese name that feels like you",
    template: "%s — Named in Hanzi",
  },
  description:
    "Discover one natural Chinese name shaped by sound, meaning, and the qualities you value—explained in clear English.",
  verification: {
    google: "e_Er5p_QeHZ-cs7e-0YQyTDt5E6xt5aZLuI1KB0ZlNw",
  },
  openGraph: {
    title: "Named in Hanzi",
    description: "A Chinese name that feels like you.",
    type: "website",
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
