import { initializeApp, getApp } from "firebase/app";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

console.log("[Firebase Init] Config:", {
  apiKey: firebaseConfig.apiKey ? "***" + firebaseConfig.apiKey.slice(-4) : "MISSING",
  authDomain: firebaseConfig.authDomain || "MISSING",
  projectId: firebaseConfig.projectId || "MISSING",
  storageBucket: firebaseConfig.storageBucket || "MISSING",
  messagingSenderId: firebaseConfig.messagingSenderId || "MISSING",
  appId: firebaseConfig.appId || "MISSING",
});

const firebaseApp = initializeApp(firebaseConfig);
console.log("[Firebase Init] App initialized:", !!firebaseApp);

// Initialize Firestore with offline persistence
const firebaseDb = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  }),
  experimentalForceLongPolling: false, // Use WebChannel instead of gRPC
  experimentalAutoDetectLongPolling: true, // Automatically detect best connection method
});

console.log("[Firebase Init] Firestore initialized:", !!firebaseDb);

const firebaseStorage = getStorage(firebaseApp);
const firebaseAuth = getAuth(getApp());

export { firebaseDb, firebaseStorage, firebaseAuth };
export const db = firebaseDb; // Alias for the connection hook
