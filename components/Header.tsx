"use client";

import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";
import { useCart } from "@/lib/cart-context";
import { MobileNav } from "@/components/MobileNav";

export function Header() {
  const { cart, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 h-[4.75rem] overflow-visible border-b-[3px] border-border">
      <div
        className="pointer-events-none absolute inset-0 bg-background/90 backdrop-blur-md"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-2xl tracking-tight">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/watch"
            className="rounded-[var(--radius)] border-[3px] border-border bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
          >
            Watch Now
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="rounded-[var(--radius)] border-[3px] border-border bg-card px-4 py-2 text-sm font-semibold shadow-[var(--shadow-soft)]"
            aria-label={`Open cart, ${cart.totalQuantity} items`}
          >
            Cart ({cart.totalQuantity})
          </button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
