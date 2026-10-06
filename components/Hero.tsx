import Image from "next/image";
import type { Episode } from "@/types";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/Button";
import { formatEpisodeCode } from "@/lib/utils";

type HeroProps = {
  featuredEpisode: Episode;
};

function HeroCopy({ featuredEpisode }: HeroProps) {
  return (
    <>
      <p className="font-display text-4xl text-balance text-foreground sm:text-6xl lg:text-7xl">
        {siteConfig.name}
      </p>
      <h1 className="mt-5 max-w-xl text-balance font-sans text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
        {siteConfig.tagline}
      </h1>
      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
        Featured · {formatEpisodeCode(featuredEpisode.season, featuredEpisode.episodeNumber)}{" "}
        · {featuredEpisode.title}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={`/watch/${featuredEpisode.slug}`} size="lg">
          Watch Now
        </Button>
        <Button href="/store" variant="outline" size="lg">
          Shop Merch
        </Button>
      </div>
    </>
  );
}

export function Hero({ featuredEpisode }: HeroProps) {
  return (
    <section className="border-b-[3px] border-border">
      <div className="relative aspect-video md:hidden">
        <Image
          src="/art/main-background.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 md:hidden">
        <HeroCopy featuredEpisode={featuredEpisode} />
      </div>

      <div className="relative hidden min-h-[78vh] overflow-hidden md:block">
        <Image
          src="/art/main-background.png"
          alt=""
          fill
          priority
          className="object-cover object-[center_42%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-up rounded-[var(--radius)] border-[3px] border-border/80 bg-card/25 p-6 shadow-[var(--shadow-soft)] backdrop-blur-[1px] sm:p-8">
            <HeroCopy featuredEpisode={featuredEpisode} />
          </div>
        </div>
      </div>
    </section>
  );
}
