"use server";

import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  orderBy,
  limit,
  writeBatch,
} from "../firestore-monitored";
import { firebaseDb } from "../firebase";
import { customAlphabet } from "nanoid";

export interface PregeneratedCard {
  id: string;
  cardType: string; // eclipse, aurora, etc.
  transferCode: string;
  status: "available" | "reserved" | "assigned";
  reservedFor?: string; // user ID when reserved (purchased but not activated)
  reservedAt?: number;
  assignedTo?: string; // user ID when assigned (activated with transfer code)
  assignedAt?: number;
  createdAt: number;
  qrCodeUrl?: string;
}

// Generate a unique transfer code
function generateTransferCode(): string {
  // Generate a 8 character alphanumeric code
  const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);
  return nanoid();
}

// Test Firebase connection
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    console.log("[testFirebaseConnection] Testing Firebase connection...");
    const testCollection = collection(firebaseDb, "pregenerated-cards");
    const testDoc = doc(testCollection, "test-connection");
    
    // Try to write
    await setDoc(testDoc, {
      test: true,
      timestamp: Date.now()
    });
    
    // Try to read back
    const readBack = await getDoc(testDoc);
    console.log("[testFirebaseConnection] Read back:", readBack.exists(), readBack.data());
    
    // Clean up
    await deleteDoc(testDoc);
    
    console.log("[testFirebaseConnection] Connection test successful");
    return true;
  } catch (error) {
    console.error("[testFirebaseConnection] Connection test failed:", error);
    return false;
  }
}

