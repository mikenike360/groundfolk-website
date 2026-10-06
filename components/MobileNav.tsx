"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { navLinks, siteConfig } from "@/data/site";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/Button";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cart, openCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const panel = (
    <div
      id="mobile-nav"
      className="fixed inset-x-0 top-[4.75rem] z-[60] border-b-[3px] border-border bg-card px-4 py-5 shadow-[var(--shadow-soft)]"
    >
      <nav aria-label="Mobile">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-[var(--radius)] px-3 py-3 text-base font-semibold hover:bg-muted"
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
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="relative z-10 inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-[var(--radius)] border-[3px] border-border bg-card shadow-[var(--shadow-soft)]"
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

      {open && mounted ? createPortal(panel, document.body) : null}
    </div>
  );
}
