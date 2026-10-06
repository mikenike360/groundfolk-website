import type { Metadata } from "next";
import { CartPageClient } from "@/components/CartPageClient";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your ground folk merch and continue to checkout.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Cart"
        title="Your merch"
        description="What's in the bag, and checkout when the store is connected."
      />
      <div className="mt-10">
        <CartPageClient />
      </div>
    </div>
  );
}
