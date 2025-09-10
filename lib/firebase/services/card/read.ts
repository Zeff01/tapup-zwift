import { 
  doc, 
  getDoc, 
  getDocs,
  collection, 
  query,
  where,
  orderBy,
  documentId
} from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";
import { Card } from "@/types/types";

/**
 * Get all cards owned by a specific user
 */
export const getCardsByOwner = async (owner_id: string) => {
  try {
    // Get subscriptions for the user
    const subscriptionsRef = collection(firebaseDb, "subscriptions");
    const subscriptionsQuery = query(
      subscriptionsRef,
      where("userId", "==", owner_id)
    );
    const subscriptionSnapshot = await getDocs(subscriptionsQuery);

    const subscriptions = subscriptionSnapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      acc[data.cardId] = data.expiryDate;
      return acc;
    }, {} as Record<string, any>);

    // Get cards owned by the user
    const cardsRef = collection(firebaseDb, "cards");
    const q = query(
      cardsRef,
      where("owner", "==", owner_id),
      orderBy("lastModified", "desc")
    );
    const cardsSnapshot = await getDocs(q);

    if (cardsSnapshot.empty) {
      console.log("No cards found for this owner");
      return [];
    }

    const cards = cardsSnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          expiryDate: subscriptions[doc.id],
        } as Card;
      })
      .filter((card) => card.owner === owner_id);

    console.log("Cards retrieved:", cards.length);
    return cards;
  } catch (error) {
    console.error("Error retrieving cards:", error);
    throw error;
  }
};

/**
 * Get a single card by ID
 * Validates ownership if userId is provided
 */
export const getCardById = async (
  cardId: string,
  userId?: string
): Promise<Card | null> => {
  try {
    const cardRef = doc(firebaseDb, "cards", cardId);
    const cardSnapshot = await getDoc(cardRef);

    if (!cardSnapshot.exists()) {
      console.log("Card not found");
      return null;
    }

    const cardData = {
      id: cardSnapshot.id,
      ...cardSnapshot.data(),
    } as Card;

    // If userId is provided, validate ownership
    if (userId && cardData.owner !== userId) {
      console.error("Unauthorized: User does not own this card");
      return null;
    }

    // Get subscription data if exists
    const subscriptionsRef = collection(firebaseDb, "subscriptions");
    const subscriptionQuery = query(
      subscriptionsRef,
      where("cardId", "==", cardId)
    );
    const subscriptionSnapshot = await getDocs(subscriptionQuery);

    if (!subscriptionSnapshot.empty) {
      const subscriptionData = subscriptionSnapshot.docs[0].data();
      cardData.expiryDate = subscriptionData.expiryDate;
      // subscriptionPlan is not a property of Card type
      // cardData.subscriptionPlan = subscriptionData.subscriptionPlan;
    }

    return cardData;
  } catch (error) {
    console.error("Error retrieving card:", error);
    throw error;
  }
};

/**
 * Get all cards in the system (admin only)
 */
export const getAllCards = async ({ role }: { role: string }) => {
  try {
    if (role !== "Admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    const cardsRef = collection(firebaseDb, "cards");
    const cardsSnapshot = await getDocs(cardsRef);

    const cards = cardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Card[];

    console.log(`Retrieved ${cards.length} cards`);
    return cards;
  } catch (error) {
    console.error("Error retrieving all cards:", error);
    throw error;
  }
};

/**
 * Get cards by custom URL
 */
export const getCardByCustomUrl = async (customUrl: string): Promise<Card | null> => {
  try {
    const cardsRef = collection(firebaseDb, "cards");
    const q = query(cardsRef, where("customUrl", "==", customUrl));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const cardDoc = snapshot.docs[0];
    return {
      id: cardDoc.id,
      ...cardDoc.data(),
    } as Card;
  } catch (error) {
    console.error("Error getting card by custom URL:", error);
    throw error;
  }
};

/**
 * Check if a custom URL is available
 */
export const isCustomUrlAvailable = async (customUrl: string): Promise<boolean> => {
  const existingCard = await getCardByCustomUrl(customUrl);
  return !existingCard;
};