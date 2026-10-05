import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CharacterCard } from "@/components/CharacterCard";
import { EpisodeCard } from "@/components/EpisodeCard";
import { SectionHeading } from "@/components/SectionHeading";
import {
  characters,
  getCharacterBySlug,
  getRelatedCharacters,
} from "@/data/characters";
import { getEpisodeBySlug } from "@/data/episodes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return characters.map((character) => ({ slug: character.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  if (!character) return { title: "Character not found" };
  return {
    title: character.name,
    description: character.description,
  };
}

export default async function CharacterPage({ params }: PageProps) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  if (!character) notFound();

  const related = getRelatedCharacters(slug);
  const appearances = character.episodeSlugs
    .map((episodeSlug) => getEpisodeBySlug(episodeSlug))
    .filter((episode): episode is NonNullable<typeof episode> => Boolean(episode));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] border border-border bg-muted shadow-[var(--shadow-soft)]">
          <Image
            src={character.image}
            alt={`Artwork of ${character.name}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Character
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight">
            {character.name}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">{character.description}</p>
          <p className="mt-6 text-base leading-relaxed text-foreground/90">{character.bio}</p>

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Personality
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {character.personality.map((trait) => (
                <li
                  key={trait}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
                >
                  {trait}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Appearances"
          title="Episodes featuring this character"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {appearances.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      </section>

      {related.length ? (
        <section className="mt-16">
          <SectionHeading eyebrow="Connections" title="Related characters" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <CharacterCard key={item.id} character={item} />
            ))}
          </div>
        </section>
      ) : null}

      <p className="mt-12">
        <Link href="/characters" className="font-semibold text-primary hover:underline">
          ← All characters
        </Link>
      </p>
    </div>
  );
}
