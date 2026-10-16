import { notFound } from "next/navigation";
import { DevClearHistory } from "@/components/DevClearHistory";

export const metadata = { robots: { index: false, follow: false } };

export default function ClearDevelopmentHistoryPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <DevClearHistory />;
}
