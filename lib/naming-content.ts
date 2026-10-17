// Public educational examples, independent of private visitor results.
export const namingExamples = [
  {
    id: "lin-zhiyuan", name: "林知远", pinyin: "Lín Zhīyuǎn", structure: "Three-character full name · 林 + 知远",
    meaning: "Understanding with a view beyond the immediate.",
    characters: [
      { character: "林", pinyin: "lín", gloss: "A surname; also a grove or forest.", url: "https://dict.concised.moe.edu.tw/dictView.jsp?ID=14824" },
      { character: "知", pinyin: "zhī", gloss: "To know or understand.", url: "https://dict.concised.moe.edu.tw/dictView.jsp?ID=28933&la=0" },
      { character: "远", pinyin: "yuǎn", gloss: "Distant or far; written 遠 in traditional Chinese.", url: "https://dict.concised.moe.edu.tw/dictView.jsp?ID=44861&la=0&powerMode=0" },
    ],
    reasoning: "Here 林 is the family name, while 知远 is the two-character given name. The given name connects understanding with distance: the wider perspective is an interpretation of that combination, rather than a separate dictionary definition.",
    pronunciation: "The written tone sequence is 2–1–3. The two given-name syllables stay together in the spelling Zhīyuǎn. The ü-like vowel sound within yuǎn needs practice; an English sound-alike is only a rough guide.",
    tradeoff: "For an English-speaking learner who wants fewer syllables, 林安 offers a shorter alternative. That changes the idea of the name as well as its length.",
  },
  {
    id: "lin-an", name: "林安", pinyin: "Lín Ān", structure: "Two-character full name · 林 + 安",
    meaning: "A quiet sense of steadiness.",
    characters: [
      { character: "林", pinyin: "lín", gloss: "A surname; also a grove or forest.", url: "https://dict.concised.moe.edu.tw/dictView.jsp?ID=14824" },
      { character: "安", pinyin: "ān", gloss: "Calm, settled, or safe, depending on context.", url: "https://dict.concised.moe.edu.tw/dictView.jsp?ID=39684" },
    ],
    reasoning: "安 is the entire given name. This example shows that a short name can carry a clear idea without adding another positive character simply to make it longer. 林 remains a surname; its dictionary meaning does not have to become part of an English translation of the full name.",
    pronunciation: "The written tone sequence is 2–1. The spelling Lín Ān keeps the surname and given name separate. Practice both tones rather than reading the letters with English stress patterns.",
    tradeoff: "A shorter name has less room for distinct imagery. This example is not a promise that a name is rare or unique; SinoName does not check a population registry.",
  },
  {
    id: "chen-lang", name: "陈朗", pinyin: "Chén Lǎng", structure: "Two-character full name · 陈 + 朗",
    meaning: "An image of brightness and clarity.",
    characters: [
      { character: "陈", pinyin: "chén", gloss: "The family name Chén, written 陳 in traditional Chinese.", url: "https://dict.concised.moe.edu.tw/dictView.jsp?ID=32033&la=0&powerMode=0" },
      { character: "朗", pinyin: "lǎng", gloss: "Bright; also clear and resonant when describing a voice.", url: "https://dict.concised.moe.edu.tw/dictView.jsp?ID=13838&la=0&powerMode=0" },
    ],
    reasoning: "朗 supplies the central meaning. Its associations with light and a clear voice offer a concrete basis for the explanation. Describing the name as an image of openness is a poetic choice; it does not describe or predict the person who uses it.",
    pronunciation: "The written tone sequence is 2–3. Pinyin ch is a Mandarin sound, not an exact match for an English letter sequence. Lǎng has a third tone, whose spoken shape depends on the surrounding phrase.",
    tradeoff: "Adding a word for wealth, power, or good fortune would change the tone of the name. More positive dictionary meanings do not automatically make a better combination.",
  },
] as const;

