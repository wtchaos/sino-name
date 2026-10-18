import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacy & Your Personal Information",
  description:
    "See how SinoName uses your name and birth date, stores generated Chinese names for 30 days, and protects your privacy without requiring an account.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy & Your Personal Information | SinoName",
    description: "See how SinoName uses your name and birth date, stores generated Chinese names for 30 days, and protects your privacy without requiring an account.",
    url: "/privacy",
    siteName: "SinoName",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SinoName: Chinese names, digital seals, and zodiac stories" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
    title: "Privacy & Your Personal Information | SinoName",
    description: "See how SinoName uses your name and birth date, stores generated Chinese names for 30 days, and protects your privacy without requiring an account.",
  },
};

export default function PrivacyPage() {
  const providerHost = new URL(process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com").hostname;
  const usesDeepSeek = providerHost === "api.deepseek.com";
  return (
    <>
      <Header />
      <main className="legal-page shell">
        <header>
          <p>Privacy</p>
          <h1>Only the details needed to shape your name.</h1>
          <p className="legal-updated">Updated October 18, 2026</p>
        </header>

        <section>
          <h2>Who operates this service</h2>
          <p>
            This service is operated under the SinoName project name. For privacy
            questions or requests about a saved result, contact{" "}
            <a href="mailto:tchaos.w@gmail.com">tchaos.w@gmail.com</a>.
            Please do not include your full birth date in an email.
          </p>
        </section>

        <section>
          <h2>What you provide</h2>
          <p>
            The creation flow asks for your first name, family name, date of birth,
            optional birth-time period, gender-expression preference, desired
            qualities, naming style, and optional cultural perspectives.
          </p>
        </section>

        <section>
          <h2>How birth information is used</h2>
          <p>
            Your date is converted into limited cultural context such as season and,
            where supported, zodiac year. It is used for poetic inspiration—not for
            personal assessment or a precise BaZi reading.
          </p>
        </section>

        <section>
          <h2>What is retained</h2>
          <p>
            The service keeps an anonymous browser identifier, the generated result,
            and a server-keyed cache identifier for up to 30 days. The cache identifier
            cannot be used as a plain lookup of the details you entered.
          </p>
          <p>
            Your English name and complete birth date are not stored as separate,
            long-term profile fields. No account is created.
          </p>
        </section>

        <section>
          <h2>Abuse prevention</h2>
          <p>
            A shortened, cryptographically hashed form of network information is used
            temporarily for rate limiting. Cloudflare Turnstile may process browser and
            network signals to verify that a request is legitimate.
          </p>
        </section>

        <section>
          <h2>AI processing</h2>
          <p>
            Your entered name, naming preferences, and derived birth context are
            sent to {usesDeepSeek ? "DeepSeek" : `the AI service at ${providerHost}`} to
            create your result. The provider receives the request data to process
            it; SinoName’s 30-day result retention does not describe the provider’s
            own retention policy.
          </p>
          {usesDeepSeek && <p>
            Read <a href="https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html">DeepSeek’s privacy policy</a>{" "}
            and <a href="https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html">terms of use</a>.
          </p>}
        </section>

        <section>
          <h2>Analytics</h2>
          <p>
            In production, Google Analytics helps us understand aggregate visits,
            page usage, and referral sources. Google may process browser, device,
            interaction, and approximate location information and may use analytics
            cookies or similar technologies. Analytics is not loaded during local
            development.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
