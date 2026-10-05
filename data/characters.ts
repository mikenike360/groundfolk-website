import type { Character } from "@/types";

export const characters: Character[] = [
  {
    id: "char-pip",
    slug: "pip",
    name: "Pip",
    description: "Curious wanderer who found the first spark.",
    bio: "Pip is the heart of Hollowmere — soft-spoken, brave in quiet ways, and always asking one more question. When the glowing seed fell, Pip didn't run. They listened.",
    image: "/placeholders/char-pip.svg",
    personality: ["Curious", "Kind", "Brave"],
    featured: true,
    episodeSlugs: [
      "the-first-spark",
      "moss-and-memory",
      "spark-in-the-rain",
      "nori-night-market",
      "bolt-of-belonging",
    ],
    relatedCharacterSlugs: ["moss", "spark"],
  },
  {
    id: "char-moss",
    slug: "moss",
    name: "Moss",
    description: "Gentle forest spirit who remembers old songs.",
    bio: "Moss grows where stories settle. Older than the town admits, Moss keeps the forest's memories — and sometimes shares them when the night is soft enough.",
    image: "/placeholders/char-moss.svg",
    personality: ["Wise", "Calm", "Protective"],
    featured: true,
    episodeSlugs: ["moss-and-memory", "spark-in-the-rain", "bolt-of-belonging"],
    relatedCharacterSlugs: ["pip", "nori"],
  },
  {
    id: "char-spark",
    slug: "spark",
    name: "Spark",
    description: "A living ember with more power than patience.",
    bio: "Spark is energy given form — bright, impulsive, and learning that friendship can hold even wild light. Rain days are hard. Band practice helps.",
    image: "/placeholders/char-spark.svg",
    personality: ["Energetic", "Loyal", "Impulsive"],
    featured: true,
    episodeSlugs: [
      "the-first-spark",
      "spark-in-the-rain",
      "nori-night-market",
      "bolt-of-belonging",
    ],
    relatedCharacterSlugs: ["pip", "bolt"],
  },
  {
    id: "char-nori",
    slug: "nori",
    name: "Nori",
    description: "Night-market merchant of curious bargains.",
    bio: "Nori trades in oddities, rumors, and the occasional almost-legal miracle. Behind the stall grin is a careful keeper of town secrets.",
    image: "/placeholders/char-nori.svg",
    personality: ["Witty", "Resourceful", "Secretive"],
    featured: false,
    episodeSlugs: ["nori-night-market", "bolt-of-belonging"],
    relatedCharacterSlugs: ["moss", "bolt"],
  },
  {
    id: "char-bolt",
    slug: "bolt",
    name: "Bolt",
    description: "Fastest feet in Hollowmere — learning to wait.",
    bio: "Bolt wins races before the starting whistle. Learning to belong means learning to slow down, listen, and run with the crew instead of past them.",
    image: "/placeholders/char-bolt.svg",
    personality: ["Competitive", "Funny", "Growing"],
    featured: true,
    episodeSlugs: ["bolt-of-belonging", "spark-in-the-rain"],
    relatedCharacterSlugs: ["spark", "pip"],
  },
];

export function getCharacterBySlug(slug: string): Character | undefined {
  return characters.find((character) => character.slug === slug);
}

export function getFeaturedCharacters(): Character[] {
  return characters.filter((character) => character.featured);
}

export function getRelatedCharacters(slug: string): Character[] {
  const character = getCharacterBySlug(slug);
  if (!character) return [];
  return character.relatedCharacterSlugs
    .map((relatedSlug) => getCharacterBySlug(relatedSlug))
    .filter((related): related is Character => Boolean(related));
}
