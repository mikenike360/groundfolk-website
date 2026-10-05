import type { Metadata } from "next";
import { CharacterCard } from "@/components/CharacterCard";
import { SectionHeading } from "@/components/SectionHeading";
import { characters } from "@/data/characters";

export const metadata: Metadata = {
  title: "Characters",
  description: "Meet the Hollowmere cast — placeholder characters ready for your artwork.",
};

export default function CharactersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Characters"
        title="Meet the crew"
        description="Cards with artwork, names, and short descriptions. Swap placeholder SVGs for your final character art."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
