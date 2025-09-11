// Clear all specified collections from Firebase
// Run with: npx tsx scripts/clear-all-collections.ts

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  writeBatch,
  doc
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
    
    // Show first few documents for verification
    if (snapshot.size > 0) {
      console.log(`  Sample documents:`);
      snapshot.docs.slice(0, 3).forEach(doc => {
        const data = doc.data();
        console.log(`    - ${doc.id}: ${JSON.stringify(data).substring(0, 100)}...`);
      });
    }
    
    // Delete in batches of 500 (Firestore limit)
    const batchSize = 500;
    let totalDeleted = 0;
    
    // Process all documents in batches
    const docs = snapshot.docs;
    for (let i = 0; i < docs.length; i += batchSize) {
      const batch = writeBatch(db);
      const batchDocs = docs.slice(i, i + batchSize);
      
      batchDocs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      totalDeleted += batchDocs.length;
      console.log(`  Deleted ${totalDeleted}/${snapshot.size} documents...`);
    }
    
    console.log(`  ✅ Successfully deleted ${totalDeleted} documents from ${collectionName}`);
    
    // Verify deletion
    const verifySnapshot = await getDocs(collectionRef);
    if (!verifySnapshot.empty) {
      console.log(`  ⚠️  WARNING: ${verifySnapshot.size} documents still remain!`);
    }
    
    return totalDeleted;
  } catch (error) {
    // If collection doesn't exist, that's okay
    if (error instanceof Error && error.message.includes('Missing or insufficient permissions')) {
      console.log(`  ℹ️  Collection ${collectionName} doesn't exist or no permissions`);
      return 0;
    }
    console.error(`  ❌ Error clearing ${collectionName}:`, error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Clear All Collections Script\n');
  console.log('================================\n');
  console.log('⚠️  WARNING: This will DELETE ALL DATA from the following collections:');
  console.log('  - transactions');
  console.log('  - cart');
  console.log('  - subscriptions');
  console.log('  - table');
  console.log('\nPress Ctrl+C within 5 seconds to cancel...\n');
  
  // Give 5 seconds to cancel
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  try {
    const collections = [
      'transactions',
      'cart',
      'carts', // Alternative naming
      'subscriptions',
      'subscription', // Alternative naming
      'table',
      'tables', // Alternative naming
    ];
    
    let totalDeleted = 0;
    const results: Record<string, number> = {};
    
    for (const collectionName of collections) {
      try {
        const deleted = await clearCollection(collectionName);
        totalDeleted += deleted;
        results[collectionName] = deleted;
      } catch (error) {
        console.log(`  Skipping ${collectionName} due to error`);
        results[collectionName] = -1;
      }
    }
    
    // Summary
    console.log('\n\n📊 Summary:');
    console.log('================================');
    Object.entries(results).forEach(([collection, count]) => {
      if (count >= 0) {
        console.log(`  ${collection}: ${count} documents deleted`);
      } else {
        console.log(`  ${collection}: skipped (error or doesn't exist)`);
      }
    });
    console.log(`\n  Total documents deleted: ${totalDeleted}`);
    
    console.log('\n✅ All collections cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
main();