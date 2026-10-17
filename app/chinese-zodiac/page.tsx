import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CreateNameLink } from "@/components/CreateNameLink";
import { cultureMetadata } from "@/lib/site";
import { zodiacAnimals, zodiacStories } from "@/lib/zodiac";

export const metadata = cultureMetadata(
  "Chinese Zodiac Animals, Birth Years & the Great Race",
  "Meet the twelve Chinese zodiac animals and their Great Race stories. Learn why Chinese New Year matters when finding the zodiac animal for your birth date.",
  "/chinese-zodiac",
);

export default function ChineseZodiacPage() {
  return <>
    <Header />
    <main className="content-page culture-guide">
      <header className="content-hero shell">
        <p>Chinese culture · The zodiac</p>
        <h1>The Chinese zodiac. Twelve animal stories.</h1>
        <div className="content-hero-lede"><p>The Chinese zodiac, <span lang="zh-Hans">生肖</span> (shēngxiào), gives each year an animal in a repeating twelve-year cycle. It is one way to explore the cultural world around a name.</p></div>
      </header>
      <div className="culture-article shell">
        <section>
          <h2>Which Chinese zodiac animal is yours?</h2>
          <p>The animals follow a fixed order: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. Every twelve years, the same animal returns.</p>
          <p>A birth year alone can be misleading for people born early in the year. SinoName uses Chinese New Year as the boundary, rather than January 1. For example, February 9, 2024 falls in the Year of the Rabbit, while February 10 begins the Year of the Dragon. Some astrological traditions use the solar term Start of Spring instead; that is a different convention.</p>
          <p>Your SinoName result uses your full birth date to show the animal, its Chinese character, and a short folk tale. This offers cultural context without treating a birth date as a prediction.</p>
          <CreateNameLink className="button button-primary">Discover my name and zodiac</CreateNameLink>
        </section>
        <section>
          <h2>The Great Race: twelve animals in order</h2>
          <p>One popular folk tale explains the order through a race across a river. Each animal finds a different way to reach the far bank. The details and even the figure hosting the race vary between tellings. These are short retellings of folklore, rather than a historical account of how the calendar began.</p>
          <ol className="zodiac-stories">
            {zodiacAnimals.map((animal) => {
              const item = zodiacStories[animal];
              return <li key={animal}>
                <span className="zodiac-story-character" lang="zh-Hans" aria-hidden="true">{item.character}</span>
                <div><h3>{animal} <span>· <span lang="zh-Hans">{item.character}</span> · {item.pinyin}</span></h3><p>{item.story}</p></div>
              </li>;
            })}
          </ol>
        </section>
        <section>
          <h2>How does the zodiac relate to your name?</h2>
          <p>At SinoName, a name begins with language: a natural surname, familiar characters, pronunciation, and a coherent meaning. Birth information can add seasonal imagery and a zodiac story, while your chosen qualities help shape the naming direction.</p>
          <p>The zodiac is presented as cultural symbolism. It does not determine your personality, relationships, luck, or future. Read <Link href="/methodology">how our naming method works</Link> for more detail.</p>
        </section>
        <section className="culture-sources">
          <h2>Sources and further reading</h2>
          <ul>
            <li><a href="https://www.hko.gov.hk/en/gts/time/Calendar.htm">Hong Kong Observatory: the Chinese calendar and animal cycle</a></li>
            <li><a href="https://www.hko.gov.hk/tc/gts/astron2024/files/HKO_almanac_2024.pdf">Hong Kong Observatory: 2024 almanac and Lunar New Year date</a></li>
            <li><a href="https://en.wikipedia.org/wiki/Chinese_zodiac#Great_Race">Chinese zodiac: the Great Race and variations</a></li>
          </ul>
          <p>Explore another tradition: <Link href="/chinese-name-seal">Chinese name seals and digital name cards</Link>.</p>
        </section>
      </div>
    </main>
    <Footer />
  </>;
}
