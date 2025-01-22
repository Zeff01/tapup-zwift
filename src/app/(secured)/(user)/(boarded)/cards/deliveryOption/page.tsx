import DeliveryOption from "../_components/DeliveryOption";

import { ShippingInfoProvider } from "@/providers/shipping-info-provider";

const Page = () => {
  return (
    <main className="w-full flex justify-center h-full">
      <ShippingInfoProvider>
        <DeliveryOption />
      </ShippingInfoProvider>
    </main>
  );
};

export default Page;
