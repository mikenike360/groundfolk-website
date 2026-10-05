import type { VideoProvider } from "@/types";

type VideoPlayerProps = {
  provider: VideoProvider;
  videoId: string;
  title: string;
};

export function VideoPlayer({ provider, videoId, title }: VideoPlayerProps) {
  const src =
    provider === "youtube"
      ? `https://www.youtube.com/embed/${videoId}`
      : `https://player.vimeo.com/video/${videoId}`;

  return (
    <div className="overflow-hidden rounded-[var(--radius)] border border-border bg-foreground/95 shadow-[var(--shadow-soft)]">
      <div className="relative aspect-video w-full">
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
