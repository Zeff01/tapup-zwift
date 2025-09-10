import { USER_ROLE_ENUMS } from "@/constants";
import { firebaseAuth, firebaseDb } from "@/lib/firebase/firebase";
import { FirebaseError } from "firebase/app";
import {
  type User,
  onAuthStateChanged as _onAuthStateChanged,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  createSession,
  deleteSession,
  getSession,
  verifySignUserId,
} from "../session";
<<<<<<< HEAD
=======
import { setDoc, doc, serverTimestamp, getDoc } from "./firestore-monitored";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import { z } from "zod";
>>>>>>> 72d04b3 (feat: Major system improvements and bug fixes)
import { signupSchema } from "../zod-schema";
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return _onAuthStateChanged(firebaseAuth, callback);
};

import {
  ExtendedUserInterface,
  SignedUserIdJwtPayload,
  Users,
} from "@/types/types";
import { redirect } from "next/navigation";
import { addCardForUser, updateUserById } from "./actions/user.action";

export const authCurrentUser = async () => {
  try {
    const cookie = await getSession();
    if (!cookie) throw new Error("User not found");

    const userObj = (await verifySignUserId(cookie)) as SignedUserIdJwtPayload;

    if (!userObj) throw new Error("Invalid User Token");
    return userObj.uid;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const authCurrentUserv2 = async () => {
  try {
    const cookie = await getSession();
    if (!cookie) {
      await signOutHandler();
      return;
    }

    const userObj = (await verifySignUserId(cookie)) as SignedUserIdJwtPayload;

    if (!userObj) {
      await signOutHandler();
      return;
    }

    const userdetails = (await currentAuthUserDetails({
      id: userObj.uid,
    })) as ExtendedUserInterface;

    return {
      ...userObj,
      ...userdetails,
    };
  } catch (error) {
    console.error(error);
  }
};

export const signUpHandler = async (data: z.infer<typeof signupSchema>) => {
  console.log("Starting sign-up process with data:", data);
  try {
    const res = await createUserWithEmailAndPassword(
      firebaseAuth,
      data.email,
      data.password
    );
    console.log("User created successfully:", res.user);

    const userID = res.user.uid;
    if (!userID) throw new Error("Something went wrong");

    console.log("Creating session for user ID:", userID);
    await createSession(userID);

    console.log("Storing user data in Firestore");
    await setDoc(doc(firebaseDb, "user-account", userID), {
      role: USER_ROLE_ENUMS.USER,
      email: res.user.email,
      firstName: data.firstName,
      lastName: data.lastName,
      timestamp: serverTimestamp(),
    });

    const onboardingDataStr = localStorage.getItem("onboardingData");
    if (onboardingDataStr) {
      console.log("Found onboarding data in localStorage:", onboardingDataStr);
      try {
        const onboardingData = JSON.parse(onboardingDataStr) as Partial<Users>;
        console.log("Parsed onboarding data:", onboardingData);

        const { email, ...cleanOnboardingData } = onboardingData;

        console.log("Updating user with onboarding data");
        await updateUserById({
          user_id: userID,
          user: cleanOnboardingData,
        });

        if (cleanOnboardingData.chosenPhysicalCard) {
          console.log(
            "Physical card selected during onboarding:",
            cleanOnboardingData.chosenPhysicalCard
          );
          // Don't create virtual card here - user needs to purchase and receive physical card first
          // Virtual card will be created when they enter the transfer code
        } else {
          console.warn("No physical card selected in onboarding data");
        }
      } catch (error) {
        console.error("Error processing onboarding data:", error);
        toast.error("Failed to process onboarding information");
        throw error;
      }
    } else {
      console.log("No onboarding data found in localStorage");
    }

    toast.success("User registration successful!");
    console.log("User registration completed successfully");
  } catch (error) {
    console.error("Error during sign-up process:", error);
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email already exists!");
          console.error("Firebase error: Email already exists");
          throw "Email already exists";
        default:
          toast.error("Something went wrong!");
          console.error("Firebase error:", error);
          throw error;
      }
    }
    throw error;
  }
};

export const loginHandler = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const userID = res.user.uid;
    if (userID) {
      await createSession(userID);
    }
    toast.success("Login successful!");
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Invalid credentials");
          throw "Invalid Credentials";
        default:
          toast.error("Something went wrong!");
          throw error;
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
      redirect("/dashboard");
    }
    await setDoc(doc(firebaseDb, "user-account", userID), {
      role: USER_ROLE_ENUMS.USER,
      email: res.user.email,
      timestamp: serverTimestamp(),
    });
    await createSession(userID);

    toast.success("Login successful!");
    redirect("/dashboard");
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

    const userAccountRef = doc(firebaseDb, "user-account", userID);
    const docSnap = await getDoc(userAccountRef);

    if (docSnap.exists()) {
      await createSession(userID);
      toast.success("Login successful!");

      return userID;
    }

    await setDoc(doc(firebaseDb, "user-account", userID), {
      role: USER_ROLE_ENUMS.USER,
      email: res.user.email,
      timestamp: serverTimestamp(),
    });
    if (userID) {
      await createSession(userID);
    }
    toast.success("Login successful!");
    return userID;
  } catch (error) {
    if (error instanceof FirebaseError) {
      // toast.error(error.code);
      console.error(error.code);
    }
  }
};

export const signOutHandler = async () => {
  await signOut(firebaseAuth);
  await deleteSession();
};

export const currentAuthUserDetails = async ({ id }: { id: string }) => {
  try {
    if (!id) {
      console.error("Invalid user ID");
      return;
    }
    const userRef = doc(firebaseDb, "user-account", id);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      console.log("No such document");
      return;
    }
    return docSnap.data();
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(error.message);
      return;
    }
    console.error(error);
    return;
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
    console.error("Error sending password reset email:", error);
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("User not found!");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address!");
          break;
        case "auth/missing-email":
          toast.error("Email address is required!");
          break;
        case "auth/too-many-requests":
          toast.error("Too many requests. Try again later.");
          break;
        case "auth/internal-error":
          toast.error("Internal error. Please try again later.");
          break;
        default:
          toast.error("Something went wrong!");
      }
    } else {
      toast.error("Something went wrong!");
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
