"use client";

import React from "react";

import NavBar from "./Navbar";
import ShippingInfoForm from "@/components/forms/ShippingInfoForm";
const ShippingAddress = () => {
  return (
    <div className="relative flex flex-col max-w-sm w-full border ">
      {/* Navigation Bar */}
      <NavBar title="Edit Address" href="/cards/checkout" />

      {/* Shipping Form */}
      <ShippingInfoForm />
    </div>
  );
};

export default ShippingAddress;