export const namingQuestions = [
  { id: "choose", question: "How do I choose a natural Chinese name?", answer: "Start with the complete name: a surname, a given name, its Mandarin pronunciation, and a meaning you are comfortable explaining. Read it aloud and consider how the characters work together. A literal translation or an exact sound match to your original name is only one possible starting point.", href: "/methodology", link: "Read the naming method" },
  { id: "surname", question: "Can I choose a Chinese surname if I am not Chinese?", answer: "You can choose a Chinese-language name for learning and everyday introductions. A selected surname is a language choice, not a claim to a particular family lineage, ethnicity, or legal identity. SinoName may connect it to your original family name through sound or meaning when that works naturally.", href: "/chinese-name-examples", link: "See surname and given-name examples" },
  { id: "length", question: "Should my Chinese name have two or three characters?", answer: "Both are possible. With the single-character surnames used by SinoName, a two-character full name has a one-character given name; a three-character full name has a two-character given name. A longer name gives more room for imagery, but is not inherently better. New generations currently select three characters with a 70% probability and two with a 30% probability; cached results are reused.", href: "/chinese-name-examples", link: "Compare two- and three-character examples" },
  { id: "translation", question: "Does a Chinese name need to sound like my English name?", answer: "No. A sound connection can be useful, but it is optional. SinoName prioritizes a coherent Chinese name over matching every syllable. A name can instead connect with qualities you select or an idea you would like the name to express.", href: "/methodology", link: "How names are selected" },
  { id: "meaning", question: "Is a name’s poetic explanation its literal meaning?", answer: "Not always. A dictionary explains a character’s possible meanings and readings. A name’s interpretation explains why those characters have been put together. Our public examples separate dictionary glosses from original interpretation; an evocative English sentence should not be mistaken for a historical quotation.", href: "/chinese-name-examples", link: "Explore the character explanations" },
  { id: "pinyin", question: "How do I read the pinyin and tone marks?", answer: "Pinyin represents Mandarin pronunciation. Tone marks belong to the syllables, while the surname and given name are written separately: 林知远 is Lín Zhīyuǎn, with Zhīyuǎn joined as one given name. English sound-alikes are approximate. For confident everyday use, practice with a Mandarin speaker or a pronunciation resource.", href: "/chinese-name-examples#lin-zhiyuan", link: "Study the Lín Zhīyuǎn example" },
  { id: "zodiac", question: "Does my Chinese zodiac year start on January 1?", answer: "SinoName uses Chinese New Year as the boundary. A January or February birthday can therefore belong to the preceding zodiac year. We calculate the animal from the full birth date, rather than the Gregorian year alone. Some astrological traditions use Start of Spring instead; that is a different convention.", href: "/chinese-zodiac", link: "Understand the zodiac year boundary" },
  { id: "seal", question: "Is the downloadable name seal a physical engraved seal?", answer: "The seal on a SinoName card is a digital design inspired by Chinese seal engraving. It is included in the downloadable PNG name card. A physical hand-carved seal is a separate craft, and SinoName does not offer physical engraving or delivery.", href: "/chinese-name-seal", link: "Explore name seals and digital cards" },
  { id: "review", question: "Are generated names individually checked by a human?", answer: "No. Generated results pass automated structure and output checks, and the AI is instructed to consider meaning, pronunciation, and potential homophones. This is not an individual review by a human naming specialist, nor a guarantee against every dialectal or contextual association. Before important public use, ask a trusted Chinese speaker about the complete name.", href: "/about#checks", link: "See what is checked and what is not" },
  { id: "history", question: "Can I return to my name later?", answer: "Results are retained for up to 30 days. In the same browser, the creation button and the /create address reopen the latest valid locally saved result. Clearing browser data removes local history, and that history does not transfer when you change devices. Save your name card or full PDF if you want a copy to keep.", href: "/privacy", link: "Read about retention and browser storage" },
] as const;
