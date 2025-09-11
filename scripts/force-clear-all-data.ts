// Force clear ALL data from all collections
// Run with: npx tsx scripts/force-clear-all-data.ts

import { initializeApp } from "firebase/app";
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
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function deleteAllDocumentsInCollection(collectionName: string) {
  console.log(`\n🗑️  Force clearing ${collectionName}...`);

  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);

    console.log(`  Found ${snapshot.size} documents in ${collectionName}`);

    if (snapshot.empty) {
      console.log(`  ✅ No documents to delete in ${collectionName}`);
      return 0;
    }

    // Delete in batches
    const batchSize = 500;
    let totalDeleted = 0;

    while (totalDeleted < snapshot.size) {
      const batch = writeBatch(db);
      let count = 0;

      snapshot.docs
        .slice(totalDeleted, totalDeleted + batchSize)
        .forEach((doc) => {
          console.log(`    Deleting document ${doc.id}...`);
          batch.delete(doc.ref);
          count++;
        });

      await batch.commit();
      totalDeleted += count;
      console.log(`  Deleted ${totalDeleted}/${snapshot.size} documents...`);
    }

    console.log(
      `  ✅ Successfully deleted all ${totalDeleted} documents from ${collectionName}`
    );
    return totalDeleted;
  } catch (error) {
    console.error(`  ❌ Error clearing ${collectionName}:`, error);
    throw error;
  }
}

async function verifyCollectionEmpty(collectionName: string) {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  if (!snapshot.empty) {
    console.log(
      `  ⚠️  WARNING: ${collectionName} still has ${snapshot.size} documents!`
    );
    return false;
  }

  console.log(`  ✅ Verified: ${collectionName} is empty`);
  return true;
}

async function main() {
  console.log("🚀 Force Clear ALL Data Script\n");
  console.log("================================\n");
  console.log(
    "⚠️  CRITICAL WARNING: This will DELETE ALL DATA from ALL collections!"
  );
  console.log(
    "This includes: orders, transactions, pregenerated cards, and more!"
  );
  console.log("Press Ctrl+C to cancel...\n");

  // Give 5 seconds to cancel
  await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    // List of ALL collections that might contain data
    const collectionsToClean = [
      "orders",
      "transactions",
      "pregenerated-cards",
      "pregeneratedCards", // Alternative naming
      "order-items",
      "order-history",
      "cards",
      "user-cards",
      "reserved-cards",
      // Add any other collections you might have
    ];

    console.log(
      `Will attempt to clear ${collectionsToClean.length} collections:\n`
    );
    collectionsToClean.forEach((col) => console.log(`  - ${col}`));

    let totalDeleted = 0;

    // Clear each collection
    for (const collectionName of collectionsToClean) {
      try {
        const deleted = await deleteAllDocumentsInCollection(collectionName);
        totalDeleted += deleted;
      } catch (error) {
        console.log(`  Skipping ${collectionName} (might not exist)`);
      }
    }

    console.log("\n\n📊 Verification Phase...");

    // Verify all collections are empty
    let allEmpty = true;
    for (const collectionName of collectionsToClean) {
      try {
        const isEmpty = await verifyCollectionEmpty(collectionName);
        if (!isEmpty) {
          allEmpty = false;
        }
      } catch (error) {
        // Collection might not exist
      }
    }

    if (!allEmpty) {
      console.log(
        "\n⚠️  Some collections still have data. Run the script again."
      );
    } else {
      console.log("\n✅ All collections verified empty!");
    }

    console.log(`\n📊 Total documents deleted: ${totalDeleted}`);
    console.log("\n✅ Force clear completed!");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error:", error);
    process.exit(1);
  }
}

// Run the script
main();
