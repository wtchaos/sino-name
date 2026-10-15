import type { ModelResult } from "@/lib/schema";
import type { BirthContext, NameProfile } from "@/lib/types";

const candidates = [
  {
    surname: "林",
    givenName: "知远",
    pinyin: "Lín Zhīyuǎn",
    pronunciation: "leen jir-ywen",
    meaning: "Awareness with a far-reaching vision.",
    chars: [
      ["林", "forest", "growth and quiet vitality"],
      ["知", "to know", "awareness and understanding"],
      ["远", "far-reaching", "vision and an open mind"],
    ],
  },
  {
    surname: "沈",
    givenName: "清和",
    pinyin: "Shěn Qīnghé",
    pronunciation: "shen ching-huh",
    meaning: "Clarity held with a gentle, balanced spirit.",
    chars: [
      ["沈", "a traditional surname", "quiet depth and steadiness"],
      ["清", "clear", "clarity and integrity"],
      ["和", "harmony", "balance and warmth"],
    ],
  },
  {
    surname: "苏",
    givenName: "明远",
    pinyin: "Sū Míngyuǎn",
    pronunciation: "soo ming-ywen",
    meaning: "A bright mind with an expansive outlook.",
    chars: [
      ["苏", "a traditional surname", "renewal and liveliness"],
      ["明", "bright", "clarity and insight"],
      ["远", "distant", "perspective and aspiration"],
    ],
  },
  {
    surname: "陈",
    givenName: "安澜",
    pinyin: "Chén Ānlán",
    pronunciation: "chen ahn-lahn",
    meaning: "Calm strength, like water settling after a wave.",
    chars: [
      ["陈", "a traditional surname", "continuity and groundedness"],
      ["安", "peace", "steadiness and ease"],
      ["澜", "great wave", "depth and quiet strength"],
    ],
  },
] as const;

function stableIndex(profile: NameProfile) {
  return [...`${profile.firstName}${profile.familyName}`].reduce(
    (sum, char) => sum + char.codePointAt(0)!,
    0,
  );
}

export function createDemoResult(
  profile: NameProfile,
  birth: BirthContext,
): ModelResult {
  const selected = candidates[stableIndex(profile) % candidates.length];
  const fullName = `${selected.surname}${selected.givenName}`;
  const qualities = profile.qualities
    .map((quality) => quality.replace("_", "-"))
    .join(", ");

  return {
    surname: selected.surname,
    givenName: selected.givenName,
    fullName,
    pinyin: selected.pinyin,
    pronunciation: selected.pronunciation,
    oneLineMeaning: selected.meaning,
    surnameConnection: {
      type: "harmony",
      explanation: `${selected.surname} was chosen as a familiar Chinese surname that gives the complete name a natural rhythm while keeping the connection to ${profile.familyName} subtle rather than forced.`,
    },
    characters: selected.chars.map(([character, literalMeaning, nameConnotation]) => ({
      character,
      literalMeaning,
      nameConnotation,
    })),
    overallMeaning: `${fullName} brings together ${selected.chars[1][2]} and ${selected.chars[2][2]}. The result feels credible in modern Mandarin while retaining a quiet literary quality.`,
    personalization: `The name reflects the qualities you selected—${qualities}—without turning them into an overly literal label. Its tone stays close to the ${profile.namingStyle.replaceAll("_", " ")} style you chose.`,
    poeticInterpretation: {
      text: `Imagine a clear path extending beyond a quiet grove: grounded in the present, yet open to a wider horizon. This is an original interpretation written for your name.`,
      sourceType: "original_interpretation",
      sourceId: null,
    },
    birthInspiration: `Your ${birth.season} birth season contributed images of ${birth.symbolicImages.join(", ")}. These are cultural and poetic cues, not predictions about your future.`,
    daoistPerspective: profile.daoistPerspective
      ? "From a Daoist perspective, the name suggests clarity without strain and movement that remains connected to the natural world. This is a modern interpretive reading, not a religious judgment."
      : null,
    buddhistPerspective: profile.buddhistPerspective
      ? "From a Buddhist perspective, the name can evoke attentive awareness and a spacious view beyond immediate attachment. This is an interpretive reflection, not a spiritual title."
      : null,
    practicalReview: {
      genderExpression:
        profile.genderExpression === "no_preference"
          ? "gender-neutral"
          : profile.genderExpression.replace("_", "-"),
      usageStyle: "modern, natural, and gently literary",
      pronunciationDifficulty: "easy",
      commonness: "familiar characters in a distinctive combination",
      homophoneRisk: "none_detected",
    },
    scores: {
      naturalness: 28,
      soundHarmony: 14,
      semanticCoherence: 15,
      preferenceFit: 14,
      homophoneSafety: 10,
      pronunciation: 9,
      culturalPotential: 5,
      total: 95,
    },
    riskFlags: [],
  };
}
