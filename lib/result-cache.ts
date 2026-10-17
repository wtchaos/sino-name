import { z } from "zod";
import { modelResultSchema } from "@/lib/schema";
import type { NameResult } from "@/lib/types";

import { zodiacAnimals } from "@/lib/zodiac";

const PREFIX = "nih:result:";
const LAST_RESULT = "nih:last-result";
const cachedResultSchema = modelResultSchema.extend({
  id: z.string().uuid(),
  zodiac: z.enum(zodiacAnimals).nullable().optional(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  originalFirstName: z.string(),
  originalFamilyName: z.string().optional(),
});

export function readCachedResults(): NameResult[] {
  try {
    const keys = Object.keys(localStorage).filter((key) => key.startsWith(PREFIX));
    const results: NameResult[] = [];
    for (const key of keys) {
      try {
        const result = cachedResultSchema.parse(JSON.parse(localStorage.getItem(key) ?? "null"));
        if (key !== `${PREFIX}${result.id}` || Date.parse(result.expiresAt) <= Date.now()) {
          localStorage.removeItem(key);
          continue;
        }
        results.push(result);
      } catch {
        localStorage.removeItem(key);
      }
    }
    results.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    if (results[0]) localStorage.setItem(LAST_RESULT, results[0].id);
    else localStorage.removeItem(LAST_RESULT);
    return results;
  } catch {
    // Browsers may disable storage. The creation flow must still be available.
    return [];
  }
}

export function saveCachedResult(result: NameResult): void {
  try {
    readCachedResults();
    if (Date.parse(result.expiresAt) <= Date.now()) return;
    localStorage.setItem(`${PREFIX}${result.id}`, JSON.stringify(result));
    readCachedResults();
  } catch {
    // Results can still be retrieved from the server when storage is unavailable.
  }
}

export function clearDevelopmentResultCache(): boolean {
  if (process.env.NODE_ENV !== "development") return false;
  try {
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith(PREFIX) || key === LAST_RESULT) {
        localStorage.removeItem(key);
      }
    }
    return true;
  } catch {
    return false;
  }
}
