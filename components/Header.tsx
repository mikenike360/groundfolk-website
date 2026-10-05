"use client";

import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";
import { useCart } from "@/lib/cart-context";
import { MobileNav } from "@/components/MobileNav";

export function Header() {
  const { cart, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight">
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
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Watch Now
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold"
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
