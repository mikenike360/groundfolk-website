import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  return (
    <footer className="mt-auto border-t-[3px] border-border bg-card/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-3xl">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-muted-foreground">{siteConfig.tagline}</p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-medium hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cart" className="font-medium hover:text-primary">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Contact
          </p>
          <p className="mt-4 text-muted-foreground">
            Questions, press, or collabs — reach the studio at{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </div>
      </div>
      <div className="border-t-[3px] border-border px-4 py-5 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {siteConfig.name}.
      </div>
    </footer>
  );
}
