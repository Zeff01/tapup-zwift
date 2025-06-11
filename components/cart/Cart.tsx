"use client";

import { ShoppingCart, Trash } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { type CartItem as CartItemType, useCart } from "@/providers/cart-provider-v2";
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
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Cart() {
  const { items, totalItems, isOpen, openCart, closeCart, clearCart, removeItem } = useCart();
  const [checkedItems, setCheckedItems] = useState<CartItemType[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const { user } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleSelectAll = (checked: boolean) => {
    setIsAllSelected(checked);
    if (checked) {
      setCheckedItems([...items]);
    } else {
      setCheckedItems([]);
    }

    console.log(checkedItems)
  };

  useEffect(() => {
    // Keep "Select All" in sync if individual checkboxes are manually changed
    setIsAllSelected(checkedItems.length === items.length && items.length > 0);
  }, [checkedItems, items]);
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
              <div className="flex justify-between items-center gap-4 px-1">
                <div className="flex items-center gap-4">
                  <Checkbox
                    id="select-all"
                    checked={isAllSelected}
                    onCheckedChange={(value) => handleSelectAll(Boolean(value))}
                  />
                  <Label htmlFor="select-all" className="opacity-50">Select All</Label>
                </div>
                <Button
                  variant="link"
                  onClick={() => {
                    if (isAllSelected) {
                      clearCart();
                      setCheckedItems([]);
                    } else {
                      checkedItems.forEach((checkedItem) => {
                        removeItem(checkedItem.id);
                      });
                      setCheckedItems((prev) =>
                        prev.filter((item) =>
                          !checkedItems.some((checkedItem) => checkedItem.id === item.id)
                        )
                      );
                    }
                  }}
                  className={(checkedItems.length > 0) ? "text-red-500 px-0" : "px-0"}
                  disabled={(checkedItems.length === 0)}
                >
                  <Trash className="shrink-0" />
                  <span>Remove</span>
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="space-y-4 px-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 w-full">
                      <Checkbox
                        checked={checkedItems.some((i) => i.id === item.id)}
                        onCheckedChange={(isChecked) => {
                          if (isChecked) {
                            setCheckedItems([...checkedItems, item]);
                          } else {
                            const updatedCheckedItems = checkedItems.filter((i) => i.id !== item.id);
                            setCheckedItems(updatedCheckedItems);
                          }
                        }}
                        className="relative top-5 size-4" />
                      <CartItem item={item} />
                    </div>
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
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  closeCart();
                  if (pathname !== "/cards/card-shop") {
                    router.push("/cards/card-shop");
                  }
                }}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
