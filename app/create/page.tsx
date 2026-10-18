import { StickyHeader } from "@/components/StickyHeader";
import { CreatePageGuard } from "@/components/CreatePageGuard";
import type { Metadata } from "next";
import Link from "next/link";
import { NameWizard } from "@/components/NameWizard";
import { SealMark } from "@/components/SealMark";

export const metadata: Metadata = {
  title: "Create Your Chinese Name & Digital Seal",
  description:
    "Create a personalized Chinese name with meanings and pronunciation. Get a digital name seal and discover your Chinese zodiac animal and its folk tale.",
  alternates: { canonical: "/create" },
  openGraph: {
    title: "Create Your Chinese Name & Digital Seal | SinoName",
    description: "Create a personalized Chinese name with meanings and pronunciation. Get a digital name seal and discover your Chinese zodiac animal and its folk tale.",
    url: "/create",
    siteName: "SinoName",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SinoName: Chinese names, digital seals, and zodiac stories" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
    title: "Create Your Chinese Name & Digital Seal | SinoName",
    description: "Create a personalized Chinese name with meanings and pronunciation. Get a digital name seal and discover your Chinese zodiac animal and its folk tale.",
  },
};

export default function CreatePage() {
  return (
    <main className="create-page">
      <StickyHeader className="create-header-wrap">
      <div className="create-header shell">
        <Link className="wordmark" href="/" aria-label="SinoName home">
          <SealMark className="wordmark-mark" decorative />
          <span>SinoName</span>
        </Link>
        <p>One natural name, thoughtfully chosen.</p>
      </div>
      </StickyHeader>
      <div className="create-shell">
        <aside className="create-aside">
          <p className="aside-chinese" lang="zh-Hans">名</p>
          <blockquote>
            “A name should feel at home in the language—and still feel like you.”
          </blockquote>
          <p className="aside-note">
            Create a Chinese name with character meanings and pronunciation,
            a downloadable name card and digital seal, and your Chinese zodiac story.
            Your first complete result is free.
          </p>
          <p className="create-culture-links">
            <Link href="/chinese-name-seal">Chinese name seals</Link>
            <span aria-hidden="true"> · </span>
            <Link href="/chinese-zodiac">Chinese zodiac stories</Link>
          </p>
          <div className="privacy-note">
            <strong>Your details stay minimal.</strong>
            <p>
              No account is required. We do not retain your English name or full
              birth date long-term. Your result remains available in this browser
              for 30 days.
            </p>
          </div>
        </aside>
        <CreatePageGuard>
          <NameWizard />
        </CreatePageGuard>
      </div>
    </main>
  );
}
