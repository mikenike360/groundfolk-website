import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { getProducts, isShopifyConfigured } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Store",
  description: "Official Hollowmere merchandise — powered by Shopify Storefront API.",
};

export default async function StorePage() {
  const products = await getProducts();
  const usingMock = !isShopifyConfigured();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Store"
        title="Official merch"
        description="Shopify-ready product grid with loading and empty states. Mock merchandise appears when credentials are not set."
      />

      {usingMock ? (
        <p
          className="mt-6 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
          role="status"
        >
          Showing mock catalog — add Shopify env vars to load live products.
        </p>
      ) : null}

      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
