import type { Episode } from "@/types";
import { EpisodeCard } from "@/components/EpisodeCard";

export function EpisodeGrid({ episodes }: { episodes: Episode[] }) {
  if (!episodes.length) {
    return (
      <p className="rounded-[var(--radius)] border border-dashed border-border bg-card/60 p-10 text-center text-muted-foreground">
        No episodes yet. Add entries in <code>data/episodes.ts</code>.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  );
}
