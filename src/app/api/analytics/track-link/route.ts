import { NextRequest, NextResponse } from "next/server";
import { logLinkClick } from "@/lib/firebase/actions/analytics.action";

export async function POST(request: NextRequest) {
  try {
    const { cardId, ownerId, linkType, destination } = await request.json();

    if (!cardId || !ownerId || !linkType || !destination) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await logLinkClick(cardId, ownerId, {
      linkType,
      destination
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking link click:", error);
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    );
  }
}