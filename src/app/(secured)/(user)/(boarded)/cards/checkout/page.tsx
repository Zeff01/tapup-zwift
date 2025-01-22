import Checkout from "../_components/Checkout";
import { ShippingInfoProvider } from "@/providers/shipping-info-provider";
import { CartProvider } from "@/providers/cart-provider";
const Page = () => {
  return (
    <main className="w-full flex justify-center h-full">
      <ShippingInfoProvider>
        <CartProvider>
          <Checkout />
        </CartProvider>
      </ShippingInfoProvider>
    </main>
  );
};

export default Page;
