import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { Button } from "@/components/Button";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}, the studio behind the series, and how to get in touch.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="About"
        title={siteConfig.name}
        description={siteConfig.description}
      />

      <section className="mt-14 grid gap-10 lg:grid-cols-2">
        <article className="rounded-[var(--radius)] border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
          <h2 className="font-display text-3xl font-bold">The cartoon</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {siteConfig.description} This about page is editorial-first — keep series story
            separate from commerce so the universe can grow without feeling like a shop.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Replace this copy with your pitch, tone references, and production notes. Add
            press kits, festival selections, or behind-the-scenes links as you need them.
          </p>
        </article>

        <article className="rounded-[var(--radius)] border border-border bg-card p-8">
          <h2 className="font-display text-3xl font-bold">The creator</h2>
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
