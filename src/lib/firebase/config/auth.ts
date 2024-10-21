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
import { firebaseAuth } from "@/src/lib/firebase/config/firebase";
import { deleteSession } from "./session";

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return _onAuthStateChanged(firebaseAuth, callback);
};

export const signUpHandler = async (email: string, password: string) => {
  const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  return res.user.uid;
};

export const loginHandler = async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return res.user.uid;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(firebaseAuth, provider);
  return res.user;
};

export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  const res = await signInWithPopup(firebaseAuth, provider);
  return res.user;
};

export const signOutHandler = async () => {
  await signOut(firebaseAuth);
  await deleteSession();
};
