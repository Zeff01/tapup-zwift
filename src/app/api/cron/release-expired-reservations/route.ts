import { NextRequest, NextResponse } from "next/server";
import { releaseExpiredReservations } from "@/lib/firebase/actions/card-reservation.action";

export async function GET(req: NextRequest) {
  try {
    // This could be called by a cron job or Vercel cron
    // Check for a secret to prevent unauthorized access
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const releasedCount = await releaseExpiredReservations();
    
    return NextResponse.json({
      success: true,
      message: `Released ${releasedCount} expired reservations`,
      releasedCount
    });
  } catch (error) {
    console.error("Error in release expired reservations cron:", error);
    return NextResponse.json(
      { error: "Failed to release expired reservations" },
      { status: 500 }
    );
  }
}