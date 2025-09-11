import { NextRequest, NextResponse } from "next/server";

// Test endpoint to manually trigger webhook for debugging
export async function POST(req: NextRequest) {
  try {
    const { userId, cardType } = await req.json();
    
    if (!userId || !cardType) {
      return NextResponse.json({ error: "userId and cardType required" }, { status: 400 });
    }
    
    // Simulate the webhook data that Xendit would send
    const webhookData = {
      event: "recurring.plan.activated",
      data: {
        metadata: {
          userId: userId,
          cardItems: [{ id: cardType, name: `${cardType} Card` }],
          customerEmail: "test@example.com",
          customerName: "Test User",
          customerPhone: "1234567890",
          customerAddress: "Test Address",
          totalAmount: 500
        },
        schedule: {
          interval: "MONTH",
          interval_count: 12
        },
        customer_id: `test-customer-${Date.now()}`
      }
    };
    
    console.log("[TEST WEBHOOK] Triggering recurring webhook with data:", webhookData);
    
    // Call the webhook endpoint
    const response = await fetch(`${req.nextUrl.origin}/api/webhooks/xendit/recurring-webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });
    
    const result = await response.json();
    console.log("[TEST WEBHOOK] Webhook response:", result);
    
    return NextResponse.json({ 
      message: "Webhook triggered", 
      webhookResponse: result,
      status: response.status 
    });
    
  } catch (error) {
    console.error("[TEST WEBHOOK] Error:", error);
    return NextResponse.json({ error: "Failed to trigger webhook" }, { status: 500 });
  }
}