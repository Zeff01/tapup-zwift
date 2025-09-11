"use server";

import {
  collection,
  doc,
  query,
  where,
  runTransaction,
  getDoc,
  getDocs,
  limit,
  orderBy,
  writeBatch
} from "../firestore-monitored";
import { firebaseDb } from "../firebase";
import { PregeneratedCard } from "./card-bank.action";

interface ReservationResult {
  success: boolean;
  cards?: PregeneratedCard[];
  error?: string;
}

/**
 * Reserve multiple cards atomically using a transaction
 * This ensures that multiple users can't reserve the same cards simultaneously
 */
export async function reserveCardsAtomically(
  cardTypes: { cardType: string; quantity: number }[],
  userId: string
): Promise<ReservationResult> {
  try {
    const reservedCards: PregeneratedCard[] = [];
    
    // Use a transaction to ensure atomicity
    const result = await runTransaction(firebaseDb, async (transaction) => {
      // First, check availability for all requested cards
      for (const request of cardTypes) {
        const { cardType, quantity } = request;
        
        // Query for available cards
        const cardsRef = collection(firebaseDb, "pregenerated-cards");
        const q = query(
          cardsRef,
          where("cardType", "==", cardType),
          where("status", "==", "available"),
          orderBy("createdAt", "asc"),
          limit(quantity)
        );
        
        const snapshot = await getDocs(q);
        
        // Check if we have enough cards
        if (snapshot.size < quantity) {
          throw new Error(`Not enough ${cardType} cards available. Requested: ${quantity}, Available: ${snapshot.size}`);
        }
        
        // Reserve each card within the transaction
        snapshot.forEach((cardDoc) => {
          const cardRef = doc(firebaseDb, "pregenerated-cards", cardDoc.id);
          
          // Double-check the card is still available (within transaction)
          const cardData = cardDoc.data() as PregeneratedCard;
          if (cardData.status !== "available") {
            throw new Error(`Card ${cardDoc.id} is no longer available`);
          }
          
          // Reserve the card
          transaction.update(cardRef, {
            status: "reserved",
            reservedFor: userId,
            reservedAt: Date.now(),
            reservationExpiry: Date.now() + (30 * 60 * 1000) // 30 minutes
          });
          
          reservedCards.push({
            ...cardData,
            id: cardDoc.id,
            status: "reserved",
            reservedFor: userId,
            reservedAt: Date.now()
          });
        });
      }
      
      return { success: true, cards: reservedCards };
    });
    
    return result;
  } catch (error: any) {
    console.error("Error reserving cards:", error);
    return {
      success: false,
      error: error.message || "Failed to reserve cards"
    };
  }
}

/**
 * Release expired reservations
 * This should be called periodically to free up cards that were reserved but never purchased
 */
export async function releaseExpiredReservations(): Promise<number> {
  try {
    const batch = writeBatch(firebaseDb);
    let count = 0;
    
    // Find all expired reservations
    const cardsRef = collection(firebaseDb, "pregenerated-cards");
    const q = query(
      cardsRef,
      where("status", "==", "reserved"),
      where("reservationExpiry", "<", Date.now())
    );
    
    const snapshot = await getDocs(q);
    
    snapshot.forEach((doc) => {
      batch.update(doc.ref, {
        status: "available",
        reservedFor: null,
        reservedAt: null,
        reservationExpiry: null
      });
      count++;
    });
    
    if (count > 0) {
      await batch.commit();
      console.log(`Released ${count} expired reservations`);
    }
    
    return count;
  } catch (error) {
    console.error("Error releasing expired reservations:", error);
    return 0;
  }
}

/**
 * Confirm a reservation after successful payment
 * Removes the expiry and marks as purchased
 */
export async function confirmReservation(userId: string, transactionId: string): Promise<void> {
  try {
    const batch = writeBatch(firebaseDb);
    
    // Find all cards reserved for this user
    const cardsRef = collection(firebaseDb, "pregenerated-cards");
    const q = query(
      cardsRef,
      where("status", "==", "reserved"),
      where("reservedFor", "==", userId)
    );
    
    const snapshot = await getDocs(q);
    
    snapshot.forEach((doc) => {
      batch.update(doc.ref, {
        purchaseCompleted: true,
        purchaseCompletedAt: Date.now(),
        transactionId: transactionId,
        reservationExpiry: null // Remove expiry since purchase is complete
      });
    });
    
    await batch.commit();
    console.log(`Confirmed reservation for user ${userId}, transaction ${transactionId}`);
  } catch (error) {
    console.error("Error confirming reservation:", error);
    throw error;
  }
}

/**
 * Cancel a reservation and make cards available again
 */
export async function cancelReservation(userId: string): Promise<void> {
  try {
    const batch = writeBatch(firebaseDb);
    
    // Find all cards reserved for this user
    const cardsRef = collection(firebaseDb, "pregenerated-cards");
    const q = query(
      cardsRef,
      where("status", "==", "reserved"),
      where("reservedFor", "==", userId)
    );
    
    const snapshot = await getDocs(q);
    
    snapshot.forEach((doc) => {
      batch.update(doc.ref, {
        status: "available",
        reservedFor: null,
        reservedAt: null,
        reservationExpiry: null
      });
    });
    
    await batch.commit();
    console.log(`Cancelled reservation for user ${userId}`);
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    throw error;
  }
}