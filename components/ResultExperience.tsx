"use client";

import { CreateNameLink } from "@/components/CreateNameLink";

import {
  ArrowRight,
  BookOpen,
  Check,
  Download,
  FileDown,
  House,
  Leaf,
  Link2,
  Share2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SealMark } from "@/components/SealMark";
import type { NameResult } from "@/lib/types";
import { readCachedResults, saveCachedResult } from "@/lib/result-cache";

type ResultState =
  | { status: "loading" }
  | { status: "ready"; result: NameResult }
  | { status: "missing" };

export function ResultExperience({ id }: { id: string }) {
  const [state, setState] = useState<ResultState>({ status: "loading" });
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    const local = readCachedResults().find((result) => result.id === id);
    if (local) {
      setState({ status: "ready", result: local });
      return () => { active = false; };
    }

    fetch(`/api/results/${id}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("missing");
        return (await response.json()) as { result: NameResult };
      })
      .then(({ result }) => {
        if (!active) return;
        if (Date.parse(result.expiresAt) <= Date.now()) throw new Error("expired");
        saveCachedResult(result);
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

  function exportPdf(result: NameResult) {
    const previousTitle = document.title;
    const restoreTitle = () => {
      document.title = previousTitle;
      window.removeEventListener("afterprint", restoreTitle);
    };
    document.title = `${result.fullName}-SinoName-full-result`;
    window.addEventListener("afterprint", restoreTitle, { once: true });
    window.print();
    window.setTimeout(restoreTitle, 30_000);
  }

  async function shareResult(result: NameResult) {
    const shareData = {
      title: `${result.fullName} — SinoName`,
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
    const sealText = sealTextForName(result.fullName).join("");
    await Promise.allSettled([
      document.fonts.load('64px "Chong Xi Small Seal"', sealText),
      document.fonts.load('148px "Ma Shan Zheng"', result.fullName),
      document.fonts.load('64px "Ma Shan Zheng"', sealText),
      document.fonts.load('64px "Noto Serif SC"', sealText),
    ]);
    await document.fonts.ready;
    const canvas = document.createElement("canvas");
    canvas.width = 1050;
    canvas.height = 600;
    const context = canvas.getContext("2d");
    if (!context) return;
    drawNameCard(context, result);

    const link = document.createElement("a");
    link.download = `${result.fullName}-sinoname.png`;
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
        <CreateNameLink className="button button-primary">
          Create a Chinese name <ArrowRight aria-hidden size={18} />
        </CreateNameLink>
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
        <p className="result-for">Created for {formatOriginalName(result)}</p>

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
            onClick={() => exportPdf(result)}
          >
            <FileDown aria-hidden size={18} /> Export Full PDF
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
          <Link className="text-link" href="/">
            <House aria-hidden size={17} /> Back to SinoName home
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

function formatOriginalName(result: NameResult) {
  return [result.originalFirstName, result.originalFamilyName]
    .filter(Boolean)
    .join(" ");
}

function drawNameCard(
  context: CanvasRenderingContext2D,
  result: NameResult,
) {
  const width = 1050;
  const height = 600;

  context.fillStyle = "#f4f3ef";
  context.fillRect(0, 0, width, height);

  drawPaperTexture(context, width, height);
  drawInkLandscape(context, width, height);

  drawCardSeal(context, 76, 57, 42);
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.fillStyle = "#241a1b";
  context.font = '650 23px "Source Sans 3", sans-serif';
  context.fillText("SinoName.space", 132, 78);

  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillStyle = "#282522";
  context.font = '400 148px "Ma Shan Zheng", "Noto Serif SC", serif';
  context.fillText(result.fullName, 72, 286);

  context.fillStyle = "#37322f";
  context.font = '600 27px "Source Sans 3", sans-serif';
  context.fillText(result.pinyin, 82, 329);

  context.fillStyle = "#9b2636";
  context.fillRect(82, 354, 54, 3);
  context.fillStyle = "#3f3a36";
  context.font = '500 21px "Source Sans 3", sans-serif';
  wrapText(context, result.oneLineMeaning, 82, 397, 590, 30);

  context.fillStyle = "#57514d";
  context.font = '500 17px "Source Sans 3", sans-serif';
  context.fillText(`Created for ${formatOriginalName(result)}`, 82, 516);

  drawNameSeal(context, result.fullName, 864, 404, 102);
}

function drawPaperTexture(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  context.save();
  context.strokeStyle = "rgba(55, 48, 42, 0.025)";
  context.lineWidth = 1;
  for (let index = 0; index < 90; index += 1) {
    const y = (index * 47) % height;
    const x = (index * 83) % width;
    const length = 18 + ((index * 29) % 74);
    context.beginPath();
    context.moveTo(x, y);
    context.quadraticCurveTo(x + length / 2, y - 2, x + length, y + 1);
    context.stroke();
  }
  context.restore();
}

function drawInkLandscape(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  context.save();

  const sunWash = context.createRadialGradient(842, 188, 7, 842, 188, 76);
  sunWash.addColorStop(0, "rgba(155, 38, 54, 0.16)");
  sunWash.addColorStop(0.58, "rgba(155, 38, 54, 0.075)");
  sunWash.addColorStop(1, "rgba(155, 38, 54, 0)");
  context.fillStyle = sunWash;
  context.beginPath();
  context.arc(842, 188, 76, 0, Math.PI * 2);
  context.fill();

  const inkBloom = context.createRadialGradient(790, 454, 28, 790, 454, 270);
  inkBloom.addColorStop(0, "rgba(35, 39, 38, 0.15)");
  inkBloom.addColorStop(0.52, "rgba(35, 39, 38, 0.055)");
  inkBloom.addColorStop(1, "rgba(35, 39, 38, 0)");
  context.fillStyle = inkBloom;
  context.fillRect(490, 218, 560, 382);

  context.filter = "blur(5px)";
  context.fillStyle = "rgba(39, 44, 43, 0.07)";
  context.beginPath();
  context.moveTo(360, height);
  context.bezierCurveTo(445, 493, 514, 517, 577, 437);
  context.bezierCurveTo(640, 357, 705, 466, 764, 402);
  context.bezierCurveTo(831, 329, 893, 425, 944, 359);
  context.bezierCurveTo(986, 305, 1015, 330, width, 286);
  context.lineTo(width, height);
  context.closePath();
  context.fill();

  context.filter = "blur(2px)";
  context.fillStyle = "rgba(31, 36, 35, 0.15)";
  context.beginPath();
  context.moveTo(468, height);
  context.bezierCurveTo(579, 534, 644, 556, 719, 493);
  context.bezierCurveTo(790, 433, 858, 503, 915, 451);
  context.bezierCurveTo(966, 405, 1010, 436, width, 402);
  context.lineTo(width, height);
  context.closePath();
  context.fill();

  context.filter = "none";
  context.fillStyle = "rgba(27, 32, 31, 0.22)";
  context.beginPath();
  context.moveTo(635, height);
  context.bezierCurveTo(727, 533, 802, 570, 875, 520);
  context.bezierCurveTo(937, 478, 995, 518, width, 483);
  context.lineTo(width, height);
  context.closePath();
  context.fill();

  context.strokeStyle = "rgba(31, 37, 36, 0.2)";
  context.lineWidth = 1.5;
  context.beginPath();
  context.moveTo(548, 538);
  context.bezierCurveTo(664, 524, 762, 552, width, 515);
  context.moveTo(596, 558);
  context.bezierCurveTo(728, 546, 844, 575, width, 548);
  context.stroke();

  context.strokeStyle = "rgba(35, 40, 39, 0.08)";
  for (let index = 0; index < 18; index += 1) {
    const startX = 544 + ((index * 37) % 430);
    const startY = 410 + ((index * 29) % 152);
    const length = 26 + ((index * 17) % 88);
    context.lineWidth = 0.8 + (index % 3) * 0.5;
    context.beginPath();
    context.moveTo(startX, startY);
    context.quadraticCurveTo(
      startX + length * 0.44,
      startY - 7 + (index % 4) * 4,
      startX + length,
      startY + 2,
    );
    context.stroke();
  }
  context.restore();
}

function drawCardSeal(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) {
  context.save();
  context.translate(x, y);
  context.scale(size / 42, size / 42);
  context.strokeStyle = "#9b2636";
  context.lineWidth = 3;
  context.beginPath();
  context.arc(21, 21, 20, 0, Math.PI * 2);
  context.stroke();
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(8, 14);
  context.lineTo(34, 14);
  context.moveTo(8, 28);
  context.lineTo(34, 28);
  context.moveTo(15, 2);
  context.lineTo(15, 40);
  context.moveTo(27, 2);
  context.lineTo(27, 40);
  context.moveTo(15, 21);
  context.lineTo(27, 21);
  context.stroke();
  context.restore();
}

function drawNameSeal(
  context: CanvasRenderingContext2D,
  fullName: string,
  x: number,
  y: number,
  size: number,
) {
  const characters = sealTextForName(fullName);
  const columns = 2;
  const rows = Math.ceil(characters.length / columns);
  const inset = 10;
  const contentSize = size - inset * 2;
  const cellWidth = contentSize / columns;
  const cellHeight = contentSize / rows;

  const stamp = document.createElement("canvas");
  stamp.width = size;
  stamp.height = size;
  const stampContext = stamp.getContext("2d");
  if (!stampContext) return;

  stampContext.strokeStyle = "#9b2636";
  stampContext.lineWidth = 4;
  stampContext.strokeRect(4, 4, size - 8, size - 8);
  stampContext.globalAlpha = 0.62;
  stampContext.lineWidth = 1.5;
  stampContext.strokeRect(10, 10, size - 20, size - 20);
  stampContext.globalAlpha = 1;
  stampContext.fillStyle = "#9b2636";
  stampContext.textAlign = "center";
  stampContext.textBaseline = "middle";
  const fontSize = Math.floor(Math.min(cellWidth, cellHeight) * 0.82);
  const sealFont = characters.every((character) =>
    fontHasGlyph("Chong Xi Small Seal", character, fontSize),
  )
    ? '"Chong Xi Small Seal"'
    : '"Ma Shan Zheng"';
  stampContext.font = `400 ${fontSize}px ${sealFont}, serif`;
  characters.forEach((character, index) => {
    const logicalColumn = Math.floor(index / rows);
    const row = index % rows;
    const column = columns - 1 - logicalColumn;
    const centerX = inset + column * cellWidth + cellWidth / 2;
    const centerY = inset + row * cellHeight + cellHeight / 2 + 1;
    stampContext.fillText(character, centerX, centerY);
    stampContext.lineWidth = 0.65;
    stampContext.strokeStyle = "#9b2636";
    stampContext.strokeText(character, centerX, centerY);
  });

  stampContext.globalCompositeOperation = "destination-out";
  stampContext.globalAlpha = 0.48;
  for (let index = 0; index < 24; index += 1) {
    const chipX = 5 + ((index * 43) % (size - 10));
    const chipY = 5 + ((index * 31) % (size - 10));
    const chipSize = 0.8 + (index % 4) * 0.65;
    stampContext.beginPath();
    stampContext.arc(chipX, chipY, chipSize, 0, Math.PI * 2);
    stampContext.fill();
  }

  context.save();
  context.globalAlpha = 0.94;
  context.drawImage(stamp, x, y);
  context.restore();
}

const sealTraditionalVariants: Record<string, string> = {
  陈: "陳",
  刘: "劉",
  吴: "吳",
  宁: "寧",
  张: "張",
  悦: "悅",
  杨: "楊",
  澜: "瀾",
  苏: "蘇",
  许: "許",
  赵: "趙",
  远: "遠",
};

function sealTextForName(fullName: string): string[] {
  const nameCharacters = [...fullName].map(
    (character) => sealTraditionalVariants[character] ?? character,
  );
  if (nameCharacters.length === 2) {
    return [...nameCharacters, "之", "印"];
  }
  if (nameCharacters.length === 3) {
    return [...nameCharacters, "印"];
  }
  return [...nameCharacters, "印"].slice(0, 6);
}

function fontHasGlyph(
  family: string,
  character: string,
  fontSize: number,
): boolean {
  const render = (fallback: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 96;
    canvas.height = 96;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return 0;
    context.fillStyle = "#000";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `400 ${fontSize}px "${family}", "${fallback}"`;
    context.fillText(character, 48, 48);
    const pixels = context.getImageData(0, 0, 96, 96).data;
    let hash = 2166136261;
    for (let index = 3; index < pixels.length; index += 4) {
      hash ^= pixels[index];
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  };

  return render("Ma Shan Zheng") === render("Noto Serif SC");
}
