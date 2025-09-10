"use server";

import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
  runTransaction,
  collection,
} from "../firestore-monitored";
import { firebaseDb } from "../firebase";

export interface CardInventory {
  available: number;
  pending: number;
  assigned: number;
  total: number;
  lastUpdated: any;
}

export interface InventoryData {
  [cardType: string]: CardInventory;
}

// Initialize inventory for all card types
export async function initializeInventory(
  cardTypes: { [key: string]: number }
): Promise<boolean> {
  try {
    const inventoryRef = doc(firebaseDb, "settings", "inventory");
    
    const inventoryData: InventoryData = {};
    
    for (const [cardType, total] of Object.entries(cardTypes)) {
      inventoryData[cardType] = {
        available: total,
        pending: 0,
        assigned: 0,
        total: total,
        lastUpdated: serverTimestamp(),
      };
    }
    
    await setDoc(inventoryRef, inventoryData, { merge: true });
    console.log("[initializeInventory] Inventory initialized:", inventoryData);
    return true;
  } catch (error) {
    console.error("[initializeInventory] Error:", error);
    return false;
  }
}

// Get current inventory
export async function getInventory(): Promise<InventoryData | null> {
  try {
    const inventoryRef = doc(firebaseDb, "settings", "inventory");
    const inventoryDoc = await getDoc(inventoryRef);
    
    if (!inventoryDoc.exists()) {
      console.log("[getInventory] No inventory document found");
      return null;
    }
    
    return inventoryDoc.data() as InventoryData;
  } catch (error) {
    console.error("[getInventory] Error:", error);
    return null;
  }
}

// Decrease available inventory when order is placed
export async function decrementInventory(
  cardType: string
): Promise<{ success: boolean; message?: string }> {
  try {
    return await runTransaction(firebaseDb, async (transaction) => {
      const inventoryRef = doc(firebaseDb, "settings", "inventory");
      const inventoryDoc = await transaction.get(inventoryRef);
      
      if (!inventoryDoc.exists()) {
        throw new Error("Inventory not found");
      }
      
      const inventory = inventoryDoc.data() as InventoryData;
      const cardInventory = inventory[cardType];
      
      if (!cardInventory) {
        throw new Error(`Card type ${cardType} not found in inventory`);
      }
      
      if (cardInventory.available <= 0) {
        throw new Error(`No ${cardType} cards available`);
      }
      
      // Update inventory
      transaction.update(inventoryRef, {
        [`${cardType}.available`]: cardInventory.available - 1,
        [`${cardType}.pending`]: cardInventory.pending + 1,
        [`${cardType}.lastUpdated`]: serverTimestamp(),
      });
      
      console.log(`[decrementInventory] ${cardType}: available ${cardInventory.available} -> ${cardInventory.available - 1}`);
      return { success: true };
    });
  } catch (error: any) {
    console.error("[decrementInventory] Error:", error);
    return { success: false, message: error.message };
  }
}

// Restore inventory if order is cancelled
export async function restoreInventory(
  cardType: string
): Promise<{ success: boolean; message?: string }> {
  try {
    return await runTransaction(firebaseDb, async (transaction) => {
      const inventoryRef = doc(firebaseDb, "settings", "inventory");
      const inventoryDoc = await transaction.get(inventoryRef);
      
      if (!inventoryDoc.exists()) {
        throw new Error("Inventory not found");
      }
      
      const inventory = inventoryDoc.data() as InventoryData;
      const cardInventory = inventory[cardType];
      
      if (!cardInventory) {
        throw new Error(`Card type ${cardType} not found in inventory`);
      }
      
      if (cardInventory.pending <= 0) {
        throw new Error(`No pending ${cardType} cards to restore`);
      }
      
      // Update inventory
      transaction.update(inventoryRef, {
        [`${cardType}.available`]: cardInventory.available + 1,
        [`${cardType}.pending`]: cardInventory.pending - 1,
        [`${cardType}.lastUpdated`]: serverTimestamp(),
      });
      
      console.log(`[restoreInventory] ${cardType}: restored 1 to available`);
      return { success: true };
    });
  } catch (error: any) {
    console.error("[restoreInventory] Error:", error);
    return { success: false, message: error.message };
  }
}

// Mark card as assigned when activated
export async function markCardAsAssigned(
  cardType: string
): Promise<{ success: boolean; message?: string }> {
  try {
    return await runTransaction(firebaseDb, async (transaction) => {
      const inventoryRef = doc(firebaseDb, "settings", "inventory");
      const inventoryDoc = await transaction.get(inventoryRef);
      
      if (!inventoryDoc.exists()) {
        throw new Error("Inventory not found");
      }
      
      const inventory = inventoryDoc.data() as InventoryData;
      const cardInventory = inventory[cardType];
      
      if (!cardInventory) {
        throw new Error(`Card type ${cardType} not found in inventory`);
      }
      
      if (cardInventory.pending <= 0) {
        throw new Error(`No pending ${cardType} cards to assign`);
      }
      
      // Update inventory
      transaction.update(inventoryRef, {
        [`${cardType}.pending`]: cardInventory.pending - 1,
        [`${cardType}.assigned`]: cardInventory.assigned + 1,
        [`${cardType}.lastUpdated`]: serverTimestamp(),
      });
      
      console.log(`[markCardAsAssigned] ${cardType}: pending -> assigned`);
      return { success: true };
    });
  } catch (error: any) {
    console.error("[markCardAsAssigned] Error:", error);
    return { success: false, message: error.message };
  }
}

// Update inventory counts (admin only)
export async function updateInventoryCount(
  cardType: string,
  newTotal: number
): Promise<{ success: boolean; message?: string }> {
  try {
    return await runTransaction(firebaseDb, async (transaction) => {
      const inventoryRef = doc(firebaseDb, "settings", "inventory");
      const inventoryDoc = await transaction.get(inventoryRef);
      
      if (!inventoryDoc.exists()) {
        throw new Error("Inventory not found");
      }
      
      const inventory = inventoryDoc.data() as InventoryData;
      const cardInventory = inventory[cardType];
      
      if (!cardInventory) {
        throw new Error(`Card type ${cardType} not found in inventory`);
      }
      
      const currentUsed = cardInventory.pending + cardInventory.assigned;
      const newAvailable = newTotal - currentUsed;
      
      if (newAvailable < 0) {
        throw new Error(`Cannot set total to ${newTotal}. ${currentUsed} cards are already allocated.`);
      }
      
      // Update inventory
      transaction.update(inventoryRef, {
        [`${cardType}.available`]: newAvailable,
        [`${cardType}.total`]: newTotal,
        [`${cardType}.lastUpdated`]: serverTimestamp(),
      });
      
      console.log(`[updateInventoryCount] ${cardType}: total updated to ${newTotal}`);
      return { success: true };
    });
  } catch (error: any) {
    console.error("[updateInventoryCount] Error:", error);
    return { success: false, message: error.message };
  }
}

// Check if card type is available
export async function isCardTypeAvailable(cardType: string): Promise<boolean> {
  try {
    const inventory = await getInventory();
    if (!inventory || !inventory[cardType]) {
      return false;
    }
    
    return inventory[cardType].available > 0;
  } catch (error) {
    console.error("[isCardTypeAvailable] Error:", error);
    return false;
  }
}

// Get inventory for specific card type
export async function getCardTypeInventory(cardType: string): Promise<CardInventory | null> {
  try {
    const inventory = await getInventory();
    if (!inventory || !inventory[cardType]) {
      return null;
    }
    
    return inventory[cardType];
  } catch (error) {
    console.error("[getCardTypeInventory] Error:", error);
    return null;
  }
}