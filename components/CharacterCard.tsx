import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <article className="group overflow-hidden rounded-[var(--radius)] border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] motion-reduce:transform-none">
      <Link href={`/characters/${character.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={character.image}
            alt={`Artwork of ${character.name}`}
            fill
            className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <div className="space-y-2 p-5">
          <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary">
            {character.name}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {character.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
