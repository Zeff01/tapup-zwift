import { NextRequest, NextResponse } from "next/server";
import { CustomerType, RecurringPlanType, SubscriptionPlan, DeliveryAddress } from "@/types/types";
import { deliveryFormSchema } from "@/lib/zod-schema";
import * as z from "zod";
import { reserveCardsAtomically } from "@/lib/firebase/actions/card-reservation.action";

// Import axios directly to ensure it works in the API route
import axios from "axios";

// Use server-side key for security
const XENDIT_SECRET_KEY = process.env.XENDIT_SECRET_KEY || process.env.NEXT_PUBLIC_XENDIT_SECRET_KEY;

if (!XENDIT_SECRET_KEY) {
  console.error("[XENDIT] No API key found! Please set XENDIT_SECRET_KEY in .env");
}

const xenditClient = axios.create({
  baseURL: "https://api.xendit.co",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from((XENDIT_SECRET_KEY || "") + ":").toString("base64")}`,
  },
});

export async function POST(req: NextRequest) {
  // Check if we have necessary environment variables
  if (!XENDIT_SECRET_KEY) {
    console.error("Missing XENDIT_SECRET_KEY environment variable");
    return NextResponse.json(
      { error: "Server configuration error: Missing payment API key" },
      { status: 500 }
    );
  }

  if (!process.env.NEXT_PUBLIC_SUCCESS_REDIRECT_URL || !process.env.NEXT_PUBLIC_FAILURE_REDIRECT_URL) {
    console.error("Missing redirect URLs in environment variables");
    return NextResponse.json(
      { error: "Server configuration error: Missing redirect URLs" },
      { status: 500 }
    );
  }

  try {
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
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

    // Validate required fields
    if (!customerData || !subscriptionPlan || !cardItems) {
      console.error("Missing required fields:", { customerData, subscriptionPlan, cardItems });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate customer data has required fields
    if (!customerData.individual_detail?.given_names || 
        customerData.individual_detail.given_names.trim() === "") {
      console.error("Invalid customer data - given_names is required:", customerData);
      return NextResponse.json(
        { error: "Customer first name is required" },
        { status: 400 }
      );
    }
    
    if (!customerData.reference_id || 
        !customerData.type) {
      console.error("Invalid customer data - missing required fields:", customerData);
      return NextResponse.json(
        { error: "Invalid customer data" },
        { status: 400 }
      );
    }

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

    try {
      const reservationResult = await reserveCardsAtomically(cardTypes, userId || customerData.reference_id);
      
      if (!reservationResult.success) {
        console.error("Card reservation failed:", reservationResult.error);
        return NextResponse.json(
          { error: reservationResult.error || "Failed to reserve cards. Please try again." },
          { status: 400 }
        );
      }
    } catch (reserveError: any) {
      console.error("Card reservation error:", reserveError);
      return NextResponse.json(
        { error: "Failed to reserve cards: " + (reserveError.message || "Unknown error") },
        { status: 500 }
      );
    }

    // Log the customer data being sent to Xendit (for debugging)
    console.log("Creating Xendit customer with data:", {
      ...customerData,
      mobile_number: customerData.mobile_number ? "***" : "(empty)", // Mask sensitive data
      email: customerData.email ? "***@***" : "(empty)"
    });

    // Create customer in Xendit
    let customer;
    try {
      console.log("Calling Xendit API to create customer...");
      const response = await xenditClient.post("/customers", customerData);
      customer = response.data;
      console.log("Xendit customer created successfully:", customer.id);
    } catch (xenditError: any) {
      console.error("Xendit customer creation failed:", xenditError.response?.data || xenditError.message);
      throw xenditError; // Re-throw to be caught by outer catch
    }

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
        customerEmail: customerData.email || "",
        customerName: `${customerData.individual_detail?.given_names || ""} ${customerData.individual_detail?.surname || ""}`.trim(),
        customerPhone: customerData.mobile_number || "",
        customerAddress: selectedAddress ? 
          `${selectedAddress.street || ""}, ${selectedAddress.city || selectedAddress.cityName || ""}, ${selectedAddress.state || selectedAddress.provinceName || ""}, ${selectedAddress.zipCode || ""}, Philippines` :
          "Philippines",
        totalAmount: totalPrice,
      },
    };

    // Create recurring plan in Xendit
    let recurringPlan;
    try {
      console.log("Creating Xendit recurring plan...");
      const response = await xenditClient.post("/recurring/plans", recurringPlanData);
      recurringPlan = response.data;
      console.log("Xendit recurring plan created successfully:", recurringPlan.id);
    } catch (xenditError: any) {
      console.error("Xendit recurring plan creation failed:", xenditError.response?.data || xenditError.message);
      throw xenditError; // Re-throw to be caught by outer catch
    }

    return NextResponse.json({ customer, recurringPlan });
  } catch (error: any) {
    console.error("Error in create-recurring-plan:", error);
    console.error("Error response:", error.response?.data);
    
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
      const xenditError = error.response?.data;
      console.error("Xendit 400 error details:", xenditError);
      
      // Extract specific error message from Xendit
      let errorMessage = "Invalid request";
      if (xenditError?.message) {
        errorMessage = xenditError.message;
      } else if (xenditError?.error_code) {
        errorMessage = `${xenditError.error_code}: ${xenditError.errors?.[0]?.message || 'Invalid request'}`;
      }
      
      return NextResponse.json(
        { error: `Xendit request failed: ${errorMessage}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: `Failed to create recurring plan: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}