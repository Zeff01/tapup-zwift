import { NextRequest, NextResponse } from "next/server";
import { 
  doc, 
  getDoc, 
  updateDoc, 
  serverTimestamp 
} from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";
import { authCurrentUser } from "@/lib/firebase/auth";

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
    const currentUser = await authCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user role
    const userRef = doc(firebaseDb, "user-account", currentUser);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists() || userDoc.data().role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { orderId } = await req.json();
    
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // Get the transaction
    const transactionRef = doc(firebaseDb, "transactions", orderId);
    const transactionDoc = await getDoc(transactionRef);
    
    if (!transactionDoc.exists()) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    
    const transaction = transactionDoc.data();
    
    // Check if order can be cancelled
    if (transaction.status === "completed" || transaction.status === "shipped") {
      return NextResponse.json(
        { error: "Cannot cancel completed or shipped orders" }, 
        { status: 400 }
      );
    }
    
    // Card bank handles card availability automatically
    
    // Update transaction status
    await updateDoc(transactionRef, {
      status: "cancelled",
      cancelledAt: serverTimestamp(),
      cancelledBy: currentUser,
      cancelReason: "Admin cancelled",
    });
    
    return NextResponse.json({ 
      success: true,
      message: "Order cancelled successfully"
    });
    
  } catch (error) {
    console.error("[Cancel Order] Error:", error);
    return NextResponse.json(
      { error: "Failed to cancel order" },
      { status: 500 }
    );
  }
}