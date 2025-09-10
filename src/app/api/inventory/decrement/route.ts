import { NextRequest, NextResponse } from "next/server";
import { decrementInventory } from "@/lib/firebase/actions/inventory.action";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cardType } = body;

    if (!cardType) {
      return NextResponse.json(
        { success: false, message: "Card type is required" },
        { status: 400 }
      );
    }

    const result = await decrementInventory(cardType);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("[API] Error decrementing inventory:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to decrement inventory" },
      { status: 500 }
    );
  }
}