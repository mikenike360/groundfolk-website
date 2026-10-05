import type { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";

type ProductGridProps = {
  products: Product[];
  loading?: boolean;
};

export function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-80 animate-pulse rounded-[var(--radius)] border border-border bg-muted"
          />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-[var(--radius)] border border-dashed border-border bg-card/70 p-12 text-center">
        <h3 className="font-display text-2xl font-bold">No merch yet</h3>
        <p className="mt-2 text-muted-foreground">
          Connect Shopify or add items to <code>data/mock-products.ts</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
