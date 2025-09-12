"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/providers/user-provider";
import { CustomerType, DeliveryAddress, TransactionType } from "@/types/types";
import {
  updateUserInfo,
  createTransaction,
} from "@/lib/firebase/actions/user.action";
import { useCart } from "@/hooks/use-cart-v2";
import { toast } from "react-toastify";
import AccountInfo from "./AccountInfo";
import AddressManagement from "./AddressManagement";
import OrderSummary from "./OrderSummary";

export default function CheckoutForm() {
  const { user, isLoading: isUserLoading } = useUserContext();
  const { items, clearCart } = useCart();
  
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);

  useEffect(() => {
    if (user?.deliveryAddresses && user?.deliveryAddresses.length > 0) {
      setAddresses(user.deliveryAddresses);
      setSelectedAddressId(user.deliveryAddresses[0].id);
    }
  }, [user?.deliveryAddresses]);

  const currentUser = {
    name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "John Doe",
    email: user?.email || "john.doe@example.com",
    avatar: user?.profilePictureUrl || "/default-user.png",
  };

  const handlePlaceOrder = async () => {
    if (!items || items.length === 0) {
      toast.error("No items in the cart");
      return;
    }

    if (addresses.length === 0) {
      toast.error("Please Add a Delivery Address");
      return;
    }

    setIsLoadingTransaction(true);

    try {
      const referenceId = `customer-${user?.email}-${new Date().toISOString()}`;
      const selectedAddress = addresses.find(
        (address) => address.id === selectedAddressId
      );

      const customerData: CustomerType = {
        reference_id: referenceId,
        type: "INDIVIDUAL",
        email: user?.email,
        mobile_number: user?.number ?? selectedAddress?.phone,
        individual_detail: {
          given_names: user?.firstName ?? selectedAddress?.firstName ?? "",
          surname: user?.lastName ?? selectedAddress?.lastName,
        },
      };

      const cardTotal = items.reduce(
        (total, item) =>
          total + (item.subscriptionPlan?.price ?? 0) * item.quantity,
        0
      );

      // NEW CHECKOUT FLOW: Recurring webhook handles the card and transaction creation
      const newCards = items.flatMap((item) => {
        return Array.from({ length: item.quantity }, () => ({
          id: item.id,
          name: item.name,
        }));
      });

      // Using card bank instead of inventory system

      // Use API route instead of direct client call
      const response = await fetch('/api/xendit/create-recurring-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerData: customerData,
          subscriptionPlan: items[0].subscriptionPlan!,
          cardItems: newCards,
          totalPrice: cardTotal,
          userId: user?.uid,
          selectedAddress: selectedAddress,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create payment plan');
      }

      const recurringPlan = await response.json();

      // Create transaction record - in test mode, payment is instant
      const transactionData: any = {
        user_id: user?.uid,
        userId: user?.uid, // Add this for backward compatibility with Orders query
        receiver: {
          customerId: user?.uid || "",
          customerName: `${selectedAddress?.firstName} ${selectedAddress?.lastName}`,
          customerEmail: user?.email || "",
          customerPhone: selectedAddress?.phone || user?.number || "",
          customerAddress: `${selectedAddress?.street}, ${selectedAddress?.city}, ${selectedAddress?.state}, ${selectedAddress?.zipCode}`,
        },
        cards: newCards.map(card => ({
          id: card.id,
          name: card.name,
        })),
        items: newCards.map(card => ({
          id: card.id,
          name: card.name,
          quantity: 1,
          price: items.find(item => item.id === card.id)?.subscriptionPlan?.price || 0,
        })),
        amount: cardTotal,
        status: "pending", // Transaction is pending until Xendit confirms payment
        paymentUrl: recurringPlan.recurringPlan.actions?.[0]?.url || null, // Store payment URL for re-payment
        xenditPlanId: recurringPlan.recurringPlan.id,
      };

      await createTransaction(transactionData);
      
      // Store user ID in localStorage for payment success page
      if (user?.uid) {
        localStorage.setItem("userId", user.uid);
      }

      if (!user?.firstName || !user?.lastName || !user?.number) {
        await updateUserInfo({
          userId: user?.uid as string,
          firstName: selectedAddress?.firstName || "",
          lastName: selectedAddress?.lastName || "",
          phoneNumber: selectedAddress?.phone || "",
        });
      }

      await clearCart();
      
      // Redirect to Xendit payment page
      const paymentUrl = recurringPlan.recurringPlan.actions?.[0]?.url;
      
      if (!paymentUrl) {
        throw new Error("No payment URL received from Xendit");
      }
      
      window.location.href = paymentUrl;
    } catch (error: any) {
      console.error("Error placing order:", error);
      
      // Show specific error message
      if (error.message?.includes("Not enough") || error.message?.includes("available")) {
        toast.error(error.message || "Some items are no longer available. Please update your cart.");
      } else {
        toast.error(error.message || "Failed to place order. Please try again.");
      }
    } finally {
      setIsLoadingTransaction(false);
    }
  };

  const orderItems = items.map(item => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.subscriptionPlan?.price ?? item.price,
    image: item.image,
  }));

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase</p>
        </div>

        <div className="space-y-6">
          <AccountInfo
            isLoading={isUserLoading}
            name={currentUser.name}
            email={currentUser.email}
            avatar={currentUser.avatar}
          />

          <AddressManagement
            userId={user?.uid as string}
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onAddressChange={setSelectedAddressId}
            onAddressesUpdate={setAddresses}
          />

          <OrderSummary
            items={orderItems}
            isLoading={isLoadingTransaction}
            hasAddress={addresses.length > 0}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
}