"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { Cart, CartLine, Money, Product } from "@/types";
import { mockProducts } from "@/data/mock-products";

const CART_STORAGE_KEY = "groundfolk-cart-v1";

let cachedCartRaw: string | null = null;
let cachedCart: Cart | null = null;

type CartContextValue = {
  cart: Cart;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  checkout: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function emptyMoney(currencyCode = "USD"): Money {
  return { amount: "0.00", currencyCode };
}

function emptyCart(): Cart {
  return {
    id: "empty",
    checkoutUrl: "/cart",
    totalQuantity: 0,
    cost: {
      subtotalAmount: emptyMoney(),
      totalAmount: emptyMoney(),
    },
    lines: [],
  };
}

function computeCart(id: string, lines: CartLine[], checkoutUrl?: string): Cart {
  const currencyCode = lines[0]?.merchandise.price.currencyCode ?? "USD";
  const subtotal = lines.reduce(
    (sum, line) => sum + Number(line.merchandise.price.amount) * line.quantity,
    0,
  );
  const amount = subtotal.toFixed(2);

  return {
    id,
    checkoutUrl: checkoutUrl ?? "/cart?checkout=mock",
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    cost: {
      subtotalAmount: { amount, currencyCode },
      totalAmount: { amount, currencyCode },
    },
    lines,
  };
}

function findMockVariant(variantId: string): {
  product: Product;
  variant: Product["variants"][number];
} | null {
  for (const product of mockProducts) {
    const variant = product.variants.find((item) => item.id === variantId);
    if (variant) return { product, variant };
  }
  return null;
}

function lineFromVariant(
  variantId: string,
  quantity: number,
  existingId?: string,
): CartLine | null {
  const match = findMockVariant(variantId);
  if (!match) return null;
  const { product, variant } = match;
  return {
    id: existingId ?? `mock-line-${variantId}`,
    quantity,
    merchandise: {
      id: variant.id,
      title: variant.title,
      image: product.featuredImage,
      product: { handle: product.handle, title: product.title },
      price: variant.price,
    },
  };
}

function readStoredCart(): Cart | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (raw === cachedCartRaw) return cachedCart;
    cachedCartRaw = raw;
    cachedCart = raw ? (JSON.parse(raw) as Cart) : null;
    return cachedCart;
  } catch {
    cachedCartRaw = null;
    cachedCart = null;
    return null;
  }
}

function subscribeToStorage(onStoreChange: () => void) {
  const handler = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY) onStoreChange();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function writeStoredCart(cart: Cart | null) {
  if (typeof window === "undefined") return;
  if (cart && cart.lines.length > 0) {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } else {
    window.localStorage.removeItem(CART_STORAGE_KEY);
  }
  window.dispatchEvent(new StorageEvent("storage", { key: CART_STORAGE_KEY }));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const storedCart = useSyncExternalStore(
    subscribeToStorage,
    readStoredCart,
    () => null,
  );
  const [optimisticCart, setOptimisticCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cart = optimisticCart ?? storedCart ?? emptyCart();

  const persist = useCallback((next: Cart | null) => {
    setOptimisticCart(next);
    writeStoredCart(next && next.lines.length ? next : null);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "add",
            variantId,
            quantity,
            cartId: cart.id !== "empty" ? cart.id : undefined,
          }),
        });

        if (response.ok) {
          const data = (await response.json()) as {
            cart: Cart | null;
            mode: "shopify" | "mock";
          };
          if (data.mode === "shopify" && data.cart) {
            persist(data.cart);
            setIsOpen(true);
            return;
          }
        }

        const current = cart.id === "empty" ? null : cart;
        const cartId =
          current?.id?.startsWith("mock-cart-") || current?.id
            ? current.id.startsWith("mock-cart-")
              ? current.id
              : `mock-cart-${Date.now()}`
            : `mock-cart-${Date.now()}`;
        const lines = [...(current?.lines ?? [])];
        const existingIndex = lines.findIndex(
          (line) => line.merchandise.id === variantId,
        );

        if (existingIndex >= 0) {
          const existing = lines[existingIndex];
          lines[existingIndex] = {
            ...existing,
            quantity: existing.quantity + quantity,
          };
        } else {
          const line = lineFromVariant(variantId, quantity);
          if (!line) return;
          lines.push(line);
        }

        persist(computeCart(cartId, lines));
        setIsOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    [cart, persist],
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      setIsLoading(true);
      try {
        if (cart.id && !cart.id.startsWith("mock-cart-") && cart.id !== "empty") {
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "update",
              cartId: cart.id,
              lines: [{ id: lineId, quantity }],
            }),
          });
          if (response.ok) {
            const data = (await response.json()) as { cart: Cart };
            persist(data.cart);
            return;
          }
        }

        if (quantity <= 0) {
          const lines = cart.lines.filter((line) => line.id !== lineId);
          persist(lines.length ? computeCart(cart.id, lines, cart.checkoutUrl) : null);
          return;
        }

        const lines = cart.lines.map((line) =>
          line.id === lineId ? { ...line, quantity } : line,
        );
        persist(computeCart(cart.id, lines, cart.checkoutUrl));
      } finally {
        setIsLoading(false);
      }
    },
    [cart, persist],
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      setIsLoading(true);
      try {
        if (cart.id && !cart.id.startsWith("mock-cart-") && cart.id !== "empty") {
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "remove",
              cartId: cart.id,
              lineIds: [lineId],
            }),
          });
          if (response.ok) {
            const data = (await response.json()) as { cart: Cart };
            persist(data.cart);
            return;
          }
        }

        const lines = cart.lines.filter((line) => line.id !== lineId);
        persist(lines.length ? computeCart(cart.id, lines, cart.checkoutUrl) : null);
      } finally {
        setIsLoading(false);
      }
    },
    [cart, persist],
  );

  const checkout = useCallback(() => {
    if (!cart.lines.length) return;
    if (cart.checkoutUrl.startsWith("http")) {
      window.location.assign(cart.checkoutUrl);
      return;
    }
    router.push("/cart");
  }, [cart, router]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      isOpen,
      isLoading,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      checkout,
    }),
    [
      cart,
      isOpen,
      isLoading,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      checkout,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
