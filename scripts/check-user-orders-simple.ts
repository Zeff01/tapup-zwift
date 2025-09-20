// Simple script to check user orders
// Run with: npx tsx scripts/check-user-orders-simple.ts

import { collection, query, where, getDocs, doc, getDoc, orderBy } from "firebase/firestore";
import { firebaseDb } from "../lib/firebase/firebase";

async function checkUserOrders(userId: string) {
  console.log(`\n🔍 Checking orders for user: ${userId}\n`);

  try {
    // Check if user exists
    const userRef = doc(firebaseDb, "user-account", userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
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
    const ordersRef = collection(firebaseDb, "orders");
    const ordersQuery = query(ordersRef, where("userId", "==", userId));
    const ordersSnapshot = await getDocs(ordersQuery);
    
    if (!ordersSnapshot.empty) {
      console.log(`Found ${ordersSnapshot.size} orders:`);
      ordersSnapshot.forEach((doc) => {
        const order = doc.data();
        console.log(`\n   Order ID: ${doc.id}`);
        console.log(`   Status: ${order.status}`);
        console.log(`   Date: ${order.orderDate?.toDate?.()?.toLocaleString() || order.orderDate}`);
        console.log(`   Total: ₱${order.totalAmount}`);
        console.log(`   Items: ${order.items?.length || 0}`);
      });
    } else {
      console.log("No orders found in orders collection");
    }

    // Check transactions collection with different field names
    console.log("\n💳 Checking transactions collection...");
    
    const transactionsRef = collection(firebaseDb, "transactions");
    const allTransactions = new Map();
    
    // Check all possible user ID fields
    const fieldNames = ["userId", "uid", "user_id"];
    
    for (const fieldName of fieldNames) {
      const transQuery = query(transactionsRef, where(fieldName, "==", userId));
      const transSnapshot = await getDocs(transQuery);
      
      transSnapshot.forEach((doc) => {
        allTransactions.set(doc.id, { id: doc.id, ...doc.data() });
      });
    }

    if (allTransactions.size > 0) {
      console.log(`Found ${allTransactions.size} transactions:`);
      
      const statusCounts: Record<string, number> = {};
      
      allTransactions.forEach((transaction) => {
        console.log(`\n   Transaction ID: ${transaction.id}`);
        console.log(`   Status: ${transaction.status}`);
        console.log(`   Date: ${transaction.createdAt?.toDate?.()?.toLocaleString() || transaction.createdAt}`);
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
        const mappedStatus = status === "pending" ? "Pending" :
                           status === "completed" ? "To Ship" :
                           status === "shipped" ? "To Receive" :
                           status === "delivered" ? "Delivered" :
                           status;
        console.log(`   ${mappedStatus}: ${count}`);
      });
    } else {
      console.log("No transactions found");
    }

    // Let's also check how many total users have transactions
    console.log("\n📈 Checking all transactions to see active users...");
    const allTransQuery = query(transactionsRef, orderBy("createdAt", "desc"));
    const allTransSnapshot = await getDocs(allTransQuery);
    
    const userTransactionCounts = new Map();
    allTransSnapshot.forEach((doc) => {
      const data = doc.data();
      const uid = data.userId || data.uid || data.user_id;
      if (uid) {
        userTransactionCounts.set(uid, (userTransactionCounts.get(uid) || 0) + 1);
      }
    });
    
    console.log(`\nTotal transactions in system: ${allTransSnapshot.size}`);
    console.log(`Users with transactions: ${userTransactionCounts.size}`);
    
    if (userTransactionCounts.size > 0) {
      console.log("\nTop users by transaction count:");
      const sortedUsers = Array.from(userTransactionCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      
      for (const [uid, count] of sortedUsers) {
        // Get user name
        const userDoc = await getDoc(doc(firebaseDb, "user-account", uid));
        const userName = userDoc.exists() 
          ? `${userDoc.data().firstName} ${userDoc.data().lastName}`.trim() || userDoc.data().email
          : "Unknown";
        console.log(`   ${uid}: ${count} transactions (${userName})`);
      }
    }

  } catch (error) {
    console.error("Error querying orders:", error);
  }
}

// Get user ID from command line argument or use the one provided
const userId = process.argv[2] || "JOgaBF9Q10W8RC7I5dHd";

checkUserOrders(userId).then(() => {
  console.log("\n✅ Query complete\n");
  process.exit(0);
}).catch((error) => {
  console.error("Script error:", error);
  process.exit(1);
});