import ShippingAddress from "../_components/ShippingAddress";

import { ShippingInfoProvider } from "@/providers/shipping-info-provider";

const Page = () => {
  return (
    <main className="w-full flex justify-center h-full">
      <ShippingInfoProvider>
        <ShippingAddress />
      </ShippingInfoProvider>
    </main>
  );
};

export default Page;
