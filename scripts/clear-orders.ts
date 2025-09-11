// Script to clear all orders data - run with: npx tsx scripts/clear-orders.ts
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  deleteDoc,
  writeBatch 
} from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearCollection(collectionName: string) {
  console.log(`\n🗑️  Clearing ${collectionName}...`);
  
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    
    if (snapshot.empty) {
      console.log(`  ✅ No documents found in ${collectionName}`);
      return 0;
    }
    
    const batchSize = 500;
    let batch = writeBatch(db);
    let operationCount = 0;
    let totalDeleted = 0;
    
    for (const docSnapshot of snapshot.docs) {
      batch.delete(docSnapshot.ref);
      operationCount++;
      totalDeleted++;
      
      if (operationCount === batchSize) {
        await batch.commit();
        console.log(`  Deleted ${totalDeleted} documents so far...`);
        batch = writeBatch(db);
        operationCount = 0;
      }
    }
    
    // Commit any remaining operations
    if (operationCount > 0) {
      await batch.commit();
    }
    
    console.log(`  ✅ Successfully deleted ${totalDeleted} documents from ${collectionName}`);
    return totalDeleted;
  } catch (error) {
    console.error(`  ❌ Error clearing ${collectionName}:`, error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Clear Orders Data Script\n');
  console.log('================================\n');
  console.log('⚠️  WARNING: This will DELETE all orders and related data!');
  console.log('Press Ctrl+C to cancel...\n');
  
  // Give 3 seconds to cancel
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  try {
    const collectionsToClean = [
      'orders',
      'transactions', 
      'pregenerated-cards' // in case there are reserved cards
    ];
    
    let totalDeleted = 0;
    
    for (const collectionName of collectionsToClean) {
      const deleted = await clearCollection(collectionName);
      totalDeleted += deleted;
    }
    
    // Reset reserved card statuses
    console.log('\n🔄 Resetting reserved card statuses...');
    const cardsRef = collection(db, 'pregenerated-cards');
    const cardsSnapshot = await getDocs(cardsRef);
    
    let resetCount = 0;
    const batch = writeBatch(db);
    
    cardsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.status === 'reserved') {
        batch.update(doc.ref, {
          status: 'available',
          reservedFor: null,
          reservedAt: null
        });
        resetCount++;
      }
    });
    
    if (resetCount > 0) {
      await batch.commit();
      console.log(`  ✅ Reset ${resetCount} reserved cards to available`);
    }
    
    console.log('\n\n✅ All data cleared successfully!');
    console.log(`📊 Total documents deleted: ${totalDeleted}`);
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

// Run the script
main();