/**
 * Shared user operations to avoid circular dependencies
 * These functions are used by both card and user services
 */

import { doc, getDoc, updateDoc, arrayUnion } from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";
import { Users } from "@/types/types";

/**
 * Get user by ID - lightweight version for card operations
 */
export const getUserById = async (id: string): Promise<Users | null> => {
  try {
    const userRef = doc(firebaseDb, "user-account", id);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return {
        ...userDoc.data(),
        uid: userDoc.id,
      } as Users;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving user:", error);
    return null;
  }
};

/**
 * Add a card ID to user's cards array
 */
export const addCardToUser = async (userId: string, cardId: string): Promise<void> => {
  try {
    const userRef = doc(firebaseDb, "user-account", userId);
    await updateDoc(userRef, {
      cards: arrayUnion(cardId),
    });
  } catch (error) {
    console.error("Error adding card to user:", error);
    throw error;
  }
};

/**
 * Add subscription to user
 * This is a minimal version that doesn't create phantom cards
 */
export const addSubscriptionToUser = async ({
  uid,
  subscriptionId,
}: {
  uid: string;
  subscriptionId: string;
}): Promise<void> => {
  try {
    const userRef = doc(firebaseDb, "user-account", uid);
    await updateDoc(userRef, {
      subscriptions: arrayUnion(subscriptionId),
    });
  } catch (error) {
    console.error("Error adding subscription to user:", error);
    throw error;
  }
};