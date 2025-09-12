/**
 * URL generation utilities for the application
 */

/**
 * Create a user profile link
 */
export const createUserLink = (userCode: string) => {
  try {
    if (!userCode) return "";
    const baseLink = window.location.origin;
    const user_link = `${baseLink}/user/${userCode}`;
    return user_link;
  } catch (error) {
    console.error("Error creating link: ", error);
    throw new Error("Error creating link");
  }
};

/**
 * Create a card preview link
 */
export const createCardLink = (cardId: string) => {
  try {
    if (!cardId) return "";
    const baseLink =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_PROD
        : process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_DEV;
    const card_link = `${baseLink}/site/${cardId}`;
    return card_link;
  } catch (error) {
    console.error("Error creating link: ", error);
    throw new Error("Error creating link");
  }
};

/**
 * Validate if a URL is a valid QR code URL for this application
 */
export const isValidQRCode = (url: string) => {
  const devUrl = process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_DEV + "/site/";
  const prodUrl = process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_PROD + "/site/";
  return url.startsWith(devUrl) || url.startsWith(prodUrl);
};