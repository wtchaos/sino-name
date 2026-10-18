import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <>
    <Header />
    <main className="legal-page shell">
      <header>
        <p>404 · Page not found</p>
        <h1>We couldn’t find that page.</h1>
        <p>The address may be incorrect, or the page may have moved.</p>
      </header>
      <Link className="button button-primary" href="/">Return to SinoName</Link>
    </main>
    <Footer />
  </>;
}
