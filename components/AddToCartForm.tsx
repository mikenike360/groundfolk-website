"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/Button";
import { frameClassFor } from "@/components/ProductCard";

export function AddToCartForm({ product }: { product: Product }) {
  const { addItem, isLoading, openCart } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.id === variantId) ?? product.variants[0],
    [product.variants, variantId],
  );

  const images = product.images.length ? product.images : [product.featuredImage];

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-[var(--radius)] border-[3px] border-border bg-muted shadow-[var(--shadow-soft)]">
          <Image
            src={images[activeImage]?.url ?? product.featuredImage.url}
            alt={images[activeImage]?.altText ?? product.title}
            fill
            className={frameClassFor(product.handle)}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        {images.length > 1 ? (
          <div className="mt-4 flex gap-3 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={`${image.url}-${index}`}
                type="button"
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border ${
                  index === activeImage ? "border-primary" : "border-border"
                }`}
                onClick={() => setActiveImage(index)}
                aria-label={`View image ${index + 1}`}
              >
                <Image src={image.url} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div>
        <h1 className="font-display text-4xl sm:text-5xl">
          {product.title}
        </h1>
        <p className="mt-4 text-2xl font-semibold">
          {formatPrice(selectedVariant?.price ?? product.priceRange.minVariantPrice)}
        </p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {product.variants.length > 1 ? (
          <div className="mt-8">
            <label htmlFor="variant" className="text-sm font-semibold">
              Variant
            </label>
            <select
              id="variant"
              value={variantId}
              onChange={(event) => setVariantId(event.target.value)}
              className="mt-2 w-full rounded-[var(--radius)] border-[3px] border-border bg-card px-4 py-3"
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id} disabled={!variant.availableForSale}>
                  {variant.title}
                  {!variant.availableForSale ? " (sold out)" : ""}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="mt-6">
          <label htmlFor="quantity" className="text-sm font-semibold">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
            className="mt-2 w-28 rounded-[var(--radius)] border-[3px] border-border bg-card px-4 py-3"
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            type="button"
            size="lg"
            disabled={isLoading || !selectedVariant?.availableForSale}
            onClick={async () => {
              if (!selectedVariant) return;
              await addItem(selectedVariant.id, quantity);
              openCart();
            }}
          >
            Add to cart
          </Button>
          <Button href="/cart" variant="outline" size="lg">
            View cart
          </Button>
        </div>
      </div>
    </div>
  );
}
