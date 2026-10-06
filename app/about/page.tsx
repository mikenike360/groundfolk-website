import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { Button } from "@/components/Button";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}, the cartoon, and how to get in touch.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="About"
        title={siteConfig.name}
        description={siteConfig.description}
      />

      <section className="mt-14 grid items-start gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border-[3px] border-border shadow-[var(--shadow-soft)]">
          <Image
            src="/art/path.png"
            alt="A dirt path through tall grass toward a can with a door"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <article className="rounded-[var(--radius)] border-[3px] border-border bg-card p-8 shadow-[var(--shadow-soft)]">
          <h2 className="font-display text-3xl">The cartoon</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            It is drawn with thick black lines and flat color. The apartment is messy.
            Outside is a path, a can, a nest, and at least one dinosaur.
          </p>
        </article>
      </section>

      <section className="mt-10">
        <article className="rounded-[var(--radius)] border-[3px] border-border bg-card p-8 shadow-[var(--shadow-soft)]">
          <h2 className="font-display text-3xl">The creator</h2>
          <p className="mt-2 text-lg font-semibold">{siteConfig.creator.name}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {siteConfig.creator.bio}
          </p>
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Social
            </p>
            <SocialLinks />
          </div>
          <div className="mt-8">
            <Button href={`mailto:${siteConfig.contactEmail}`} external size="lg">
              Contact the studio
            </Button>
          </div>
        </article>
      </section>
    </div>
  );
}
