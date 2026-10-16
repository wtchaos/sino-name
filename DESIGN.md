---
name: SinoName
description: A Chinese name that feels like you.
colors:
  oxblood: "oklch(0.450 0.150 20)"
  oxblood-deep: "oklch(0.340 0.120 20)"
  oxblood-pale: "oklch(0.940 0.025 20)"
  mineral-blue: "oklch(0.340 0.120 245)"
  mineral-blue-pale: "oklch(0.930 0.025 245)"
  pure-white: "oklch(1.000 0.000 0)"
  gallery-surface: "oklch(0.970 0.006 20)"
  warm-ink: "oklch(0.180 0.015 20)"
  muted-ink: "oklch(0.460 0.018 20)"
  hairline: "oklch(0.880 0.010 20)"
typography:
  display:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7vw, 5.5rem)"
    fontWeight: 650
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  chinese-name:
    fontFamily: "Noto Serif SC, Songti SC, serif"
    fontSize: "clamp(4rem, 12vw, 7rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "0.04em"
  headline:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.3
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "72px"
components:
  button-primary:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.pure-white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.oxblood-deep}"
    textColor: "{colors.pure-white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "14px 22px"
  button-secondary:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.warm-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "14px 22px"
  choice-chip:
    backgroundColor: "{colors.gallery-surface}"
    textColor: "{colors.warm-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  choice-chip-selected:
    backgroundColor: "{colors.oxblood-pale}"
    textColor: "{colors.oxblood-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  text-input:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.warm-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "13px 14px"
  name-card:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.warm-ink}"
    rounded: "{rounded.lg}"
    padding: "32px"
---

<!-- SEED -->

# Design System: SinoName

## 1. Overview

**Creative North Star: “A single lacquer seal under white museum light.”**

SinoName should feel like a contemporary cultural gallery: calm enough to let one name command attention, precise enough to earn trust, and warm enough to make cultural discovery personal. The physical metaphor is one carefully presented object with a clear bilingual museum label—not an antique shop full of symbols.

The interface uses pure white space, warm near-black text, and a controlled oxblood accent. Chinese characters are the most expressive visual material in the product. The surrounding interface stays familiar and quiet so users can move through the naming flow without decoding ornamental controls.

The system rejects fortune-telling aesthetics, faux calligraphy, parchment, ink-wash scenery, indiscriminate red and gold, dragons, lanterns, temple decoration, mystical glows, and generic AI gradients.

**Key Characteristics:**

- Contemporary cultural authority without academic coldness.
- One dominant name or action per viewport.
- English-first clarity with expressive Chinese-name typography.
- Restrained color and flat surfaces; depth appears only when it communicates hierarchy.
- Motion conveys selection, generation, and reveal—not decoration.

## 2. Colors

The palette places a deep, workshop-like oxblood against literal white, with mineral blue used sparingly to separate informational content from primary actions.

### Primary

- **Lacquer Oxblood** (`oklch(0.450 0.150 20)`): Primary actions, active progress, the brand mark, and one controlled emphasis per screen.
- **Deep Lacquer** (`oklch(0.340 0.120 20)`): Hover and pressed states; never a large background behind body copy.
- **Oxblood Wash** (`oklch(0.940 0.025 20)`): Selected chips, gentle personalization highlights, and non-critical emphasis.

### Secondary

- **Mineral Blue** (`oklch(0.340 0.120 245)`): Informational links, source references, and methodology details. It must not compete with the primary CTA.
- **Mineral Mist** (`oklch(0.930 0.025 245)`): Informational callouts and provenance backgrounds.

### Neutral

- **Pure Gallery White** (`oklch(1.000 0.000 0)`): Main page background.
- **Gallery Surface** (`oklch(0.970 0.006 20)`): Alternate sections, quiet form groupings, and loading skeletons.
- **Warm Ink** (`oklch(0.180 0.015 20)`): Headings and body text.
- **Muted Ink** (`oklch(0.460 0.018 20)`): Secondary copy that must still pass WCAG AA against white.
- **Hairline** (`oklch(0.880 0.010 20)`): Dividers, input boundaries, and structural outlines.

**The One Red Mark Rule.** Oxblood is used like a curator's mark: one primary action or focal signal per view, never scattered as decoration.

## 3. Typography

**Display Font:** Source Sans 3 (with `system-ui, sans-serif` fallback)  
**Body Font:** Source Sans 3 (with `system-ui, sans-serif` fallback)  
**Chinese Name Font:** Noto Serif SC (with `Songti SC, serif` fallback)

**Character:** Source Sans 3 keeps English explanations and controls direct, humane, and highly legible. Noto Serif SC appears only where Chinese characters deserve ceremonial scale: the generated name, individual character studies, and verified source text. This contrast lets the content feel culturally specific without making the interface theatrical.

### Hierarchy

