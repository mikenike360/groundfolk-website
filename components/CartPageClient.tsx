"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/Button";

export function CartPageClient() {
  const { cart, updateQuantity, removeItem, checkout, isLoading } = useCart();
  const hasItems = cart.lines.length > 0;
  const isMockCheckout = !cart.checkoutUrl.startsWith("http");

  if (!hasItems) {
    return (
      <div className="rounded-[var(--radius)] border border-dashed border-border bg-card/70 px-6 py-16 text-center">
        <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">
          Browse the store and add a little Hollowmere to your world.
        </p>
        <Button href="/store" className="mt-8">
          Shop merch
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
      <ul className="space-y-5">
        {cart.lines.map((line) => (
          <li
            key={line.id}
            className="flex flex-col gap-4 rounded-[var(--radius)] border border-border bg-card p-4 sm:flex-row"
          >
            <div className="relative h-28 w-full overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28">
              {line.merchandise.image ? (
                <Image
                  src={line.merchandise.image.url}
                  alt={line.merchandise.image.altText}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col">
              <Link
                href={`/store/${line.merchandise.product.handle}`}
                className="font-display text-xl font-bold hover:text-primary"
              >
                {line.merchandise.product.title}
              </Link>
              <p className="text-sm text-muted-foreground">{line.merchandise.title}</p>
              <p className="mt-1 font-semibold">{formatPrice(line.merchandise.price)}</p>
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  className="h-9 w-9 rounded-full border border-border"
                  aria-label="Decrease quantity"
                  disabled={isLoading}
                  onClick={() => updateQuantity(line.id, line.quantity - 1)}
                >
                  −
                </button>
                <span className="min-w-8 text-center">{line.quantity}</span>
                <button
                  type="button"
                  className="h-9 w-9 rounded-full border border-border"
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

      <aside className="h-fit rounded-[var(--radius)] border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
        <h2 className="font-display text-2xl font-bold">Order summary</h2>
        <div className="mt-6 flex items-center justify-between text-lg font-semibold">
          <span>Subtotal</span>
          <span>{formatPrice(cart.cost.subtotalAmount)}</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Shipping and taxes calculated at Shopify checkout.
        </p>
        <Button
          type="button"
          size="lg"
          className="mt-6 w-full"
          disabled={isLoading || isMockCheckout}
          onClick={checkout}
        >
          {isMockCheckout ? "Checkout (connect Shopify)" : "Checkout with Shopify"}
        </Button>
        {isMockCheckout ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Mock cart mode is active. Add Shopify credentials to enable a real checkout URL.
          </p>
        ) : null}
        <Button href="/store" variant="ghost" className="mt-3 w-full">
          Continue shopping
        </Button>
      </aside>
    </div>
  );
}
