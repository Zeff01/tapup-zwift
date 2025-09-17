#!/usr/bin/env npx tsx
// List all users to find valid user IDs
// Run with: npx tsx scripts/list-all-users.ts

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs
} from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBKpfnARUv_Y4CHxF4hv9vT613FigJGwxw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "tapup-f5368.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "tapup-f5368",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "tapup-f5368.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "526891400267",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:526891400267:web:a55d30b55bd1fea42421ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function listAllUsers() {
  console.log("\n=== Listing All Users ===\n");

  try {
    // Get all users from user-account collection
    const userAccountRef = collection(db, "user-account");
    const userAccountSnapshot = await getDocs(userAccountRef);

    console.log(`Total users in user-account collection: ${userAccountSnapshot.size}\n`);

    if (!userAccountSnapshot.empty) {
      const users: any[] = [];
      
      userAccountSnapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
          id: doc.id,
          name: `${data.firstName || ''} ${data.lastName || ''}`.trim() || data.displayName || 'Unknown',
          email: data.email,
          phone: data.phone || data.phoneNumber || data.mobile || 'N/A',
          createdAt: data.createdAt?.toDate(),
          hasAddress: !!data.address
        });
      });

      // Sort by creation date (newest first)
      users.sort((a, b) => {
        const dateA = a.createdAt || new Date(0);
        const dateB = b.createdAt || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

      // Print users
      users.forEach((user, index) => {
        console.log(`${index + 1}. User ID: ${user.id}`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Phone: ${user.phone}`);
        console.log(`   Created: ${user.createdAt || 'Unknown'}`);
        console.log(`   Has Address: ${user.hasAddress ? 'Yes' : 'No'}`);
        console.log('');
      });

      // Check if the target user exists
      const targetUserId = "JOgaBF9Q10W8RC7I5dHd";
      const targetUser = users.find(u => u.id === targetUserId);
      
      console.log(`\n${'='.repeat(50)}`);
      console.log(`Looking for user ID: ${targetUserId}`);
      console.log(targetUser ? `✓ User found: ${targetUser.name} (${targetUser.email})` : `✗ User not found`);
      
    } else {
      console.log("No users found in user-account collection.");
    }

    // Also get unique user IDs from transactions
    console.log(`\n${'='.repeat(50)}`);
    console.log("User IDs found in transactions collection:");
    
    const transactionsRef = collection(db, "transactions");
    const transSnapshot = await getDocs(transactionsRef);
    
    const userIdsInTransactions = new Set<string>();
    
    transSnapshot.forEach((doc) => {
      const data = doc.data();
      const userId = data.userId || data.uid || data.user_id;
      if (userId) {
        userIdsInTransactions.add(userId);
      }
    });

    console.log(`\nUnique user IDs in transactions: ${userIdsInTransactions.size}`);
    
    const userIdsArray = Array.from(userIdsInTransactions);
    userIdsArray.forEach((userId, index) => {
      console.log(`${index + 1}. ${userId}`);
    });

  } catch (error) {
    console.error("Error listing users:", error);
  }

  process.exit(0);
}

// Run the listing
listAllUsers();