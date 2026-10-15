export const qualities = [
  "calm",
  "wise",
  "strong",
  "elegant",
  "warm",
  "creative",
  "free_spirited",
  "ambitious",
  "mysterious",
  "joyful",
] as const;

export const namingStyles = [
  "natural_modern",
  "classical_poetic",
  "philosophical",
  "close_to_original",
  "balanced",
] as const;

export const genderExpressions = [
  "feminine",
  "masculine",
  "neutral",
  "no_preference",
] as const;

export const birthTimePeriods = [
  "unknown",
  "morning",
  "afternoon",
  "evening",
  "late_night",
] as const;

export type Quality = (typeof qualities)[number];
export type NamingStyle = (typeof namingStyles)[number];
export type GenderExpression = (typeof genderExpressions)[number];
export type BirthTimePeriod = (typeof birthTimePeriods)[number];

export type NameProfile = {
  firstName: string;
  familyName: string;
  genderExpression: GenderExpression;
  birthDate: string;
  birthTimePeriod: BirthTimePeriod;
  qualities: Quality[];
  namingStyle: NamingStyle;
  daoistPerspective: boolean;
  buddhistPerspective: boolean;
};

export type NameCharacter = {
  character: string;
  literalMeaning: string;
  nameConnotation: string;
};

export type NameResult = {
  id: string;
  createdAt: string;
  expiresAt: string;
  originalFirstName: string;
  surname: string;
  givenName: string;
  fullName: string;
  pinyin: string;
  pronunciation: string;
  oneLineMeaning: string;
  surnameConnection: {
    type: "sound" | "meaning" | "harmony";
    explanation: string;
  };
  characters: NameCharacter[];
  overallMeaning: string;
  personalization: string;
  poeticInterpretation: {
    text: string;
    sourceType: "original_interpretation" | "curated_source";
    sourceId: string | null;
  };
  birthInspiration: string;
  daoistPerspective: string | null;
  buddhistPerspective: string | null;
  practicalReview: {
    genderExpression: string;
    usageStyle: string;
    pronunciationDifficulty: "easy" | "moderate";
    commonness: string;
    homophoneRisk: "none_detected" | "low";
  };
  scores: {
    naturalness: number;
    soundHarmony: number;
    semanticCoherence: number;
    preferenceFit: number;
    homophoneSafety: number;
    pronunciation: number;
    culturalPotential: number;
    total: number;
  };
};

export type BirthContext = {
  season: "spring" | "summer" | "autumn" | "winter";
  zodiac: string | null;
  timePeriod: BirthTimePeriod;
  symbolicImages: string[];
  precision: "date_only" | "date_and_period";
};
