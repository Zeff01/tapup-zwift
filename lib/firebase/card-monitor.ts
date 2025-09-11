import { doc, setDoc as originalSetDoc, addDoc as originalAddDoc, writeBatch as originalWriteBatch, updateDoc as originalUpdateDoc } from "firebase/firestore";
import { firebaseDb } from "./firebase";

// Wrap setDoc to monitor cards collection
export const monitoredSetDoc = async (docRef: any, data: any, options?: any) => {
  return originalSetDoc(docRef, data, options);
};

// Wrap addDoc to monitor cards collection  
export const monitoredAddDoc = async (collectionRef: any, data: any) => {
  return originalAddDoc(collectionRef, data);
};

// Wrap updateDoc to monitor cards collection
export const monitoredUpdateDoc = async (docRef: any, data: any) => {
  return originalUpdateDoc(docRef, data);
};

// Wrap writeBatch to monitor batch operations
export const monitoredWriteBatch = (db: any) => {
  return originalWriteBatch(db);
};