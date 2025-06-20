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
  writeBatch,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { firebaseAuth, firebaseDb, firebaseStorage } from "../firebase";
import {
  Card,
  CreateInvoiceType,
  CustomerType,
  DeliveryAddress,
  ExtendedUserInterface,
  GenericCard,
  GenericCardType,
  Photo,
  RecurringPlanType,
  SubscriptionPlan,
  TransactionBoard,
  TransactionType,
  Users,
} from "@/types/types";
import { createUserLink } from "@/lib/utils";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { revalidatePath } from "../../revalidate";
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

export const deleteUser = async () => {
  try {
    const currentUser = firebaseAuth.currentUser;

    if (!currentUser) {
      console.error("No user is currently signed in.");
      toast.error("No user is currently signed in.");
      return false;
    }

    const user = (await getUserById(currentUser.uid)) as ExtendedUserInterface;

    if (!user || user.role.toLowerCase() !== "admin") return false;

    console.log(user);
  } catch (error) {
    console.error("Error deleting User: ", error);
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
      return null;
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
      chosenPhysicalCard: { id: chosenPhysicalCard },

      //error here for the mean time i add createdAt
      createdAt: serverTimestamp,
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

export const addCard = async (genericCard: GenericCardType) => {
  try {
    const transferCode = crypto.randomUUID().split("-").slice(0, 2).join("-");
    console.log("Generated Transfer Code:", transferCode);

    const cardCollection = collection(firebaseDb, "cards");
    const card: GenericCard = {
      transferCode: transferCode,
      chosenPhysicalCard: genericCard,
      printStatus: false,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(cardCollection, card);

    return docRef.id;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
};

export const addSubscription = async ({
  cardIds,
  subscriptionDays,
  userId,
}: {
  cardIds: string[];
  subscriptionDays: number;
  userId?: string;
}): Promise<string[] | null> => {
  try {
    const subscriptionCollection = collection(firebaseDb, "subscriptions");

    const dateAvailedTimestamp = Timestamp.now();

    const addDocPromises = cardIds.map((id) =>
      addDoc(subscriptionCollection, {
        ...(userId && { user_id: userId }),
        card_id: id,
        dateAvailed: dateAvailedTimestamp,
        ...(userId && { dateStarted: dateAvailedTimestamp }),
        subscriptionDays,
      })
    );

    const subscriptionDocs = await Promise.all(addDocPromises);

    if ((!firebaseDb && !cardIds) || cardIds.length === 0)
      throw "Firebase db is not initialized or cardIds not defined";

    if (subscriptionDocs.length !== cardIds.length)
      throw new Error(
        "Subscription creation process failed: Mismatch in counts between subscriptions and card IDs."
      );

    const batch = writeBatch(firebaseDb);

    for (let i = 0; i < cardIds.length; i++) {
      const cardId = cardIds[i];
      const specificSubscriptionId = subscriptionDocs[i].id;
      const cardRef = doc(firebaseDb, "cards", cardId);
      batch.update(cardRef, {
        ...(userId && { owner: userId }),
        subscription_id: specificSubscriptionId,
      });
    }

    await batch.commit();
    console.log(
      `Successfully updated ${cardIds.length} card(s) with their respective subscription_id.`
    );

    // The function is expected to return an array of all created subscription IDs.
    const allCreatedSubscriptionIds = subscriptionDocs.map((sub) => sub.id);
    return allCreatedSubscriptionIds;
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

export const manageUserDeliveryAddress = async (
  userId: string,
  action: "add" | "update" | "delete",
  address: DeliveryAddress,
  index?: number
) => {
  if (!userId) throw new Error("User ID is required");
  try {
    const userRef = doc(firebaseDb, "user-account", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User document not found");
    }

    const userData = userDoc.data();
    const addresses: DeliveryAddress[] = userData.deliveryAddresses || [];

    if (action === "add") {
      const newAddresses = [...addresses, address];
      await updateDoc(userRef, { deliveryAddresses: newAddresses });
      console.log("Successfully added delivery address for user:", userId);
      return newAddresses.length - 1; // Return new index
    }

    if (typeof index !== "number") {
      throw new Error("Index is required for update/delete");
    }

    if (index < 0 || index >= addresses.length) {
      throw new Error("Invalid address index");
    }

    if (action === "update") {
      const newAddresses = [...addresses];
      newAddresses[index] = address;
      await updateDoc(userRef, { deliveryAddresses: newAddresses });
      console.log("Successfully updated delivery address at index:", index);
      return index;
    }

    if (action === "delete") {
      const newAddresses = addresses.filter((_, i) => i !== index);
      await updateDoc(userRef, { deliveryAddresses: newAddresses });
      console.log("Successfully deleted delivery address at index:", index);
      return index;
    }

    throw new Error("Invalid action specified");
  } catch (error) {
    console.error(`Error ${action}ing delivery address:`, error);
    throw error;
  }
};

export const createCustomerAndRecurringPlan = async (
  customerData: CustomerType,
  subscriptionPlan: SubscriptionPlan,
  cardId: string,
  totalPrice?: number,
  userId?: string
) => {
  try {
    // Create customer in Xendit
    const { data: customer } = await xenditClient.post(
      "/customers",
      customerData
    );

    console.log("Customer:", customer);

    const now = new Date();
    const formattedDateTime = now
      .toISOString()
      .replace(/[-:T.Z]/g, "")
      .slice(0, 14);

    const referenceId = `recurring-${customer.id}-${subscriptionPlan.id}-${cardId}-${formattedDateTime}`;

    let interval: "DAY" | "WEEK" | "MONTH" = "DAY";
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
      metadata: { cardId: [cardId], ...(userId && { userId }) },
    };

    console.log("Recurring Plan Data:", recurringPlanData);

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

export const createCustomerAndRecurringPlanBundle = async (
  customerData: CustomerType,
  subscriptionPlan: SubscriptionPlan,
  cardIds: string[],
  totalPrice?: number,
  userId?: string
) => {
  try {
    const { data: customer } = await xenditClient.post(
      "/customers",
      customerData
    );

    console.log("Customer:", customer);

    const now = new Date();
    const formattedDateTime = now
      .toISOString()
      .replace(/[-:T.Z]/g, "")
      .slice(0, 14);

    const bundleId = crypto.randomUUID().split("-").slice(0, 2).join("-");
    const referenceId = `recurring-${customer.id}-${subscriptionPlan.id}-bundle${bundleId}-${formattedDateTime}`;

    let interval: "DAY" | "WEEK" | "MONTH" = "DAY";
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
        reference_id: `schedule-${customer.id}-${subscriptionPlan.id}-bundle${bundleId}`,
        interval: interval,
        interval_count: intervalCount,
      },
      description: `Subscription for ${cardIds.length} Cards. ${subscriptionPlan.name}`,
      success_return_url: process.env.NEXT_PUBLIC_SUCCESS_REDIRECT_URL,
      failure_return_url: process.env.NEXT_PUBLIC_FAILURE_REDIRECT_URL,
      metadata: {
        ...(userId && { userId }),
        cardIds: cardIds,
        per_card_price: subscriptionPlan.price,
      },
    };

    console.log("Recurring Plan Data:", recurringPlanData);

    // Create recurring plan in Xendit
    const { data: recurringPlan } = await xenditClient.post(
      "/recurring/plans",
      recurringPlanData
    );
    console.log("Xendit Recurring Plan Response:", recurringPlan);

    return { customer, recurringPlan };
  } catch (error) {
    console.error("Error creating customer or recurring plan:", error);
    throw error;
  }
};

export const createTransaction = async (transactionData: TransactionType) => {
  try {
    const transactionCollection = collection(firebaseDb, "transactions");

    const dataToSave: TransactionType = {
      ...transactionData,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(transactionCollection, dataToSave);

    console.log("Transaction added with ID:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

export const getAllTransactions = async ({ role }: { role: string }) => {
  try {
    if (!role || role !== "admin")
      throw new Error("This is an Admin Only Request");

    const transactionCollection = collection(firebaseDb, "transactions");

    const snapshot = await getDocs(transactionCollection);

    const transactions: TransactionBoard[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<TransactionBoard, "id">),
    }));

    return transactions;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateTransactionPerId = async ({
  role,
  transaction_id,
  data,
}: {
  role: string;
  transaction_id: string;
  data: string;
}) => {
  try {
    if (!role || role !== "admin")
      throw new Error("This is an Admin Only Request");

    const transactionRef = doc(firebaseDb, "transactions", transaction_id);
    await updateDoc(transactionRef, { status: data });

    console.log("Transaction status updated :", data);
    return { success: true, message: "Transaction updated" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error updating transaction" };
  }
};

export const updateUserInfo = async ({
  userId,
  firstName,
  lastName,
  phoneNumber,
}: {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}) => {
  try {
    if (!userId) throw new Error("User id is not found");

    const userRef = doc(firebaseDb, "user-account", userId);
    const snapShot = await getDoc(userRef);

    if (!snapShot.exists()) throw new Error("User not found");

    const existingData = snapShot.data();

    const updatePayload: Partial<{
      firstName: string;
      lastName: string;
      number: string;
    }> = {};

    if (!existingData.firstName && firstName) {
      updatePayload.firstName = firstName;
    }

    if (!existingData.lastName && lastName) {
      updatePayload.lastName = lastName;
    }

    if (!existingData.number && phoneNumber) {
      updatePayload.number = phoneNumber;
    }

    if (Object.keys(updatePayload).length === 0) return;

    await updateDoc(userRef, updatePayload);
  } catch (error) {
    console.error("Error updating user info", error);
    throw new Error("Failed to update user info");
  }
};

export const getUserCardOrdering = async (userId: string): Promise<string[] | null> => {
  try {
    const userRef = doc(firebaseDb, "user-account", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.cardOrdering || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching cardOrdering:", error);
    return null;
  }
};

export const updateUserCardOrdering = async (
  userId: string,
  cardOrdering: string[]
) => {
  try {
    const userRef = doc(collection(firebaseDb, "user-account"), userId);

    await updateDoc(userRef, {
      cardOrdering: cardOrdering,
    });

    console.log("Card ordering updated for user:", userId);
    // toast.success("Card order saved.");
  } catch (error: any) {
    toast.error("Failed to save card order.");
    console.error("Error updating cardOrdering:", error);
    throw error;
  }
};