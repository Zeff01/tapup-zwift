import { NextRequest, NextResponse } from "next/server";
import { addSubscription } from "@/lib/firebase/actions/user.action";

export async function POST(req: NextRequest) {
    try {
        const event = await req.json();
        console.log("Received Xendit Webhook:", event);

        if (event.event === "recurring.plan.activated" || event.event === "recurring.cycle.succeeded") {
            const cardId = event.data.metadata?.cardId;
            const interval = event.data.schedule.interval;
            const intervalCount = event.data.schedule.interval_count;

            if (!cardId || !interval || !intervalCount) {
                return NextResponse.json({ error: "Missing required subscription data" }, { status: 400 });
            }

            const intervalMapping: Record<string, number> = {
                DAY: 1,
                MONTH: 30,
                YEAR: 365,
            };

            const subscriptionDays = intervalMapping[interval] * intervalCount;

            await addSubscription({ cardId, subscriptionDays });

            return NextResponse.json({ success: true }, { status: 200 });
        }

        return NextResponse.json({ message: "Unhandled event type" }, { status: 200 });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}