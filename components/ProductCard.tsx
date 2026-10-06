import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

const stampClass = "object-contain p-6 brightness-0";

export function isStamp(handle: string): boolean {
  return handle === "mushroom-cap" || handle === "field-crown" || handle === "floor-bag";
}

export function frameClassFor(handle: string): string {
  return isStamp(handle) ? stampClass : "object-cover";
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border-[3px] border-border bg-card shadow-[var(--shadow-soft)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none motion-reduce:transform-none">
      <Link href={`/store/${product.handle}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden border-b-[3px] border-border bg-muted">
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            fill
            className={
              isStamp(product.handle)
                ? frameClassFor(product.handle)
                : "object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            }
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="font-display text-xl text-foreground group-hover:text-accent">
            {product.title}
          </h3>
          <p className="mt-auto text-base font-semibold text-foreground">
            {formatPrice(product.priceRange.minVariantPrice)}
          </p>
        </div>
      </Link>
    </article>
  );
}
