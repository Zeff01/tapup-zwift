import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";
import { confirmReservation } from "@/lib/firebase/actions/card-reservation.action";
import crypto from "crypto";

/**
 * Xendit Webhook Handler for Payment Events
 * 
 * To enable this webhook:
 * 1. Go to Xendit Dashboard > Settings > Webhooks
 * 2. Add this URL: https://yourdomain.com/api/webhooks/xendit/recurring-webhook
 * 3. Select events: recurring_plan.payment.succeeded, recurring.charge.succeeded, recurring.cycle.succeeded
 * 4. Copy the webhook verification token and add to .env as XENDIT_WEBHOOK_SECRET
 * 
 * When enabled, this will automatically update transaction status from "pending" to "completed"
 * after successful payment.
 */

// Verify webhook signature from Xendit
function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return expectedSignature === signature;
}

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.XENDIT_WEBHOOK_SECRET;
    console.log("[Webhook] Environment check:", {
      hasWebhookSecret: !!webhookSecret,
      secretLength: webhookSecret?.length || 0,
      secretPreview: webhookSecret ? `${webhookSecret.substring(0, 5)}...${webhookSecret.substring(webhookSecret.length - 5)}` : "not set",
      nodeEnv: process.env.NODE_ENV
    });
    
    if (!webhookSecret) {
      console.error("Xendit webhook secret not configured");
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    }

    // Get the raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('x-callback-token');
    
    console.log("[Webhook] Request details:", {
      hasSignature: !!signature,
      signatureLength: signature?.length || 0,
      signaturePreview: signature ? `${signature.substring(0, 5)}...${signature.substring(signature.length - 5)}` : "not provided",
      bodyLength: rawBody.length
    });
    
    if (!signature) {
      console.error("Missing webhook signature");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
    if (!isValid) {
      console.error("Invalid webhook signature", {
        receivedSignature: signature,
        webhookSecret: webhookSecret.substring(0, 5) + "...",
        bodyLength: rawBody.length
      });
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse the webhook payload
    const payload = JSON.parse(rawBody);
    console.log("Xendit webhook received:", {
      event: payload.event,
      business_id: payload.business_id,
      data: payload.data
    });

    // Handle different webhook events
    switch (payload.event) {
      case "recurring_plan.payment.succeeded":
      case "recurring.charge.succeeded":
      case "recurring.cycle.succeeded":
        // Check if this is an immediate payment cycle
        if (payload.data?.type === "IMMEDIATE" && payload.data?.status === "SUCCEEDED") {
          console.log("Processing immediate payment cycle success");
        }
        
        // Payment successful - update transaction to completed
        const planId = payload.data?.plan_id || payload.data?.recurring_plan_id;
        const paymentId = payload.data?.id;
        
        if (!planId) {
          console.error("No plan ID in webhook payload");
          return NextResponse.json({ error: "No plan ID" }, { status: 400 });
        }

        // Find the transaction with this plan ID
        console.log("Looking for transaction with plan ID:", planId);
        
        try {
          // Find transaction by xenditPlanId
          const transactionsRef = collection(firebaseDb, "transactions");
          const q = query(transactionsRef, where("xenditPlanId", "==", planId));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const transactionDoc = querySnapshot.docs[0];
            const transactionRef = doc(firebaseDb, "transactions", transactionDoc.id);
            const transactionData = transactionDoc.data();
            
            // Update status to completed
            await updateDoc(transactionRef, {
              status: "completed",
              paymentCompletedAt: new Date().toISOString(),
              xenditPaymentId: paymentId,
              updatedAt: new Date().toISOString()
            });
            
            // Confirm card reservations
            const userId = transactionData.user_id || transactionData.userId;
            if (userId) {
              try {
                await confirmReservation(userId, transactionDoc.id);
                console.log("Card reservations confirmed for user:", userId);
              } catch (error) {
                console.error("Error confirming card reservations:", error);
              }
            }
            
            console.log("Transaction updated successfully:", transactionDoc.id);
            return NextResponse.json({ 
              success: true, 
              message: "Payment processed, transaction updated, and cards confirmed",
              transactionId: transactionDoc.id,
              planId: planId 
            });
          } else {
            console.error("No transaction found with plan ID:", planId);
            // Still return success to acknowledge webhook
            return NextResponse.json({ 
              success: true, 
              message: "Payment processed but transaction not found",
              planId: planId 
            });
          }
        } catch (error) {
          console.error("Error updating transaction:", error);
          // Still return success to acknowledge webhook
          return NextResponse.json({ 
            success: true, 
            message: "Payment processed but error updating transaction",
            error: error instanceof Error ? error.message : "Unknown error"
          });
        }

      case "recurring_plan.payment.failed":
      case "recurring.charge.failed":
        // Payment failed - you might want to notify the user
        console.log("Payment failed for plan:", payload.data?.plan_id);
        return NextResponse.json({ success: true, message: "Payment failure noted" });

      case "recurring_plan.deactivated":
        // Plan was cancelled
        console.log("Plan deactivated:", payload.data?.id);
        return NextResponse.json({ success: true, message: "Plan deactivation noted" });

      default:
        console.log("Unhandled webhook event:", payload.event);
        return NextResponse.json({ success: true, message: "Event received" });
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}