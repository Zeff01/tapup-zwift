// Clear all pregenerated cards from card bank
// Run with: npx tsx scripts/clear-card-bank.ts

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  deleteDoc,
  writeBatch,
  query,
  limit
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

async function clearCardBank() {
  console.log('\n🗑️  Clearing Card Bank (pregenerated-cards collection)...\n');
  
  try {
    const collectionRef = collection(db, 'pregenerated-cards');
    
    // First, check what's in there
    console.log('📊 Checking current cards...');
    const checkSnapshot = await getDocs(query(collectionRef, limit(5)));
    
    if (!checkSnapshot.empty) {
      console.log(`Found ${checkSnapshot.size} cards (showing first 5):`);
      checkSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`  - ${doc.id}: ${data.cardType} (${data.status}) - ${data.transferCode}`);
      });
    }
    
    // Get all documents
    const snapshot = await getDocs(collectionRef);
    console.log(`\nTotal cards found: ${snapshot.size}`);
    
    if (snapshot.empty) {
      console.log('✅ No cards to delete');
      return 0;
    }
    
    // Delete in batches
    const batchSize = 500;
    let totalDeleted = 0;
    let batch = writeBatch(db);
    let operationCount = 0;
    
    for (const doc of snapshot.docs) {
      batch.delete(doc.ref);
      operationCount++;
      totalDeleted++;
      
      if (operationCount === batchSize) {
        await batch.commit();
        console.log(`  Deleted ${totalDeleted} cards...`);
        batch = writeBatch(db);
        operationCount = 0;
      }
    }
    
    // Commit remaining operations
    if (operationCount > 0) {
      await batch.commit();
    }
    
    console.log(`\n✅ Successfully deleted ${totalDeleted} cards`);
    
    // Verify deletion
    console.log('\n🔍 Verifying deletion...');
    const verifySnapshot = await getDocs(collectionRef);
    
    if (verifySnapshot.empty) {
      console.log('✅ Verified: pregenerated-cards collection is now empty');
    } else {
      console.log(`⚠️  WARNING: ${verifySnapshot.size} cards still remain!`);
    }
    
    return totalDeleted;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Clear Card Bank Script\n');
  console.log('================================\n');
  console.log('This will delete ALL pregenerated cards from the card bank.');
  console.log('Press Ctrl+C to cancel...\n');
  
  // Give 3 seconds to cancel
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  try {
    await clearCardBank();
    console.log('\n✅ Card bank cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Failed to clear card bank:', error);
    process.exit(1);
  }
}

// Run the script
main();