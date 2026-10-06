export type VideoProvider = "youtube" | "vimeo";

export interface Episode {
  id: string;
  slug: string;
  title: string;
  season: number;
  episodeNumber: number;
  description: string;
  thumbnail: string;
  videoProvider: VideoProvider;
  videoId: string;
  duration: string;
  releaseDate: string;
  featured: boolean;
}

export interface Character {
  id: string;
  slug: string;
  name: string;
  description: string;
  bio: string;
  image: string;
  imagePosition?: string;
  personality: string[];
  featured: boolean;
  episodeSlugs: string[];
  relatedCharacterSlugs: string[];
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ProductImage {
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: { name: string; value: string }[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: ProductImage;
  images: ProductImage[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  variants: ProductVariant[];
  tags: string[];
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    image?: ProductImage;
    product: {
      handle: string;
      title: string;
    };
    price: Money;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  lines: CartLine[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  creator: {
    name: string;
    bio: string;
  };
  contactEmail: string;
  social: {
    youtube?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    discord?: string;
  };
}
