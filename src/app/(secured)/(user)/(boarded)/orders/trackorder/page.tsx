'use client'

import {  useSearchParams } from "next/navigation";
import OrderTracking from "../_components/OrderTracking";

import PageHeader from "../_components/PageHeader";

import StepProgress from "../_components/StepProgress";
import { CheckCircle, Clipboard, Package, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { exampleOrders } from "@/constants/exampleOrders";
import { formatDeliveryDate } from "@/components/FormatDeliveryDate";


const trackingStepsSample = [
    { time: "20 Jan 10:21", text: "Your cards have been delivered.", active: true },
    { time: "20 Jan 08:51", text: "Your cards are out for delivery." },
    { time: "20 Jan 03:14", text: "Your parcel has arrived at the delivery hub." },
    { time: "19 Jan 20:47", text: "Parcel has departed from sorting facility." },
    { time: "19 Jan 14:26", text: "Parcel has arrived at the sorting facility." },
    { time: "19 Jan 10:45", text: "Parcel has been picked up by our logistics partner." },
    { time: "19 Jan 08:51",  text: "The cards have been printed." },
    { time: "18 Jan 21:11", text: "Required information filled out." },
    { time: "18 Jan 21:03", text: "Order is placed." },
]
const toShipTrackingSteps = [
  {time: "19 Jan 10:45", text:"Parcel has been picked up by your logistics partner."},
  {time: "18 Jan 08:25", text:"Cards have been printed."},
  {time: "17 Jan 06:22", text:"Required information filled out."},
  {time: "17 Jan 06:00", text:"Order is placed."},
]
          

const steps = [
  { label: "Filled Out", icon: Clipboard },
  { label: "Shipped", icon: Package },
  { label: "Out for delivery", icon: Truck },
  { label: "Delivered", icon: CheckCircle },
];

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState(1);
  const orderId = searchParams.get('orderId'); // Get order ID from URL query parameters
  const order = exampleOrders.find((o) => o.orderId === orderId);
useEffect(() => {
    if (!order) return; // Ensure order exists to avoid errors

    const determineStep = (status: string) => {
      if (status === "To Receive") return 1;
      if (status === "Delivered") return 3;
      return 1;
    };

    setCurrentStep(determineStep(order.status));
  }, [order]); // Ensures useEffect runs consistently

  if (!order) {
    return <p>Order not found</p>;
  }


  return (
    <div className="my-2">
     
      <PageHeader title="Track Order" />
      
      <div className="mt-4 p-3 border rounded-lg mx-4">
        <p className="text-sm md:text-lg text-muted-foreground">
          Est. Delivery:{" "}
          <span className="font-bold text-primary">{formatDeliveryDate(order.orderDate, order.deliveryOption.minDays!, order.deliveryOption.maxDays!)}</span>
        </p>

        {/* Stepper */}
        <div className="mt-4 p-3">
          <StepProgress currentStep={currentStep} steps={steps} />
        </div>

      </div>
      <div className="mx-4">

    <OrderTracking
      estimatedDelivery={formatDeliveryDate(order.orderDate, order.deliveryOption.minDays!, order.deliveryOption.maxDays!)}
      courierName={order.deliveryOption.name!}
      trackingNumber={order.orderId}
      logoUrl={order.deliveryOption.image!}
      trackingSteps={order.status === "To Receive" ? toShipTrackingSteps : trackingStepsSample}
      status={order.status}
      />
      </div>
      </div>
  );
}