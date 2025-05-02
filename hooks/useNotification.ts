import { firebaseDb } from "@/lib/firebase/firebase";
import { Notification, Notifications } from "@/types/types";
import {
  and,
  collection,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

type Props = {
  userUid: string | null;
};

const useNotification = ({ userUid }: Props) => {
  const [notif, setNotif] = useState<Notifications>([]);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!userUid) return;
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
    const notificationsRef = collection(firebaseDb, "notifications");

    // or(
    //   and(
    //     where("broadcast", "==", false),
    //     and(
    //       or(
    //         where("userIds", "!=", null),
    //         where("userIds", "!=", undefined)
    //       ),
    //       where("userIds", "array-contains", userUid)
    //     )
    //   ),
    //   and(
    //     where("broadcast", "==", true),
    //     where("excemptedUserIds", "not-in", [userUid])
    //   )
    // ),

    // or(

    //   where("broadcast", "==", true),
    //   and(
    //     where("broadcast", "==", false),
    //     where("userIds", "array-contains", userUid)
    //   )
    // )

    const unsubscribe = onSnapshot(
      query(
        notificationsRef,
        or(
          where("broadcast", "==", true),
          and(
            where("broadcast", "==", false),
            where("userIds", "array-contains", userUid)
          )
        ),
        orderBy("timestamp", "asc")
      ),

      { includeMetadataChanges: false },
      (snapshot) => {
        snapshot.docChanges().forEach((doc) => {
          const notificationsData = doc.doc.data() as Notification;
          // console.log(notificationsData);
          if (
            !notificationsData ||
            (!notificationsData.broadcast &&
              (!notificationsData.userIds ||
                !notificationsData?.userIds?.includes(userUid))) ||
            (notificationsData.excemptedUserIds?.includes(userUid) &&
              notificationsData.broadcast)
          ) {
            setNotif((prev) => prev.filter((n) => n.id !== doc.doc.id));
            return;
          }
          // if (snapshot.metadata.hasPendingWrites) {
          //   return;
          // }

          if (doc.type === "removed") {
            setNotif((prev) => prev.filter((n) => n.id !== doc.doc.id));
            return;
          }

          if (doc.type === "modified") {
            setNotif((prev) => {
              const index = prev.findIndex((n) => n.id === doc.doc.id);
              if (index !== -1) {
                return prev.map((n, i) => {
                  if (i === index) {
                    return {
                      ...n,
                      data: {
                        message: notificationsData.message,
                        title: notificationsData.title,
                        timestamp: notificationsData.timestamp,
                        type: notificationsData.type,
                        read: notificationsData.userIdsRead?.includes(userUid),
                      },
                    };
                  }
                  return n;
                });
              } else {
                return [
                  {
                    id: doc.doc.id,
                    data: {
                      message: notificationsData.message,
                      title: notificationsData.title,
                      timestamp: notificationsData.timestamp,
                      type: notificationsData.type,
                      read: notificationsData.userIdsRead?.includes(userUid),
                    },
                  },
                  ...prev,
                ];
              }
            });
          }
          if (doc.type === "added") {
            setNotif((prev) => [
              {
                id: doc.doc.id,
                data: {
                  message: notificationsData.message,
                  title: notificationsData.title,
                  timestamp: notificationsData.timestamp,
                  type: notificationsData.type,
                  read: notificationsData.userIdsRead?.includes(userUid),
                },
              },
              ...prev,
            ]);
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
