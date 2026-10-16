import { z } from "zod";
import {
  birthTimePeriods,
  genderExpressions,
  namingStyles,
  qualities,
} from "@/lib/types";

const personName = z
  .string()
  .trim()
  .min(1, "Please enter your name.")
  .max(40, "Please keep this name under 40 characters.")
  .regex(
    /^[\p{L}\p{M}][\p{L}\p{M}\s'’.-]*$/u,
    "Use letters, spaces, apostrophes, periods, or hyphens only.",
  );

export const nameProfileSchema = z
  .object({
    firstName: personName,
    familyName: personName,
    genderExpression: z.enum(genderExpressions),
    birthDate: z.string().date(),
    birthTimePeriod: z.enum(birthTimePeriods),
    qualities: z.array(z.enum(qualities)).min(1).max(3),
    namingStyle: z.enum(namingStyles),
    daoistPerspective: z.boolean(),
    buddhistPerspective: z.boolean(),
  })
  .superRefine((value, context) => {
    const birthDate = new Date(`${value.birthDate}T12:00:00Z`);
    const earliest = new Date("1900-01-01T00:00:00Z");
    const latest = new Date();

    if (
      Number.isNaN(birthDate.valueOf()) ||
      birthDate < earliest ||
      birthDate > latest
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["birthDate"],
        message: "Choose a valid date of birth.",
      });
    }
  });

export const ticketRequestSchema = z.object({
  profile: nameProfileSchema,
});

export const generateRequestSchema = z.object({
  profile: nameProfileSchema,
  ticket: z.string().min(20).max(4096),
  turnstileToken: z.string().max(2048).optional().default(""),
});

const characterSchema = z.object({
  character: z.string().min(1).max(2),
  literalMeaning: z.string().min(2).max(160),
  nameConnotation: z.string().min(2).max(200),
});

export const modelResultSchema = z.object({
  surname: z.string().length(1),
  givenName: z.string().min(1).max(2),
  fullName: z.string().min(2).max(3),
  pinyin: z.string().min(3).max(100),
  pronunciation: z.string().min(3).max(100),
  oneLineMeaning: z.string().min(10).max(220),
  surnameConnection: z.object({
    type: z.enum(["sound", "meaning", "harmony"]),
    explanation: z.string().min(10).max(320),
  }),
  characters: z.array(characterSchema).min(2).max(3),
  overallMeaning: z.string().min(20).max(600),
  personalization: z.string().min(20).max(600),
  poeticInterpretation: z.object({
    text: z.string().min(20).max(600),
    sourceType: z.enum(["original_interpretation", "curated_source"]),
    sourceId: z.string().max(120).nullable(),
  }),
  birthInspiration: z.string().min(20).max(500),
  daoistPerspective: z.string().min(20).max(600).nullable(),
  buddhistPerspective: z.string().min(20).max(600).nullable(),
  practicalReview: z.object({
    genderExpression: z.string().min(2).max(80),
    usageStyle: z.string().min(2).max(120),
    pronunciationDifficulty: z.enum(["easy", "moderate"]),
    commonness: z.string().min(2).max(160),
    homophoneRisk: z.enum(["none_detected", "low"]),
  }),
  scores: z.object({
    naturalness: z.number().int().min(24).max(30),
    soundHarmony: z.number().int().min(0).max(15),
    semanticCoherence: z.number().int().min(0).max(15),
    preferenceFit: z.number().int().min(0).max(15),
    homophoneSafety: z.number().int().min(8).max(10),
    pronunciation: z.number().int().min(0).max(10),
    culturalPotential: z.number().int().min(0).max(5),
    total: z.number().int().min(82).max(100),
  }),
  riskFlags: z.array(z.string().max(120)).max(5),
});

export type ModelResult = z.infer<typeof modelResultSchema>;
