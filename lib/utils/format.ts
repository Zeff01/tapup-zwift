import { Users } from "@/types/types";

/**
 * Format a number as currency in PHP (Philippine Peso)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

/**
 * Format a timestamp to a localized date string
 */
export function formatDate(timestamp: number): string {
  if (!timestamp) return "N/A";

  const date = new Date(timestamp);
  return date.toLocaleString(); // Uses the user's browser/system locale settings
}

/**
 * Convert a timestamp to a relative time string (e.g., "2 hours ago")
 */
export function timeAgo(timestamp: Date): string {
  if (!timestamp) return "";
  const currentTime = new Date();
  const timeDiff = currentTime.getTime() - timestamp.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  return "just now";
}

/**
 * Get a formatted full name from a user object
 */
export function getUserName(user: Users | undefined) {
  if (!user) return "N/A";

  const firstName = user.firstName ?? user.firstname ?? "";
  const lastName = user.lastName ?? user.lastname ?? "";

  const fullname = `${firstName} ${lastName}`.trim();

  if (fullname) return fullname;

  return "N/A";
}

/**
 * Get the current copyright year
 */
export function getCopyrightYear() {
  return new Date().getFullYear();
}