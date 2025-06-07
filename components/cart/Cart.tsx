"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/providers/cart-provider-v2";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useUserContext } from "@/providers/user-provider";

export default function Cart() {
  const { items, totalItems, isOpen, openCart, closeCart } = useCart();

  const { user } = useUserContext();

  return (
    <>
      <div className="relative hover:bg-transparent" onClick={openCart}>
        <ShoppingCart className="!size-6 shrink-0" />

        <div
          className={cn("hidden", {
            "absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground":
              items.length > 0,
          })}
        >
          {items.length}
        </div>
      </div>

      <Sheet
        open={isOpen}
        onOpenChange={(open) => (open ? openCart() : closeCart())}
      >
        <SheetContent className="flex w-full flex-col sm:max-w-lg">
          <SheetHeader className="px-1">
            <SheetTitle>Your Cart ({totalItems})</SheetTitle>
          </SheetHeader>

          {items.length > 0 ? (
            <>
              <ScrollArea className="flex-1 py-4">
                <div className="space-y-4 px-1">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </ScrollArea>
              <Separator className="my-4" />
              <div className="px-1">
                <CartSummary />
              </div>

              <SheetFooter className="mt-4 px-1">
                <Link
                  href={user ? "/cards/checkout" : "/delivery-form"}
                  className="w-full"
                >
                  <Button
                    onClick={closeCart}
                    className="w-full bg-greenColor text-white hover:bg-greenColor/80"
                  >
                    Checkout
                  </Button>
                </Link>
              </SheetFooter>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-2">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              <div className="text-xl font-medium">Your cart is empty</div>
              <div className="text-center text-muted-foreground">
                Add items to your cart to see them here.
              </div>
              <Button variant="outline" className="mt-4" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
