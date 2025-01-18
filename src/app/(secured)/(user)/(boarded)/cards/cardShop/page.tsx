import CardShop from "../_components/CardShop";
import { CartProvider } from "@/providers/cart-provider";

const Page = () => {
  return (
    <CartProvider>
      <main className="w-full flex justify-center h-full">
        <CardShop />
      </main>
    </CartProvider>
  );
};

export default Page;
