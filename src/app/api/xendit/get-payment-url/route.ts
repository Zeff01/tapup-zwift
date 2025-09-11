import { NextRequest, NextResponse } from "next/server";
import { xenditClient } from "@/lib/axios";
import { doc, getDoc, updateDoc } from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";

export async function POST(req: NextRequest) {
  try {
    const { planId, orderId } = await req.json();
    
    if (!planId || !orderId) {
      return NextResponse.json(
        { error: "Plan ID and Order ID are required" },
        { status: 400 }
      );
    }
    
    // First, try to get the payment URL from the transaction record
    const transactionRef = doc(firebaseDb, "transactions", orderId);
    const transactionDoc = await getDoc(transactionRef);
    
    if (!transactionDoc.exists()) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }
    
    const transaction = transactionDoc.data();
    
    // If we have a stored payment URL, return it
    if (transaction.paymentUrl) {
      return NextResponse.json({ paymentUrl: transaction.paymentUrl });
    }
    
    try {
      // Get recurring plan details from Xendit
      const { data: recurringPlan } = await xenditClient.get(
        `/recurring/plans/${planId}`
      );
      
      // Check if there's an active payment action
      if (recurringPlan.actions && recurringPlan.actions.length > 0) {
        const paymentAction = recurringPlan.actions.find(
          (action: any) => action.action === "AUTH" && action.url
        );
        
        if (paymentAction) {
          // Store the payment URL for future use
          await updateDoc(transactionRef, {
            paymentUrl: paymentAction.url
          });
          
          return NextResponse.json({ paymentUrl: paymentAction.url });
        }
      }
      
      // If no payment URL in the plan, try to create a new invoice
      // This would be for cases where the plan needs reactivation
      const { data: newInvoice } = await xenditClient.post("/invoices", {
        external_id: `retry-${orderId}-${Date.now()}`,
        amount: transaction.amount,
        currency: "PHP",
        customer: {
          email: transaction.shippingInfo?.email,
          mobile_number: transaction.shippingInfo?.phone,
        },
        description: `Payment for Order #${orderId}`,
        success_redirect_url: process.env.NEXT_PUBLIC_SUCCESS_REDIRECT_URL,
        failure_redirect_url: process.env.NEXT_PUBLIC_FAILURE_REDIRECT_URL,
      });
      
      // Store the new payment URL
      await updateDoc(transactionRef, {
        paymentUrl: newInvoice.invoice_url,
        retryInvoiceId: newInvoice.id,
      });
      
      return NextResponse.json({ paymentUrl: newInvoice.invoice_url });
    } catch (xenditError: any) {
      console.error("Xendit API error:", xenditError.response?.data || xenditError);
      
      // If Xendit fails, create a manual invoice as fallback
      if (xenditError.response?.status === 404) {
        // Plan not found, create a new invoice
        const { data: newInvoice } = await xenditClient.post("/invoices", {
          external_id: `manual-${orderId}-${Date.now()}`,
          amount: transaction.amount,
          currency: "PHP",
          customer: {
            email: transaction.shippingInfo?.email,
            mobile_number: transaction.shippingInfo?.phone,
          },
          description: `Payment for Order #${orderId}`,
          success_redirect_url: process.env.NEXT_PUBLIC_SUCCESS_REDIRECT_URL,
          failure_redirect_url: process.env.NEXT_PUBLIC_FAILURE_REDIRECT_URL,
        });
        
        await updateDoc(transactionRef, {
          paymentUrl: newInvoice.invoice_url,
          manualInvoiceId: newInvoice.id,
        });
        
        return NextResponse.json({ paymentUrl: newInvoice.invoice_url });
      }
      
      throw xenditError;
    }
  } catch (error: any) {
    console.error("Error getting payment URL:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get payment URL" },
      { status: 500 }
    );
  }
}