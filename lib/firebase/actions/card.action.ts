// "use server";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
  deleteField,
} from "firebase/firestore";
import { firebaseDb } from "../firebase";
import { toast } from "react-toastify";
import { Card, TransactionBoard, Users } from "@/types/types";
import { revalidatePath } from "../../revalidate";
import { authCurrentUser } from "../auth";
import { differenceInDays } from "date-fns";
import { getUserName } from "@/lib/utils";
import { CardRequest } from "@/src/app/(secured)/(admin)/admin/print-cards/_components/GenerateCardsDialog";
import { addCard, addSubscription } from "./user.action";

export const createCard = async ({
  user_id,
  data,
}: {
  user_id: string;
  data: Partial<Card>;
}) => {
  try {
    if (!user_id || !data) throw new Error("Parameters Missing");

    const user = await authCurrentUser();
    if (user !== user_id) throw new Error("Auth user ID doesn't match");

    const userCollection = collection(firebaseDb, "cards");
    const userRef = doc(userCollection);

    await setDoc(
      userRef,
      {
        ...data,
        owner: user_id,
        onboarding: true,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );

    toast.success("Card created successfully");
  } catch (error: any) {
    toast.error("Something went wrong");
    console.error("Error Creating card: ", error);
    throw error;
  }
};

interface DuplicateCardProp {
  card_id: string;
  owner_id: string;
}

export const duplicateCard = async ({
  card_id,
  owner_id,
}: DuplicateCardProp) => {
  if (!card_id) throw new Error("Parameters Missing");
  const user = await authCurrentUser();
  if (user !== owner_id) throw new Error("Auth user ID doesn't match");
  const docRef = doc(firebaseDb, "cards", card_id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Document data
      const data = docSnap.data() as Card;
      // console.log(data);
      createCard({ user_id: data.owner, data });
    } else {
      // Document does not exist
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCardsByOwner = async (owner_id: string) => {
  try {
    if (!owner_id) throw new Error("Parameters Missing");

    const user = await authCurrentUser();
    if (!user) throw new Error("No Auth User");

    const cardsCol = collection(firebaseDb, "cards");
    const queryFn = query(cardsCol, where("owner", "==", owner_id), limit(10));
    const cards = await getDocs(queryFn);

    if (cards.empty) {
      return [];
    }

    const result: Partial<Card>[] = [];

    for (const doc of cards.docs) {
      const cardData = doc.data();
      const expiryTimestamp = await getLatestSubscriptionExpiryDate(doc.id);

      if (expiryTimestamp) {
        const expiryDate = new Date(expiryTimestamp);
        const today = new Date();

        if (differenceInDays(today, expiryDate) > 30) {
          continue;
        }
      }

      result.push({
        ...cardData,
        id: doc.id,
        expiryDate: expiryTimestamp ?? undefined,
      });
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCardById = async (
  input: string,
  options?: { publicSite: boolean }
): Promise<Card | undefined> => {
  try {
    console.log("Card ID or Custom URL:", input);
    if (!input) throw new Error("Parameters Missing");

    let cardId = input;

    // Try to fetch the card directly by ID
    let cardRef = doc(firebaseDb, "cards", cardId);
    let docSnap = await getDoc(cardRef);

    // If card is not found, check if input is a custom URL inside the "cards" collection
    if (!docSnap.exists()) {
      console.log("Searching for card by custom URL...");

      const cardsCollection = collection(firebaseDb, "cards");

      const customUrlQuery = query(
        cardsCollection,
        where("customUrl", "==", input)
      );
      const querySnapshot = await getDocs(customUrlQuery);

      if (querySnapshot.empty) {
        throw new Error("Card not found");
      }

      // Found a matching card, extract its ID
      const cardDoc = querySnapshot.docs[0];
      cardId = cardDoc.id;
      cardRef = doc(firebaseDb, "cards", cardId);
      docSnap = await getDoc(cardRef);

      if (!docSnap.exists()) {
        throw new Error("Card doesn't exist");
      }
    }

    // Found the card!
    const card = { ...docSnap.data(), id: docSnap.id } as Card;

    // Check if the card is disabled
    if (card.disabled === true) {
      throw new Error("Card is disabled");
    }

    // Check if the card's subscription is valid
    const expiryDate = await getLatestSubscriptionExpiryDate(cardId);
    if (!expiryDate || expiryDate < Date.now()) {
      throw new Error("Card is expired");
    }

    // If accessing from a public site, return the card
    if (options?.publicSite) {
      return card;
    }

    // If not public, verify user authentication
    const userId = await authCurrentUser();
    if (userId !== card.owner) throw new Error("Auth user ID doesn't match");

    return card;
  } catch (error) {
    console.error("Error getting card:", error);
    throw error;
  }
};

export const deleteCardById = async ({ cardId }: { cardId: string }) => {
  try {
    if (!cardId) throw new Error("Parameters Missing");

    const userId = await authCurrentUser();

    const userRef = doc(firebaseDb, "cards", cardId);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      throw new Error("Document does not exist");
    }

    const card = { ...docSnap.data() } as Card;
    if (userId !== card.owner) {
      throw new Error("Auth user ID doesn't match");
    }
    revalidatePath(`/cards/${cardId}`, "page");
    revalidatePath(`/site/${cardId}`, "page");
    revalidatePath(`/cards/update/${cardId}`);
    await deleteDoc(userRef);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCardById = async ({
  cardId,
  data,
}: {
  cardId: string;
  data: Partial<Card>;
}) => {
  try {
    if (!cardId || !data) throw new Error("Parameters Missing");

    const { cardName } = data;

    const userId = await authCurrentUser();
    const cardRef = doc(firebaseDb, "cards", cardId);
    const docSnap = await getDoc(cardRef);
    if (!docSnap.exists()) {
      throw new Error("Document does not exist");
    }
    const card = { ...docSnap.data() } as Card;
    if (userId !== card.owner) {
      throw new Error("Auth user ID doesn't match");
    }

    // Filter out undefined fields
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    const userCollection = collection(firebaseDb, "cards");
    const userRef = doc(userCollection, cardId);

    if (cardName && cardName !== card.cardName) {
      const existingQuery = query(
        collection(firebaseDb, "cards"),
        where("owner", "==", userId),
        where("cardName", "==", cardName)
      );

      const existingCardSnap = await getDocs(existingQuery);
      const existing = existingCardSnap.docs.find((doc) => doc.id !== cardId);

      if (existing) {
        throw new Error("Card name already exists");
      }
    }

    await setDoc(
      userRef,
      { ...filteredData, onboarding: true, timestamp: serverTimestamp() },
      { merge: true }
    );

    revalidatePath(`/cards/${cardId}`, "page");
    revalidatePath(`/site/${cardId}`, "page");
    revalidatePath(`/cards/update/${cardId}`);

    toast.success("Card updated successfully");
  } catch (error: any) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const addCustomUrl = async (
  customUrl: string | undefined,
  cardId: string | undefined
) => {
  try {
    const rawCardId = (cardId ?? "").trim();
    if (!rawCardId) {
      throw new Error("Missing card ID");
    }

    const cardRef = doc(firebaseDb, "cards", rawCardId);
    const cardSnap = await getDoc(cardRef);
    if (!cardSnap.exists()) {
      throw new Error("Card not found");
    }

    const cardData = cardSnap.data();

    if (!customUrl) {
      await updateDoc(cardRef, {
        customUrl: deleteField(),
      });

      return { success: true, message: "Custom URL removed successfully" };
    }

    if (customUrl === rawCardId) {
      throw new Error("Custom URL cannot be the same as the card ID");
    }

    // Enforce 30-day limit (DISABLED FOR TESTING PURPOSES)
    // if (cardData?.customUrl && cardData.customUrlUpdatedAt) {
    //   const createdAt = cardData.customUrlUpdatedAt.toDate();
    //   const now = new Date();
    //   const daysElapsed = Math.floor(
    //     (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
    //   );
    //   const daysRemaining = 30 - daysElapsed;

    //   if (daysRemaining > 0) {
    //     throw new Error(
    //       `Custom URL can only be changed after ${daysRemaining} days`
    //     );
    //   }
    // }

    // Check if formatted URL is already used
    const existing = await getDocs(
      query(
        collection(firebaseDb, "cards"),
        where("customUrl", "==", customUrl)
      )
    );
    if (!existing.empty) {
      throw new Error("Custom URL already in use by another card");
    }

    await updateDoc(cardRef, {
      customUrl: customUrl,
      customUrlUpdatedAt: serverTimestamp(),
    });

    return { success: true, message: "Custom URL added successfully" };
  } catch (error) {
    console.error("Error adding custom URL:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getLatestSubscriptionExpiryDate = async (
  cardId: string
): Promise<number | null> => {
  const subscriptionCollection = collection(firebaseDb, "subscriptions");
  const q = query(subscriptionCollection, where("card_id", "==", cardId));

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const subscriptions = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      dateStarted: (data.dateStarted as Timestamp).toMillis(),
      subscriptionDays: data.subscriptionDays as number,
    };
  });

  subscriptions.sort((a, b) => b.dateStarted - a.dateStarted);
  const latestSubscription = subscriptions[0];

  const expiryDate =
    latestSubscription.dateStarted +
    latestSubscription.subscriptionDays * 24 * 60 * 60 * 1000;

  return expiryDate;
};

export const transferCardOwnership = async ({
  cardId,
  newOwnerEmail,
}: {
  cardId: string;
  newOwnerEmail: string;
}) => {
  try {
    if (!cardId || !newOwnerEmail) {
      toast.error("Parameters Missing");
      throw new Error("Parameters Missing");
    }

    const currentUserId = await authCurrentUser();

    const cardRef = doc(firebaseDb, "cards", cardId);
    const cardSnap = await getDoc(cardRef);
    if (!cardSnap.exists()) {
      throw new Error("Card not found");
    }

    const cardData = cardSnap.data() as Card;

    if (cardData.owner !== currentUserId) {
      throw new Error("Unauthorized: You don't own this card");
    }

    const userAccountRef = collection(firebaseDb, "user-account");
    const userQuery = query(
      userAccountRef,
      where("email", "==", newOwnerEmail)
    );
    const userSnap = await getDocs(userQuery);

    if (userSnap.empty) {
      throw new Error("User with this email not found");
    }

    const newOwnerId = userSnap.docs[0].id;

    const subscriptionRef = doc(
      firebaseDb,
      "subscriptions",
      cardData.subscription_id ?? ""
    );

    const subscriptionSnap = await getDoc(subscriptionRef);
    const subscriptionData = subscriptionSnap.data();

    const subscriptionUpdateData: { user_id: string; dateStarted?: any } = {
      user_id: newOwnerId,
    };

    if (!subscriptionData?.dateStarted) {
      subscriptionUpdateData.dateStarted = serverTimestamp();
    }

    const updateCardPromise = updateDoc(cardRef, {
      owner: newOwnerId,
      transferCode: crypto.randomUUID().split("-").slice(0, 2).join("-"),
    });

    const updateSubscriptionPromise = updateDoc(
      subscriptionRef,
      subscriptionUpdateData
    );

    await Promise.all([updateCardPromise, updateSubscriptionPromise]);

    return { success: true, message: "Ownership transferred successfully" };
  } catch (error) {
    console.error("Error transferring ownership:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const transferCardOwnershipUsingCode = async (
  transferCode: string,
  newOwnerId: string
): Promise<boolean> => {
  try {
    const cardCollection = collection(firebaseDb, "cards");

    const q = query(
      cardCollection,
      where("transferCode", "==", transferCode),
      limit(1)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.error("No card found with the given transfer code.");
      toast.error("Invalid transfer code.");
      return false;
    }

    const cardDoc = snapshot.docs[0];
    const cardData = cardDoc.data();

    if (cardData.owner === newOwnerId) {
      toast.info("You are already the owner of this card.");
      return false;
    }

    const cardRef = doc(firebaseDb, "cards", cardDoc.id);
    const subscriptionRef = doc(
      firebaseDb,
      "subscriptions",
      cardData.subscription_id
    );

    const subscriptionSnap = await getDoc(subscriptionRef);
    const subscriptionData = subscriptionSnap.data();

    const subscriptionUpdateData: { user_id: string; dateStarted?: any } = {
      user_id: newOwnerId,
    };

    if (!subscriptionData?.dateStarted) {
      subscriptionUpdateData.dateStarted = serverTimestamp();
    }

    const updateCardPromise = updateDoc(cardRef, {
      ...resetCardFields(),
      owner: newOwnerId,
      transferCode: crypto.randomUUID().split("-").slice(0, 2).join("-"),
    });

    const updateSubscriptionPromise = updateDoc(
      subscriptionRef,
      subscriptionUpdateData
    );

    const [updateCardResult, _] = await Promise.all([
      updateCardPromise,
      updateSubscriptionPromise,
    ]);

    console.log(
      "Card ownership transferred successfully to:",
      updateCardResult
    );
    toast.success("Card transferred successfully!");
    revalidatePath("/admin/print-cards");
    return true;
  } catch (error) {
    console.error("Error transferring card:", error);
    toast.error("Failed to transfer card.");
    return false;
  }
};

export const toggleCardDisabled = async (cardId: string) => {
  try {
    if (!cardId) throw new Error("Parameters Missing");

    const userId = await authCurrentUser();
    const cardRef = doc(firebaseDb, "cards", cardId);
    const docSnap = await getDoc(cardRef);

    if (!docSnap.exists()) {
      throw new Error("Card not found");
    }

    const card = docSnap.data() as Card;

    if (userId !== card.owner) {
      throw new Error("Auth user ID doesn't match");
    }

    const newDisabledState = !card.disabled;

    await updateDoc(cardRef, {
      disabled: newDisabledState,
    });

    return {
      success: true,
      message: `Card ${newDisabledState ? "disabled" : "enabled"} successfully`,
    };
  } catch (error) {
    console.error("Error toggling card disabled state:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getAllCards = async ({ role }: { role: string }) => {
  try {
    if (!role || role !== "admin") {
      throw new Error("This is an Admin Only Request");
    }

    const user = await authCurrentUser();
    if (!user) throw new Error("No Auth User");

    const cardCollection = collection(firebaseDb, "cards");
    const transacCollection = collection(firebaseDb, "transactions");
    const userCollection = collection(firebaseDb, "user-account");

    const q = query(cardCollection, orderBy("createdAt", "desc"));

    const [cardSnap, transacSnap, userSnap] = await Promise.all([
      getDocs(q),
      getDocs(transacCollection),
      getDocs(userCollection),
    ]);

    if (cardSnap.empty) {
      return [];
    }

    const transactions = transacSnap.docs.map((doc) => {
      const data = doc.data() as TransactionBoard;

      return {
        ...data,
        id: doc.id,
      };
    });

    const users = userSnap.docs.map((doc) => {
      const data = doc.data() as Users;

      return {
        ...data,
        id: doc.id,
      };
    });

    const cards = cardSnap.docs.map((cardDoc) => {
      const cardData = cardDoc.data() as Omit<Card, "id">;
      const cardId = cardDoc.id;

      const matchingTransaction = transactions.find((t) =>
        t.cards.some((c) => c.id === cardId)
      );

      const matchingCardOwner = users.find(
        (user) => user.id === cardData.owner
      );

      const cardOwnerName = getUserName(matchingCardOwner);

      return {
        id: cardId,
        ...cardData,
        transactionId: matchingTransaction?.id ?? null,
        cardOwner: cardOwnerName,
      };
    });

    return cards;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePrintCard = async ({
  role,
  cardId,
}: {
  role: string;
  cardId: string;
}) => {
  try {
    if (!role || role !== "admin") {
      throw new Error("This is an Admin Only Request");
    }
    if (!cardId) throw new Error("cardId is missing");

    const user = await authCurrentUser();
    if (!user) throw new Error("No Auth User");

    const cardRef = doc(firebaseDb, "cards", cardId);
    await deleteDoc(cardRef);

    // temporary solution for deleting cards with no matching subscription in firestore, until card transaction flow is fixed.
    const subscriptionsRef = collection(firebaseDb, "subscriptions");
    const q = query(subscriptionsRef, where("card_id", "==", cardId));
    const subscriptionSnap = await getDocs(q);

    const deletePromises = subscriptionSnap.docs.map((docSnap) =>
      deleteDoc(docSnap.ref)
    );
    await Promise.all(deletePromises);

    // const subscriptionRef = doc(firebaseDb, "subscriptions", cardId);
    // await Promise.all([deleteDoc(cardRef), deleteDoc(subscriptionRef)]);

    revalidatePath("/admin/print-cards");
    return { success: true, message: "Card deleted successfully!" };
  } catch (error) {
    console.error("Error deleting card", error);
    return { success: false, message: "Failed to delete card" };
  }
};

export const deleteMultipleCards = async ({
  role,
  cardIds,
}: {
  role: string;
  cardIds: string[];
}) => {
  try {
    if (!role || role !== "admin") {
      throw new Error("This is an Admin Only Request");
    }
    if (!cardIds || cardIds.length === 0)
      throw new Error("card Ids are missing");

    const user = await authCurrentUser();
    if (!user) throw new Error("No Auth User");

    const batch = writeBatch(firebaseDb);
    const subscriptionsRef = collection(firebaseDb, "subscriptions");

    for (const cardId of cardIds) {
      const cardRef = doc(firebaseDb, "cards", cardId);
      batch.delete(cardRef);

      const q = query(subscriptionsRef, where("card_id", "==", cardId));
      const subscriptionSnap = await getDocs(q);

      subscriptionSnap.forEach((docSnap) => {
        batch.delete(docSnap.ref);
      });
    }

    await batch.commit();

    revalidatePath("/admin/print-cards");
    return { success: true, message: "Cards deleted successfully!" };
  } catch (error) {
    console.error("Error deleting cards", error);
    return { success: false, message: "Failed to delete cards" };
  }
};

export const updateSingleCardPrintStatus = async ({
  role,
  cardId,
}: {
  role: string;
  cardId: string;
}) => {
  try {
    if (!role || role !== "admin") {
      throw new Error("This is an Admin Only Request");
    }

    if (!cardId) throw new Error("Parameters Missing");

    const cardRef = doc(firebaseDb, "cards", cardId);
    const cardSnap = await getDoc(cardRef);

    if (!cardSnap.exists()) {
      throw new Error("Card not found");
    }
    // TODO make sure that this card is belong to the right owner
    const card = cardSnap.data() as Card;

    await updateDoc(cardRef, {
      printStatus: !card.printStatus,
    });

    revalidatePath("/admin/print-cards");
    return { success: true, message: "Card status updated!" };
  } catch (error) {
    console.error("Error Updating Card Print Status", error);
    return { success: false, message: "Error updating card print status" };
  }
};

export const generateMultipleCards = async ({
  cardRequests,
  subscriptionDays,
  role,
}: {
  cardRequests: CardRequest[];
  subscriptionDays: number;
  role: string;
}) => {
  try {
    if (!role || role !== "admin") {
      throw new Error("This is an Admin Only Request");
    }

    const addCardPromises = cardRequests.flatMap((item) => {
      return Array.from({ length: item.quantity }, () =>
        addCard({ id: item.id, name: item.cardType })
      );
    });

    const cardResults = await Promise.all(addCardPromises);

    await addSubscription({
      cardIds: [...(cardResults || [])],
      subscriptionDays,
    });

    revalidatePath("/admin/print-cards");
    return { success: true, message: "Created multiple cards!" };
  } catch (error) {
    console.error("Error generating cards", error);
    return { success: false, message: "Failed to generate cards" };
  }
};

const resetCardFields = () => ({
  coverPhotoUrl: "",
  profilePictureUrl: "",
  position: "",
  company: "",
  companyBackground: "",
  serviceDescription: "",
  servicePhotos: [],
  firstName: "",
  lastName: "",
  email: "",
  number: "",
  facebookUrl: "",
  youtubeUrl: "",
  instagramUrl: "",
  twitterUrl: "",
  linkedinUrl: "",
  whatsappNumber: "",
  skypeInviteUrl: "",
  websiteUrl: "",
  //printStatus: false,
  portfolioStatus: false,
  userCode: "",
  user_link: "",
});
