import { StickyHeader } from "@/components/StickyHeader";
import { CreateNameLink } from "@/components/CreateNameLink";
import Link from "next/link";
import { SealMark } from "@/components/SealMark";

export function Header() {
  return (
    <StickyHeader className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="SinoName home">
          <SealMark className="wordmark-mark" decorative />
          <span>SinoName</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/#how-it-works">How It Works</Link>
          <Link href="/methodology">Our Method</Link>
          <Link href="/methodology#about-names">About Chinese Names</Link>
        </nav>
        <CreateNameLink className="button button-primary header-cta">
          Create My Name
        </CreateNameLink>
      </div>
    </StickyHeader>
  );
}
