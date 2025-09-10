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
} from "../firestore-monitored";
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
import { deliveryFormSchema } from "@/lib/zod-schema";
import * as z from "zod";

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
export const getAllUsers = async (): Promise<ExtendedUserInterface[]> => {
  try {
    const userCollection = collection(firebaseDb, "user-account");
    const snapshot = await getDocs(userCollection);

    const users: ExtendedUserInterface[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        uid: data.uid || doc.id,
        role: data.role || "user",
        onboarding: data.onboarding ?? false,
        deliveryAddresses: data.deliveryAddresses || [],
        cardOrdering: data.cardOrdering || [],
        user_link: createUserLink(data.userCode ?? "")
      } as ExtendedUserInterface;
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
    console.log("Processing card purchase for user:", userId);
    console.log("Chosen Physical Card ID:", chosenPhysicalCard);
    
    // Import the function to reserve a pregenerated card
    const { getAvailableCards } = await import("./card-bank.action");
    
    // Get the first available pregenerated card
    const availableCards = await getAvailableCards(chosenPhysicalCard);
    
    if (availableCards.length === 0) {
      throw new Error(`No available ${chosenPhysicalCard} cards in stock`);
    }
    
    const cardToReserve = availableCards[0];
    console.log("Reserving pregenerated card:", cardToReserve.id);

    // Reserve the card (mark as "reserved" not "assigned")
    // This card will be shipped to the user but not activated yet
    const pregeneratedCardRef = doc(firebaseDb, "pregenerated-cards", cardToReserve.id);
    await updateDoc(pregeneratedCardRef, {
      status: "reserved",
      reservedFor: userId,
      reservedAt: Date.now(),
    });
    
    // DO NOT create a card in the cards collection yet!
    // The card should only be created when the user enters the transfer code
    // This prevents virtual cards from appearing before physical cards are received

    console.log(
      "Card reserved successfully. User ID:",
      userId,
      "Card ID:",
      cardToReserve.id
    );

    // Return the card ID for subscription tracking
    return cardToReserve.id;
  } catch (error) {
    console.error("Error reserving card:", error);
    throw error;
  }
};

