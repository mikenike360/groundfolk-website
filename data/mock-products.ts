import type { Product } from "@/types";

/** Local merch used when Shopify credentials are not configured. */
export const mockProducts: Product[] = [
  {
    id: "mock-mushroom",
    handle: "mushroom-cap",
    title: "Mushroom Cap",
    description: "Wizard's hat, drawn as a stamp. Red cap, pale stem, sitting on the floor.",
    featuredImage: {
      url: "/icons/mushroom.png",
      altText: "A hand-drawn mushroom with a spotted cap",
      width: 1024,
      height: 1024,
    },
    images: [
      {
        url: "/icons/mushroom.png",
        altText: "A hand-drawn mushroom with a spotted cap",
        width: 1024,
        height: 1024,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: "16.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "16.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "mock-mushroom-default",
        title: "Default",
        availableForSale: true,
        price: { amount: "16.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Title", value: "Default" }],
      },
    ],
    tags: ["print", "stamp", "featured"],
  },
  {
    id: "mock-crown",
    handle: "field-crown",
    title: "Field Crown",
    description: "The crown from the field. Five points, and it does not sit straight.",
    featuredImage: {
      url: "/icons/crown.png",
      altText: "A hand-drawn crown with pointed tips",
      width: 1024,
      height: 1024,
    },
    images: [
      {
        url: "/icons/crown.png",
        altText: "A hand-drawn crown with pointed tips",
        width: 1024,
        height: 1024,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: "18.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "18.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "mock-crown-default",
        title: "Default",
        availableForSale: true,
        price: { amount: "18.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Title", value: "Default" }],
      },
    ],
    tags: ["print", "stamp", "featured"],
  },
  {
    id: "mock-poster",
    handle: "can-house-print",
    title: "Can House Print",
    description: "A print of the can in the weeds, door and step included.",
    featuredImage: {
      url: "/art/can-house.png",
      altText: "A can lying in the grass with a door and a wooden step",
      width: 3840,
      height: 2160,
    },
    images: [
      {
        url: "/art/can-house.png",
        altText: "A can lying in the grass with a door and a wooden step",
        width: 3840,
        height: 2160,
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
    id: "mock-bag",
    handle: "floor-bag",
    title: "Floor Bag",
    description: "A bag from the apartment floor. It has been there a while.",
    featuredImage: {
      url: "/icons/bag.png",
      altText: "A hand-drawn bag with a handle",
      width: 1024,
      height: 1024,
    },
    images: [
      {
        url: "/icons/bag.png",
        altText: "A hand-drawn bag with a handle",
        width: 1024,
        height: 1024,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: "14.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "14.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "mock-bag-default",
        title: "Default",
        availableForSale: true,
        price: { amount: "14.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Title", value: "Default" }],
      },
    ],
    tags: ["home", "stamp"],
  },
];
