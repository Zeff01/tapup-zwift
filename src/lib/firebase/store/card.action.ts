import {
  collection,
  doc,
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
import { User } from "firebase/auth";
import { Card } from "@/types/types";

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

    console.log("Card created by: ", user_id);
    toast.success("Card created successfully");
    return true;
  } catch (error: any) {
    toast.error("Something went wrong");
    console.error("Error Creating card: ", error);
    return false;
  }
};

export const getCardsByOwner = async (owner_id: string) => {
  try {
    if (!owner_id) return;
    const cardsCol = collection(firebaseDb, "cards");
    const queryFn = query(cardsCol, where("owner", "==", owner_id), limit(10));
    const cards = await getDocs(queryFn);
    if (cards.empty) {
      return;
    }
    const result: Partial<Card>[] = [];
    cards.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });
    if (result.length === 0) {
      return;
    }

    return result;
  } catch (err: any) {
    console.log(err);
    return;
  }
};
