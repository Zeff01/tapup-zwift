import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";
import { authCurrentUser } from "@/lib/firebase/auth";
import { initializeInventory } from "@/lib/firebase/actions/inventory.action";

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

    const { cardTypes } = await req.json();
    
    if (!cardTypes || typeof cardTypes !== "object") {
      return NextResponse.json(
        { error: "Invalid card types. Expected object with card type keys and quantities." }, 
        { status: 400 }
      );
    }

    // Initialize inventory
    const success = await initializeInventory(cardTypes);
    
    if (success) {
      return NextResponse.json({ 
        success: true,
        message: "Inventory initialized successfully",
        cardTypes: Object.keys(cardTypes).length
      });
    } else {
      return NextResponse.json(
        { error: "Failed to initialize inventory" },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error("[Initialize Inventory] Error:", error);
    return NextResponse.json(
      { error: "Failed to initialize inventory" },
      { status: 500 }
    );
  }
}