export const zodiacAnimals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"] as const;
export type ZodiacAnimal = typeof zodiacAnimals[number];

// Short editorial retellings of the Great Race, a folk tale with many variants.
// Reference: https://en.wikipedia.org/wiki/Chinese_zodiac#Great_Race
export const zodiacStories: Record<ZodiacAnimal, { character: string; pinyin: string; story: string }> = {
  Rat: { character: "鼠", pinyin: "shǔ", story: "Rat rode across on Ox, then jumped ahead to finish first." },
  Ox: { character: "牛", pinyin: "niú", story: "Ox carried Rat over the river but finished second when Rat leapt ahead." },
  Tiger: { character: "虎", pinyin: "hǔ", story: "Tiger fought the river’s strong current and reached the finish in third place." },
  Rabbit: { character: "兔", pinyin: "tù", story: "Rabbit crossed on stones and a floating log, arriving fourth." },
  Dragon: { character: "龙", pinyin: "lóng", story: "Dragon paused to bring rain and help Rabbit, arriving fifth despite being able to fly." },
  Snake: { character: "蛇", pinyin: "shé", story: "Snake emerged near Horse’s hoof, startling Horse and taking sixth place." },
  Horse: { character: "马", pinyin: "mǎ", story: "Horse approached swiftly but was startled by Snake, finishing seventh." },
  Goat: { character: "羊", pinyin: "yáng", story: "Goat shared a raft with Monkey and Rooster; together they reached the far bank." },
  Monkey: { character: "猴", pinyin: "hóu", story: "Monkey helped Goat and Rooster guide a raft through the river." },
  Rooster: { character: "鸡", pinyin: "jī", story: "Rooster found a raft and crossed with Goat and Monkey." },
  Dog: { character: "狗", pinyin: "gǒu", story: "Dog lingered to play in the water and arrived eleventh." },
  Pig: { character: "猪", pinyin: "zhū", story: "Pig stopped to eat and sleep, arriving last to complete the twelve." },
};
