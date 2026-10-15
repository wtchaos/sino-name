import type { Metadata } from "next";
import { ResultExperience } from "@/components/ResultExperience";

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
  return <ResultExperience id={id} />;
}
