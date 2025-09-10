import { NextRequest, NextResponse } from "next/server";
import { runDataFix } from "@/scripts/fix-data-client";

export async function POST(req: NextRequest) {
  try {
    // In production, you should add authentication here to ensure only admins can run this
    
    const result = await runDataFix();
    
    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (error) {
    console.error("Error running data fix:", error);
    return NextResponse.json(
      { error: "Failed to run data fix", details: error.message },
      { status: 500 }
    );
  }
}