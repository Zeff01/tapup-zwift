import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";
import { confirmReservation } from "@/lib/firebase/actions/card-reservation.action";

export async function POST(req: NextRequest) {
  try {
    // Get the webhook token from header (Xendit uses x-callback-token)
    const token = req.headers.get('x-callback-token');
    const expectedToken = process.env.XENDIT_WEBHOOK_SECRET;
    
    // Simple token verification
    if (token !== expectedToken) {
      console.error("Webhook token mismatch");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Parse the webhook payload
    const payload = await req.json();
    console.log("Xendit webhook payload:", payload);
    
    // Handle recurring cycle success
    if (payload.event === "recurring.cycle.succeeded" && 
        payload.data?.type === "IMMEDIATE" && 
        payload.data?.status === "SUCCEEDED") {
      
      const planId = payload.data.plan_id;
      if (!planId) {
        return NextResponse.json({ error: "No plan ID" }, { status: 400 });
      }
      
      // Find and update transaction
      const transactionsRef = collection(firebaseDb, "transactions");
      const q = query(transactionsRef, where("xenditPlanId", "==", planId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const transactionDoc = querySnapshot.docs[0];
        const transactionData = transactionDoc.data();
        
        // Update to completed
        await updateDoc(doc(firebaseDb, "transactions", transactionDoc.id), {
          status: "completed",
          paymentCompletedAt: new Date().toISOString(),
          xenditPaymentId: payload.data.id,
          updatedAt: new Date().toISOString()
        });
        
        // Confirm reservations
        const userId = transactionData.user_id || transactionData.userId;
        if (userId) {
          await confirmReservation(userId, transactionDoc.id);
        }
        
        console.log("Transaction updated successfully:", transactionDoc.id);
      }
    }
    
    // Always return success to acknowledge webhook
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Webhook error:", error);
    // Still return success to prevent retries
    return NextResponse.json({ success: true });
  }
}