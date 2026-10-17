import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideHero } from "@/components/GuideHero";
import { StructuredData } from "@/components/StructuredData";
import { CreateNameLink } from "@/components/CreateNameLink";
import { cultureMetadata, siteUrl } from "@/lib/site";
import { namingQuestions } from "@/lib/naming-content";

export const metadata = cultureMetadata("Chinese Naming FAQ: Names, Pinyin, Seals & Zodiac", "Answers to common questions about choosing a Chinese name, surname order, two- and three-character names, pinyin, digital seals, zodiac years, and saved results.", "/faq");

export default function FaqPage() {
  return <>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${siteUrl}/faq#page`, url: `${siteUrl}/faq`, name: "Chinese naming questions", inLanguage: "en", publisher: { "@id": `${siteUrl}/#publisher` }, mainEntity: namingQuestions.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />
    <Header />
    <main className="knowledge-page">
      <GuideHero label="Chinese naming · Common questions" title="A Chinese name, understood."><p>Clear answers about the name you choose, the culture around it, and what to expect from SinoName.</p></GuideHero>
      <div className="knowledge-body shell">
        <nav className="question-index" aria-label="Questions on this page">{namingQuestions.map(item => <a key={item.id} href={`#${item.id}`}>{item.question}</a>)}</nav>
        <div className="question-answers">{namingQuestions.map(item => <section key={item.id} id={item.id}><h2>{item.question}</h2><p>{item.answer}</p><Link className="text-link" href={item.href}>{item.link} →</Link></section>)}</div>
        <aside className="knowledge-reading"><h2>Sources and editorial approach</h2><p>For romanization conventions, see the <a href="https://www.loc.gov/catdir/pinyin/rom1.html">Library of Congress pinyin guidelines</a>. Calendar references appear in our <Link href="/chinese-zodiac">zodiac guide</Link>. Product answers describe the current implementation. Learn <Link href="/about">how we prepare and check content</Link>.</p></aside>
        <CreateNameLink className="button button-primary">Create my Chinese name</CreateNameLink>
      </div>
    </main>
    <Footer />
  </>;
}
