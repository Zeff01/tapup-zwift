import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getCountFromServer,
  getDocs,
  getDoc,
  where,
  serverTimestamp,
  setDoc,
  query,
  limit,
} from "firebase/firestore";
import { firebaseAuth, firebaseDb, firebaseStorage } from "../firebase";
import { Photo, Users } from "@/types/types";
import { createUserLink } from "@/lib/utils";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { revalidatePath } from "../../revalidate";
type UserCodeLink = {
  userCode: string;
  user_link: string;
};

export const addUser = async (
  user: Omit<Users, "user_link" | "uid">
): Promise<UserCodeLink | null> => {
  try {
    const currentUser = firebaseAuth.currentUser;

    if (!currentUser) {
      throw new Error("No authenticated user found");
    }

    const userUID = currentUser.uid;
    const userCollection = collection(firebaseDb, "users");

    const snapshot = await getCountFromServer(userCollection);
    const totalUsers = snapshot.data().count;

    let userCode = "",
      user_link = "";
    if (totalUsers >= 0) {
      // Add the user document to Firestore and include the UID
      const docRef = await addDoc(userCollection, {
        ...user,
        uid: userUID, // Linking the user profile to the authenticated user's UID
        createdAt: serverTimestamp(),
      });

      const sub_id = docRef.id.slice(-3);
      const full_id = docRef.id;

      userCode = (totalUsers + 1).toString() + sub_id;

      // Update the user document with a user code and id
      const userRef = doc(userCollection, docRef.id);
      await updateDoc(userRef, { userCode, id: full_id });
    }

    console.log("Document written with ID: ", userCode, user_link);

    const userCodeLink = {
      userCode,
      user_link,
    };

    revalidatePath("/users");

    return userCodeLink;
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
};
// get all users from the database
export const getAllUsers = async (): Promise<Users[]> => {
  try {
    const userCollection = collection(firebaseDb, "user-account");
    const snapshot = await getDocs(userCollection);

    const users: Users[] = snapshot.docs.map((doc) => ({
      ...(doc.data() as Users),
      id: doc.id,
    }));
    // change link to user_link
    users.forEach(async (user) => {
      user.user_link = await createUserLink(user.userCode ?? "");
    });
    return users;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
};

export const updateUserById = async ({
  user_id,
  user,
}: {
  user_id: string;
  user: Partial<Users>;
}) => {
  try {
    const userCollection = collection(firebaseDb, "user-account");
    const userRef = doc(userCollection, user_id);

    delete user.email;

    await setDoc(
      userRef,
      { ...user, onboarding: true, timestamp: serverTimestamp() },
      { merge: true }
    );

    console.log("Document updated with ID: ", user_id);
    toast.success("User updated successfully");
  } catch (error: any) {
    toast.error("Something went wrong");
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const userRef = doc(firebaseDb, "user-account", id);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const user = { ...docSnap.data(), id: docSnap.id } as Users;
      return user;
    } else {
      console.log("No such document!");
      throw new Error("No such document!", { cause: "document/not-found" });
    }
  } catch (error: any) {
    if (error.cause === "document/not-found") {
      console.error("No such document!");
      throw new Error("No such document!");
    }
    console.error(error);
    throw error;
  }
};

export const uploadImage = async (
  image: Photo | null
): Promise<string | null> => {
  try {
    const filename = self.crypto.randomUUID();
    const imageRaw = image?.raw;

    if (imageRaw) {
      const storageRef = ref(firebaseStorage, `users/${filename}.jpg`);
      await uploadBytesResumable(storageRef, imageRaw);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("File available at", downloadURL);
      return downloadURL;
    }

    return "";
  } catch (error) {
    console.error("Error uploading image: ", error);
    return "";
  }
};

export const updateUserPrintStatusById = async (id: string): Promise<void> => {
  try {
    const userCollection = collection(firebaseDb, "users");
    const userRef = doc(userCollection, id);
    await updateDoc(userRef, { printStatus: true });
    console.log("Document updated with ID: ", id);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const getUserDataByUserCode = async (
  userCode: string
): Promise<Users | null> => {
  try {
    const userCol = collection(firebaseDb, "users");
    const q = query(userCol, where("userCode", "==", userCode), limit(1));
    const document = await getDocs(q);
    if (document.empty) {
      return null;
    }
    const result: Users[] = [];
    document.forEach((doc) => {
      result.push(doc.data() as Users);
    });
    if (result.length === 0) {
      return null;
    }

    const link = await createUserLink(userCode);
    const finalData = {
      ...result[0],
      user_link: link,
    };
    return finalData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
