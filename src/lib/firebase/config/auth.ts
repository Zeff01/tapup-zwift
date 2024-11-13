import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { firebaseAuth, firebaseDb } from "@/src/lib/firebase/config/firebase";
import { createSession, deleteSession } from "./session";
import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import { z } from "zod";
import { signupSchema } from "@/schema";
import { USER_ROLE_ENUMS } from "@/constants";
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return _onAuthStateChanged(firebaseAuth, callback);
};

export const signUpHandler = async (data: z.infer<typeof signupSchema>) => {
  try {
    const res = await createUserWithEmailAndPassword(
      firebaseAuth,
      data.email,
      data.password
    );
    const userID = res.user.uid;
    await setDoc(doc(firebaseDb, "user-account", userID), {
      role: USER_ROLE_ENUMS.USER,
      email: res.user.email,
      firstname: data.firstName,
      lastname: data.lastName,
      timestamp: serverTimestamp(),
    });
    toast.success("User registration successful!");
    setTimeout(() => {
      window.location.href = "/login";
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

    if (!userID) {
      toast.error("User not found");
      return;
    }

    const userAccountRef = doc(firebaseDb, "user-account", userID);
    const docSnap = await getDoc(userAccountRef);

    if (docSnap.exists()) {
      await createSession(userID);
      toast.success("Login successful!");
      return;
    }
    await setDoc(doc(firebaseDb, "user-account", userID), {
      role: USER_ROLE_ENUMS.USER,
      email: res.user.email,
      timestamp: serverTimestamp(),
    });

    await createSession(userID);

    toast.success("Login successful!");
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
    }
  }
};

export const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const res = await signInWithPopup(firebaseAuth, provider);
    const userID = res.user.uid;
    await setDoc(doc(firebaseDb, "user-account", userID), {
      role: USER_ROLE_ENUMS.USER,
      email: res.user.email,
      timestamp: serverTimestamp(),
    });
    if (userID) {
      await createSession(userID);
    }
    toast.success("Login successful!");
  } catch (error) {
    if (error instanceof FirebaseError) {
      // toast.error(error.code);
      console.log(error.code);
    }
  }
};

export const signOutHandler = async () => {
  await signOut(firebaseAuth);
  await deleteSession();
};

export const currentAuthUserDetails = async (id: string) => {
  try {
    const userRef = doc(firebaseDb, "user-account", id);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      console.log("No such document");
      return;
    }
    return docSnap.data();
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(error.code);
      return;
    }
    console.log(error);
  }
};

export const forgotPasswordHandler = async (email: string) => {
  try {
    const resetPasswordUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_DEV
        : process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_PROD;

    if (!resetPasswordUrl) {
      throw new Error("Reset password URL is not defined");
    }

    await sendPasswordResetEmail(firebaseAuth, email, {
      url: `${resetPasswordUrl}/resetPassword`,
    });
    toast.success("Password reset email sent!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("User not found!");
          break;
        default:
          toast.error("Something went wrong!");
      }
    }
  }
};

export const resetPasswordHandler = async (
  oobCode: string,
  newPassword: string
) => {
  try {
    await confirmPasswordReset(firebaseAuth, oobCode, newPassword);
    toast.success("Your password has been reset successfully!");
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/expired-action-code":
          toast.error("Reset link expired!");
          break;
        default:
          toast.error("Something went wrong!");
      }
    }
  }
};
