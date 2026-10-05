import type { Cart, Money, Product, ProductImage, ProductVariant } from "@/types";
import { mockProducts } from "@/data/mock-products";

const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();

export function isShopifyConfigured(): boolean {
  return Boolean(domain && storefrontToken);
}

const endpoint = domain ? `https://${domain}/api/2025-01/graphql.json` : null;

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  if (!endpoint || !storefrontToken) {
    throw new Error("Shopify is not configured");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Shopify Storefront API error: ${response.status}`);
  }

  const json = (await response.json()) as {
    data?: T;
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join(", "));
  }

  if (!json.data) {
    throw new Error("Shopify Storefront API returned no data");
  }

  return json.data;
}

function formatMoney(money?: { amount: string; currencyCode: string } | null): Money {
  return {
    amount: money?.amount ?? "0.00",
    currencyCode: money?.currencyCode ?? "USD",
  };
}

function mapImage(
  image?: {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null,
  fallbackAlt = "Product image",
): ProductImage {
  return {
    url: image?.url ?? "/placeholders/product-tee.svg",
    altText: image?.altText ?? fallbackAlt,
    width: image?.width ?? 1200,
    height: image?.height ?? 800,
  };
}

type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  featuredImage?: {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  images: {
    edges: {
      node: {
        url: string;
        altText?: string | null;
        width?: number | null;
        height?: number | null;
      };
    }[];
  };
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: { amount: string; currencyCode: string };
        selectedOptions: { name: string; value: string }[];
      };
    }[];
  };
};

function mapProduct(node: ShopifyProductNode): Product {
  const images = node.images.edges.map((edge) => mapImage(edge.node, node.title));
  const variants: ProductVariant[] = node.variants.edges.map((edge) => ({
    id: edge.node.id,
    title: edge.node.title,
    availableForSale: edge.node.availableForSale,
    price: formatMoney(edge.node.price),
    selectedOptions: edge.node.selectedOptions,
  }));

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    featuredImage: mapImage(node.featuredImage, node.title),
    images: images.length ? images : [mapImage(node.featuredImage, node.title)],
    priceRange: {
      minVariantPrice: formatMoney(node.priceRange.minVariantPrice),
      maxVariantPrice: formatMoney(node.priceRange.maxVariantPrice),
    },
    variants,
    tags: node.tags,
  };
}

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  tags
  featuredImage {
    url
    altText
    width
    height
  }
  images(first: 8) {
    edges {
      node {
        url
        altText
        width
        height
      }
    }
  }
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  variants(first: 25) {
    edges {
      node {
        id
        title
        availableForSale
        price { amount currencyCode }
        selectedOptions { name value }
      }
    }
  }
`;

export async function getProducts(): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    return mockProducts;
  }

  try {
    const data = await shopifyFetch<{
      products: { edges: { node: ShopifyProductNode }[] };
    }>(`
      query Products {
        products(first: 24, sortKey: BEST_SELLING) {
          edges {
            node { ${PRODUCT_FIELDS} }
          }
        }
      }
    `);

    return data.products.edges.map((edge) => mapProduct(edge.node));
  } catch (error) {
    console.error("Failed to fetch Shopify products, using mock data.", error);
    return mockProducts;
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured()) {
    return mockProducts.find((product) => product.handle === handle) ?? null;
  }

  try {
    const data = await shopifyFetch<{ product: ShopifyProductNode | null }>(
      `
      query ProductByHandle($handle: String!) {
        product(handle: $handle) {
          ${PRODUCT_FIELDS}
        }
      }
    `,
      { handle },
    );

    return data.product ? mapProduct(data.product) : null;
  } catch (error) {
    console.error("Failed to fetch Shopify product, checking mock data.", error);
    return mockProducts.find((product) => product.handle === handle) ?? null;
  }
}

export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  const products = await getProducts();
  const featured = products.filter((product) => product.tags.includes("featured"));
  return (featured.length ? featured : products).slice(0, limit);
}

type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          image?: {
            url: string;
            altText?: string | null;
            width?: number | null;
            height?: number | null;
          } | null;
          price: { amount: string; currencyCode: string };
          product: { handle: string; title: string };
        };
      };
    }[];
  };
};

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            image { url altText width height }
            price { amount currencyCode }
            product { handle title }
          }
        }
      }
    }
  }
