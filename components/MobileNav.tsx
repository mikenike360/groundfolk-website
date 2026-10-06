"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { navLinks, siteConfig } from "@/data/site";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/Button";

function closeMenu(node: Element) {
  const details = node.closest("details");
  if (details) details.open = false;
}

export function MobileNav() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const { cart, openCart } = useCart();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && detailsRef.current?.open) {
        detailsRef.current.open = false;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <details ref={detailsRef} className="group md:hidden">
      <summary
        className="absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-[var(--radius)] border-[3px] border-border bg-card shadow-[var(--shadow-soft)] sm:right-6 [&::-webkit-details-marker]:hidden"
        aria-label="Menu"
      >
        <span className="text-lg font-bold group-open:hidden">☰</span>
        <span className="hidden text-lg font-bold group-open:inline">×</span>
      </summary>
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className="hidden border-t-[3px] border-border bg-card px-4 py-5 group-open:block"
      >
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-[var(--radius)] px-3 py-3 text-base font-semibold hover:bg-muted"
                onClick={(event) => closeMenu(event.currentTarget)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-3">
          <Button href="/watch" className="flex-1" onClick={(event) => closeMenu(event.currentTarget)}>
            Watch
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={(event) => {
              closeMenu(event.currentTarget);
              openCart();
            }}
          >
            Cart ({cart.totalQuantity})
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{siteConfig.tagline}</p>
      </nav>
    </details>
  );
}
