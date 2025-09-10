import { NextRequest, NextResponse } from "next/server";
import { 
  doc, 
  getDoc, 
  updateDoc, 
  serverTimestamp 
} from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";
import { authOptions } from "@/lib/firebase/auth";
import { restoreInventory } from "@/lib/firebase/actions/inventory.action";

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
    const currentUser = await authOptions();
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
    
    // Restore inventory for each item
    const restorePromises = [];
    if (transaction.items && Array.isArray(transaction.items)) {
      for (const item of transaction.items) {
        if (item.id) {
          restorePromises.push(restoreInventory(item.id));
        }
      }
    }
    
    const restoreResults = await Promise.all(restorePromises);
    const failedRestores = restoreResults.filter(r => !r.success);
    
    if (failedRestores.length > 0) {
      console.error("[Cancel Order] Failed to restore some inventory items:", failedRestores);
    }
    
    // Update transaction status
    await updateDoc(transactionRef, {
      status: "cancelled",
      cancelledAt: serverTimestamp(),
      cancelledBy: currentUser,
      cancelReason: "Admin cancelled",
    });
    
    return NextResponse.json({ 
      success: true,
      message: "Order cancelled successfully",
      inventoryRestored: restoreResults.filter(r => r.success).length
    });
    
  } catch (error) {
    console.error("[Cancel Order] Error:", error);
    return NextResponse.json(
      { error: "Failed to cancel order" },
      { status: 500 }
    );
  }
}