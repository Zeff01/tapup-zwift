"use client";

import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import PageHeader from "../_components/PageHeader";
import StepProgress from "../_components/StepProgress";
import { CheckCircle, FileCheck, FileSearch } from "lucide-react";

import OrderTracking from "../_components/OrderTracking";
import { formatDeliveryDate } from "@/components/FormatDeliveryDate";
import { exampleOrders } from "@/constants/exampleOrders";

const steps = [
  { label: "Cancel Request", icon: FileCheck },
  { label: "In Review", icon: FileSearch },
  { label: "Refunded", icon: CheckCircle },
];

const trackingStepsSample = [
  {
    time: "20 Jan 10:21",
    text: "Refund Issued",
    active: true,
  },
  { time: "20 Jan 08:51", text: "Order was cancelled" },
  { time: "19 Jan 16:22", text: "Cancel request in review" },
  { time: "19 Jan 10:51", text: "Cancellation requested" },
];

const TrackReturnPage = () => {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const orderId = searchParams.get("orderId"); // Get order ID from URL query parameters

  const order = exampleOrders.find((order) => order.orderId === orderId);

  if (!order) {
    return <p>Order not found</p>;
  }
  return (
    <div className="my-2 ">
      {/* Header */}

      <PageHeader title="Track Cancellation" />
      {/* Stepper */}
      <div className="mx-4">
        <div className="mt-4 p-3 border rounded-lg">
          <StepProgress currentStep={currentStep} steps={steps} />
        </div>

        <OrderTracking
          estimatedDelivery={formatDeliveryDate(
            order.orderDate,
            order.deliveryOption.minDays!,
            order.deliveryOption.maxDays!
          )}
          courierName={order.deliveryOption.name!}
          trackingNumber={order.orderId}
          logoUrl={order.deliveryOption.image!}
          trackingSteps={trackingStepsSample}
          status={order.status}
        />
      </div>
    </div>
  );
};

export default TrackReturnPage;
