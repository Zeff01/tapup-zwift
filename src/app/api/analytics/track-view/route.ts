import { NextRequest, NextResponse } from "next/server";
import { logCardView } from "@/lib/firebase/actions/analytics.action";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cardId, ownerId } = body;
    
    console.log("Track view request received:", { cardId, ownerId });

    if (!cardId || !ownerId) {
      console.error("Missing required fields:", { cardId, ownerId });
      return NextResponse.json(
        { error: "Missing required fields", received: { cardId, ownerId } },
        { status: 400 }
      );
    }

    // Get tracking data from request
    const referrer = request.headers.get("referer") || undefined;
    const userAgent = request.headers.get("user-agent") || undefined;
    
    // Simple unique visitor detection based on IP (you might want to enhance this)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(',')[0] : "unknown";
    
    // In a real implementation, you'd check if this IP has visited recently
    // For now, we'll consider all views as potentially unique
    const isUnique = true; // TODO: Implement proper unique visitor tracking

    console.log("Logging view with data:", {
      cardId,
      ownerId,
      referrer,
      userAgent,
      ip,
      isUnique
    });

    const result = await logCardView(cardId, ownerId, {
      referrer,
      userAgent,
      isUnique
    });
    
    console.log("View logged result:", result);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error tracking view:", error);
    return NextResponse.json(
      { error: "Failed to track view", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}