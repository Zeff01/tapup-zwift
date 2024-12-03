import { firebaseDb } from "@/lib/firebase/firebase";
import { Notification, Notifications } from "@/types/types";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

type Props = {
  userUid: string | null;
};

const useNotification = ({ userUid }: Props) => {
  const [notif, setNotif] = useState<Notifications>([]);

  useEffect(() => {
    const notificationsRef = collection(firebaseDb, "notifications");

    onSnapshot(notificationsRef, (snapshot) => {
      snapshot.docChanges().forEach((doc) => {
        const data = doc.doc.data() as Notification;
        if (!data || !userUid || data.userId !== userUid) return;
        if (doc.type === "added") {
          setNotif((prev) => [...prev, { id: doc.doc.id, data }]);
        }
        if (doc.type === "removed") {
          setNotif((prev) => prev.filter((n) => n.id !== doc.doc.id));
        }
      });
    });
  }, [userUid]);

  if (!userUid) {
    return [];
  }

  return notif;
};

export default useNotification;
