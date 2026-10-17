import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuideHero } from "@/components/GuideHero";
import { StructuredData } from "@/components/StructuredData";
import { cultureMetadata, siteUrl } from "@/lib/site";

export const metadata = cultureMetadata("About SinoName: AI Naming, Sources & Editorial Approach", "Learn how SinoName creates Chinese names, what automated checks cover, how cultural sources and original interpretations are distinguished, and how to contact us.", "/about");

export default function AboutPage() {
  return <>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "AboutPage", url: `${siteUrl}/about`, name: "About SinoName and its editorial approach", inLanguage: "en", about: { "@id": `${siteUrl}/#publisher` }, publisher: { "@id": `${siteUrl}/#publisher` } }} />
    <Header />
    <main className="knowledge-page">
      <GuideHero label="About SinoName" title="A clear method. An open explanation."><p>SinoName is an AI-assisted Chinese naming project for English-speaking people exploring Chinese language and culture. We explain how the name is made, where the cultural material comes from, and where our checks have limits.</p></GuideHero>
      <div className="knowledge-body shell about-content">
        <section id="publisher"><h2>Who publishes this site?</h2><p>This site and its public guides are published under the SinoName project name. The guides and worked examples are prepared with AI assistance. No individual author credentials or independent specialist endorsement are claimed.</p><p>For questions, corrections, or feedback, contact <a href="mailto:tchaos.w@gmail.com">tchaos.w@gmail.com</a>.</p></section>
        <section id="checks"><h2>What is checked when a name is generated?</h2><p>The application asks the configured AI model to create a name and explanation from your preferences. Before accepting a new generated response, it checks required fields, the requested character count, consistency between surname, given name and full name, a configured surname list, Chinese-character formatting, a limited excluded-character list, and score arithmetic.</p><p>The model is also instructed to consider pronunciation, meaning, modern usage, and possible negative homophones. Those instructions are different from an exhaustive dictionary or dialect check. A model-generated score is an internal assessment, not an independently measured quality rating.</p><p>Generated names are not individually approved by a human naming specialist. The application does not perform a live population-registry search or verify every possible homophone. For a name you plan to use widely, feedback from a trusted Chinese speaker can add context that automated checks miss.</p></section>
        <section id="editorial"><h2>How do we prepare cultural content?</h2><p>Public examples distinguish dictionary meanings from our original English interpretations. We cross-check the character glosses and readings against the dictionary entries linked beside them. That supports the individual explanations, while the overall suitability of a name remains a matter of context and judgment.</p><p>Calendar explanations link to the Hong Kong Observatory. The seal guide cites UNESCO’s account of the living craft. Folk tales are labeled as retellings with variations, and AI-generated illustrations are labeled in their captions.</p><p>Generated results follow a different process: they do not automatically consult those dictionaries or verify classical quotations against a source database. Our naming instructions prohibit invented attributions, and original poetic explanations are identified as original. Please report a source or wording that seems incorrect.</p></section>
        <section><h2>Where does birth information fit?</h2><p>Season and Chinese zodiac information add imagery and cultural context. SinoName uses Chinese New Year as the zodiac-year boundary. It does not use a birthday to predict personality, wealth, health, relationships, or future events.</p><p>Learn more about <Link href="/chinese-zodiac">zodiac animals and the calendar boundary</Link>, or read our <Link href="/privacy">privacy and retention information</Link>.</p></section>
        <section id="corrections"><h2>How can I suggest a correction?</h2><p>Email <a href="mailto:tchaos.w@gmail.com?subject=SinoName%20content%20feedback">tchaos.w@gmail.com</a> with the page URL, the specific wording, and any reference you think would help. Corrections can improve future versions of the public guides and naming instructions.</p><p className="knowledge-disclosure">Content updated October 17, 2026. This date records the public content update; it does not imply an independent expert review.</p></section>
        <aside className="knowledge-reading"><h2>Start with a concrete example</h2><p>Compare <Link href="/chinese-name-examples">three worked Chinese names</Link>, read <Link href="/faq">common naming questions</Link>, or explore <Link href="/methodology">the naming method</Link>.</p></aside>
      </div>
    </main>
    <Footer />
  </>;
}