export const addCard = async (genericCard: GenericCardType) => {
  console.error("\n\n[CRITICAL] addCard FUNCTION CALLED!");
  console.error("[CRITICAL] This function creates virtual cards and should NOT be called during purchase!");
  console.error("[CRITICAL] Stack trace:", new Error().stack);
  console.error("[CRITICAL] Card type:", genericCard);
  throw new Error("addCard should not be called - virtual cards should only be created via transfer code activation!");
  
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
      
      console.log("[addSubscription] Attempting to update card:", cardId);
      console.log("[addSubscription] With subscription ID:", specificSubscriptionId);
      console.log("[addSubscription] User ID:", userId);
      
      // Check if card exists before updating
      const cardDoc = await getDoc(cardRef);
      if (!cardDoc.exists()) {
        console.error("[addSubscription] ERROR: Card does not exist:", cardId);
        console.error("[addSubscription] This should not happen - cards should be created before subscriptions");
        console.error("[addSubscription] This might be a pregenerated card ID that hasn't been activated yet");
        // Skip this card instead of creating it
        continue;
      }
      
      // IMPORTANT: Only add owner if the card doesn't already have one
      // Pregenerated cards should NOT get owners until they're activated via transfer code
      const cardData = cardDoc.data();
      const updateData: any = {
        subscription_id: specificSubscriptionId,
      };
      
      // Only add owner if:
      // 1. userId is provided AND
      // 2. Card doesn't already have an owner (virtual cards already have owners)
      if (userId && !cardData.owner) {
        console.log("[addSubscription] WARNING: Card", cardId, "has no owner. This might be a pregenerated card.");
        console.log("[addSubscription] NOT adding owner to prevent creating phantom virtual cards");
        // Don't add owner to pregenerated cards
        // updateData.owner = userId;
      }
      
      batch.update(cardRef, updateData);
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

export const createCustomerAndRecurringPlanBundleV2 = async ({
  customerData,
  subscriptionPlan,
  cardItems,
  totalPrice,
  userId,
  selectedAddress,
}: {
  customerData: CustomerType;
  subscriptionPlan: SubscriptionPlan;
  cardItems: { id: string; name: string }[];
  totalPrice?: number;
  userId?: string;
  selectedAddress?: DeliveryAddress | z.infer<typeof deliveryFormSchema>;
}) => {
  try {
    const { data: customer } = await xenditClient.post(
      "/customers",
      customerData
    );

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
      description: `Subscription for ${cardItems.length} Cards. ${subscriptionPlan.name}`,
      success_return_url: process.env.NEXT_PUBLIC_SUCCESS_REDIRECT_URL,
      failure_return_url: process.env.NEXT_PUBLIC_FAILURE_REDIRECT_URL,
      metadata: {
        ...(userId && { userId }),
        cardItems: cardItems,
        per_card_price: subscriptionPlan.price,
        customerEmail: customerData.email,
        customerName: `${customerData.individual_detail?.given_names || ""} ${customerData.individual_detail?.surname || ""}`,
        customerPhone: customerData.mobile_number,
        customerAddress:
          selectedAddress?.street +
          ", " +
          selectedAddress?.city +
          ", " +
          selectedAddress?.state +
          ", " +
          selectedAddress?.zipCode +
          ", " +
          "Philippines",
        totalAmount: totalPrice,
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
  } catch (error: any) {
    console.error("Error creating customer or recurring plan:", error);
    console.error("Xendit Error Details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });
    
    // Provide more specific error message
    if (error.response?.status === 503) {
      throw new Error("Xendit service is temporarily unavailable. Please try again later.");
    } else if (error.response?.status === 401) {
      throw new Error("Xendit authentication failed. Please check API keys.");
    } else if (error.response?.status === 400) {
      throw new Error(`Xendit request failed: ${error.response?.data?.message || 'Invalid request'}`);
    }
    
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
  } catch (error: any) {
    console.error("Error creating customer or recurring plan:", error);
    console.error("Xendit Error Details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });
    
    // Provide more specific error message
    if (error.response?.status === 503) {
      throw new Error("Xendit service is temporarily unavailable. Please try again later.");
    } else if (error.response?.status === 401) {
      throw new Error("Xendit authentication failed. Please check API keys.");
    } else if (error.response?.status === 400) {
      throw new Error(`Xendit request failed: ${error.response?.data?.message || 'Invalid request'}`);
    }
    
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

export const getAllTransactions = async ({ role }: { role: string }): Promise<TransactionBoard[] | false> => {
  try {
    if (!role || role !== "admin")
      throw new Error("This is an Admin Only Request");

    const transactionCollection = collection(firebaseDb, "transactions");

    const snapshot = await getDocs(transactionCollection);

    const transactions: TransactionBoard[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        amount: data.amount || 0,
        cards: data.cards || [],
        receiver: data.receiver || {
          customerAddress: "",
          customerEmail: "",
          customerId: "",
          customerName: "",
          customerPhone: ""
        },
        status: data.status || "pending",
        // Convert Firestore Timestamp to a serializable format
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
      } as TransactionBoard;
    });

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

export const getUserCardOrdering = async (
  userId: string
): Promise<string[] | null> => {
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

export const updateUserRole = async (
  userId: string,
  newRole: "user" | "admin"
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!userId) throw new Error("User ID is required");
    if (!newRole) throw new Error("New role is required");

    const userRef = doc(firebaseDb, "user-account", userId);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      throw new Error("User not found");
    }

    // Update the user's role
    await updateDoc(userRef, {
      role: newRole,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      message: `User role updated to ${newRole} successfully`,
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update user role",
    };
  }
};
