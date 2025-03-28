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
  Timestamp,
} from "firebase/firestore";
import { firebaseAuth, firebaseDb, firebaseStorage } from "../firebase";
import {
  Card,
  CreateInvoiceType,
  CustomerType,
  Photo,
  RecurringPlanType,
  SubscriptionPlan,
  Users,
} from "@/types/types";
import { createUserLink } from "@/lib/utils";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { revalidatePath } from "../../revalidate";
import { isAfter, addDays } from "date-fns";
import { createInvoice } from "@/lib/xendit";
import { xenditClient } from "@/lib/axios";
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

export const handleCreateInvoice = async (
  invoicePayload: CreateInvoiceType,
  userId?: string
) => {
  try {
    const invoiceResponse = await createInvoice(invoicePayload);

    if (userId) {
      const invoiceData = {
        ...invoicePayload,
        status: "PENDING",
      };
      await addInvoice(userId, invoiceData);
    }

    window.location.href = invoiceResponse.invoice_url;
    toast.success("Invoice created successfully! Proceed to payment.");
  } catch (error) {
    console.error("Error creating invoice:", error);
    toast.error("Failed to create invoice. Please try again.");
  }
};

export const addInvoice = async (
  userId: string,
  invoice: CreateInvoiceType & { status: string }
) => {
  try {
    const invoiceCollection = collection(firebaseDb, "invoices");
    const invoiceRef = doc(invoiceCollection, invoice.external_id);

    await setDoc(invoiceRef, {
      ...invoice,
      userId,
      created_at: serverTimestamp(),
    });

    console.log("Invoice added with ID: ", invoice.external_id);
    return invoice.external_id;
  } catch (error) {
    console.error("Error adding invoice: ", error);
    return null;
  }
};

export const addCardForUser = async (
  userId: string,
  chosenPhysicalCard: string
): Promise<string> => {
  try {
    console.log("Adding card for user:", userId);
    console.log("Chosen Physical Card ID:", chosenPhysicalCard);

    const user = await getUserById(userId);
    if (!user) {
      console.error("User not found for ID:", userId);
      throw new Error("User not found");
    }

    console.log("User data retrieved:", user);

    const transferCode = crypto.randomUUID().split("-").slice(0, 2).join("-");
    console.log("Generated Transfer Code:", transferCode);

    const cardCollection = collection(firebaseDb, "cards");
    const card: Card = {
      ...user,
      owner: userId,
      transferCode: transferCode,
      chosenPhysicalCard: chosenPhysicalCard,
    };

    console.log("Card object before saving:", card);

    const docRef = await addDoc(cardCollection, card);
    console.log(
      "Card added successfully. User ID:",
      userId,
      "Card ID:",
      docRef.id
    );

    return docRef.id;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
};

export const addSubscription = async ({
  cardId,
  subscriptionDays,
}: {
  cardId: string;
  subscriptionDays: number;
}): Promise<string | null> => {
  try {
    const subscriptionCollection = collection(firebaseDb, "subscriptions");

    const dateAvailedTimestamp = Timestamp.now();

    const subscriptionDoc = await addDoc(subscriptionCollection, {
      cardId,
      dateAvailed: dateAvailedTimestamp,
      subscriptionDays,
    });

    console.log("Subscription added with ID:", subscriptionDoc.id);
    return subscriptionDoc.id;
  } catch (error) {
    console.error("Error adding subscription:", error);
    return null;
  }
};

export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  try {
    const subscriptionCollection = collection(firebaseDb, "subscription-plans");
    const snapshot = await getDocs(subscriptionCollection);

    const plans: SubscriptionPlan[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<SubscriptionPlan, "id">),
    }));

    return plans;
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    return [];
  }
};

export const createCustomerAndRecurringPlan = async (
  customerData: CustomerType,
  subscriptionPlan: SubscriptionPlan,
  cardId: string,
  totalPrice?: number
) => {
  try {
    // Create customer in Xendit
    const { data: customer } = await xenditClient.post(
      "/customers",
      customerData
    );

    const now = new Date();
    const formattedDateTime = now
      .toISOString()
      .replace(/[-:T.Z]/g, "")
      .slice(0, 14);

    const referenceId = `recurring-${customer.id}-${subscriptionPlan.id}-${cardId}-${formattedDateTime}`;

    let interval: "DAY" | "WEEK" | "MONTH" = "DAY"; // Explicitly set the type
    let intervalCount = subscriptionPlan.durationDays;

    if (subscriptionPlan.durationDays > 365) {
      console.log(
        "Subscription duration exceeds 365 days, converting to months"
      );

      interval = "MONTH";
      intervalCount = Math.floor(subscriptionPlan.durationDays / 30);
    } else if (
      subscriptionPlan.durationDays >= 7 &&
      subscriptionPlan.durationDays % 7 === 0
    ) {
      console.log(
        "Subscription duration is a multiple of 7, converting to weeks"
      );

      interval = "WEEK";
      intervalCount = subscriptionPlan.durationDays / 7;
    }

    // Define recurring plan details
    const recurringPlanData: RecurringPlanType = {
      reference_id: referenceId,
      customer_id: customer.id,
      recurring_action: "PAYMENT",
      currency: "PHP",
      amount: totalPrice ?? subscriptionPlan.price,
      schedule: {
        reference_id: `schedule-${customer.id}-${subscriptionPlan.id}-${cardId}`,
        interval: interval,
        interval_count: intervalCount,
      },
      description: `Subscription for ${subscriptionPlan.name}`,
      success_return_url: process.env.NEXT_PUBLIC_SUCCESS_REDIRECT_URL,
      failure_return_url: process.env.NEXT_PUBLIC_FAILURE_REDIRECT_URL,
      metadata: { cardId },
    };

    console.log("Generated reference_id:", recurringPlanData.reference_id);
    console.log("Final interval and count:", interval, intervalCount);

    // Create recurring plan in Xendit
    const { data: recurringPlan } = await xenditClient.post(
      "/recurring/plans",
      recurringPlanData
    );
    console.log("Xendit Recurring Plan Response:", recurringPlan);
    window.location.href = recurringPlan.actions?.[0]?.url;

    return { customer, recurringPlan };
  } catch (error) {
    console.error("Error creating customer or recurring plan:", error);
    throw error;
  }
};
