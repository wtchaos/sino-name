import Link from "next/link";
import { NameCardPreview } from "@/components/NameCardPreview";

export function CultureHighlights() {
  return (
    <section className="culture-highlights shell" aria-labelledby="culture-title">
      <header className="culture-heading">
        <h2 id="culture-title">A name. A seal. A little more of Chinese culture.</h2>
        <p>Take home something personal, and understand the traditions behind it.</p>
      </header>
      <div className="culture-feature" data-depth-scene>
        <div data-scroll-layer="-0.07" data-scroll-limit="30"><NameCardPreview /></div>
        <div className="culture-copy">
          <h3>Your Chinese name, in a digital seal</h3>
          <p>Save a name card with your Chinese characters, pinyin, meaning, and a red digital name seal. Explore how the art of Chinese seal engraving brings writing and identity together.</p>
          <Link className="text-link" href="/chinese-name-seal">Explore Chinese name seals →</Link>
        </div>
      </div>
      <div className="culture-feature culture-feature-zodiac" data-depth-scene>
        <div className="culture-copy">
          <h3>Your Chinese zodiac, with its story</h3>
          <p>Discover the animal associated with your birth date and its place in the Great Race folk tale. We check the Chinese New Year boundary, including for January and February birthdays.</p>
          <Link className="text-link" href="/chinese-zodiac">Meet the twelve zodiac animals →</Link>
        </div>
        <figure className="zodiac-preview" data-scroll-layer="0.08" data-scroll-limit="35">
          <span lang="zh-Hans" aria-hidden="true">龙</span>
          <p>Dragon · lóng</p>
          <figcaption>One of twelve animals in the Chinese zodiac cycle. Your result shows the animal for your birth date.</figcaption>
        </figure>
      </div>
    </section>
  );
}
