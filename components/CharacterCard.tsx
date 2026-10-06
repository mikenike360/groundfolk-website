import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types";

const cropClasses: Record<string, string> = {
  "8% 62%": "object-cover scale-[1.85] object-[8%_62%] origin-[8%_62%]",
  "34% 48%": "object-cover scale-[1.85] object-[34%_48%] origin-[34%_48%]",
  "68% 40%": "object-cover scale-[1.85] object-[68%_40%] origin-[68%_40%]",
  "96% 36%": "object-cover scale-[1.85] object-[96%_36%] origin-[96%_36%]",
};

export function cropClassName(imagePosition?: string): string {
  return cropClasses[imagePosition ?? ""] ?? "object-cover";
}

export function CharacterCard({ character }: { character: Character }) {
  return (
    <article className="group overflow-hidden rounded-[var(--radius)] border-[3px] border-border bg-card shadow-[var(--shadow-soft)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none motion-reduce:transform-none">
      <Link href={`/characters/${character.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden border-b-[3px] border-border bg-muted">
          <Image
            src={character.image}
            alt={`Artwork of ${character.name}`}
            fill
            className={cropClassName(character.imagePosition)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <div className="space-y-2 p-5">
          <h3 className="font-display text-2xl text-foreground group-hover:text-accent">
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
