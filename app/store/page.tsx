import type { Metadata } from "next";
import Image from "next/image";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { getProducts, isShopifyConfigured } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Store",
  description: "Prints and other stuff from ground folk.",
};

export default async function StorePage() {
  const products = await getProducts();
  const usingMock = !isShopifyConfigured();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex items-start gap-4 sm:gap-5">
        <Image
          src="/icons/shop-sign.png"
          alt=""
          width={96}
          height={96}
          className="mt-1 h-16 w-16 shrink-0 brightness-0 sm:h-20 sm:w-20"
        />
        <SectionHeading
          eyebrow="Store"
          title="Stuff from the apartment"
          description="A mushroom cap, a crown, a bag, and a print of the can."
        />
      </div>

      {usingMock ? (
        <p
          className="mt-6 inline-block rounded-[var(--radius)] border-[3px] border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-[var(--shadow-soft)]"
          role="status"
        >
          Local catalog for now. Live products show up when Shopify is connected.
        </p>
      ) : null}

      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
