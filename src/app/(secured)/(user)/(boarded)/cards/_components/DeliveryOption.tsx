"use client";

import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import Courier from "@/components/Courier";
import { courierList } from "@/constants";
import { useShippingInfo } from "@/providers/shipping-info-provider";

const DeliveryOption = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const { state, setState } = useShippingInfo();

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    setState((prevState) => ({
      ...prevState,
      deliveryOption: courierList[index],
    }));
  };

  useEffect(() => {
    // Set the selected option based on the delivery option in the state
    const currentDeliveryOption = state.deliveryOption;
    if (currentDeliveryOption) {
      const index = courierList.findIndex(
        (courier) => courier.name === currentDeliveryOption.name
      );
      if (index !== -1) {
        setSelectedOption(index);
      } else {
        setSelectedOption(0);
        setState((prevState) => ({
          ...prevState,
          deliveryOption: courierList[0],
        }));
      }
    } else if (courierList.length > 0) {
      setSelectedOption(0);
      setState((prevState) => ({
        ...prevState,
        deliveryOption: courierList[0],
      }));
    }
  }, [setState, state.deliveryOption]);

  return (
    <div className="relative max-h-screen flex flex-col max-w-sm w-full ">
      {/* Navigation Bar */}
      <NavBar title="Choose Delivery Option" href="/cards/checkout" />

      <div className="space-y-3 mx-4">
        {courierList.map((courier, index) => (
          <Courier
            key={index}
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
