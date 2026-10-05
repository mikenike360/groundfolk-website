import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoPlayer } from "@/components/VideoPlayer";
import { EpisodeGrid } from "@/components/EpisodeGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import {
  episodes,
  getAdjacentEpisodes,
  getEpisodeBySlug,
  getRelatedEpisodes,
} from "@/data/episodes";
import { formatEpisodeCode, formatReleaseDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return episodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) return { title: "Episode not found" };
  return {
    title: episode.title,
    description: episode.description,
  };
}

export default async function EpisodePage({ params }: PageProps) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) notFound();

  const { previous, next } = getAdjacentEpisodes(slug);
  const related = getRelatedEpisodes(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <VideoPlayer
        provider={episode.videoProvider}
        videoId={episode.videoId}
        title={`${episode.title} video player`}
      />

      <div className="mt-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          {formatEpisodeCode(episode.season, episode.episodeNumber)} · {episode.duration}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {episode.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Released{" "}
          <time dateTime={episode.releaseDate}>
            {formatReleaseDate(episode.releaseDate)}
          </time>
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {episode.description}
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {previous ? (
          <Button href={`/watch/${previous.slug}`} variant="outline">
            ← {previous.title}
          </Button>
        ) : (
          <Button href="/watch" variant="outline">
            ← All episodes
          </Button>
        )}
        {next ? (
          <Button href={`/watch/${next.slug}`}>
            {next.title} →
          </Button>
        ) : null}
      </div>

      <section className="mt-16">
        <SectionHeading
          eyebrow="More to watch"
          title="Related episodes"
          description="More from this season."
        />
        <div className="mt-8">
          <EpisodeGrid episodes={related} />
        </div>
        <p className="mt-8">
          <Link href="/watch" className="font-semibold text-primary hover:underline">
            Browse all episodes
          </Link>
        </p>
      </section>
    </div>
  );
}
