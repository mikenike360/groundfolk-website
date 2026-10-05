import { NextResponse } from "next/server";
import {
  addToCart,
  createCart,
  isShopifyConfigured,
  removeFromCart,
  updateCartLines,
} from "@/lib/shopify";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    action: "add" | "update" | "remove";
    cartId?: string;
    variantId?: string;
    quantity?: number;
    lines?: { id: string; quantity: number }[];
    lineIds?: string[];
  };

  if (!isShopifyConfigured()) {
    return NextResponse.json({ mode: "mock", cart: null });
  }

  try {
    if (body.action === "add") {
      if (!body.variantId) {
        return NextResponse.json({ error: "variantId required" }, { status: 400 });
      }
      const quantity = body.quantity ?? 1;
      const cart =
        body.cartId && !body.cartId.startsWith("mock-")
          ? await addToCart(body.cartId, body.variantId, quantity)
          : await createCart(body.variantId, quantity);
      return NextResponse.json({ mode: "shopify", cart });
    }

    if (body.action === "update") {
      if (!body.cartId || !body.lines) {
        return NextResponse.json({ error: "cartId and lines required" }, { status: 400 });
      }
      const cart = await updateCartLines(body.cartId, body.lines);
      return NextResponse.json({ mode: "shopify", cart });
    }

    if (body.action === "remove") {
      if (!body.cartId || !body.lineIds) {
        return NextResponse.json(
          { error: "cartId and lineIds required" },
          { status: 400 },
        );
      }
      const cart = await removeFromCart(body.cartId, body.lineIds);
      return NextResponse.json({ mode: "shopify", cart });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Cart error" },
      { status: 500 },
    );
  }
}
