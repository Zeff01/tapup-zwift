#!/usr/bin/env npx tsx
// Query all cancelled orders from Firebase
// Run with: npx tsx scripts/query-cancelled-orders.ts

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

async function queryCancelledOrders() {
  console.log(`\n=== Querying Cancelled Orders from Firebase ===\n`);
  
  try {
    // First, check the orders collection
    console.log("1. Checking orders collection for cancelled orders...");
    const ordersRef = collection(db, "orders");
    const ordersQuery = query(
      ordersRef,
      where("status", "==", "Cancelled"),
      orderBy("orderDate", "desc")
    );
    
    const ordersSnapshot = await getDocs(ordersQuery);
    
    if (!ordersSnapshot.empty) {
      console.log(`\nFound ${ordersSnapshot.size} cancelled order(s) in orders collection:`);
      console.log("=" .repeat(80));
      
      ordersSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`\nOrder ID: ${doc.id}`);
        console.log(`User ID: ${data.userId}`);
        console.log(`Status: ${data.status}`);
        console.log(`Total Amount: $${data.totalAmount}`);
        console.log(`Order Date: ${data.orderDate?.toDate()}`);
        console.log(`Cancelled At: ${data.cancelledAt?.toDate() || 'N/A'}`);
        console.log(`Cancel Reason: ${data.cancelReason || 'N/A'}`);
        console.log(`Refund Status: ${data.refundStatus || 'Not requested'}`);
        if (data.refundStatus) {
          console.log(`Refund Amount: $${data.refundAmount || 0}`);
          console.log(`Refund Reason: ${data.refundReason || 'N/A'}`);
          console.log(`Refund Method: ${data.refundMethod || 'N/A'}`);
        }
        console.log(`Items:`, JSON.stringify(data.items, null, 2));
        console.log("-".repeat(80));
      });
    } else {
      console.log("No cancelled orders found in orders collection.");
    }
    
    // Check transactions collection
    console.log("\n2. Checking transactions collection for cancelled orders...");
    const transactionsRef = collection(db, "transactions");
    const transQuery = query(
      transactionsRef,
      where("status", "==", "cancelled"),
      orderBy("createdAt", "desc")
    );
    
    const transSnapshot = await getDocs(transQuery);
    
    if (!transSnapshot.empty) {
      console.log(`\nFound ${transSnapshot.size} cancelled transaction(s):`);
      console.log("=" .repeat(80));
      
      // Create a map of userId to user data for efficient lookup
      const userIds = new Set<string>();
      transSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.userId || data.uid || data.user_id) {
          userIds.add(data.userId || data.uid || data.user_id);
        }
      });
      
      // Fetch user data
      const userDataMap = new Map<string, any>();
      if (userIds.size > 0) {
        console.log(`\nFetching user data for ${userIds.size} users...`);
        const userAccountRef = collection(db, "user-account");
        for (const userId of userIds) {
          try {
            const userDoc = await getDoc(doc(userAccountRef, userId));
            if (userDoc.exists()) {
              userDataMap.set(userId, userDoc.data());
            }
          } catch (error) {
            console.log(`Error fetching user ${userId}:`, error);
          }
        }
      }
      
      transSnapshot.forEach((doc) => {
        const data = doc.data();
        const userId = data.userId || data.uid || data.user_id;
        const userData = userId ? userDataMap.get(userId) : null;
        
        console.log(`\nTransaction ID: ${doc.id}`);
        console.log(`Order ID: ${data.orderId || 'N/A'}`);
        console.log(`User ID: ${userId || 'N/A'}`);
        if (userData) {
          console.log(`User Name: ${userData.firstName} ${userData.lastName}`);
          console.log(`User Email: ${userData.email}`);
        }
        console.log(`Status: ${data.status}`);
        console.log(`Total Amount: $${data.totalAmount || data.amount || 0}`);
        console.log(`Created At: ${data.createdAt?.toDate()}`);
        console.log(`Cancelled At: ${data.cancelledAt?.toDate() || 'N/A'}`);
        console.log(`Cancel Reason: ${data.cancelReason || 'N/A'}`);
        console.log(`Cancelled By: ${data.cancelledBy || 'N/A'}`);
        
        // Refund information
        console.log(`\nRefund Status: ${data.refundStatus || 'Not requested'}`);
        if (data.refundStatus) {
          console.log(`Refund Amount: $${data.refundAmount || 0}`);
          console.log(`Refund Reason: ${data.refundReason || 'N/A'}`);
          console.log(`Refund Method: ${data.refundMethod || 'N/A'}`);
          console.log(`Refund Requested At: ${data.refundRequestedAt?.toDate() || 'N/A'}`);
          console.log(`Refund Completed At: ${data.refundCompletedAt?.toDate() || 'N/A'}`);
          if (data.refundAdminNotes) {
            console.log(`Refund Admin Notes: ${data.refundAdminNotes}`);
          }
        }
        
        if (data.items && data.items.length > 0) {
          console.log("\nItems:");
          data.items.forEach((item: any, index: number) => {
            console.log(`  ${index + 1}. ${item.title || item.name || 'Unknown'} - $${item.price} x ${item.quantity || 1}`);
          });
        }
        
        if (data.receiver) {
          console.log("\nShipping Info:");
          console.log(`  Name: ${data.receiver.customerName}`);
          console.log(`  Phone: ${data.receiver.customerPhone}`);
          console.log(`  Address: ${data.receiver.customerAddress}`);
        } else if (data.shippingInfo) {
          console.log("\nShipping Info:");
          console.log(`  Name: ${data.shippingInfo.recipientName}`);
          console.log(`  Phone: ${data.shippingInfo.contactNumber}`);
          console.log(`  Address: ${JSON.stringify(data.shippingInfo.address)}`);
        }
        
        console.log("-".repeat(80));
      });
    } else {
      console.log("No cancelled transactions found.");
    }
    
    // Also check refund-requests collection
    console.log("\n3. Checking refund-requests collection...");
    const refundRequestsRef = collection(db, "refund-requests");
    const refundQuery = query(refundRequestsRef, orderBy("requestedAt", "desc"));
    const refundSnapshot = await getDocs(refundQuery);
    
    if (!refundSnapshot.empty) {
      console.log(`\nFound ${refundSnapshot.size} refund request(s):`);
      console.log("=" .repeat(80));
      
      refundSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`\nRefund Request ID: ${doc.id}`);
        console.log(`Order ID: ${data.orderId}`);
        console.log(`User ID: ${data.userId}`);
        console.log(`Status: ${data.status}`);
        console.log(`Reason: ${data.reason}`);
        console.log(`Refund Method: ${data.refundMethod}`);
        console.log(`Requested At: ${data.requestedAt?.toDate()}`);
        if (data.orderData) {
          console.log(`Order Total: $${data.orderData.totalAmount}`);
          console.log(`Payment Method: ${data.orderData.paymentMethod}`);
        }
        if (data.adminNotes) {
          console.log(`Admin Notes: ${data.adminNotes}`);
        }
        console.log("-".repeat(80));
      });
    } else {
      console.log("No refund requests found.");
    }
    
    // Summary statistics
    console.log("\n=== Summary Statistics ===");
    const totalCancelled = ordersSnapshot.size + transSnapshot.size;
    console.log(`Total cancelled orders: ${totalCancelled}`);
    
    // Count refund statuses
    let pendingRefunds = 0;
    let completedRefunds = 0;
    let rejectedRefunds = 0;
    let noRefundRequests = 0;
    
    const allCancelledOrders = [
      ...ordersSnapshot.docs.map(d => d.data()),
      ...transSnapshot.docs.map(d => d.data())
    ];
    
    allCancelledOrders.forEach(order => {
      if (order.refundStatus === "Pending") pendingRefunds++;
      else if (order.refundStatus === "Completed") completedRefunds++;
      else if (order.refundStatus === "Rejected") rejectedRefunds++;
      else noRefundRequests++;
    });
    
    console.log(`\nRefund Status Breakdown:`);
    console.log(`  - No refund requested: ${noRefundRequests}`);
    console.log(`  - Pending refunds: ${pendingRefunds}`);
    console.log(`  - Completed refunds: ${completedRefunds}`);
    console.log(`  - Rejected refunds: ${rejectedRefunds}`);
    
  } catch (error) {
    console.error("Error querying cancelled orders:", error);
  }
  
  process.exit(0);
}

// Run the query
queryCancelledOrders();