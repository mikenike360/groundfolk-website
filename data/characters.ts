import type { Character } from "@/types";

const livingRoom = "/art/main-background.png";

export const characters: Character[] = [
  {
    id: "char-wizard",
    slug: "wizard",
    name: "Wizard",
    description: "Mushroom cap, black robe, parked on the beanbag.",
    bio: "Sits on the purple beanbag in a pointed mushroom hat and a black robe. Does not appear to be casting anything. The broom is by the fridge, and it is not moving either.",
    image: livingRoom,
    imagePosition: "8% 62%",
    personality: ["Still", "Hatted", "Indoors"],
    featured: true,
    episodeSlugs: ["the-path", "the-field"],
    relatedCharacterSlugs: ["bug", "horn"],
  },
  {
    id: "char-bug",
    slug: "bug",
    name: "Bug",
    description: "Green, round, and already labeled.",
    bio: "Occupies the left cushion with a red sign that says what it is. Emotional support, according to the sign. The rest of the couch does not argue.",
    image: livingRoom,
    imagePosition: "34% 48%",
    personality: ["Supportive", "Signed", "Seated"],
    featured: true,
    episodeSlugs: ["the-path", "can-house"],
    relatedCharacterSlugs: ["wizard", "worm"],
  },
  {
    id: "char-horn",
    slug: "horn",
    name: "Horn",
    description: "Cone head, controller, Lamp of Hotdog shirt.",
    bio: "Blue shorts, gray shoes, and a black shirt with the words across the chest. Holds a controller and does not look up. The television is on whether anyone else is watching.",
    image: livingRoom,
    imagePosition: "68% 40%",
    personality: ["Busy", "Horned", "Unbothered"],
    featured: true,
    episodeSlugs: ["the-path", "dinosaur-era"],
    relatedCharacterSlugs: ["wizard", "bug"],
  },
  {
    id: "char-worm",
    slug: "worm",
    name: "Worm",
    description: "Long, pink, and smiling from the other couch.",
    bio: "Stands on the arm of the gray couch and also turns up outside. A nest in a tree is not a surprising place to find a worm. A smile is.",
    image: livingRoom,
    imagePosition: "96% 36%",
    personality: ["Pink", "Tall", "Outside"],
    featured: true,
    episodeSlugs: ["the-nest", "can-house"],
    relatedCharacterSlugs: ["bug", "horn"],
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