- **Display** (650, `clamp(3rem, 7vw, 5.5rem)`, 0.98): Homepage promise and major reveal headings; never inside forms.
- **Chinese Name** (600, `clamp(4rem, 12vw, 7rem)`, 1.05): The generated full name. Preserve generous side bearing and never apply faux brush effects.
- **Headline** (600, `2rem`, 1.15): Major product sections and result-section introductions.
- **Title** (600, `1.25rem`, 1.3): Form steps, interpretation headings, and card titles.
- **Body** (400, `1rem`, 1.6): Explanations and supporting copy, capped at 70ch.
- **Label** (600, `0.875rem`, 1.3): Field labels, buttons, chips, and navigation. Sentence case only.

**The Characters Earn the Drama Rule.** English UI text never imitates calligraphy or becomes ornamental. The generated Chinese name carries the expressive weight.

## 4. Elevation

The system is flat by default. Hierarchy comes from spacing, tonal surfaces, typography, and full outlines. Shadows appear only for temporary overlays or the downloadable name card when it is presented as a physical keepsake. Never combine a decorative border with a broad soft shadow.

### Shadow Vocabulary

- **Name Card Lift** (`0 4px 8px rgb(24 16 16 / 0.10)`): The result card preview only; no border at the same time.
- **Popover Lift** (`0 6px 8px rgb(24 16 16 / 0.12)`): Menus and date-selection overlays only.

**The Flat-by-Default Rule.** Resting content remains on the page plane. Elevation indicates a temporary layer or a tangible exportable object.

## 5. Components

### Buttons

- **Shape:** Compact rounded rectangle (`8px`), never pill-shaped for primary actions.
- **Primary:** Lacquer Oxblood with white text, `14px 22px` padding, and a single explicit verb phrase such as “Create My Chinese Name.”
- **Hover / Focus:** Hover shifts to Deep Lacquer over `160ms`; focus uses a `3px` Mineral Mist ring plus a `2px` Mineral Blue outline. Active state translates by at most `1px`.
- **Secondary:** White background, Warm Ink text, and a Hairline outline. No drop shadow.

### Chips

- **Style:** Full-pill choices with Gallery Surface backgrounds and Warm Ink labels.
- **State:** Selected choices use Oxblood Wash, Deep Lacquer text, and an inset checkmark. Selection must never rely on color alone.

### Cards / Containers

- **Corner Style:** `12px` maximum for content containers.
- **Background:** White on Gallery Surface, or Gallery Surface on white.
- **Shadow Strategy:** Flat by default; only the downloadable name card receives Name Card Lift.
- **Border:** Hairline full outline when separation is required; never a colored side stripe.
- **Internal Padding:** `24px` on compact cards, `32px` on result modules, responsive down to `20px` on small screens.

### Inputs / Fields

- **Style:** White field, `8px` radius, `1px` Hairline outline, persistent label above the control, and visible helper text when the reason for asking is not obvious.
- **Focus:** Mineral Blue outline with Mineral Mist outer ring. Placeholder text must meet contrast requirements and never replace the label.
- **Error / Disabled:** Error messages explain what happened and how to fix it. Disabled controls use Gallery Surface and remain readable.

### Navigation

- A quiet wordmark on the left and no more than three text links plus one primary action on desktop. Mobile uses a standard disclosure menu. Active and hover states use underline or ink-weight change, not decorative color blocks.

### Name Reveal

- The Chinese name is the largest object, followed by pinyin, an English pronunciation guide, and a one-sentence meaning. Supporting explanations appear after the user has visually registered the name.
- Reveal motion lasts up to `600ms`, using opacity and a restrained clip transition. Under reduced motion, it becomes an immediate crossfade.

### Name Card

- The exported card includes the full Chinese name, pinyin, one-line meaning, and a small SinoName signature. It excludes controls, scores, birth data, and religious interpretation so it remains personal and shareable.

## 6. Do's and Don'ts

### Do:

- **Do** use literal white as the primary canvas and let Lacquer Oxblood occupy less than 10% of form and result screens.
- **Do** let one Chinese name or one task dominate each viewport.
- **Do** keep body copy at or above WCAG 2.2 AA contrast and cap explanatory prose at 70ch.
- **Do** provide visible keyboard focus, text alternatives, reduced-motion behavior, and non-color selection cues.
- **Do** use standard controls and familiar interaction patterns throughout the three-step form.
- **Do** distinguish verified cultural sources from original poetic interpretation with clear labels.

### Don't:

- **Don't** use fortune-telling, horoscope, destiny-prediction, or supernatural-certainty imagery.
- **Don't** imitate cheap AI generators with gradients, sparkle icons, glowing buttons, or generic “AI-powered” badges.
- **Don't** use tourism-souvenir versions of Chinese culture: faux calligraphy, parchment, ink-wash scenery, indiscriminate red and gold, dragons, lanterns, or temple imagery as decoration.
- **Don't** make the experience resemble a game-character or fantasy-name generator.
- **Don't** present literal phonetic transliteration as a credible Chinese name.
- **Don't** hide the first complete result behind login walls, aggressive upsells, or casino-like reveals.
- **Don't** use gradient text, glassmorphism, colored side-stripe borders, nested cards, or cards with both a border and a broad shadow.
- **Don't** exceed `12px` corner radius on cards, sections, or input fields.

