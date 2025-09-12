/**
 * Card service exports
 * Provides all card-related operations organized by domain
 */

// Creation operations
export { createCard, duplicateCard, generateMultipleCards } from "./create";

// Read operations
export { 
  getCardsByOwner, 
  getCardById, 
  getAllCards,
  getCardByCustomUrl,
  isCustomUrlAvailable 
} from "./read";

// Update operations (to be implemented)
// export { updateCardById, addCustomUrl, toggleCardDisabled, updateSingleCardPrintStatus } from "./update";

// Delete operations (to be implemented)
// export { deleteCardById, deletePrintCard, deleteMultipleCards } from "./delete";

// Transfer operations (to be implemented)
// export { transferCardOwnership, transferCardOwnershipUsingCode } from "./transfer";

// Subscription operations (to be implemented)
// export { getLatestSubscriptionExpiryDate } from "./subscription";