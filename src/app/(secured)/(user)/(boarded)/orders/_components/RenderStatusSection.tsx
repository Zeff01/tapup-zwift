"use client";

import { Order } from "@/types/types";
import { usePathname } from "next/navigation";

interface RenderStatusSectionProps {
  order: Order;
}

const RenderStatusSection: React.FC<RenderStatusSectionProps> = ({ order }) => {
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

    return `${formatDate(minDeliveryDate)}-${formatDate(maxDeliveryDate)}`;
  };

  const getReturnText = (order: Order) => {
    const { status, returnStatus } = order;
    if (
      ["To Return/Refund", "Delivered", "Cancelled"].includes(status) &&
      returnStatus
    ) {
      return returnStatus;
    }
    return "";
  };

  const statusSections: Record<
    string,
    { label: string; statusText: string; className: string }
  > = {
    "/orders/to-ship": {
      label: "Est. Delivery",
      statusText: "To Ship",
      className: "border border-blueColor text-blueColor",
    },
    "/orders/to-receive": {
      label: "Est. Delivery",
      statusText: "To Receive",
      className: "border border-blueColor text-blueColor",
    },
    "/orders/to-return-refund": {
      label: "Est. Return",
      statusText: getReturnText(order),
      className:
        order.returnStatus === "Refunded"
          ? "bg-[#F4FBF5] border-[#129A2C] text-[#0A5518]"
          : "bg-[#FEFCE8] text-[#713F12] border-[#CA8A04]",
    },
    "/orders/delivered": {
      label: "Delivered on",
      statusText: getReturnText(order),
      className:
        order.returnStatus === "Delivered"
          ? "bg-[#F4FBF5] border-[#129A2C] text-[#0A5518]"
          : "bg-[#FEF2F2] text-[#7F1D1D] border-[#DC2626]",
    },
    "/orders/cancelled": {
      label: order.returnStatus === "Refunded" ? "Refunded On" : "Cancelled On",
      statusText: getReturnText(order),
      className:
        order.returnStatus === "Refunded"
          ? "bg-[#F4FBF5] border-[#129A2C] text-[#0A5518]"
          : "bg-[#FEF2F2] text-[#7F1D1D] border-[#DC2626]",
    },
  };

  console.log("Delivered Order Data:", order);
  console.log("Delivered orderReturnStatus:", order.returnStatus);
  const matchingPath = Object.keys(statusSections).find((key) =>
    pathname.includes(key)
  );
  if (!matchingPath) return null;

  const section = statusSections[matchingPath];
  return (
    <div className="flex justify-between">
      <p>
        {section.label}:{" "}
        <span className="font-semibold">
          {formatDeliveryDate(
            order.orderDate,
            order.deliveryOption.minDays!,
            order.deliveryOption.maxDays!
          )}
        </span>
      </p>
      <h6
        className={`border md:p-2 p-1 text-sm md:text-lg h-fit rounded-sm ${section.className}`}
      >
        {section.statusText}
      </h6>
    </div>
  );
};

export default RenderStatusSection;
