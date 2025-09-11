// Clear the visible data from Firebase console
// Run with: npx tsx scripts/clear-visible-data.ts

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  writeBatch,
  deleteDoc
} from 'firebase/firestore';

// Explicitly set Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBKpfnARUv_Y4CHxF4hv9vT613FigJGwxw",
  authDomain: "tapup-f5368.firebaseapp.com",
  projectId: "tapup-f5368",
  storageBucket: "tapup-f5368.appspot.com",
  messagingSenderId: "526891400267",
  appId: "1:526891400267:web:a55d30b55bd1fea42421ce"
};

// Initialize Firebase
console.log('Initializing Firebase with project:', firebaseConfig.projectId);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearCollection(collectionName: string): Promise<number> {
  console.log(`\n🗑️  Clearing ${collectionName}...`);
  
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    
    console.log(`  Found ${snapshot.size} documents in ${collectionName}`);
    
    if (snapshot.empty) {
      console.log(`  ✅ No documents to delete in ${collectionName}`);
      return 0;
    }
    
    // Show documents that will be deleted
    console.log(`  Documents to delete:`);
    snapshot.docs.forEach(doc => {
      console.log(`    - ${doc.id}`);
    });
    
    // Delete in batches of 500
    const batchSize = 500;
    let totalDeleted = 0;
    
    for (let i = 0; i < snapshot.docs.length; i += batchSize) {
      const batch = writeBatch(db);
      const batchDocs = snapshot.docs.slice(i, i + batchSize);
      
      batchDocs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      totalDeleted += batchDocs.length;
      console.log(`  Deleted ${totalDeleted}/${snapshot.size} documents...`);
    }
    
    console.log(`  ✅ Successfully deleted ${totalDeleted} documents from ${collectionName}`);
    return totalDeleted;
  } catch (error) {
    console.error(`  ❌ Error clearing ${collectionName}:`, error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Clear Visible Firebase Data\n');
  console.log('================================\n');
  console.log('Connecting to Firebase project: tapup-f5368\n');
  console.log('⚠️  WARNING: This will DELETE the following data:');
  console.log('  - All transactions (6 documents visible)');
  console.log('  - All cart items');
  console.log('  - All cards');
  console.log('  - All pregenerated-cards');
  console.log('  - All subscriptions');
  console.log('\nPress Ctrl+C within 5 seconds to cancel...\n');
  
  // Give 5 seconds to cancel
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  try {
    // Collections visible in your screenshot
    const collections = [
      'transactions',
      'cart',
      'cards',
      'pregenerated-cards',
      'subscriptions',
    ];
    
    let totalDeleted = 0;
    
    for (const collectionName of collections) {
      const deleted = await clearCollection(collectionName);
      totalDeleted += deleted;
    }
    
    console.log(`\n\n✅ Total documents deleted: ${totalDeleted}`);
    console.log('\n✅ All visible collections cleared successfully!');
    console.log('\nRefresh your Firebase console to see the changes.');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
main();