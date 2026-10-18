import Image from "next/image";
import { CultureHighlights } from "@/components/CultureHighlights";
import { siteUrl } from "@/lib/site";
import { CreateNameLink } from "@/components/CreateNameLink";
import { ArrowRight, BookOpen, Check, Languages, Volume2 } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomeMotion } from "@/components/HomeMotion";
import { SealMark } from "@/components/SealMark";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          name: "SinoName",
          url: siteUrl,
          publisher: { "@id": `${siteUrl}/#publisher` },
          description: "Personalized Chinese names, digital name seals, and Chinese zodiac stories explained in English.",
          inLanguage: "en",
        }).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main className="home-page">
        <HomeMotion />
        <section className="hero shell" data-depth-scene data-depth-origin="top">
          <div className="hero-copy" data-scroll-layer="-0.10" data-scroll-limit="70">
            <p className="section-kicker">Free Chinese Name Generator</p>
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
              Create a personalized Chinese name based on your original name and
              the qualities you value. Get Chinese characters, pinyin,
              pronunciation guidance, and meanings explained in clear English.
            </p>
            <div className="hero-actions" data-hero-detail>
              <CreateNameLink className="button button-primary button-large">
                Create My Chinese Name <ArrowRight aria-hidden size={19} />
              </CreateNameLink>
              <p>Free · No account required · About 2 minutes</p>
            </div>
          </div>

          <div
            className="name-specimen"
            aria-label="Example Chinese name"
            data-scroll-layer="0.16"
            data-scroll-limit="110"
            data-hero-specimen
          >
            <SealMark
              className="specimen-seal"
              decorative
              data-scroll-layer="0.24" data-scroll-limit="140"
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

        <section className="culture-ribbon" aria-label="Elements of a Chinese name" data-depth-scene>
          <div className="culture-ribbon-track shell">
            <div><span>Sound</span><b lang="zh-Hans" data-scroll-layer="0.035" data-scroll-limit="9">声</b></div>
            <div><span>Meaning</span><b lang="zh-Hans" data-scroll-layer="-0.035" data-scroll-limit="9">意</b></div>
            <div><span>Rhythm</span><b lang="zh-Hans" data-scroll-layer="0.035" data-scroll-limit="9">韵</b></div>
            <div><span>Character</span><b lang="zh-Hans" data-scroll-layer="-0.035" data-scroll-limit="9">字</b></div>
            <div><span>Harmony</span><b lang="zh-Hans" data-scroll-layer="0.035" data-scroll-limit="9">和</b></div>
            <div><span>Form</span><b lang="zh-Hans" data-scroll-layer="-0.035" data-scroll-limit="9">形</b></div>
            <div><span>Origin</span><b lang="zh-Hans" data-scroll-layer="0.035" data-scroll-limit="9">源</b></div>
            <div><span>Name</span><b lang="zh-Hans" data-scroll-layer="-0.035" data-scroll-limit="9">名</b></div>
          </div>
        </section>

        <CultureHighlights />

        <section
          className="method-band"
          aria-labelledby="method-title"
          data-scene="method"
          data-depth-scene
        >

          <span className="method-depth-glyph" lang="zh-Hans" aria-hidden="true" data-scroll-layer="-0.14" data-scroll-axis="x" data-scroll-limit="80">文</span>
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
          data-depth-scene
        >
          <div className="section-heading">
            <p className="section-kicker">Three considered steps</p>
            <h2>Tell us a little. Receive something meaningful.</h2>
          </div>
          <ol className="steps-list">
            <li>
              <span className="step-number" data-scroll-layer="-0.04" data-scroll-limit="18">01</span>
              <div>
                <h3>Choose what matters</h3>
                <p>
                  Share your name, birth date, and up to three qualities. Almost
                  everything is selected with one tap.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number" data-scroll-layer="0.04" data-scroll-limit="18">02</span>
              <div>
                <h3>We shape one name</h3>
                <p>
                  Sound, meaning, tone, modern usage, and your family name are
                  considered together.
                </p>
              </div>
            </li>
            <li>
              <span className="step-number" data-scroll-layer="-0.04" data-scroll-limit="18">03</span>
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

        <section className="home-seal-scene" data-depth-scene aria-labelledby="seal-scene-title">
          <div className="home-seal-image" data-scroll-layer="0.22" data-scroll-limit="100">
            <Image src="/images/name-seal-workshop.webp" alt="Carved stone seal and red seal paste on a Chinese calligraphy worktable" fill sizes="100vw" />
          </div>
          <div className="home-seal-scrim" aria-hidden="true" />
          <span className="home-seal-glyph" lang="zh-Hans" aria-hidden="true" data-scroll-layer="0.12" data-scroll-axis="x" data-scroll-limit="65">篆</span>
          <div className="shell home-seal-copy" data-scroll-layer="-0.08" data-scroll-limit="40">
            <h2 id="seal-scene-title">The shape<br />of a name.</h2>
            <p>From a spoken sound to a written character, and a mark you can keep.</p>
            <Link className="text-link" href="/chinese-name-seal">Explore the art of name seals <ArrowRight size={18} aria-hidden /></Link>
            <small>AI-generated still life inspired by seal engraving.</small>
          </div>
        </section>

        <section className="inside-section" data-scene="inside" data-depth-scene>

          <div className="inside-glyphs" aria-hidden="true" data-scroll-layer="0.18" data-scroll-limit="100">
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


        <section className="home-reading shell" aria-labelledby="reading-title">
          <div><h2 id="reading-title">A little understanding before you choose.</h2><p>Explore real examples and clear answers about Chinese names.</p></div>
          <nav aria-label="Chinese naming guides">
            <Link href="/chinese-name-examples">Names, meanings & pronunciation <ArrowRight size={18} aria-hidden /></Link>
            <Link href="/faq">Common naming questions <ArrowRight size={18} aria-hidden /></Link>
            <Link href="/about">Our sources & editorial approach <ArrowRight size={18} aria-hidden /></Link>
          </nav>
        </section>

        <section className="final-cta shell" data-scene="final" data-depth-scene>
          <SealMark
            className="final-cta-mark"
            decorative
            data-scroll-layer="-0.1" data-scroll-limit="45"
          />
          <div>
            <h2>Your Chinese name is waiting to be understood.</h2>
            <p>One complete name · Free to create · No account required</p>
          </div>
          <CreateNameLink className="button button-primary button-large">
            Create My Chinese Name <ArrowRight aria-hidden size={19} />
          </CreateNameLink>
        </section>
      </main>
      <Footer />
    </>
  );
}
