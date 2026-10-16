import type { Metadata } from "next";
import Link from "next/link";
import { ResultExperience } from "@/components/ResultExperience";
import { SealMark } from "@/components/SealMark";

export const metadata: Metadata = {
  title: "Your Chinese name",
  description: "Your Chinese name and its cultural story.",
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
      <Link className="result-brand" href="/" aria-label="SinoName home">
        <SealMark decorative />
        <span>SinoName</span>
      </Link>
      <ResultExperience id={id} />
    </div>
  );
}
