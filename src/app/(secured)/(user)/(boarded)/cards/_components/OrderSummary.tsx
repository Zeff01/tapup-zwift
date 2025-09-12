"use client";

import { Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
  isLoading: boolean;
  hasAddress: boolean;
  onPlaceOrder: () => void;
}

export default function OrderSummary({
  items,
  isLoading,
  hasAddress,
  onPlaceOrder,
}: OrderSummaryProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-4 border rounded-lg space-x-4"
            >
              <div className="relative h-36 w-40">
                <Image
                  src={
                    item.image ||
                    "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                  }
                  alt={`${item.name} card image`}
                  fill
                  className="object-contain rounded-md"
                />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-sm sm:text-base">
                  {item.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm sm:text-base font-semibold">
                  PHP{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>PHP{total.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>PHP0.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>PHP0.00</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>PHP{total.toFixed(2) || "0.00"}</span>
          </div>
        </div>

        <Button
          onClick={onPlaceOrder}
          disabled={isLoading || totalItems === 0 || !hasAddress}
          className="w-full bg-greenColor text-white font-medium hover:bg-greenColor/80"
        >
          {isLoading ? (
            <>
              Placing Order
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Place Order"
          )}
        </Button>

        <p className="text-sm text-gray-500 text-center">
          By placing your order, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </CardContent>
    </Card>
  );
}