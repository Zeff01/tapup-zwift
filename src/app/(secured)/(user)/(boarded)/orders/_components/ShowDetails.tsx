"use client";

import { usePathname } from "next/navigation";
import { Order } from "@/types/types";
import OrderCard from "./OrderCard";
import Image from "next/image";
import { Input } from "@/components/ui/input";
interface showDetailsProps {
  order: Order;
}

const ShowDetails: React.FC<showDetailsProps> = ({ order }) => {
  const pathname = usePathname();

  const formatDeliveryDate = (
    orderDate: Date,
    minDays: number,
    maxDays: number
  ) => {
    const addDays = (date: Date, days: number) =>
      new Date(date.setDate(date.getDate() + days));
    const formatDate = (date: Date) =>
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    const minDeliveryDate = addDays(new Date(orderDate), minDays);
    const maxDeliveryDate = addDays(new Date(orderDate), maxDays);

    return `${formatDate(minDeliveryDate)}-${formatDate(maxDeliveryDate)}, ${maxDeliveryDate.getFullYear()}`;
  };

  const returnRefundStatus =
    order.returnStatus === "Return Requested" ||
    order.returnStatus === "To Return" ||
    order.returnStatus === "Refunded";

  const cancelledStatus = order.returnStatus === "Cancelled";

  console.log("return refund", returnRefundStatus);
  return (
    <div className="flex flex-col ">
      <div className="space-y-3 mx-2 mb-4 flex-1">
        {order.returnStatus === "Return Rejected" && (
          <div className="space-y-2">
            <h2 className="font-semibold text-muted-foreground">
              Return Request Details
            </h2>
            <div className="mx-2">
              <Input
                className="rounded-lg p-3 text-lg placeholder:text-base"
                type="text"
                placeholder="Return Reason"
              ></Input>
            </div>
            <div>
              <h2 className="font-semibold text-muted-foreground">
                Refund Rejection Details
              </h2>
              <div className="mx-2">
                <Input
                  className="rounded-lg p-3 mt-2 placeholder:text-base"
                  type="text"
                  placeholder="Rejection Reason"
                ></Input>
              </div>
            </div>
          </div>
        )}

        {returnRefundStatus && (
          <div>
            <h2 className="font-semibold text-muted-foreground">
              Refund Request Details
            </h2>
            <div className="mt-2 mx-2">
              <Input
                className="rounded-lg p-3 text-lg placeholder:text-base"
                type="text"
                placeholder="Refund Reason"
              ></Input>
            </div>
          </div>
        )}

        {(cancelledStatus || pathname.includes("orders/cancelled")) && (
          <div>
            <h2 className="font-semibold text-muted-foreground">
              Cancellation Request Details
            </h2>
            <div className="mt-2 mx-2">
              <Input
                className="rounded-lg p-3 text-lg placeholder:text-base"
                type="text"
                placeholder="Cancellation Reason"
              ></Input>
            </div>
          </div>
        )}

        {!returnRefundStatus && !cancelledStatus ? (
          <div>
            <h2 className="mb-2 font-semibold text-muted-foreground">
              Shipping Information
            </h2>
            <div className="mb-4 rounded-lg mx-2 p-3 border">
              <p className="font-bold">
                {order.shippingInfo.recipientName}{" "}
                <span className="text-sm font-medium text-muted-foreground">
                  | {order.shippingInfo.contactNumber}
                </span>
              </p>
              <p className="text-muted-foreground">
                {order.shippingInfo.address.street}
              </p>
              <p className="text-muted-foreground">
                {order.shippingInfo.address.city}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Delivery Method */}
        {order.returnStatus !== "Return Rejected" && !cancelledStatus ? (
          <div>
            <h2 className="font-semibold text-muted-foreground mb-2">
              {returnRefundStatus ? "Return Method" : "Delivery Method"}
            </h2>
            <div className="mb-4 rounded-lg mx-2 p-3 border flex items-center gap-2">
              <div className="relative w-12 h-12 md:w-16 md:h-16">
                <Image
                  src={`${order.deliveryOption.image || ""}`}
                  alt="carrier image"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm md:text-lg font-semibold">
                  {order.deliveryOption.name}{" "}
                  <span className="ml-2 font-normal text-muted-foreground">
                    &#8369;{order.deliveryOption.shippingFee.toFixed(2)}
                  </span>
                </p>
                <p className="text-muted-foreground">
                  Est. Delivery Date:{" "}
                  {pathname.includes("/orders/pending")
                    ? "Pending"
                    : `${formatDeliveryDate(order.orderDate, order.deliveryOption.minDays!, order.deliveryOption.maxDays!)}`}
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Payment Method */}
        <h2 className="font-semibold text-muted-foreground">
          {returnRefundStatus || cancelledStatus
            ? "Refund To"
            : "Payment Method"}
        </h2>
        <div className="mb-4 rounded-lg mx-2 p-3 border flex items-center gap-2">
          <div className="relative w-10 h-10 md:w-16 md:h-16">
            <Image
              src="/assets/payment/Visa.png"
              alt="payment method card"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-lg">**** 1234</p>
            <p className="text-muted-foreground">Exp. date: 07/25</p>
          </div>
        </div>
      </div>
      <OrderCard order={order} />
    </div>
  );
};
export default ShowDetails;
