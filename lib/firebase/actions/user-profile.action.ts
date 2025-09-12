/**
 * User profile actions - handles only user-specific data
 * Card-specific data should be handled separately
 */

import { doc, serverTimestamp, setDoc } from "../firestore-monitored";
import { firebaseDb } from "../firebase";
import { toast } from "react-toastify";

// Fields that belong in user-account (not card-specific)
const USER_PROFILE_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'number',
  'profilePictureUrl',
  'facebookUrl',
  'instagramUrl',
  'linkedinUrl',
  'twitterUrl',
  'youtubeUrl',
  'whatsappNumber',
  'websiteUrl',
  'viberUrl',
  'tiktokUrl',
  'skypeInviteUrl',
  'onboarding',
  'cardOrdering',
  'deliveryAddresses',
  'subscriptions'
];

// Fields that should NOT be saved to user-account (card-specific)
const CARD_SPECIFIC_FIELDS = [
  'chosenPhysicalCard',
  'chosenTemplate',
  'company',
  'companies',
  'position',
  'companyBackground',
  'serviceDescription',
  'servicePhotos',
  'coverPhotoUrl',
  'cardName',
  'portfolioStatus'
];

interface UpdateUserProfileParams {
  user_id: string;
  userData: Record<string, any>;
}

/**
 * Updates only user profile data in user-account collection
 * Filters out card-specific fields
 */
export const updateUserProfile = async ({ 
  user_id, 
  userData 
}: UpdateUserProfileParams) => {
  try {
    // Filter out card-specific fields
    const filteredUserData: Record<string, any> = {};
    
    Object.keys(userData).forEach(key => {
      // Only include fields that are user-specific
      if (USER_PROFILE_FIELDS.includes(key) && !CARD_SPECIFIC_FIELDS.includes(key)) {
        filteredUserData[key] = userData[key];
      }
    });

    // Always remove email from updates for security
    delete filteredUserData.email;

    const userRef = doc(firebaseDb, "user-account", user_id);
    
    await setDoc(
      userRef,
      { 
        ...filteredUserData, 
        onboarding: true, 
        updatedAt: serverTimestamp() 
      },
      { merge: true }
    );

    console.log("User profile updated with ID: ", user_id);
    console.log("Updated fields: ", Object.keys(filteredUserData));
    
    return { success: true, updatedFields: Object.keys(filteredUserData) };
  } catch (error) {
    console.error("Error updating user profile: ", error);
    toast.error("Failed to update user profile");
    throw error;
  }
};

/**
 * Extracts card data from form data for separate handling
 */
export const extractCardDataFromForm = (formData: Record<string, any>) => {
  const cardData: Record<string, any> = {};
  const userData: Record<string, any> = {};

  Object.keys(formData).forEach(key => {
    if (CARD_SPECIFIC_FIELDS.includes(key)) {
      cardData[key] = formData[key];
    } else if (USER_PROFILE_FIELDS.includes(key)) {
      userData[key] = formData[key];
    }
  });

  return { cardData, userData };
};