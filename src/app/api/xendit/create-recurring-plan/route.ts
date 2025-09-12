import { NextRequest, NextResponse } from "next/server";
import { xenditClient } from "@/lib/axios";
import { CustomerType, RecurringPlanType, SubscriptionPlan, DeliveryAddress } from "@/types/types";
import { deliveryFormSchema } from "@/lib/zod-schema";
import * as z from "zod";
import { reserveCardsAtomically } from "@/lib/firebase/actions/card-reservation.action";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerData,
      subscriptionPlan,
      cardItems,
      totalPrice,
      userId,
      selectedAddress,
    }: {
      customerData: CustomerType;
      subscriptionPlan: SubscriptionPlan;
      cardItems: { id: string; name: string }[];
      totalPrice?: number;
      userId?: string;
      selectedAddress?: DeliveryAddress | z.infer<typeof deliveryFormSchema>;
    } = body;

    // First, try to reserve the cards atomically
    // Group cards by type
    const cardTypeCount = cardItems.reduce((acc: Record<string, number>, card) => {
      acc[card.id] = (acc[card.id] || 0) + 1;
      return acc;
    }, {});

    const cardTypes = Object.entries(cardTypeCount).map(([cardType, quantity]) => ({
      cardType,
      quantity
    }));

    const reservationResult = await reserveCardsAtomically(cardTypes, userId || customerData.reference_id);
    
    if (!reservationResult.success) {
      return NextResponse.json(
        { error: reservationResult.error || "Failed to reserve cards. Please try again." },
        { status: 400 }
      );
    }

    // Create customer in Xendit
    const { data: customer } = await xenditClient.post(
      "/customers",
      customerData
    );

    const now = new Date();
    // Format: YYYYMMDDHHMMSS
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;

    const bundleId = crypto.randomUUID().split("-").slice(0, 2).join("-");
    const referenceId = `recurring-${customer.id}-${subscriptionPlan.id}-bundle${bundleId}-${formattedDateTime}`;

    let interval: "DAY" | "WEEK" | "MONTH" = "DAY";
    let intervalCount = subscriptionPlan.durationDays;

    if (subscriptionPlan.durationDays > 365) {
      console.log(
        "Subscription duration exceeds 365 days, converting to months"
      );
      interval = "MONTH";
      intervalCount = Math.floor(subscriptionPlan.durationDays / 30);
    } else if (
      subscriptionPlan.durationDays >= 7 &&
      subscriptionPlan.durationDays % 7 === 0
    ) {
      console.log(
        "Subscription duration is a multiple of 7, converting to weeks"
      );
      interval = "WEEK";
      intervalCount = subscriptionPlan.durationDays / 7;
    }

    const recurringPlanData: RecurringPlanType = {
      reference_id: referenceId,
      customer_id: customer.id,
      recurring_action: "PAYMENT",
      currency: "PHP",
      amount: totalPrice ?? subscriptionPlan.price,
      immediate_action_type: "FULL_AMOUNT", // Charge immediately when plan is created
      schedule: {
        reference_id: `schedule-${customer.id}-${subscriptionPlan.id}-bundle${bundleId}`,
        interval: interval,
        interval_count: intervalCount,
      },
      description: `Subscription for ${cardItems.length} Cards. ${subscriptionPlan.name}`,
      success_return_url: process.env.NEXT_PUBLIC_SUCCESS_REDIRECT_URL,
      failure_return_url: process.env.NEXT_PUBLIC_FAILURE_REDIRECT_URL,
      metadata: {
        ...(userId && { userId }),
        cardItems: cardItems,
        per_card_price: subscriptionPlan.price,
        customerEmail: customerData.email,
        customerName: `${customerData.individual_detail?.given_names || ""} ${customerData.individual_detail?.surname || ""}`,
        customerPhone: customerData.mobile_number,
        customerAddress:
          selectedAddress?.street +
          ", " +
          selectedAddress?.city +
          ", " +
          selectedAddress?.state +
          ", " +
          selectedAddress?.zipCode +
          ", " +
          "Philippines",
        totalAmount: totalPrice,
      },
    };

    // Create recurring plan in Xendit
    const { data: recurringPlan } = await xenditClient.post(
      "/recurring/plans",
      recurringPlanData
    );

    return NextResponse.json({ customer, recurringPlan });
  } catch (error: any) {
    
    // Provide more specific error message
    if (error.response?.status === 503) {
      return NextResponse.json(
        { error: "Xendit service is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    } else if (error.response?.status === 401) {
      return NextResponse.json(
        { error: "Xendit authentication failed. Please check API keys." },
        { status: 401 }
      );
    } else if (error.response?.status === 400) {
      return NextResponse.json(
        { error: `Xendit request failed: ${error.response?.data?.message || 'Invalid request'}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create recurring plan" },
      { status: 500 }
    );
  }
}