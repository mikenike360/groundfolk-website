"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/Button";

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeItem, checkout, isLoading } =
    useCart();

  if (!isOpen) return null;

  const hasItems = cart.lines.length > 0;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l-[3px] border-border bg-card shadow-[var(--shadow-soft)] animate-fade-up">
        <div className="flex items-center justify-between border-b-[3px] border-border px-5 py-4">
          <h2 className="font-display text-2xl">Cart</h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-[var(--radius)] border-[3px] border-border bg-card px-3 py-1 text-sm font-medium text-foreground"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!hasItems ? (
            <div className="py-16 text-center">
              <Image
                src="/icons/bag.png"
                alt=""
                width={80}
                height={80}
                className="mx-auto mb-4 h-20 w-20 brightness-0"
              />
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Button href="/store" className="mt-6" onClick={closeCart}>
                Browse merch
              </Button>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                    {line.merchandise.image ? (
                      <Image
                        src={line.merchandise.image.url}
                        alt={line.merchandise.image.altText}
                        fill
                        className={
                          line.merchandise.image.url.startsWith("/icons/")
                            ? "object-contain p-2 brightness-0"
                            : "object-cover"
                        }
                        sizes="80px"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/store/${line.merchandise.product.handle}`}
                      className="font-semibold text-foreground hover:text-primary"
                      onClick={closeCart}
                    >
                      {line.merchandise.product.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {line.merchandise.title}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {formatPrice(line.merchandise.price)}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        className="h-11 w-11 rounded-[var(--radius)] border-[3px] border-border bg-card"
                        aria-label="Decrease quantity"
                        disabled={isLoading}
                        onClick={() => updateQuantity(line.id, line.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        className="h-11 w-11 rounded-[var(--radius)] border-[3px] border-border bg-card"
                        aria-label="Increase quantity"
                        disabled={isLoading}
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-auto text-sm text-muted-foreground hover:text-accent"
                        disabled={isLoading}
                        onClick={() => removeItem(line.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {hasItems ? (
          <div className="space-y-4 border-t-[3px] border-border px-5 py-5">
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(cart.cost.subtotalAmount)}</span>
            </div>
            <Button
              type="button"
              size="lg"
              className="w-full"
              disabled={isLoading}
              onClick={checkout}
            >
              Checkout
            </Button>
            <Button href="/cart" variant="outline" className="w-full" onClick={closeCart}>
              View cart
            </Button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