// Get all pregenerated cards
export async function getPregeneratedCards(): Promise<PregeneratedCard[]> {
  try {
    if (!firebaseDb) {
      console.error("[getPregeneratedCards] Firebase DB not initialized");
      throw new Error("Firebase database not initialized");
    }
    
    const cardsRef = collection(firebaseDb, "pregenerated-cards");
    console.log("[getPregeneratedCards] Fetching from collection: pregenerated-cards");
    
    const snapshot = await getDocs(cardsRef);
    console.log(`[getPregeneratedCards] Snapshot size: ${snapshot.size}, empty: ${snapshot.empty}`);

    const cards = snapshot.docs.map((doc) => {
      const data = doc.data();
      console.log(`[getPregeneratedCards] Document ${doc.id}:`, data);
      return {
        id: doc.id,
        ...data,
      };
    }) as PregeneratedCard[];

    console.log(`[getPregeneratedCards] Fetched ${cards.length} pregenerated cards from Firestore`);
    console.log("[getPregeneratedCards] Sample card:", cards[0]);
    
    // Sort by createdAt in memory
    return cards.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch (error) {
    console.error("[getPregeneratedCards] Error fetching pregenerated cards:", error);
    if (error instanceof Error) {
      console.error("[getPregeneratedCards] Error details:", error.message, error.stack);
    }
    throw new Error("Failed to fetch pregenerated cards");
  }
}

// Get available pregenerated cards for a specific card type
export async function getAvailableCards(cardType: string): Promise<PregeneratedCard[]> {
  try {
    const cardsRef = collection(firebaseDb, "pregenerated-cards");
    const q = query(
      cardsRef,
      where("cardType", "==", cardType),
      where("status", "==", "available")
    );
    const snapshot = await getDocs(q);

    const cards = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PregeneratedCard[];

    // Sort by createdAt in memory to avoid composite index requirement
    return cards.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  } catch (error) {
    console.error("Error fetching available cards:", error);
    throw new Error("Failed to fetch available cards");
  }
}

// Generate bulk cards for a specific card type
export async function generateBulkCards(
  cardType: string,
  count: number
): Promise<void> {
  try {
    console.log(`[generateBulkCards] Starting generation of ${count} cards for ${cardType}`);
    
    // Validate inputs
    if (!cardType || count <= 0) {
      throw new Error("Invalid card type or count");
    }

    // Test with a single document first to verify Firebase connection
    if (!firebaseDb) {
      throw new Error("Firebase database not initialized");
    }
    
    const cardsCollection = collection(firebaseDb, "pregenerated-cards");
    console.log("[generateBulkCards] Collection reference created");
    
    // Generate all cards
    const promises = [];
    const generatedCards = [];
    
    for (let i = 0; i < count; i++) {
      const transferCode = generateTransferCode();
      const newCardRef = doc(cardsCollection);
      
      const cardData = {
        id: newCardRef.id,
        cardType: cardType,
        transferCode: transferCode,
        status: "available" as const,
        createdAt: Date.now(),
      };
      
      generatedCards.push(cardData);
      
      console.log(`[generateBulkCards] Creating card ${i + 1}/${count} with ID: ${newCardRef.id}`);
      promises.push(setDoc(newCardRef, cardData));
    }

    // Execute all writes
    const results = await Promise.all(promises);
    console.log(`[generateBulkCards] All write promises resolved. Results:`, results);
    
    // Verify cards were created
    const verificationQuery = query(
      cardsCollection,
      where("cardType", "==", cardType),
      where("status", "==", "available")
    );
    const verificationSnapshot = await getDocs(verificationQuery);
    console.log(`[generateBulkCards] Verification: Found ${verificationSnapshot.size} available ${cardType} cards in database`);
    
    return;
  } catch (error) {
    console.error("[generateBulkCards] Detailed error:", error);
    if (error instanceof Error) {
      console.error("[generateBulkCards] Error message:", error.message);
      console.error("[generateBulkCards] Error stack:", error.stack);
    }
    throw error;
  }
}

// Reserve a pregenerated card for an order
export async function reservePregeneratedCard(
  cardType: string,
  userId: string
): Promise<PregeneratedCard | null> {
  try {
    // Get the first available card of the specified type
    const availableCards = await getAvailableCards(cardType);

    if (availableCards.length === 0) {
      throw new Error(`No available ${cardType} cards in stock`);
    }

    const cardToReserve = availableCards[0];
    const cardRef = doc(firebaseDb, "pregenerated-cards", cardToReserve.id);

    // Update the card status to reserved
    await updateDoc(cardRef, {
      status: "reserved",
      reservedFor: userId,
      reservedAt: Date.now(),
    });

    return {
      ...cardToReserve,
      status: "reserved",
      reservedFor: userId,
      reservedAt: Date.now(),
    };
  } catch (error) {
    console.error("Error reserving pregenerated card:", error);
    throw error;
  }
}

// Assign a pregenerated card to a user
export async function assignPregeneratedCard(
  cardType: string,
  userId: string
): Promise<PregeneratedCard | null> {
  try {
    // Get the first available card of the specified type
    const availableCards = await getAvailableCards(cardType);

    if (availableCards.length === 0) {
      throw new Error(`No available ${cardType} cards in stock`);
    }

    const cardToAssign = availableCards[0];
    const cardRef = doc(firebaseDb, "pregenerated-cards", cardToAssign.id);

    // Update the card status
    await updateDoc(cardRef, {
      status: "assigned",
      assignedTo: userId,
      assignedAt: Date.now(),
    });

    return {
      ...cardToAssign,
      status: "assigned",
      assignedTo: userId,
      assignedAt: Date.now(),
    };
  } catch (error) {
    console.error("Error assigning pregenerated card:", error);
    throw error;
  }
}

// Delete a pregenerated card (only if available)
export async function deletePregeneratedCard(cardId: string): Promise<void> {
  try {
    const cardRef = doc(firebaseDb, "pregenerated-cards", cardId);
    await deleteDoc(cardRef);
  } catch (error) {
    console.error("Error deleting pregenerated card:", error);
    throw new Error("Failed to delete pregenerated card");
  }
}

// Export pregenerated cards as CSV
export async function exportPregeneratedCards(cardType?: string): Promise<string> {
  try {
    const cardsRef = collection(firebaseDb, "pregenerated-cards");
    let q;

    if (cardType) {
      q = query(cardsRef, where("cardType", "==", cardType));
    } else {
      q = cardsRef;
    }

    const snapshot = await getDocs(q);
    const cards = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PregeneratedCard[];

    // Sort by createdAt in memory
    cards.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    // Create CSV content
    const headers = ["Card ID", "Card Type", "Transfer Code", "Status", "Assigned To", "Created Date", "QR Code URL"];
    const rows = cards.map((card) => [
      card.id,
      card.cardType,
      card.transferCode,
      card.status,
      card.assignedTo || "",
      new Date(card.createdAt).toISOString(),
      `${process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_PROD || process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_DEV}/site/${card.id}`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    return csvContent;
  } catch (error) {
    console.error("Error exporting pregenerated cards:", error);
    throw new Error("Failed to export pregenerated cards");
  }
}

// Get card by transfer code
export async function getCardByTransferCode(transferCode: string): Promise<PregeneratedCard | null> {
  try {
    const cardsRef = collection(firebaseDb, "pregenerated-cards");
    const q = query(cardsRef, where("transferCode", "==", transferCode), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as PregeneratedCard;
  } catch (error) {
    console.error("Error fetching card by transfer code:", error);
    throw new Error("Failed to fetch card by transfer code");
  }
}