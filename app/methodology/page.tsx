import type { Metadata } from "next";
import { ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Our naming method",
  description:
    "How Named in Hanzi balances natural Chinese usage, meaning, pronunciation, and cultural interpretation.",
};

export default function MethodologyPage() {
  return (
    <>
      <Header />
      <main className="content-page">
        <header className="content-hero shell">
          <p>Our naming method</p>
          <h1>Language first. Symbolism second.</h1>
          <div className="content-hero-lede">
            <p>
              A Chinese name is not a row of positive dictionary definitions. It
              is a whole: surname, rhythm, tone, written form, contemporary usage,
              and the impression it leaves when spoken aloud.
            </p>
          </div>
        </header>

        <section className="method-principles shell" id="about-names">
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
                  <li>Traditional zodiac context where available</li>
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
          <Link className="button button-primary button-large" href="/create">
            Create My Chinese Name <ArrowRight aria-hidden size={18} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
