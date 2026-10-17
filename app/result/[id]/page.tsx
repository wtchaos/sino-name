import { StickyHeader } from "@/components/StickyHeader";
import type { Metadata } from "next";
import Link from "next/link";
import { ResultExperience } from "@/components/ResultExperience";
import { SealMark } from "@/components/SealMark";

export const metadata: Metadata = {
  title: "Your Chinese Name, Seal & Zodiac Story",
  description:
    "Explore your Chinese name, its meaning and pronunciation, your digital name seal, and the folk tale behind your Chinese zodiac animal.",
  robots: { index: false, follow: false },
};

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="result-route">
      <StickyHeader className="result-header">
      <div className="shell result-header-inner">
      <Link className="result-brand" href="/" aria-label="SinoName home">
        <SealMark decorative />
        <span>SinoName</span>
      </Link>
      </div>
      </StickyHeader>
      <ResultExperience id={id} />
    </div>
  );
}
