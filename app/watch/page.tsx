import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { EpisodeCard } from "@/components/EpisodeCard";
import { EpisodeGrid } from "@/components/EpisodeGrid";
import { Button } from "@/components/Button";
import {
  getEpisodesBySeason,
  getFeaturedEpisode,
  getLatestEpisode,
} from "@/data/episodes";
import { formatEpisodeCode, formatReleaseDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Watch",
  description: "Episodes of ground folk, from the path outside to whatever is on the television.",
};

export default function WatchPage() {
  const featured = getFeaturedEpisode();
  const latest = getLatestEpisode();
  const bySeason = getEpisodesBySeason();
  const seasons = Object.keys(bySeason)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Watch"
        title="Episodes"
        description="From the path outside to whatever is on the television."
      />

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <article className="overflow-hidden rounded-[var(--radius)] border-[3px] border-border bg-card shadow-[var(--shadow-soft)]">
          <div className="relative aspect-video border-b-[3px] border-border">
            <Image
              src={featured.thumbnail}
              alt={`Still from ${featured.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            Featured episode
          </p>
          <h2 className="mt-3 font-display text-3xl">{featured.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {formatEpisodeCode(featured.season, featured.episodeNumber)} · {featured.duration} ·{" "}
            <time dateTime={featured.releaseDate}>
              {formatReleaseDate(featured.releaseDate)}
            </time>
          </p>
          <p className="mt-4 text-muted-foreground">{featured.description}</p>
          <Button href={`/watch/${featured.slug}`} className="mt-6">
            Watch featured
          </Button>
          </div>
        </article>

        <article className="overflow-hidden rounded-[var(--radius)] border-[3px] border-border bg-card shadow-[var(--shadow-soft)]">
          <div className="relative aspect-video border-b-[3px] border-border">
            <Image
              src={latest.thumbnail}
              alt={`Still from ${latest.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">
              Latest episode
            </p>
            <h2 className="mt-3 font-display text-3xl">{latest.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {formatEpisodeCode(latest.season, latest.episodeNumber)} · {latest.duration} ·{" "}
              <time dateTime={latest.releaseDate}>
                {formatReleaseDate(latest.releaseDate)}
              </time>
            </p>
            <p className="mt-4 text-muted-foreground">{latest.description}</p>
            <Button href={`/watch/${latest.slug}`} variant="secondary" className="mt-6">
              Watch latest
            </Button>
          </div>
        </article>
      </section>

      {seasons.map((season) => (
        <section key={season} className="mt-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow={`Season ${season}`}
              title={`Season ${season} episodes`}
              description="Five drawings. One season."
            />
          </div>
          <EpisodeGrid episodes={bySeason[season]} />
        </section>
      ))}

      <section className="mt-16">
        <h2 className="sr-only">All episode cards</h2>
        <div className="grid gap-6 lg:hidden">
          <EpisodeCard episode={featured} />
        </div>
      </section>
    </div>
  );
}
