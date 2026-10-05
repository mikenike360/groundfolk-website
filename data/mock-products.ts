import type { Product } from "@/types";

/** Local merch used when Shopify credentials are not configured. */
export const mockProducts: Product[] = [
  {
    id: "mock-tee",
    handle: "hollowmere-crew-tee",
    title: "Hollowmere Crew Tee",
    description:
      "Soft cotton tee with a bold Hollowmere mark. Placeholder art — swap for your official design.",
    featuredImage: {
      url: "/placeholders/product-tee.svg",
      altText: "Hollowmere crew tee placeholder",
      width: 1200,
      height: 800,
    },
    images: [
      {
        url: "/placeholders/product-tee.svg",
        altText: "Hollowmere crew tee placeholder",
        width: 1200,
        height: 800,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: "28.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "28.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "mock-tee-s",
        title: "Small",
        availableForSale: true,
        price: { amount: "28.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Size", value: "S" }],
      },
      {
        id: "mock-tee-m",
        title: "Medium",
        availableForSale: true,
        price: { amount: "28.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Size", value: "M" }],
      },
      {
        id: "mock-tee-l",
        title: "Large",
        availableForSale: true,
        price: { amount: "28.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Size", value: "L" }],
      },
    ],
    tags: ["apparel", "featured"],
  },
  {
    id: "mock-mug",
    handle: "spark-enamel-mug",
    title: "Spark Enamel Mug",
    description: "Campfire-ready enamel mug featuring Spark. Perfect for late-night watch parties.",
    featuredImage: {
      url: "/placeholders/product-mug.svg",
      altText: "Spark enamel mug placeholder",
      width: 1200,
      height: 800,
    },
    images: [
      {
        url: "/placeholders/product-mug.svg",
        altText: "Spark enamel mug placeholder",
        width: 1200,
        height: 800,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: "18.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "18.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "mock-mug-default",
        title: "Default",
        availableForSale: true,
        price: { amount: "18.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Title", value: "Default" }],
      },
    ],
    tags: ["home", "featured"],
  },
  {
    id: "mock-poster",
    handle: "first-spark-poster",
    title: "First Spark Poster",
    description: "18×24 art print of the season one key visual. Matte finish placeholder artwork.",
    featuredImage: {
      url: "/placeholders/product-poster.svg",
      altText: "First Spark poster placeholder",
      width: 1200,
      height: 800,
    },
    images: [
      {
        url: "/placeholders/product-poster.svg",
        altText: "First Spark poster placeholder",
        width: 1200,
        height: 800,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: "22.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "22.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "mock-poster-default",
        title: "Default",
        availableForSale: true,
        price: { amount: "22.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Title", value: "Default" }],
      },
    ],
    tags: ["print", "featured"],
  },
  {
    id: "mock-sticker",
    handle: "crew-sticker-pack",
    title: "Crew Sticker Pack",
    description: "Five vinyl stickers of Pip, Moss, Spark, Nori, and Bolt. Waterproof placeholder set.",
    featuredImage: {
      url: "/placeholders/product-sticker.svg",
      altText: "Crew sticker pack placeholder",
      width: 1200,
      height: 800,
    },
    images: [
      {
        url: "/placeholders/product-sticker.svg",
        altText: "Crew sticker pack placeholder",
        width: 1200,
        height: 800,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: "12.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "12.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "mock-sticker-default",
        title: "Default",
        availableForSale: true,
        price: { amount: "12.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Title", value: "Default" }],
      },
    ],
    tags: ["stickers"],
  },
];
