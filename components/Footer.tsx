import Link from "next/link";
import { SealMark } from "@/components/SealMark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand">
            <SealMark className="footer-mark" decorative />
            <strong>SinoName</strong>
          </div>
          <p>A Chinese name that feels like you.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/methodology">Our Method</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/create">Create My Name</Link>
        </nav>
      </div>
      <div className="shell footer-note">
        <p>Cultural and linguistic interpretation, written in clear English.</p>
      </div>
    </footer>
  );
}
