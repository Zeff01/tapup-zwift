import { firebaseDb } from "@/lib/firebase/firebase";
import { Notification, Notifications } from "@/types/types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

type Props = {
  userUid: string | null;
};

const useNotification = ({ userUid }: Props) => {
  const [notif, setNotif] = useState<Notifications>([]);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
    const notificationsRef = collection(firebaseDb, "notifications");

    const unsubscribe = onSnapshot(
      query(notificationsRef, orderBy("timestamp", "asc")),
      { includeMetadataChanges: true },
      (snapshot) => {
        snapshot.docChanges().forEach((doc) => {
          const notificationsData = doc.doc.data() as Notification;
          if (
            !notificationsData ||
            !userUid ||
            (!notificationsData.broadcast &&
              (!notificationsData.userIds ||
                !notificationsData?.userIds?.includes(userUid))) ||
            (notificationsData.excemptedUserIds?.includes(userUid) &&
              notificationsData.broadcast)
          )
            return;

          if (snapshot.metadata.hasPendingWrites) {
            console.log(snapshot.metadata);
            return;
          }
          if (doc.type === "modified") {
            console.log(doc.doc.data());
            setNotif((prev) => {
              const index = prev.findIndex((n) => n.id === doc.doc.id);
              if (index !== -1) {
                return prev.map((n, i) => {
                  if (i === index) {
                    return { ...n, data: doc.doc.data() as Notification };
                  }
                  return n;
                });
              } else {
                return [{ id: doc.doc.id, data: notificationsData }, ...prev];
              }
            });
          }
          if (doc.type === "added") {
            setNotif((prev) => [
              { id: doc.doc.id, data: notificationsData },
              ...prev,
            ]);
          }
          if (doc.type === "removed") {
            setNotif((prev) => prev.filter((n) => n.id !== doc.doc.id));
          }
        });
      }
    );

    unsubscribeRef.current = unsubscribe;
    return () => {
      unsubscribeRef.current = null;
    };
  }, [userUid]);

  if (!userUid) {
    return [];
  }

  return notif;
};

export default useNotification;
