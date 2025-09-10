"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/providers/user-provider";
import { CustomerType, DeliveryAddress } from "@/types/types";
import {
  createCustomerAndRecurringPlanBundleV2,
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

      // First, reserve pregenerated cards for each item
      const reservedCards = [];
      console.log("[Checkout] Attempting to reserve", newCards.length, "cards");
      
      for (let i = 0; i < newCards.length; i++) {
        const card = newCards[i];
        try {
          console.log(`[Checkout] Reserving card ${i + 1}/${newCards.length}: ${card.name} (${card.id})`);
          const { reservePregeneratedCard } = await import("@/lib/firebase/actions/card-bank.action");
          const reserved = await reservePregeneratedCard(card.id, user?.uid || "");
          
          if (!reserved) {
            console.error(`[Checkout] Failed to reserve ${card.name} - no stock available`);
            // Rollback any previously reserved cards
            for (const prevReserved of reservedCards) {
              console.log(`[Checkout] Rolling back reservation for ${prevReserved.reservedCardId}`);
              // TODO: Implement rollback function
            }
            throw new Error(`No available ${card.name} cards in stock`);
          }
          
          console.log(`[Checkout] Successfully reserved ${card.name} with ID: ${reserved.id}, Code: ${reserved.transferCode}`);
          reservedCards.push({
            ...card,
            reservedCardId: reserved.id,
            transferCode: reserved.transferCode,
          });
        } catch (error) {
          console.error(`[Checkout] Error reserving card ${card.name}:`, error);
          throw error;
        }
      }
      
      console.log("[Checkout] All cards reserved successfully:", reservedCards);

      const recurringPlan = await createCustomerAndRecurringPlanBundleV2({
        customerData: customerData,
        subscriptionPlan: items[0].subscriptionPlan!,
        cardItems: newCards,
        totalPrice: cardTotal,
        userId: user?.uid,
        selectedAddress: selectedAddress,
      });

      // Create transaction record - in test mode, payment is instant
      const transactionData = {
        userId: user?.uid,
        orderId: recurringPlan.recurringPlan.id,
        status: "to-ship", // In test mode, we assume payment succeeds
        items: reservedCards.map(card => ({
          id: card.id,
          name: card.name,
          quantity: 1,
          price: items[0].subscriptionPlan?.price,
          subscriptionPlan: items[0].subscriptionPlan,
          reservedCardId: card.reservedCardId,
          transferCode: card.transferCode,
        })),
        shippingInfo: {
          email: selectedAddress?.email || user?.email || "",
          phone: selectedAddress?.phone || user?.number || "",
          address: `${selectedAddress?.street}, ${selectedAddress?.city}, ${selectedAddress?.state}, ${selectedAddress?.zipCode}, ${selectedAddress?.country}`,
        },
        amount: cardTotal,
        customerName: `${selectedAddress?.firstName} ${selectedAddress?.lastName}`,
        xenditPlanId: recurringPlan.recurringPlan.id,
        paymentUrl: recurringPlan.recurringPlan.actions?.[0]?.url || null, // Store payment URL
        createdAt: new Date(),
        paymentStatus: "paid",
        paidAt: new Date(),
      };

      await createTransaction(transactionData);

      if (!user?.firstName || !user?.lastName || !user?.number) {
        await updateUserInfo({
          userId: user?.uid as string,
          firstName: selectedAddress?.firstName || "",
          lastName: selectedAddress?.lastName || "",
          phoneNumber: selectedAddress?.phone || "",
        });
      }

      clearCart();
      
      // Redirect to Xendit payment page
      window.location.href = recurringPlan.recurringPlan.actions?.[0]?.url;
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
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