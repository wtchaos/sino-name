"use client";

import {
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  Download,
  Leaf,
  Link2,
  Share2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SealMark } from "@/components/SealMark";
import type { NameResult } from "@/lib/types";

type ResultState =
  | { status: "loading" }
  | { status: "ready"; result: NameResult }
  | { status: "missing" };

export function ResultExperience({ id }: { id: string }) {
  const [state, setState] = useState<ResultState>({ status: "loading" });
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    const local = localStorage.getItem(`nih:result:${id}`);
    if (local) {
      try {
        const result = JSON.parse(local) as NameResult;
        setState({ status: "ready", result });
        return () => {
          active = false;
        };
      } catch {
        localStorage.removeItem(`nih:result:${id}`);
      }
    }

    fetch(`/api/results/${id}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("missing");
        return (await response.json()) as { result: NameResult };
      })
      .then(({ result }) => {
        if (!active) return;
        localStorage.setItem(`nih:result:${id}`, JSON.stringify(result));
        setState({ status: "ready", result });
      })
      .catch(() => {
        if (active) setState({ status: "missing" });
      });

    return () => {
      active = false;
    };
  }, [id]);

  function announce(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  }

  async function copyName(result: NameResult) {
    await navigator.clipboard.writeText(`${result.fullName} · ${result.pinyin}`);
    announce("Name copied.");
  }

  async function shareResult(result: NameResult) {
    const shareData = {
      title: `${result.fullName} — Named in Hanzi`,
      text: `${result.fullName} (${result.pinyin}): ${result.oneLineMeaning}`,
      url: window.location.href,
    };
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    announce("Share link copied.");
  }

  async function downloadCard(result: NameResult) {
    await document.fonts.ready;
    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = 1080 * scale;
    canvas.height = 1350 * scale;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(scale, scale);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 1080, 1350);
    context.strokeStyle = "#eadcdf";
    context.lineWidth = 2;
    context.strokeRect(72, 72, 936, 1206);

    context.textAlign = "center";
    context.fillStyle = "#8b2635";
    context.font = '600 180px "Noto Serif SC", serif';
    context.fillText(result.fullName, 540, 470);
    context.fillStyle = "#241a1b";
    context.font = '600 42px "Source Sans 3", sans-serif';
    context.fillText(result.pinyin, 540, 560);

    context.fillStyle = "#183d72";
    context.fillRect(510, 628, 60, 4);
    context.fillStyle = "#241a1b";
    context.font = '400 36px "Source Sans 3", sans-serif';
    wrapText(context, result.oneLineMeaning, 540, 730, 750, 54);

    context.fillStyle = "#75696a";
    context.font = '600 25px "Source Sans 3", sans-serif';
    context.fillText("NAMED IN HANZI", 540, 1150);
    context.font = '400 24px "Source Sans 3", sans-serif';
    context.fillText("A Chinese name that feels like you.", 540, 1195);

    const link = document.createElement("a");
    link.download = `${result.fullName}-named-in-hanzi.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    announce("Name card downloaded.");
  }

  if (state.status === "loading") {
    return (
      <main className="result-loading" aria-live="polite">
        <SealMark className="loading-seal" decorative />
        <p>Preparing your name story…</p>
      </main>
    );
  }

  if (state.status === "missing") {
    return (
      <main className="result-missing shell">
        <SealMark className="missing-mark" decorative />
        <h1>This name is no longer available.</h1>
        <p>
          Results are kept for 30 days. If you created this name on another
          device, open its original share link there.
        </p>
        <Link className="button button-primary" href="/create">
          Create a Chinese name <ArrowRight aria-hidden size={18} />
        </Link>
      </main>
    );
  }

  const { result } = state;

  return (
    <main className="result-page">
      <section className="result-hero shell">
        <p className="result-overline">Your Chinese name is</p>
        <div className="result-name-wrap">
          <SealMark className="result-seal" decorative />
          <h1 lang="zh-Hans">{result.fullName}</h1>
        </div>
        <p className="result-pinyin">{result.pinyin}</p>
        <p className="result-pronunciation">Say it like: {result.pronunciation}</p>
        <p className="result-meaning-label">What your name means</p>
        <p className="result-one-line">“{result.oneLineMeaning}”</p>
        <div className="result-meaning-summary">
          {result.characters.map((item) => (
            <div key={item.character}>
              <span className="meaning-glyph" lang="zh-Hans">
                {item.character}
              </span>
              <span>
                <strong>{item.literalMeaning}</strong>
                <small>{item.nameConnotation}</small>
              </span>
            </div>
          ))}
        </div>
        <p className="result-for">Created for {result.originalFirstName}</p>

        <div className="result-actions">
          <button
            className="button button-primary"
            type="button"
            onClick={() => downloadCard(result)}
          >
            <Download aria-hidden size={18} /> Download Name Card
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => copyName(result)}
          >
            <Copy aria-hidden size={18} /> Copy Name
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => shareResult(result)}
          >
            <Share2 aria-hidden size={18} /> Share Result
          </button>
        </div>
        <p className="sr-status" role="status" aria-live="polite">
          {notice}
        </p>
      </section>

      <section className="result-content shell" id="name-story">
        <div className="result-section result-introduction">
          <div className="result-section-title">
            <Sparkles aria-hidden />
            <h2>Why this name fits you</h2>
          </div>
          <p>{result.personalization}</p>
          <p>{result.surnameConnection.explanation}</p>
        </div>

        <div className="character-study" aria-labelledby="characters-title">
          <div className="result-section-title">
            <BookOpen aria-hidden />
            <h2 id="characters-title">Character by character</h2>
          </div>
          <div className="character-list">
            {result.characters.map((item) => (
              <article key={item.character}>
                <p className="character-glyph" lang="zh-Hans">{item.character}</p>
                <div>
                  <h3>{item.literalMeaning}</h3>
                  <p>{item.nameConnotation}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="overall-meaning">{result.overallMeaning}</p>
        </div>

        <div className="interpretation-grid">
          <article className="interpretation-block poetic-block">
            <div className="result-section-title">
              <Sparkles aria-hidden />
              <h2>Poetic interpretation</h2>
            </div>
            <blockquote>{result.poeticInterpretation.text}</blockquote>
            <p className="source-label">Original interpretation</p>
          </article>

          <article className="interpretation-block">
            <div className="result-section-title">
              <Leaf aria-hidden />
              <h2>Birth-inspired symbolism</h2>
            </div>
            <p>{result.birthInspiration}</p>
          </article>

          {result.daoistPerspective ? (
            <article className="interpretation-block">
              <div className="result-section-title">
                <span className="text-icon" aria-hidden>道</span>
                <h2>Daoist perspective</h2>
              </div>
              <p>{result.daoistPerspective}</p>
            </article>
          ) : null}

          {result.buddhistPerspective ? (
            <article className="interpretation-block">
              <div className="result-section-title">
                <span className="text-icon" aria-hidden>禅</span>
                <h2>Buddhist perspective</h2>
              </div>
              <p>{result.buddhistPerspective}</p>
            </article>
          ) : null}
        </div>

        <section className="practical-section">
          <div>
            <p className="practical-label">In everyday use</p>
            <h2>A name designed to travel well.</h2>
          </div>
          <dl className="practical-list">
            <div>
              <dt>Style</dt>
              <dd>{result.practicalReview.usageStyle}</dd>
            </div>
            <div>
              <dt>Expression</dt>
              <dd>{result.practicalReview.genderExpression}</dd>
            </div>
            <div>
              <dt>Pronunciation</dt>
              <dd>{result.practicalReview.pronunciationDifficulty}</dd>
            </div>
            <div>
              <dt>Character familiarity</dt>
              <dd>{result.practicalReview.commonness}</dd>
            </div>
          </dl>
        </section>

        <aside className="cultural-note">
          <Check aria-hidden />
          <p>
            This is a cultural and linguistic interpretation. Birth information
            contributes seasonal imagery and context to the name story.
          </p>
        </aside>

        <div className="result-footer-actions">
          <Link className="text-link" href="/methodology">
            <Link2 aria-hidden size={17} /> Read how names are chosen
          </Link>
          <Link className="wordmark compact" href="/">
            <SealMark className="wordmark-mark" decorative />
            Named in Hanzi
          </Link>
        </div>
      </section>
    </main>
  );
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  startY: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (context.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  lines.forEach((item, index) => {
    context.fillText(item, centerX, startY + index * lineHeight);
  });
}
