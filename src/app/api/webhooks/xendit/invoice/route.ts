import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Webhook temporarily disabled - enable if needed for payment processing
  return NextResponse.json({ error: "Webhook disabled" }, { status: 503 });
}