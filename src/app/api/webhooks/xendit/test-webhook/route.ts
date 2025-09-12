import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Log all headers
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });
    
    // Get the body
    const body = await req.text();
    
    // Log everything
    console.log("[Test Webhook] Full request details:", {
      headers,
      bodyLength: body.length,
      bodyPreview: body.substring(0, 200) + "...",
      timestamp: new Date().toISOString()
    });
    
    // Always return success to see what Xendit sends
    return NextResponse.json({ 
      success: true, 
      message: "Test webhook received",
      receivedToken: headers['x-callback-token']?.substring(0, 10) + "..." || "no token"
    });
  } catch (error) {
    console.error("Test webhook error:", error);
    return NextResponse.json({ error: "Test webhook error" }, { status: 500 });
  }
}