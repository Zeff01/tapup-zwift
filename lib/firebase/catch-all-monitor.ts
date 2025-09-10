// Catch ALL Firebase operations
import { firebaseDb } from "./firebase";

let operationId = 0;

// Store original functions
const originalFunctions = {
  collection: firebaseDb.collection?.bind(firebaseDb),
  doc: firebaseDb.doc?.bind(firebaseDb),
};

// Override collection method
if (firebaseDb.collection) {
  (firebaseDb as any).collection = function(path: string) {
    operationId++;
    console.error(`\n🔴🔴🔴 [CATCH-ALL #${operationId}] COLLECTION ACCESS: ${path}`);
    console.error(`🔴 [CATCH-ALL #${operationId}] Time: ${new Date().toISOString()}`);
    
    if (path === 'cards') {
      console.error(`🔴🔴🔴 [CATCH-ALL #${operationId}] ⚠️⚠️⚠️ CARDS COLLECTION ACCESSED!`);
      console.trace();
    }
    
    return originalFunctions.collection!(path);
  };
}

// Override doc method
if (firebaseDb.doc) {
  (firebaseDb as any).doc = function(path: string) {
    operationId++;
    
    if (path.includes('cards')) {
      console.error(`\n🔴🔴🔴 [CATCH-ALL #${operationId}] DOC ACCESS: ${path}`);
      console.error(`🔴🔴🔴 [CATCH-ALL #${operationId}] ⚠️⚠️⚠️ CARDS DOCUMENT ACCESSED!`);
      console.trace();
    }
    
    return originalFunctions.doc!(path);
  };
}

// Export for import side effects
export function initCatchAllMonitor() {
  console.error('🔴🔴🔴 [CATCH-ALL MONITOR] Initialized - Monitoring ALL Firebase operations');
}