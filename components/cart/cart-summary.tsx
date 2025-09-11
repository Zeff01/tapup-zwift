"use client";

import { useCart } from "@/providers/cart-provider";
import { formatCurrency } from "@/lib/utils";

export function CartSummary() {
  const { subtotal } = useCart();
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
      </div>
      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
