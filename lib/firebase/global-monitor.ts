// Global monitoring for ALL Firestore operations
let operationCount = 0;

export function logFirestoreOperation(operation: string, collection: string, data?: any) {
  // Only run on server side to avoid client-side issues
  if (typeof window !== 'undefined') {
    return; // Skip client-side logging for now
  }
  
  operationCount++;
  const timestamp = new Date().toISOString();
  
  console.log(`\n[FIRESTORE #${operationCount}] ========== ${operation.toUpperCase()} ==========`);
  console.log(`[FIRESTORE #${operationCount}] Time: ${timestamp}`);
  console.log(`[FIRESTORE #${operationCount}] Collection: ${collection}`);
  
  if (data) {
    console.log(`[FIRESTORE #${operationCount}] Data:`, JSON.stringify(data, null, 2));
  }
  
  // Special alert for cards collection
  if (collection === 'cards' || collection.includes('cards')) {
    console.error(`[FIRESTORE #${operationCount}] ⚠️⚠️⚠️ CARDS COLLECTION OPERATION DETECTED!`);
    
    if (data?.owner) {
      console.error(`[FIRESTORE #${operationCount}] 🚨🚨🚨 CREATING CARD WITH OWNER: ${data.owner}`);
    }
  }
  
  console.log(`[FIRESTORE #${operationCount}] Stack trace:`);
  console.trace();
  console.log(`[FIRESTORE #${operationCount}] =====================================\n`);
}