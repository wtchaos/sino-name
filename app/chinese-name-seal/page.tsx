import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CreateNameLink } from "@/components/CreateNameLink";
import { NameCardPreview } from "@/components/NameCardPreview";
import { cultureMetadata } from "@/lib/site";

export const metadata = cultureMetadata(
  "Chinese Name Seals: Meaning, Culture & Digital Cards",
  "Explore Chinese name seals and the art of seal engraving. See a digital name card example and create your own Chinese name with a seal-inspired design.",
  "/chinese-name-seal",
);

export default function NameSealPage() {
  return <>
    <Header />
    <main className="content-page culture-guide">
      <header className="content-hero shell">
        <p>Chinese culture · Name seals</p>
        <h1>Chinese name seals. A personal mark.</h1>
        <div className="content-hero-lede"><p>A Chinese name seal brings written characters into a compact visual form. Discover the tradition, then see how your name becomes a digital keepsake.</p></div>
      </header>
      <div className="culture-article shell">
        <NameCardPreview />
        <section>
          <h2>What is a Chinese name seal?</h2>
          <p>A seal, or <span lang="zh-Hans">印章</span> (yìnzhāng), makes an impression that can carry a name or other inscription. Chinese seal engraving joins the arrangement of characters with the craft of cutting a small surface.</p>
          <p>Seals have served as signatures and marks of authority, and have a place in painting, calligraphy, and personal correspondence. A name seal makes writing both readable language and a visual composition.</p>
        </section>
        <section>
          <h2>From carved stone to a digital name card</h2>
          <p>In traditional engraving, the design is cut in reverse so the stamped impression reads the intended way. The lines, spacing, and balance all matter within a very small area. UNESCO inscribed the art of Chinese seal engraving on its Representative List of the Intangible Cultural Heritage of Humanity in 2009.</p>
          <p>SinoName creates a digital design inspired by this tradition. Your downloadable name card includes your generated Chinese name, pinyin, a short meaning, and a red name seal. It is a contemporary digital keepsake; a traditional hand-carved seal is a separate craft.</p>
        </section>
        <section>
          <h2>How to get your Chinese name card</h2>
          <ol>
            <li>Create a Chinese name using your original name and selected preferences.</li>
            <li>Read the character meanings and pronunciation on your result page.</li>
            <li>Choose “Download Name Card” to save the PNG image, or “Export Full PDF” to save the full explanation using your browser’s print options.</li>
          </ol>
          <p>You can share the saved image or keep it as a reminder of the name and its meaning. No account is required for your first complete result.</p>
          <CreateNameLink className="button button-primary">Create my Chinese name and card</CreateNameLink>
        </section>
        <section className="culture-sources">
          <h2>Explore further</h2>
          <p>For the living craft behind the design, read <a href="https://ich.unesco.org/en/RL/art-of-chinese-seal-engraving-00217">UNESCO’s account of Chinese seal engraving</a>.</p>
          <p>Continue with <Link href="/methodology">Chinese naming traditions</Link> or discover <Link href="/chinese-zodiac">the twelve Chinese zodiac animals</Link>.</p>
        </section>
      </div>
    </main>
    <Footer />
  </>;
}
