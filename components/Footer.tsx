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
          <Link href="/chinese-name-examples">Name Examples</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About & Sources</Link>
          <Link href="/chinese-name-seal">Chinese Name Seals</Link>
          <Link href="/chinese-zodiac">Chinese Zodiac</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
      <div className="shell footer-note">
        <p>Cultural and linguistic interpretation, written in clear English.</p>
        <p>Contact: <a href="mailto:tchaos.w@gmail.com">tchaos.w@gmail.com</a></p>
      </div>
    </footer>
  );
}
