"use client";

import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import Courier from "@/components/Courier";
import { courierList } from "@/constants";
const DeliveryOption = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedOption(index);
  };

  useEffect(() => {
    // Set the first courier as the selected option when the component mounts
    if (courierList.length > 0) {
      setSelectedOption(0);
    }
  }, []);

  return (
    <div className="relative max-h-screen flex flex-col max-w-sm w-full ">
      {/* Navigation Bar */}
      <NavBar title="Choose Delivery Option" href="/cards/checkout" />

      <div className="space-y-3 mx-4">
        {courierList.map((courier, index) => (
          <Courier
            key={courier.id}
            name={courier.name}
            image={courier.image}
            shippingFee={courier.shippingFee}
            minDays={courier.minDays}
            maxDays={courier.maxDays}
            isSelected={selectedOption === index}
            onSelect={() => handleSelect(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default DeliveryOption;
