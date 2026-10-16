import type { Metadata } from "next";
import Link from "next/link";
import { NameWizard } from "@/components/NameWizard";
import { SealMark } from "@/components/SealMark";

export const metadata: Metadata = {
  title: "Create your Chinese name",
  description:
    "Create a personalized Chinese name in about two minutes. Receive its pronunciation, character meanings, poetic imagery, and cultural interpretation.",
  alternates: { canonical: "/create" },
};

export default function CreatePage() {
  return (
    <main className="create-page">
      <header className="create-header shell">
        <Link className="wordmark" href="/" aria-label="SinoName home">
          <SealMark className="wordmark-mark" decorative />
          <span>SinoName</span>
        </Link>
        <p>One natural name, thoughtfully chosen.</p>
      </header>
      <div className="create-shell">
        <aside className="create-aside">
          <p className="aside-chinese" lang="zh-Hans">名</p>
          <blockquote>
            “A name should feel at home in the language—and still feel like you.”
          </blockquote>
          <p className="aside-note">
            Most questions take one tap. Your first complete result is free.
          </p>
        </aside>
        <NameWizard />
      </div>
    </main>
  );
}
