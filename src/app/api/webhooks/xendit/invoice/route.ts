import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase/firebase";
import {
  addCardForUser,
  addSubscription,
} from "@/lib/firebase/actions/user.action";

const XENDIT_CALLBACK_TOKEN = process.env.XENDIT_CALLBACK_TOKEN;

export async function POST(req: NextRequest) {
  try {
    const callbackToken = req.headers.get("x-callback-token");
    if (!callbackToken || callbackToken !== XENDIT_CALLBACK_TOKEN) {
      console.warn("Unauthorized webhook attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { external_id, status } = body;

    if (!external_id || !status) {
      console.error("Missing required fields in webhook body");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the invoice in Firestore
    const invoicesCollection = collection(firebaseDb, "invoices");
    const q = query(
      invoicesCollection,
      where("external_id", "==", external_id)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(`Invoice ${external_id} not found in Firestore`);
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Update the first matching invoice
    const invoiceDoc = querySnapshot.docs[0].ref;
    await updateDoc(invoiceDoc, { status });

    console.log(`Invoice ${external_id} updated with status ${status}`);

    if (status === "PAID") {
      const invoiceData = querySnapshot.docs[0].data();
      const userId = invoiceData.userId;

      if (!userId) {
        console.error(`No userId found for invoice ${external_id}`);
        return NextResponse.json(
          { error: "User ID not found" },
          { status: 400 }
        );
      }

      if (external_id.startsWith("order-card")) {
        console.log(
          `Invoice ${external_id} paid, adding card for user ${userId}.`
        );
        const cardId = await addCardForUser(
          userId,
          invoiceData.chosenPhysicalCard
        );
        // await addSubscription({
        //   cardId,
        //   subscriptionDays: 30,
        // });
        console.log(`Card added for user ${userId} with card ID: ${cardId}`);
      } else if (external_id.startsWith("subscription")) {
        console.log(`Processing subscription invoice: ${external_id}`);

        const parts = external_id.split("-");

        if (parts.length < 4) {
          console.error(`Invalid external_id format: ${external_id}`);
          return NextResponse.json(
            { error: "Invalid external_id format" },
            { status: 400 }
          );
        }
        const cardId = parts[1];
        const planId = parts[2];

        console.log(`Extracted Card ID: ${cardId}, Plan ID: ${planId}`);

        if (!cardId || !planId) {
          console.error(
            `Missing cardId or planId in external_id: ${external_id}`
          );
          return NextResponse.json(
            { error: "Invalid external_id format" },
            { status: 400 }
          );
        }

        // Fetch subscription plan details from Firestore
        const planRef = doc(firebaseDb, "subscription-plans", planId);
        const planSnapshot = await getDoc(planRef);

        if (!planSnapshot.exists()) {
          console.error(`Subscription plan ${planId} not found`);
          return NextResponse.json(
            { error: "Subscription plan not found" },
            { status: 404 }
          );
        }

        const planData = planSnapshot.data();
        const subscriptionDays = planData?.durationDays ?? 30;

        // Add the subscription for the given card
        await addSubscription({ cardIds: [cardId], subscriptionDays });

        console.log(
          `Subscription activated for card ${cardId} with plan ${planId} for ${subscriptionDays} days.`
        );
      }
    } else {
      console.log(`Invoice ${external_id} not paid, no action taken.`);
    }

    return NextResponse.json(
      { message: "Invoice updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating invoice:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
