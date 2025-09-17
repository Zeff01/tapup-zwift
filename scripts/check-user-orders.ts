import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env.local") });

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore();

async function checkUserOrders(userId: string) {
  console.log(`\n🔍 Checking orders for user: ${userId}\n`);

  try {
    // Check if user exists
    const userDoc = await db.collection("user-account").doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      console.log("✅ User found:");
      console.log(`   Name: ${userData?.firstName} ${userData?.lastName}`);
      console.log(`   Email: ${userData?.email}`);
      console.log(`   Phone: ${userData?.phone || userData?.phoneNumber || 'N/A'}\n`);
    } else {
      console.log("❌ User not found in user-account collection\n");
    }

    // Check orders collection
    console.log("📦 Checking orders collection...");
    const ordersSnapshot = await db.collection("orders")
      .where("userId", "==", userId)
      .get();
    
    if (!ordersSnapshot.empty) {
      console.log(`Found ${ordersSnapshot.size} orders:`);
      ordersSnapshot.forEach((doc) => {
        const order = doc.data();
        console.log(`\n   Order ID: ${doc.id}`);
        console.log(`   Status: ${order.status}`);
        console.log(`   Date: ${order.orderDate?.toDate().toLocaleString()}`);
        console.log(`   Total: ₱${order.totalAmount}`);
        console.log(`   Items: ${order.items?.length || 0}`);
      });
    } else {
      console.log("No orders found in orders collection");
    }

    // Check transactions collection
    console.log("\n💳 Checking transactions collection...");
    
    // Query with different field names
    const queries = [
      db.collection("transactions").where("userId", "==", userId).get(),
      db.collection("transactions").where("uid", "==", userId).get(),
      db.collection("transactions").where("user_id", "==", userId).get(),
    ];

    const results = await Promise.all(queries);
    const allTransactions = new Map();

    results.forEach(snapshot => {
      snapshot.forEach(doc => {
        allTransactions.set(doc.id, { id: doc.id, ...doc.data() });
      });
    });

    if (allTransactions.size > 0) {
      console.log(`Found ${allTransactions.size} transactions:`);
      
      const statusCounts: Record<string, number> = {};
      
      allTransactions.forEach((transaction) => {
        console.log(`\n   Transaction ID: ${transaction.id}`);
        console.log(`   Status: ${transaction.status}`);
        console.log(`   Date: ${transaction.createdAt?.toDate().toLocaleString()}`);
        console.log(`   Amount: ₱${transaction.amount || transaction.totalAmount}`);
        
        // Count statuses
        statusCounts[transaction.status] = (statusCounts[transaction.status] || 0) + 1;
        
        // Show items
        if (transaction.items?.length > 0) {
          console.log(`   Items:`);
          transaction.items.forEach((item: any, index: number) => {
            console.log(`     ${index + 1}. ${item.title || item.name || 'Unknown item'} - ₱${item.price}`);
          });
        }
      });
      
      console.log("\n📊 Status Summary:");
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`   ${status}: ${count}`);
      });
    } else {
      console.log("No transactions found");
    }

  } catch (error) {
    console.error("Error querying orders:", error);
  }
}

// Get user ID from command line argument or use the one you provided
const userId = process.argv[2] || "JOgaBF9Q10W8RC7I5dHd";

checkUserOrders(userId).then(() => {
  console.log("\n✅ Query complete\n");
  process.exit(0);
});