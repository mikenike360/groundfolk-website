import type { Metadata } from "next";
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
  description: "Stream featured and latest episodes from the Hollowmere animated series.",
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
        description="Featured and latest episodes, with room to grow into full season catalogs."
      />

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <article className="rounded-[var(--radius)] border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Featured episode
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold">{featured.title}</h2>
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
        </article>

        <article className="rounded-[var(--radius)] border border-border bg-card p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">
            Latest episode
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold">{latest.title}</h2>
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
        </article>
      </section>

      {seasons.map((season) => (
        <section key={season} className="mt-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow={`Season ${season}`}
              title={`Season ${season} episodes`}
              description="Structured for future seasons — add more entries in data/episodes.ts."
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
