import OrderPhysicalCard from "../_components/CardShop";
import CardShop from "../_components/CardShop";
import { CartProvider } from "@/providers/cart-provider";

const Page = () => {
  return (
    <main className="w-full flex justify-center h-full">
      <CardShop />
    </main>
  );
};

export default Page;
