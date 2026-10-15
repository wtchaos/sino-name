import type { BirthContext, BirthTimePeriod } from "@/lib/types";

const zodiacByBranch: Record<string, string> = {
  zi: "Rat",
  chou: "Ox",
  yin: "Tiger",
  mao: "Rabbit",
  chen: "Dragon",
  si: "Snake",
  wu: "Horse",
  wei: "Goat",
  shen: "Monkey",
  you: "Rooster",
  xu: "Dog",
  hai: "Pig",
};

const imagesBySeason = {
  spring: ["renewal", "young leaves", "gentle growth"],
  summer: ["warmth", "open skies", "vitality"],
  autumn: ["clarity", "harvest", "maturity"],
  winter: ["stillness", "endurance", "quiet depth"],
} as const;

function getSeason(month: number): BirthContext["season"] {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

function getChineseZodiac(date: Date): string | null {
  try {
    const formatted = new Intl.DateTimeFormat("en-u-ca-chinese", {
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
    const branch = formatted
      .toLowerCase()
      .match(/(?:jia|yi|bing|ding|wu|ji|geng|xin|ren|gui)[-\s](zi|chou|yin|mao|chen|si|wu|wei|shen|you|xu|hai)/)?.[1];
    return branch ? zodiacByBranch[branch] : null;
  } catch {
    return null;
  }
}

export function buildBirthContext(
  birthDate: string,
  timePeriod: BirthTimePeriod,
): BirthContext {
  const date = new Date(`${birthDate}T12:00:00Z`);
  const season = getSeason(date.getUTCMonth() + 1);

  return {
    season,
    zodiac: getChineseZodiac(date),
    timePeriod,
    symbolicImages: [...imagesBySeason[season]],
    precision: timePeriod === "unknown" ? "date_only" : "date_and_period",
  };
}
