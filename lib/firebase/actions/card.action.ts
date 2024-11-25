// "use server";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { firebaseDb } from "../firebase";
import { toast } from "react-toastify";
import { Card } from "@/types/types";
import { revalidatePath } from "../../revalidate";
import { authCurrentUser } from "../auth";

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

export const getCardsByOwner = async (owner_id: string) => {
  try {
    if (!owner_id) throw new Error("Parameters Missing");
    const user = await authCurrentUser();
    if (user !== owner_id) throw new Error("Auth user ID doesn't match");
    const cardsCol = collection(firebaseDb, "cards");
    const queryFn = query(cardsCol, where("owner", "==", owner_id), limit(10));
    const cards = await getDocs(queryFn);
    if (cards.empty) {
      return [];
    }
    const result: Partial<Card>[] = [];
    cards.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });
    if (result.length === 0) {
      return [];
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCardById = async (
  cardId: string,
  options?: {
    publicSite: boolean;
  }
): Promise<Card | undefined> => {
  try {
    if (!cardId) throw new Error("Parameters Missing");
    const userRef = doc(firebaseDb, "cards", cardId);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) throw new Error("Card doesn't exist");
    const card = { ...docSnap.data(), id: docSnap.id } as Card;

    if (options?.publicSite) {
      return card;
    }

    const userId = await authCurrentUser();

    if (userId !== card.owner) throw new Error("Auth user ID doesn't match");

    return card;
  } catch (error) {
    console.error("Error getting document: ", error);
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

    const userCollection = collection(firebaseDb, "cards");
    const userRef = doc(userCollection, cardId);

    await setDoc(
      userRef,
      { ...data, onboarding: true, timestamp: serverTimestamp() },
      { merge: true }
    );

    revalidatePath(`/cards/${cardId}`, "page");
    revalidatePath(`/site/${cardId}`, "page");
    revalidatePath(`/cards/update/${cardId}`);

    toast.success("Card updated successfully");
  } catch (error: any) {
    toast.error("Something went wrong");
    console.error("Error updating document: ", error);
    throw error;
  }
};
