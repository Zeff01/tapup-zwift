#!/usr/bin/env npx tsx
// Query orders for a specific user
// Run with: npx tsx scripts/query-user-orders.ts

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs,
  orderBy,
  doc,
  getDoc
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

// User ID to search for
const TARGET_USER_ID = "JOgaBF9Q10W8RC7I5dHd"; // Original user ID

async function queryUserOrders() {
  console.log(`\n=== Querying orders for user ID: ${TARGET_USER_ID} ===\n`);

  try {
    // First, try the orders collection
    console.log("1. Checking orders collection...");
    const ordersRef = collection(db, "orders");
    const ordersQuery = query(
      ordersRef,
      where("userId", "==", TARGET_USER_ID)
    );
    const ordersSnapshot = await getDocs(ordersQuery);

    if (!ordersSnapshot.empty) {
      console.log(`Found ${ordersSnapshot.size} order(s) in orders collection:`);
      ordersSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`\nOrder ID: ${doc.id}`);
        console.log(`Status: ${data.status}`);
        console.log(`Total Amount: $${data.totalAmount}`);
        console.log(`Order Date: ${data.orderDate?.toDate()}`);
        console.log(`Items:`, JSON.stringify(data.items, null, 2));
      });
    } else {
      console.log("No orders found in orders collection.");
    }

    // Check transactions collection
    console.log("\n2. Checking transactions collection...");
    const transactionsRef = collection(db, "transactions");
    
    // Query all transactions and filter manually (to handle different field names)
    const allTransSnapshot = await getDocs(transactionsRef);
    
    console.log(`Total transactions in collection: ${allTransSnapshot.size}`);
    
    const userTransactions: any[] = [];
    allTransSnapshot.forEach((doc) => {
      const data = doc.data();
      // Check all possible user ID fields
      if (data.userId === TARGET_USER_ID || 
          data.uid === TARGET_USER_ID || 
          data.user_id === TARGET_USER_ID) {
        userTransactions.push({ id: doc.id, ...data });
      }
    });

    if (userTransactions.length > 0) {
      console.log(`\nFound ${userTransactions.length} transaction(s) for user:`);
      
      // Sort by date
      userTransactions.sort((a, b) => {
        const dateA = a.createdAt?.toDate() || new Date(0);
        const dateB = b.createdAt?.toDate() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

      userTransactions.forEach((transaction) => {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Transaction ID: ${transaction.id}`);
        console.log(`Order ID: ${transaction.orderId || 'N/A'}`);
        console.log(`Status: ${transaction.status}`);
        console.log(`Total Amount: $${transaction.totalAmount || transaction.amount || 0}`);
        console.log(`Created At: ${transaction.createdAt?.toDate()}`);
        
        if (transaction.items && transaction.items.length > 0) {
          console.log("\nItems:");
          transaction.items.forEach((item: any, index: number) => {
            console.log(`  ${index + 1}. ${item.title || item.name || 'Unknown'} - $${item.price} x ${item.quantity || 1}`);
          });
        }
        
        if (transaction.receiver) {
          console.log("\nShipping Info:");
          console.log(`  Name: ${transaction.receiver.customerName}`);
          console.log(`  Phone: ${transaction.receiver.customerPhone}`);
          console.log(`  Address: ${transaction.receiver.customerAddress}`);
        } else if (transaction.shippingInfo) {
          console.log("\nShipping Info:");
          console.log(`  Name: ${transaction.shippingInfo.recipientName}`);
          console.log(`  Phone: ${transaction.shippingInfo.contactNumber}`);
          console.log(`  Address: ${JSON.stringify(transaction.shippingInfo.address)}`);
        }
      });
    } else {
      console.log("No transactions found for this user.");
    }

    // Also check user-account collection for user details
    console.log("\n3. Checking user details...");
    try {
      const userDoc = await getDoc(doc(db, "user-account", TARGET_USER_ID));
      if (userDoc.exists()) {
        const data = userDoc.data();
        console.log("\nUser Account Details:");
        console.log(`  Name: ${data.firstName} ${data.lastName}`);
        console.log(`  Email: ${data.email}`);
        console.log(`  Phone: ${data.phone || data.phoneNumber || data.mobile || 'N/A'}`);
        if (data.address) {
          console.log(`  Address: ${JSON.stringify(data.address)}`);
        }
      } else {
        console.log("User account not found.");
      }
    } catch (error) {
      console.log("Error fetching user account:", error);
    }

  } catch (error) {
    console.error("Error querying orders:", error);
  }

  process.exit(0);
}

// Run the query
queryUserOrders();