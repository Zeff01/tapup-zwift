import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseDb } from "../firebase";
import { Notification } from "@/types/types";
import { toast } from "react-toastify";
import { authCurrentUser } from "../auth";

export const createNotification = async ({
  userId,
  data,
}: {
  userId: string;
  data: Partial<Notification> & Omit<Notification, "timestamp">;
}) => {
  try {
    if (!userId || !data) throw new Error("Parameters Missing");

    const user = await authCurrentUser();
    if (user !== userId) throw new Error("Auth user ID doesn't match");

    if (data.broadcast && data.userIds) {
      throw new Error("Broadcast notifications cannot have userIds");
    }

    if (data.userIds?.length === 0 || !data.userIds) {
      throw new Error("Notification must have at least one userId");
    }

    const notificationsRef = collection(firebaseDb, "notifications");
    const userRef = doc(notificationsRef);

    await setDoc(
      userRef,
      {
        ...data,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );

    toast.success("Notification Sent");
  } catch (err) {
    console.error("Error Creating Notification: ", err);
    throw err;
  }
};

export const deleteOrExcemptNotification = async ({
  userId,
  notificationId,
  type = "delete",
}: {
  userId: string;
  notificationId: string;
  type?: "delete" | "excempt";
}) => {
  try {
    if (!userId || !notificationId) throw new Error("Parameters Missing");

    const user = await authCurrentUser();
    if (user !== userId) throw new Error("Auth user ID doesn't match");

    const userRef = doc(firebaseDb, "notifications", notificationId);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      throw new Error("Document does not exist");
    }

    const notification = { ...docSnap.data() } as Notification;

    if (notification.broadcast) {
      notification.excemptedUserIds = notification.excemptedUserIds
        ? [...notification.excemptedUserIds, userId]
        : [userId];
      await updateDoc(userRef, {
        ...notification,
      });
      return;
    }

    if (notification.userIds?.length === 1) {
      await deleteDoc(userRef);
      return;
    } else {
      notification.userIds = notification.userIds?.filter(
        (id) => id !== userId
      );
      await updateDoc(userRef, {
        ...notification,
      });
      return;
    }
  } catch (err) {
    console.log("Error Handling Notification: ", err);
    throw err;
  }
};
