/**
 * Shared subscription operations to avoid circular dependencies
 */

import { 
  doc, 
  setDoc, 
  collection, 
  serverTimestamp, 
  updateDoc,
  arrayUnion,
  getDoc
} from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";
import { add } from "date-fns";
import { Card } from "@/types/types";

/**
 * Add subscription for cards
 * This is a simplified version that avoids circular dependencies
 */
export const addSubscription = async ({
  cardIds,
  subscriptionDays,
  userId,
}: {
  cardIds: string[];
  subscriptionDays: number;
  userId?: string;
}): Promise<string[]> => {
  try {
    const subscriptionIds: string[] = [];
    const currentDate = new Date();
    const expiryDate = add(currentDate, { days: subscriptionDays });

    for (const cardId of cardIds) {
      if (!cardId) continue;

      // Check if card exists before creating subscription
      const cardRef = doc(firebaseDb, "cards", cardId);
      const cardDoc = await getDoc(cardRef);
      
      if (!cardDoc.exists()) {
        // Skip pregenerated cards that haven't been activated yet
        continue;
      }

      // Create subscription
      const subscriptionRef = doc(collection(firebaseDb, "subscriptions"));
      const subscriptionData = {
        card_id: cardId,  // Use card_id to match existing queries
        cardId: cardId,   // Keep both for compatibility
        userId: userId || cardDoc.data().owner,
        user_id: userId || cardDoc.data().owner, // For compatibility
        createdAt: serverTimestamp(),
        dateStarted: serverTimestamp(), // Required for expiry calculation
        dateAvailed: serverTimestamp(), // For compatibility
        expiryDate: expiryDate,
        subscriptionDays,
        status: "active",
      };

      await setDoc(subscriptionRef, subscriptionData);
      subscriptionIds.push(subscriptionRef.id);

      // Update card with subscription info
      await updateDoc(cardRef, {
        expiryDate: expiryDate,
        subscriptionId: subscriptionRef.id,
      });

      // Update user's subscriptions array if userId is provided
      if (userId) {
        const userRef = doc(firebaseDb, "user-account", userId);
        await updateDoc(userRef, {
          subscriptions: arrayUnion(subscriptionRef.id),
        });
      }
    }

    return subscriptionIds;
  } catch (error) {
    console.error("Error adding subscription:", error);
    throw error;
  }
};