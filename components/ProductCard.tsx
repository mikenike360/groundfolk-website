import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] motion-reduce:transform-none">
      <Link href={`/store/${product.handle}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            fill
            className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary">
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
