import Image from "next/image";
import Link from "next/link";
import { CreateNameLink } from "@/components/CreateNameLink";
import type { Metadata } from "next";
import { ArrowRight, Check, X } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Chinese Naming Traditions & Cultural Meanings",
  description:
    "Explore Chinese naming culture: surnames, character meanings, pronunciation, and poetic symbolism. Learn how SinoName creates a natural name for you.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "Chinese Naming Traditions & Cultural Meanings | SinoName",
    description: "Explore Chinese naming culture: surnames, character meanings, pronunciation, and poetic symbolism. Learn how SinoName creates a natural name for you.",
    url: "/methodology",
    siteName: "SinoName",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SinoName: Chinese names, digital seals, and zodiac stories" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
    title: "Chinese Naming Traditions & Cultural Meanings | SinoName",
    description: "Explore Chinese naming culture: surnames, character meanings, pronunciation, and poetic symbolism. Learn how SinoName creates a natural name for you.",
  },
};

export default function MethodologyPage() {
  return (
    <>
      <Header />
      <main className="content-page methodology-page">
        <header className="content-hero shell" id="about-names">
          <div className="methodology-hero-copy">
            <p className="methodology-kicker">Our naming method</p>
            <h1>Language first.<br />Symbolism second.</h1>
            <div className="content-hero-lede">
              <p>
                A Chinese name is a whole: surname, rhythm, meaning, and the
                impression it leaves when spoken aloud. We start with the
                language, then explore the culture around it.
              </p>
            </div>
            <dl className="methodology-name-example" aria-label="Example name: 林知远, Lín Zhīyuǎn">
              <div><dt lang="zh-Hans">林</dt><dd>Lín <span>Surname</span></dd></div>
              <div><dt lang="zh-Hans">知</dt><dd>Zhī <span>Understanding</span></dd></div>
              <div><dt lang="zh-Hans">远</dt><dd>yuǎn <span>Far-reaching</span></dd></div>
            </dl>
            <Link className="text-link" href="/chinese-name-seal">Discover the art behind a name seal <ArrowRight size={17} aria-hidden /></Link>
          </div>
          <figure className="methodology-hero-media">
            <div className="methodology-photo">
              <Image
                src="/images/name-seal-workshop.webp"
                alt="Stone name seal, red seal paste, and a calligraphy brush on a white worktable"
                fill
                sizes="(max-width: 800px) 100vw, 48vw"
                preload
              />
            </div>
            <figcaption>A name takes shape in language, writing, and a personal mark. AI-generated still life.</figcaption>
          </figure>
        </header>

        <section className="method-principles shell">
          <article>
            <span>1</span>
            <h2>It should sound like a real name</h2>
            <p>
              We begin with combinations a Chinese speaker could naturally meet
              in modern life. Familiar characters and a credible full-name rhythm
              matter more than novelty.
            </p>
          </article>
          <article>
            <span>2</span>
            <h2>Connection should never feel forced</h2>
            <p>
              Your family name may inspire a Chinese surname through sound or
              meaning. When that connection becomes awkward, linguistic harmony
              wins.
            </p>
          </article>
          <article>
            <span>3</span>
            <h2>Interpretation must be honest</h2>
            <p>
              Original poetic writing is labeled as original. A classical source
              is cited only when it has been deliberately provided and verified.
            </p>
          </article>
        </section>

        <section className="birth-boundary">
          <div className="shell boundary-grid">
            <div>
              <p>Birth information</p>
              <h2>A source of imagery, with clear limits.</h2>
            </div>
            <div className="boundary-lists">
              <div>
                <h3><Check aria-hidden /> What it can shape</h3>
                <ul>
                  <li>Seasonal imagery</li>
                  <li>A broad time-of-day atmosphere</li>
                  <li><Link href="/chinese-zodiac">Traditional zodiac context and folk tales</Link></li>
                  <li>The tone of the poetic explanation</li>
                </ul>
              </div>
              <div>
                <h3><X aria-hidden /> What it does not assess</h3>
                <ul>
                  <li>Life outcomes or personal traits</li>
                  <li>Health, wealth, marriage, or lifespan</li>
                  <li>Whether a character can alter life outcomes</li>
                  <li>A precise BaZi reading</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="content-cta shell">
          <h2>Ready to meet your name?</h2>
          <p>One complete result, explained in clear English.</p>
          <CreateNameLink className="button button-primary button-large">
            Create My Chinese Name <ArrowRight aria-hidden size={18} />
          </CreateNameLink>
        </section>
      </main>
      <Footer />
    </>
  );
}
