"use client";
import { useParams } from "next/navigation";
import OrderStatusSuccess from "../../_components/OrderStatusSuccess";
import OrderStatusFailed from "../../_components/OrderStatusFailed";
import { ShippingInfoProvider } from "@/providers/shipping-info-provider";
import { CartProvider } from "@/providers/cart-provider";
const OrderStatusPage = () => {
  const { status } = useParams();

  // Ensure `status` is a string
  if (typeof status !== "string") {
    return <p>Invalid status. Please check the URL.</p>;
  }

  // Validate the status parameter
  if (!["success", "failed"].includes(status)) {
    return <p>Invalid status. Please check the URL.</p>;
  }

  return (
    <div className="w-full flex justify-center h-full">
      {status === "success" && (
        <ShippingInfoProvider>
          <CartProvider>
            <OrderStatusSuccess />
          </CartProvider>
        </ShippingInfoProvider>
      )}
      {status === "failed" && <OrderStatusFailed />}
    </div>
  );
};

export default OrderStatusPage;
