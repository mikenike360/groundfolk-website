import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { EpisodeCard } from "@/components/EpisodeCard";
import { CharacterCard } from "@/components/CharacterCard";
import { ProductCard } from "@/components/ProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SocialLinks } from "@/components/SocialLinks";
import { Button } from "@/components/Button";
import { getFeaturedEpisode } from "@/data/episodes";
import { getFeaturedCharacters } from "@/data/characters";
import { siteConfig } from "@/data/site";
import { getFeaturedProducts } from "@/lib/shopify";
import { formatEpisodeCode, formatReleaseDate } from "@/lib/utils";

export default async function HomePage() {
  const featuredEpisode = getFeaturedEpisode();
  const featuredCharacters = getFeaturedCharacters().slice(0, 4);
  const featuredProducts = await getFeaturedProducts(3);

  return (
    <>
      <Hero featuredEpisode={featuredEpisode} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up">
            <SectionHeading
              eyebrow="Now streaming"
              title={featuredEpisode.title}
              description={featuredEpisode.description}
            />
            <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-muted-foreground">
              <span>
                {formatEpisodeCode(
                  featuredEpisode.season,
                  featuredEpisode.episodeNumber,
                )}
              </span>
              <span aria-hidden="true">·</span>
              <span>{featuredEpisode.duration}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={featuredEpisode.releaseDate}>
                {formatReleaseDate(featuredEpisode.releaseDate)}
              </time>
            </div>
            <div className="mt-8">
              <Button href={`/watch/${featuredEpisode.slug}`} size="lg">
                Play episode
              </Button>
            </div>
          </div>
          <Link
            href={`/watch/${featuredEpisode.slug}`}
            className="group relative aspect-video overflow-hidden rounded-[var(--radius)] border border-border shadow-[var(--shadow-soft)] delay-100 animate-fade-up animate-soft-float"
          >
            <Image
              src={featuredEpisode.thumbnail}
              alt={`Watch ${featuredEpisode.title}`}
              fill
              className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-card/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The series"
            title="A cartoon universe, built episode by episode"
            description={siteConfig.description}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Meet the crew"
            title="Featured characters"
            description="Placeholder cast ready to swap for your own designs and bios."
          />
          <Button href="/characters" variant="ghost" className="hidden sm:inline-flex">
            All characters
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Official merch"
              title="Featured drops"
              description="Shopify-ready products with a local mock catalog when credentials are missing."
            />
            <Button href="/store" variant="ghost" className="hidden sm:inline-flex">
              Visit store
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[calc(var(--radius)+0.5rem)] border border-border bg-card px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading
            eyebrow="Stay in the loop"
            title="Episode drops & studio notes"
            description="Newsletter placeholder — wire this to your email provider when you're ready."
          />
          <div className="flex flex-col justify-center gap-6">
            <NewsletterForm />
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Follow along
              </p>
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[var(--radius)] border border-border">
          <EpisodeCard episode={featuredEpisode} />
        </div>
      </section>
    </>
  );
}
