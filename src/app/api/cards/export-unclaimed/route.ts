import { NextRequest, NextResponse } from "next/server";
import { firebaseDb } from "@/lib/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { parse } from "json2csv";

export async function GET(req: NextRequest) {
    try {
        // Query Firestore for unclaimed cards (owner is empty)
        const cardsCollection = collection(firebaseDb, "cards");
        const q = query(cardsCollection, where("owner", "==", ""));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return NextResponse.json({ message: "No unclaimed cards found" }, { status: 404 });
        }

        // Extract necessary data
        const unclaimedCards = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            transferCode: doc.data().transferCode || "",
        }));

        // Convert to CSV
        const csv = parse(unclaimedCards, { fields: ["id", "transferCode"] });

        // Return as CSV file response
        return new NextResponse(csv, {
            status: 200,
            headers: {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": `attachment; filename="unclaimed_cards.csv"`,
            },
        });

    } catch (error) {
        console.error("Error exporting unclaimed cards:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}