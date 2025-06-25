"use server";

import {
  collection,
  query,
  where,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseDb } from "../firebase";
import { CartItem } from "@/providers/cart-provider-v2";

interface cartData {
  id: string;
  cartItems: CartItem[];
  userUid: string;
}

export const getCartByUserUid = async (
  userUid: string | undefined
): Promise<cartData | null> => {
  try {
    const cartCollection = collection(firebaseDb, "cart");
    const q = query(cartCollection, where("userUid", "==", userUid));
    const cartSnap = await getDocs(q);

    if (cartSnap.empty) return null;

    const cart = cartSnap.docs[0];

    return {
      id: cart.id,
      ...(cart.data() as Omit<cartData, "id">),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const clearCartByUserId = async (userUid: string) => {
  try {
    if (!userUid) throw new Error("User id is not found");

    const cartCollection = collection(firebaseDb, "cart");
    const q = query(cartCollection, where("userUid", "==", userUid));

    const cartSnap = await getDocs(q);
    if (cartSnap.empty) {
      throw new Error("No cart items found for this user");
    }

    const cartDoc = cartSnap.docs[0];
    await updateDoc(cartDoc.ref, { cartItems: [] });
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw new Error("Failed to clear cart");
  }
};

export const saveCartItemsByUserUid = async (
  userUid: string,
  cartItems: CartItem[]
) => {
  try {
    const cartCollection = collection(firebaseDb, "cart");
    const q = query(cartCollection, where("userUid", "==", userUid));
    const cartSnap = await getDocs(q);

    if (!cartSnap.empty) {
      const cartRef = cartSnap.docs[0].ref;
      await setDoc(
        cartRef,
        {
          cartItems,
        },
        { merge: true }
      );
    } else {
      const newCartRef = doc(cartCollection); // auto-ID
      await setDoc(newCartRef, {
        userUid,
        cartItems,
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
