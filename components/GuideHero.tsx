import Link from "next/link";
import type { ReactNode } from "react";

export function GuideHero({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return <header className="knowledge-hero shell">
    <div><p className="knowledge-label">{label}</p><h1>{title}</h1></div>
    <div className="knowledge-intro">{children}<nav aria-label="Naming resources">
      <Link href="/faq">Naming questions</Link>
      <Link href="/chinese-name-examples">Name examples</Link>
      <Link href="/about">About & editorial approach</Link>
    </nav></div>
  </header>;
}
