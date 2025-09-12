import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const webhookSecret = process.env.XENDIT_WEBHOOK_SECRET;
  
  const config = {
    hasWebhookSecret: !!webhookSecret,
    secretLength: webhookSecret?.length || 0,
    secretPreview: webhookSecret 
      ? `${webhookSecret.substring(0, 10)}...${webhookSecret.substring(webhookSecret.length - 10)}` 
      : "NOT SET",
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    timestamp: new Date().toISOString()
  };
  
  console.log("[Check Config] Webhook configuration:", config);
  
  return NextResponse.json(config);
}