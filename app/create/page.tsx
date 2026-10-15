import type { Metadata } from "next";
import Link from "next/link";
import { NameWizard } from "@/components/NameWizard";
import { SealMark } from "@/components/SealMark";

export const metadata: Metadata = {
  title: "Create your Chinese name",
  description:
    "Choose the qualities and cultural perspectives that will shape your Chinese name.",
};

export default function CreatePage() {
  return (
    <main className="create-page">
      <header className="create-header shell">
        <Link className="wordmark" href="/" aria-label="Named in Hanzi home">
          <SealMark className="wordmark-mark" decorative />
          <span>Named in Hanzi</span>
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
