import Image from "next/image";
import type { Episode } from "@/types";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/Button";
import { formatEpisodeCode } from "@/lib/utils";

type HeroProps = {
  featuredEpisode: Episode;
};

export function Hero({ featuredEpisode }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={featuredEpisode.thumbnail}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color-mix(in_oklab,var(--background)_92%,transparent)] via-[color-mix(in_oklab,var(--background)_72%,transparent)] to-[color-mix(in_oklab,var(--background)_35%,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-2xl animate-fade-up">
          <p className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {siteConfig.name}
          </p>
          <h1 className="mt-5 max-w-xl text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Featured · {formatEpisodeCode(featuredEpisode.season, featuredEpisode.episodeNumber)}{" "}
            · {featuredEpisode.title}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 delay-100 animate-fade-up">
            <Button href={`/watch/${featuredEpisode.slug}`} size="lg">
              Watch Now
            </Button>
            <Button href="/store" variant="outline" size="lg">
              Shop Merch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
