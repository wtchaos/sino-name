import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Learn what information SinoName uses to create your Chinese name, how long results are retained, and how anonymous abuse protection works.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="legal-page shell">
        <header>
          <p>Privacy</p>
          <h1>Only the details needed to shape your name.</h1>
          <p className="legal-updated">MVP privacy summary · October 16, 2026</p>
        </header>

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
            Name preferences and derived birth context are sent to the configured AI
            provider to create the result. The production implementation should link
            to the final provider terms and name the project operator before launch.
          </p>
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
