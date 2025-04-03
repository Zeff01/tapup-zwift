"use client";

import { useCart } from "@/providers/cart-provider-v2";
import { formatCurrency } from "@/lib/utils";

export function CartSummary() {
  const { subtotal } = useCart();
  const shipping = 0; // Free shipping for this example
  const tax = subtotal * 0.1; // 10% tax rate for this example
  const total = subtotal + shipping + tax;

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
      <div className="flex justify-between">
        <span>Tax (10%)</span>
        <span>{formatCurrency(tax)}</span>
      </div>
      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
