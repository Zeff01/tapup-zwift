// Re-export all Firestore functions, with monitoring for cards collection
export {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  deleteDoc,
  deleteField,
  getCountFromServer,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  increment,
  documentId,
  type DocumentSnapshot,
  type QuerySnapshot,
  type DocumentChange,
} from "firebase/firestore";

// Export monitored versions of write operations
export { monitoredSetDoc as setDoc } from "./card-monitor";
export { monitoredAddDoc as addDoc } from "./card-monitor";
export { monitoredUpdateDoc as updateDoc } from "./card-monitor";
export { monitoredWriteBatch as writeBatch } from "./card-monitor";