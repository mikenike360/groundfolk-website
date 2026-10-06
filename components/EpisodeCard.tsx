import Image from "next/image";
import Link from "next/link";
import type { Episode } from "@/types";
import { formatEpisodeCode, formatReleaseDate } from "@/lib/utils";

export function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border-[3px] border-border bg-card shadow-[var(--shadow-soft)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none motion-reduce:transform-none">
      <Link href={`/watch/${episode.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-video overflow-hidden border-b-[3px] border-border bg-muted">
          <Image
            src={episode.thumbnail}
            alt={`Thumbnail for ${episode.title}`}
            fill
            className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span className="rounded-[var(--radius)] border-[3px] border-border bg-muted px-2.5 py-1 text-foreground">
              {formatEpisodeCode(episode.season, episode.episodeNumber)}
            </span>
            <span>{episode.duration}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={episode.releaseDate}>
              {formatReleaseDate(episode.releaseDate)}
            </time>
          </div>
          <h3 className="font-display text-xl text-foreground group-hover:text-accent">
            {episode.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {episode.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
