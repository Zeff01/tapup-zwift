import { NextRequest, NextResponse } from "next/server";
import { logVcfDownload } from "@/lib/firebase/actions/analytics.action";

export async function POST(request: NextRequest) {
  try {
    const { cardId, ownerId, platform } = await request.json();

    if (!cardId || !ownerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await logVcfDownload(cardId, ownerId, {
      platform: platform || 'Unknown'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking VCF download:", error);
    return NextResponse.json(
      { error: "Failed to track download" },
      { status: 500 }
    );
  }
}