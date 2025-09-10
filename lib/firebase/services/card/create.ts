import { 
  doc, 
  setDoc, 
  collection, 
  serverTimestamp,
  writeBatch 
} from "@/lib/firebase/firestore-monitored";
import { firebaseDb } from "@/lib/firebase/firebase";
import { Card } from "@/types/types";
import { uploadImage } from "../../actions/user.action"; // Will be moved to user service later
import { nanoid } from "nanoid";

/**
 * Create a new digital business card
 */
export const createCard = async ({
  user_id,
  selectedTemplateId,
  profilePictureUrl,
  cardFormValues,
}: {
  user_id: string;
  selectedTemplateId: string;
  profilePictureUrl: string;
  cardFormValues: Partial<Card>;
}) => {
  try {
    const cardObj = { ...cardFormValues, owner: user_id } as Card;

    let profileUrlUploaded = "";

    if (profilePictureUrl) {
      profileUrlUploaded = await uploadImage(
        profilePictureUrl,
        `/cards/${user_id}/profile`
      );
      cardObj.profilePictureUrl = profileUrlUploaded;
    }

    cardObj.template = selectedTemplateId as Card["template"];
    cardObj.createdAt = serverTimestamp();
    cardObj.lastModified = Date.now();

    const newDoc = doc(collection(firebaseDb, "cards"));
    const response = await setDoc(newDoc, cardObj);

    console.log("Card created successfully!");
    return { success: true, cardId: newDoc.id };
  } catch (error) {
    console.error("Error creating card:", error);
    throw new Error("Failed to create card");
  }
};

/**
 * Duplicate an existing card
 */
export const duplicateCard = async ({
  cardId,
  userId,
}: {
  cardId: string;
  userId: string;
}) => {
  try {
    const { getCardById } = await import("./read");
    const originalCard = await getCardById(cardId, userId);
    
    if (!originalCard) {
      throw new Error("Original card not found");
    }

    // Remove fields that shouldn't be duplicated
    const { id, createdAt, lastModified, ...cardData } = originalCard;

    // Create new card with duplicated data
    const newCardData = {
      ...cardData,
      owner: userId,
      createdAt: serverTimestamp(),
      lastModified: Date.now(),
      // Add "Copy" to the card name
      firstName: `${cardData.firstName} (Copy)`,
    };

    const newDoc = doc(collection(firebaseDb, "cards"));
    await setDoc(newDoc, newCardData);

    console.log("Card duplicated successfully!");
    return { success: true, cardId: newDoc.id };
  } catch (error) {
    console.error("Error duplicating card:", error);
    throw new Error("Failed to duplicate card");
  }
};

/**
 * Generate multiple cards in bulk
 * Used for admin bulk card generation
 */
export const generateMultipleCards = async ({
  cards,
  userId,
}: {
  cards: Partial<Card>[];
  userId: string;
}) => {
  try {
    const batch = writeBatch(firebaseDb);
    const cardIds: string[] = [];

    for (const cardData of cards) {
      const newDoc = doc(collection(firebaseDb, "cards"));
      const cardObj = {
        ...cardData,
        owner: userId,
        createdAt: serverTimestamp(),
        lastModified: Date.now(),
        template: cardData.template || "Template1",
      };

      batch.set(newDoc, cardObj);
      cardIds.push(newDoc.id);
    }

    await batch.commit();

    console.log(`Successfully generated ${cards.length} cards`);
    return { success: true, cardIds };
  } catch (error) {
    console.error("Error generating multiple cards:", error);
    throw new Error("Failed to generate multiple cards");
  }
};