// Debug monitor to track all Firebase operations
import { firebaseDb } from "./firebase";

// Override Firestore to catch ALL operations
if (typeof window === 'undefined') { // Only on server
  const originalCollection = firebaseDb.collection;
  const originalDoc = firebaseDb.doc;
  
  // Track collection access
  (firebaseDb as any).collection = function(path: string) {
    if (path === 'cards') {
      console.error('\n🚨🚨🚨 [DEBUG MONITOR] CARDS COLLECTION ACCESSED!');
      console.error('🚨 [DEBUG MONITOR] Stack trace:');
      console.trace();
    }
    return originalCollection.call(this, path);
  };
  
  // Track document access
  (firebaseDb as any).doc = function(path: string) {
    if (path.includes('cards/')) {
      console.error('\n🚨🚨🚨 [DEBUG MONITOR] CARDS DOCUMENT ACCESSED!');
      console.error('🚨 [DEBUG MONITOR] Path:', path);
      console.error('🚨 [DEBUG MONITOR] Stack trace:');
      console.trace();
    }
    return originalDoc.call(this, path);
  };
}

export function initDebugMonitor() {
  console.log('[DEBUG MONITOR] Initialized at:', new Date().toISOString());
}