`;

function mapCart(cart: ShopifyCart): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    cost: {
      subtotalAmount: formatMoney(cart.cost.subtotalAmount),
      totalAmount: formatMoney(cart.cost.totalAmount),
    },
    lines: cart.lines.edges.map((edge) => ({
      id: edge.node.id,
      quantity: edge.node.quantity,
      merchandise: {
        id: edge.node.merchandise.id,
        title: edge.node.merchandise.title,
        image: edge.node.merchandise.image
          ? mapImage(edge.node.merchandise.image)
          : undefined,
        product: edge.node.merchandise.product,
        price: formatMoney(edge.node.merchandise.price),
      },
    })),
  };
}

function createMockCartId(): string {
  return `mock-cart-${Date.now()}`;
}

function buildMockCart(
  lines: Cart["lines"],
  cartId = createMockCartId(),
): Cart {
  const subtotal = lines.reduce(
    (sum, line) => sum + Number(line.merchandise.price.amount) * line.quantity,
    0,
  );
  const currencyCode = lines[0]?.merchandise.price.currencyCode ?? "USD";
  const amount = subtotal.toFixed(2);

  return {
    id: cartId,
    checkoutUrl: "/cart?checkout=mock",
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    cost: {
      subtotalAmount: { amount, currencyCode },
      totalAmount: { amount, currencyCode },
    },
    lines,
  };
}

export async function createCart(
  variantId: string,
  quantity = 1,
): Promise<Cart> {
  if (!isShopifyConfigured()) {
    const product = mockProducts.find((item) =>
      item.variants.some((variant) => variant.id === variantId),
    );
    const variant = product?.variants.find((item) => item.id === variantId);
    if (!product || !variant) {
      throw new Error("Variant not found in mock catalog");
    }

    return buildMockCart([
      {
        id: `mock-line-${variantId}`,
        quantity,
        merchandise: {
          id: variant.id,
          title: variant.title,
          image: product.featuredImage,
          product: { handle: product.handle, title: product.title },
          price: variant.price,
        },
      },
    ]);
  }

  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart; userErrors: { message: string }[] };
  }>(
    `
    mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { ${CART_FIELDS} }
        userErrors { message }
      }
    }
  `,
    { lines: [{ merchandiseId: variantId, quantity }] },
  );

  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors.map((error) => error.message).join(", "));
  }

  return mapCart(data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1,
): Promise<Cart> {
  if (!isShopifyConfigured() || cartId.startsWith("mock-cart-")) {
    // Mock carts are managed client-side; return a single-line cart snapshot.
    return createCart(variantId, quantity);
  }

  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart; userErrors: { message: string }[] };
  }>(
    `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { message }
      }
    }
  `,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  );

  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(
      data.cartLinesAdd.userErrors.map((error) => error.message).join(", "),
    );
  }

  return mapCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<Cart> {
  if (!isShopifyConfigured() || cartId.startsWith("mock-cart-")) {
    throw new Error("Mock cart updates are handled client-side");
  }

  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart; userErrors: { message: string }[] };
  }>(
    `
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
        userErrors { message }
      }
    }
  `,
    { cartId, lines },
  );

  if (data.cartLinesUpdate.userErrors.length) {
    throw new Error(
      data.cartLinesUpdate.userErrors.map((error) => error.message).join(", "),
    );
  }

  return mapCart(data.cartLinesUpdate.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  if (!isShopifyConfigured() || cartId.startsWith("mock-cart-")) {
    throw new Error("Mock cart removals are handled client-side");
  }

  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart; userErrors: { message: string }[] };
  }>(
    `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
        userErrors { message }
      }
    }
  `,
    { cartId, lineIds },
  );

  if (data.cartLinesRemove.userErrors.length) {
    throw new Error(
      data.cartLinesRemove.userErrors.map((error) => error.message).join(", "),
    );
  }

  return mapCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  if (!isShopifyConfigured() || cartId.startsWith("mock-cart-")) {
    return null;
  }

  try {
    const data = await shopifyFetch<{ cart: ShopifyCart | null }>(
      `
      query Cart($cartId: ID!) {
        cart(id: $cartId) {
          ${CART_FIELDS}
        }
      }
    `,
      { cartId },
    );

    return data.cart ? mapCart(data.cart) : null;
  } catch (error) {
    console.error("Failed to fetch Shopify cart.", error);
    return null;
  }
}

export function getCheckoutUrl(cart: Cart | null | undefined): string | null {
  if (!cart?.checkoutUrl) return null;
  if (cart.checkoutUrl.startsWith("/")) return null;
  return cart.checkoutUrl;
}

export function formatPrice(money: Money): string {
  const amount = Number(money.amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
  }).format(amount);
}
