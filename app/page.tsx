import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
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
            className="group relative aspect-video overflow-hidden rounded-[var(--radius)] border-[3px] border-border shadow-[var(--shadow-soft)] delay-100 animate-fade-up"
          >
            <Image
              src={featuredEpisode.thumbnail}
              alt={`Still from ${featuredEpisode.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </Link>
        </div>
      </section>

      <section className="border-y-[3px] border-border bg-card/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The series"
            title="Same drawings, different rooms"
            description={siteConfig.description}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="On the couch"
            title="The apartment"
            description="Four of them, one living room, and a bag of bug chips on the table."
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

      <section className="border-y-[3px] border-border bg-card/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="From the floor"
              title="Stuff you can take home"
              description="A mushroom cap, a crown, and a print of somewhere that is not the couch."
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
        <div className="grid gap-10 rounded-[var(--radius)] border-[3px] border-border bg-card px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading
            eyebrow="The list"
            title="When something new is on the TV"
            description="A note when the next episode is up."
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
    </>
  );
}
