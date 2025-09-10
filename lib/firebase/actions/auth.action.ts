import { auth, firebaseDb } from "../firebaseConfig";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  UserCredential
} from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from "../firestore-monitored";

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login timestamp
    if (userCredential.user) {
      const userRef = doc(firebaseDb, "user-account", userCredential.user.uid);
      await updateDoc(userRef, {
        lastLoginAt: serverTimestamp(),
        lastActiveAt: serverTimestamp(),
      });
    }
    
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

// Update user activity timestamp (call this on key user actions)
export const updateUserActivity = async (userId: string) => {
  try {
    const userRef = doc(firebaseDb, "user-account", userId);
    await updateDoc(userRef, {
      lastActiveAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating user activity:", error);
  }
};