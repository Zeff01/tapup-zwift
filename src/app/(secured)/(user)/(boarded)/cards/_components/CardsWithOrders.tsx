"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Cards from "./cards";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";

const CardsWithOrders = () => {
  const searchParams = useSearchParams();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    // Check if we're coming from a payment redirect
    const status = searchParams.get("status");
    const planId = searchParams.get("plan_id") || searchParams.get("recurring_plan_id");
    
    if (status || planId) {
      // Show payment success modal if we have payment-related params
      setShowPaymentModal(true);
    }
  }, [searchParams]);

  return (
    <div className="flex-1">
      <Cards />
      
      <PaymentSuccessModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          // Remove payment params from URL
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete("status");
          newUrl.searchParams.delete("plan_id");
          newUrl.searchParams.delete("recurring_plan_id");
          newUrl.searchParams.delete("external_id");
          newUrl.searchParams.delete("reference_id");
          window.history.replaceState({}, "", newUrl.toString());
        }}
        searchParams={searchParams}
      />
    </div>
  );
};

export default CardsWithOrders;