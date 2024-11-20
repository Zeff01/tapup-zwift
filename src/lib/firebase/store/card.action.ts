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
import { firebaseDb } from "../config/firebase";
import { Users } from "./users.type";
import { toast } from "react-toastify";
import { Card } from "@/types/types";
import { revalidatePath } from "./user.revalidate";

export const createCard = async ({
  user_id,
  user,
}: {
  user_id: string;
  user: Partial<Users>;
}) => {
  try {
    const userCollection = collection(firebaseDb, "cards");
    console.log({ user_id, user });
    const userRef = doc(userCollection);

    await setDoc(
      userRef,
      {
        ...user,
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
    if (!owner_id) return;
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

export const getCardById = async (id: string): Promise<Card | undefined> => {
  try {
    const userRef = doc(firebaseDb, "cards", id);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) throw new Error("Card doesn't exist");
    const card = { ...docSnap.data(), id: docSnap.id };
    return card as Card;
  } catch (error) {
    console.error("Error getting document: ", error);
    throw error;
  }
};

export const deleteCardById = async ({ cardId }: { cardId: string }) => {
  try {
    const userRef = doc(firebaseDb, "cards", cardId);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      throw new Error("Document does not exist");
    }
    await deleteDoc(userRef);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCardById = async ({
  user_id,
  user,
}: {
  user_id: string;
  user: Partial<Card>;
}) => {
  try {
    const userCollection = collection(firebaseDb, "cards");
    const userRef = doc(userCollection, user_id);

    await setDoc(
      userRef,
      { ...user, onboarding: true, timestamp: serverTimestamp() },
      { merge: true }
    );

    revalidatePath(`/cards/${user_id}`, "page");
    revalidatePath(`/cards/update/${user_id}`);

    toast.success("Card updated successfully");
  } catch (error: any) {
    toast.error("Something went wrong");
    console.error("Error updating document: ", error);
    throw error;
  }
};
