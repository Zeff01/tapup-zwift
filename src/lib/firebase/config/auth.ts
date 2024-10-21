import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  FacebookAuthProvider,
} from "firebase/auth";
import { firebaseAuth, firebaseDb } from "@/src/lib/firebase/config/firebase";
import { createSession, deleteSession } from "./session";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return _onAuthStateChanged(firebaseAuth, callback);
};

export const signUpHandler = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const userID = res.user.uid;
    await setDoc(doc(firebaseDb, "user-account", userID), {
      email: res.user.email,
      timestamp: serverTimestamp(),
    });
    toast.success("User registration successful!");
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 2000);
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email already exists!");
          break;
        default:
          toast.error("Something went wrong!");
      }
    }
  }
};

export const loginHandler = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const userID = res.user.uid;
    if (userID) {
      await createSession(userID);
    }
    toast.success("Login successful!");
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Invalid credentials");
          break;
        default:
          toast.error("Something went wrong!");
      }
    }
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(firebaseAuth, provider);
    const userID = res.user.uid;

    await setDoc(doc(firebaseDb, "user-account", userID), {
      email: res.user.email,
      timestamp: serverTimestamp(),
    });
    if (userID) {
      await createSession(userID);
    }
    toast.success("Login successful!");
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(error.code);
    }
  }
};

export const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const res = await signInWithPopup(firebaseAuth, provider);
    const userID = res.user.uid;
    await setDoc(doc(firebaseDb, "user-account", userID), {
      email: res.user.email,
      timestamp: serverTimestamp(),
    });
    if (userID) {
      await createSession(userID);
    }
    toast.success("Login successful!");
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(error.code);
    }
  }
};

export const signOutHandler = async () => {
  await signOut(firebaseAuth);
  await deleteSession();
};
