import { NextRequest, NextResponse } from "next/server";
import { logCardView } from "@/lib/firebase/actions/analytics.action";

export async function POST(request: NextRequest) {
  try {
    const { cardId, ownerId } = await request.json();

    if (!cardId || !ownerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    await logCardView(cardId, ownerId, {
      referrer,
      userAgent,
      isUnique
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking view:", error);
    return NextResponse.json(
      { error: "Failed to track view" },
      { status: 500 }
    );
  }
}