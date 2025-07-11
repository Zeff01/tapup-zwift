import { NextRequest, NextResponse } from "next/server";
import {
  addSubscription,
  addCard,
  createTransaction,
} from "@/lib/firebase/actions/user.action";
import { clearCartByUserId } from "@/lib/firebase/actions/cart.action";
import { TransactionType } from "@/types/types";

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();

    if (
      event.event === "recurring.plan.activated" ||
      event.event === "recurring.cycle.succeeded"
    ) {
      const userId = event.data.metadata?.userId;
      const cardItems = event.data.metadata?.cardItems;
      const customerEmail = event.data.metadata?.customerEmail;
      const customerName = event.data.metadata?.customerName;
      const customerPhone = event.data.metadata?.customerPhone;
      const customerAddress = event.data.metadata?.customerAddress;
      const totalAmount = event.data.metadata?.totalAmount;
      const interval = event.data.schedule.interval;
      const intervalCount = event.data.schedule.interval_count;
      const customerId = event.data.customer_id;

      console.log({
        userId,
        cardItems,
        customerEmail,
        customerName,
        customerPhone,
        customerAddress,
        totalAmount,
        interval,
        intervalCount,
        customerId,
      });

      if (!cardItems || cardItems.length === 0 || !interval || !intervalCount) {
        return NextResponse.json(
          { error: "Missing required subscription data" },
          { status: 400 }
        );
      }

      const intervalMapping: Record<string, number> = {
        DAY: 1,
        MONTH: 30,
        YEAR: 365,
      };

      const subscriptionDays = intervalMapping[interval] * intervalCount;

      const addCardPromises = cardItems.map(
        (item: { id: string; name: string }) => {
          return addCard({ id: item.id, name: item.name });
        }
      );

      const cardIds: string[] = await Promise.all(addCardPromises);

      const transactionData: TransactionType = {
        amount: totalAmount,
        cards: cardIds.map((cardIds, i) => ({
          id: cardIds,
          name: cardItems[i].name,
        })),
        receiver: {
          customerId: customerId,
          customerName: customerName,
          customerEmail: customerEmail,
          customerPhone: customerPhone,
          customerAddress: customerAddress,
        },
        status: "pending",
      };

      await createTransaction(transactionData);

      await addSubscription({
        cardIds: cardIds,
        subscriptionDays,
        ...(userId && { userId: userId }),
      });

      if (userId) {
        await clearCartByUserId(userId);
      }

      return NextResponse.json({ success: true }, { status: 200 });

      // const cardIds = event.data.metadata?.cardIds;
      // const userId = event.data.metadata?.userId;
      // const cardId = event.data.metadata?.cardId;
      // const interval = event.data.schedule.interval;
      // const intervalCount = event.data.schedule.interval_count;

      // console.log({
      //   cardIds,
      //   cardId,
      //   interval,
      //   intervalCount,
      //   userId,
      // });

      // if (
      //   ((!cardIds || cardIds.length === 0) &&
      //     (!cardId || cardId.length === 0)) ||
      //   !interval ||
      //   !intervalCount
      // ) {
      //   return NextResponse.json(
      //     { error: "Missing required subscription data" },
      //     { status: 400 }
      //   );
      // }

      // const intervalMapping: Record<string, number> = {
      //   DAY: 1,
      //   MONTH: 30,
      //   YEAR: 365,
      // };

      // const subscriptionDays = intervalMapping[interval] * intervalCount;

      // if (cardIds) {
      //   await addSubscription({
      //     cardIds: [...(cardIds || []), ...(cardId || [])],
      //     subscriptionDays,
      //     ...(userId && { userId: userId }),
      //   });

      //   return NextResponse.json({ success: true }, { status: 200 });
      // }
    }

    return NextResponse.json(
      { message: "Unhandled event type" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
