import { ArrowRight, BookOpen, Check, Languages, Volume2 } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomeMotion } from "@/components/HomeMotion";
import { SealMark } from "@/components/SealMark";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HomeMotion />
        <section className="hero shell">
          <div className="hero-copy">
            <h1 aria-label="Find a Chinese name that feels like you.">
              <span className="hero-title-line" aria-hidden="true">
                <span data-hero-line>Find a Chinese</span>
              </span>
              <span className="hero-title-line" aria-hidden="true">
                <span data-hero-line>name that</span>
              </span>
              <span className="hero-title-line" aria-hidden="true">
                <span data-hero-line>feels like you.</span>
              </span>
            </h1>
            <p className="hero-lede" data-hero-detail>
              We create one natural Chinese name shaped by your original name,
              the qualities you value, and the season you were born—then explain
              every layer in clear English.
            </p>
            <div className="hero-actions" data-hero-detail>
              <Link className="button button-primary button-large" href="/create">
                Create My Chinese Name <ArrowRight aria-hidden size={19} />
              </Link>
              <p>Free · No account required · About 2 minutes</p>
            </div>
          </div>

          <div
            className="name-specimen"
            aria-label="Example Chinese name"
            data-hero-specimen
          >
            <SealMark
              className="specimen-seal"
              decorative
              data-parallax="0.9"
            />
            <div className="specimen-content">
              <p className="specimen-label" data-hero-detail>A name shaped with care</p>
              <p className="chinese-name" lang="zh-Hans" aria-label="林知远">
                <span aria-hidden="true" data-hero-char>林</span>
                <span aria-hidden="true" data-hero-char>知</span>
                <span aria-hidden="true" data-hero-char>远</span>
              </p>
              <p className="pinyin" data-hero-detail>Lín Zhīyuǎn</p>
              <span className="specimen-rule" aria-hidden />
              <p className="specimen-meaning" data-hero-detail>
                Awareness with a far-reaching vision.
              </p>
              <dl className="specimen-breakdown" aria-label="Example name meaning">
                <div>
                  <dt lang="zh-Hans">林</dt>
                  <dd>forest · quiet vitality</dd>
                </div>
                <div>
                  <dt lang="zh-Hans">知</dt>
                  <dd>understanding · awareness</dd>
                </div>
                <div>
                  <dt lang="zh-Hans">远</dt>
                  <dd>far-reaching · open vision</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="culture-ribbon" aria-label="Elements of a Chinese name">
          <div className="culture-ribbon-track" data-scroll-track>
            <div>
              <span>Sound</span><b lang="zh-Hans">声</b>
              <span>Meaning</span><b lang="zh-Hans">意</b>
              <span>Rhythm</span><b lang="zh-Hans">韵</b>
              <span>Character</span><b lang="zh-Hans">字</b>
              <span>Harmony</span><b lang="zh-Hans">和</b>
            </div>
            <div aria-hidden="true">
              <span>Sound</span><b lang="zh-Hans">声</b>
              <span>Meaning</span><b lang="zh-Hans">意</b>
              <span>Rhythm</span><b lang="zh-Hans">韵</b>
              <span>Character</span><b lang="zh-Hans">字</b>
              <span>Harmony</span><b lang="zh-Hans">和</b>
            </div>
          </div>
        </section>

        <section
          className="method-band"
          aria-labelledby="method-title"
          data-scene="method"
        >
          <span className="method-curtain" aria-hidden="true" />
          <div className="shell method-band-grid">
            <div className="method-heading">
              <p className="section-kicker">Our method</p>
              <h2 id="method-title">
                Natural in Chinese. Meaningful to you.
              </h2>
            </div>
            <div className="method-summary">
              <p>
                A meaningful Chinese name must sound credible as a whole—not just
                contain individually beautiful characters. Natural usage comes
                first; cultural interpretation follows.
              </p>
              <Link className="text-link" href="/methodology">
                Read our naming method <ArrowRight aria-hidden size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="how-section shell"
          id="how-it-works"
          data-scene="steps"
        >
          <div className="section-heading">
            <p className="section-kicker">Three considered steps</p>
            <h2>Tell us a little. Receive something meaningful.</h2>
          </div>
          <ol className="steps-list">
            <li>
              <span className="step-number">01</span>
              <div>
                <h3>Choose what matters</h3>
                <p>
                  Share your name, birth date, and up to three qualities. Almost
                  everything is selected with one tap.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">02</span>
              <div>
                <h3>We shape one name</h3>
                <p>
                  Sound, meaning, tone, modern usage, and your family name are
                  considered together.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number">03</span>
              <div>
                <h3>Understand every layer</h3>
                <p>
                  Learn the pronunciation, character meanings, poetic image, and
                  the cultural perspectives you selected.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="inside-section" data-scene="inside">
          <span className="inside-curtain" aria-hidden="true" />
          <div className="inside-glyphs" aria-hidden="true" data-parallax="1.35">
            <span>字</span><span>韵</span><span>意</span>
          </div>
          <div className="shell inside-grid">
            <div className="inside-intro">
              <p className="section-kicker">Inside your result</p>
              <h2>One name, fully explained.</h2>
              <p>
                Nothing is hidden behind an account wall. Your first result is
                complete, practical, and yours to keep.
              </p>
            </div>
            <div className="feature-lines">
              <div>
                <Languages aria-hidden />
                <h3>Character by character</h3>
                <p>See the literal meaning and the nuance each character adds.</p>
              </div>
              <div>
                <Volume2 aria-hidden />
                <h3>Pronunciation that travels</h3>
                <p>Formal pinyin plus a simple guide for English speakers.</p>
              </div>
              <div>
                <BookOpen aria-hidden />
                <h3>Culture, clearly labeled</h3>
                <p>Original interpretation is never presented as a historic quote.</p>
              </div>
              <div>
                <Check aria-hidden />
                <h3>Seasonal meaning, clearly framed</h3>
                <p>Birth details add imagery and cultural context to the explanation.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta shell" data-scene="final">
          <SealMark
            className="final-cta-mark"
            decorative
            data-parallax="0.55"
          />
          <div>
            <h2>Your Chinese name is waiting to be understood.</h2>
            <p>One complete name · Free to create · No account required</p>
          </div>
          <Link className="button button-primary button-large" href="/create">
            Create My Chinese Name <ArrowRight aria-hidden size={19} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
