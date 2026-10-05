"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, siteConfig } from "@/data/site";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/Button";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { cart, openCart } = useCart();

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">Menu</span>
        <span aria-hidden="true" className="text-lg font-bold">
          {open ? "×" : "☰"}
        </span>
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="absolute left-0 right-0 top-full border-b border-border bg-card px-4 py-5 shadow-lg animate-fade-up"
        >
          <nav aria-label="Mobile">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-3 py-3 text-base font-semibold hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 flex gap-3">
            <Button href="/watch" className="flex-1" onClick={() => setOpen(false)}>
              Watch
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setOpen(false);
                openCart();
              }}
            >
              Cart ({cart.totalQuantity})
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{siteConfig.tagline}</p>
        </div>
      ) : null}
    </div>
  );
}
