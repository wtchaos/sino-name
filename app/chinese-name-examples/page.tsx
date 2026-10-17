import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideHero } from "@/components/GuideHero";
import { StructuredData } from "@/components/StructuredData";
import { CreateNameLink } from "@/components/CreateNameLink";
import { cultureMetadata, siteUrl } from "@/lib/site";
import { namingExamples } from "@/lib/naming-content";

export const metadata = cultureMetadata("Chinese Name Examples with Meaning & Pinyin", "Compare two- and three-character Chinese names with pinyin, dictionary references, original interpretations, pronunciation notes, and naming tradeoffs.", "/chinese-name-examples");

export default function ExamplesPage() {
  return <>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", url: `${siteUrl}/chinese-name-examples`, name: "Chinese name examples with meaning and pinyin", inLanguage: "en", publisher: { "@id": `${siteUrl}/#publisher` }, mainEntity: { "@type": "ItemList", itemListElement: namingExamples.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: `${item.name} (${item.pinyin})`, url: `${siteUrl}/chinese-name-examples#${item.id}` })) } }} />
    <Header />
    <main className="knowledge-page">
      <GuideHero label="Chinese naming · Worked examples" title="See how a name comes together."><p>Three illustrative names, explained through their structure, pronunciation, and character meanings. These are public teaching examples, independent of private visitor results.</p></GuideHero>
      <div className="knowledge-body shell">
        <p className="knowledge-disclosure">Prepared with AI assistance. Character glosses and readings were cross-checked against the linked dictionary references. The interpretations and naming tradeoffs are editorial explanations, not certified human naming reviews or claims of uniqueness.</p>
        <nav className="example-index" aria-label="Name examples">{namingExamples.map(item => <a key={item.id} href={`#${item.id}`}><span lang="zh-Hans">{item.name}</span><span>{item.pinyin}</span></a>)}</nav>
        {namingExamples.map(item => <article className="worked-name" id={item.id} key={item.id}>
          <header><p>{item.structure}</p><h2 lang="zh-Hans">{item.name}</h2><p className="worked-pinyin">{item.pinyin}</p><p className="worked-meaning">{item.meaning}</p></header>
          <div className="worked-explanation">
            <h3>Characters and dictionary meanings</h3>
            <dl>{item.characters.map(char => <div key={char.character}><dt><span lang="zh-Hans">{char.character}</span> · {char.pinyin}</dt><dd>{char.gloss} <a href={char.url}>Dictionary reference</a></dd></div>)}</dl>
            <h3>Why this combination?</h3><p>{item.reasoning}</p>
            <h3>Pronunciation and spelling</h3><p>{item.pronunciation}</p>
            <h3>A naming tradeoff</h3><p>{item.tradeoff}</p>
          </div>
        </article>)}
        <aside className="knowledge-reading"><h2>How to use these examples</h2><p>Compare the complete names rather than collecting attractive character definitions. A dictionary gloss supplies evidence for a reading; it does not certify that a complete name suits a particular person. The references use traditional characters where appropriate, while SinoName displays simplified Chinese.</p><p>See the <a href="https://www.loc.gov/catdir/pinyin/rom1.html">Library of Congress pinyin guidance</a>, our <Link href="/methodology">naming method</Link>, and <Link href="/about#checks">the limits of automated checks</Link>.</p></aside>
        <CreateNameLink className="button button-primary">Create a name shaped for me</CreateNameLink>
      </div>
    </main>
    <Footer />
  </>;
}
