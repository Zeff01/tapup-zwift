#!/usr/bin/env npx tsx
// Query orders by status from Firebase
// Run with: npx tsx scripts/query-orders-by-status.ts [status]
// Example: npx tsx scripts/query-orders-by-status.ts cancelled

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs,
  orderBy,
  doc,
  getDoc,
  Timestamp
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

// Get status from command line argument
const targetStatus = process.argv[2]?.toLowerCase() || 'cancelled';

// Map of order statuses between collections
const statusMap = {
  'pending': { orders: 'Pending', transactions: ['pending', 'pending-payment'] },
  'to-ship': { orders: 'To Ship', transactions: ['completed', 'to-ship'] },
  'to-receive': { orders: 'To Receive', transactions: 'shipped' },
  'delivered': { orders: 'Delivered', transactions: 'delivered' },
  'cancelled': { orders: 'Cancelled', transactions: 'cancelled' },
  'to-return': { orders: 'To Return/Refund', transactions: 'to-return' }
};

async function queryOrdersByStatus(status: string) {
  console.log(`\n=== Querying Orders with Status: ${status.toUpperCase()} ===\n`);
  
  const statusConfig = statusMap[status as keyof typeof statusMap];
  if (!statusConfig) {
    console.error(`Invalid status: ${status}`);
    console.log('Valid statuses: pending, to-ship, to-receive, delivered, cancelled, to-return');
    process.exit(1);
  }
  
  try {
    const allOrders: any[] = [];
    
    // 1. Check orders collection
    console.log("1. Checking orders collection...");
    const ordersRef = collection(db, "orders");
    const ordersQuery = query(
      ordersRef,
      where("status", "==", statusConfig.orders),
      orderBy("orderDate", "desc")
    );
    
    const ordersSnapshot = await getDocs(ordersQuery);
    
    if (!ordersSnapshot.empty) {
      console.log(`Found ${ordersSnapshot.size} order(s) in orders collection`);
      ordersSnapshot.forEach((doc) => {
        allOrders.push({
          id: doc.id,
          collection: 'orders',
          ...doc.data()
        });
      });
    } else {
      console.log("No matching orders found in orders collection.");
    }
    
    // 2. Check transactions collection
    console.log("\n2. Checking transactions collection...");
    const transactionsRef = collection(db, "transactions");
    
    // Handle multiple possible statuses for transactions
    const transactionStatuses = Array.isArray(statusConfig.transactions) 
      ? statusConfig.transactions 
      : [statusConfig.transactions];
    
    for (const transStatus of transactionStatuses) {
      const transQuery = query(
        transactionsRef,
        where("status", "==", transStatus),
        orderBy("createdAt", "desc")
      );
      
      const transSnapshot = await getDocs(transQuery);
      
      if (!transSnapshot.empty) {
        console.log(`Found ${transSnapshot.size} transaction(s) with status '${transStatus}'`);
        transSnapshot.forEach((doc) => {
          allOrders.push({
            id: doc.id,
            collection: 'transactions',
            ...doc.data()
          });
        });
      }
    }
    
    // 3. Fetch user data for all orders
    const userIds = new Set<string>();
    allOrders.forEach(order => {
      const userId = order.userId || order.uid || order.user_id;
      if (userId) userIds.add(userId);
    });
    
    const userDataMap = new Map<string, any>();
    if (userIds.size > 0) {
      console.log(`\nFetching user data for ${userIds.size} users...`);
      for (const userId of userIds) {
        try {
          const userDoc = await getDoc(doc(db, "user-account", userId));
          if (userDoc.exists()) {
            userDataMap.set(userId, userDoc.data());
          }
        } catch (error) {
          console.log(`Error fetching user ${userId}:`, error);
        }
      }
    }
    
    // 4. Display results
    console.log(`\n=== Total Orders Found: ${allOrders.length} ===`);
    console.log("=" .repeat(80));
    
    // Sort by date
    allOrders.sort((a, b) => {
      const dateA = a.orderDate?.toDate() || a.createdAt?.toDate() || new Date(0);
      const dateB = b.orderDate?.toDate() || b.createdAt?.toDate() || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
    
    allOrders.forEach((order, index) => {
      const userId = order.userId || order.uid || order.user_id;
      const userData = userId ? userDataMap.get(userId) : null;
      
      console.log(`\n[${index + 1}] ${order.collection === 'orders' ? 'Order' : 'Transaction'} ID: ${order.id}`);
      console.log(`Collection: ${order.collection}`);
      console.log(`User ID: ${userId || 'N/A'}`);
      
      if (userData) {
        console.log(`User: ${userData.firstName} ${userData.lastName} (${userData.email})`);
      }
      
      console.log(`Status: ${order.status}`);
      console.log(`Total Amount: $${order.totalAmount || order.amount || 0}`);
      console.log(`Date: ${order.orderDate?.toDate() || order.createdAt?.toDate() || 'N/A'}`);
      
      // Status-specific information
      if (status === 'cancelled') {
        console.log(`\nCancellation Details:`);
        console.log(`  Cancelled At: ${order.cancelledAt?.toDate() || 'N/A'}`);
        console.log(`  Cancel Reason: ${order.cancelReason || 'N/A'}`);
        console.log(`  Cancelled By: ${order.cancelledBy || 'N/A'}`);
        
        if (order.refundStatus) {
          console.log(`\nRefund Details:`);
          console.log(`  Refund Status: ${order.refundStatus}`);
          console.log(`  Refund Amount: $${order.refundAmount || 0}`);
          console.log(`  Refund Reason: ${order.refundReason || 'N/A'}`);
          console.log(`  Refund Method: ${order.refundMethod || 'N/A'}`);
          console.log(`  Refund Requested: ${order.refundRequestedAt?.toDate() || 'N/A'}`);
          console.log(`  Refund Completed: ${order.refundCompletedAt?.toDate() || 'N/A'}`);
        }
      }
      
      // Items
      if (order.items && order.items.length > 0) {
        console.log(`\nItems (${order.items.length}):`);
        order.items.forEach((item: any, idx: number) => {
          console.log(`  ${idx + 1}. ${item.title || item.name || item.product?.title || 'Unknown'} - $${item.price || item.product?.price || 0} x ${item.quantity || 1}`);
        });
      }
      
      // Shipping info
      const shippingInfo = order.shippingInfo || order.receiver;
      if (shippingInfo) {
        console.log(`\nShipping Info:`);
        console.log(`  Name: ${shippingInfo.recipientName || shippingInfo.customerName || 'N/A'}`);
        console.log(`  Phone: ${shippingInfo.contactNumber || shippingInfo.customerPhone || 'N/A'}`);
        if (shippingInfo.address) {
          console.log(`  Address: ${JSON.stringify(shippingInfo.address)}`);
        } else if (shippingInfo.customerAddress) {
          console.log(`  Address: ${shippingInfo.customerAddress}`);
        }
      }
      
      console.log("-".repeat(80));
    });
    
    // 5. Summary statistics
    console.log(`\n=== Summary for ${status.toUpperCase()} Orders ===`);
    console.log(`Total orders: ${allOrders.length}`);
    console.log(`From orders collection: ${allOrders.filter(o => o.collection === 'orders').length}`);
    console.log(`From transactions collection: ${allOrders.filter(o => o.collection === 'transactions').length}`);
    
    // Calculate total amount
    const totalAmount = allOrders.reduce((sum, order) => {
      return sum + (order.totalAmount || order.amount || 0);
    }, 0);
    console.log(`Total amount: $${totalAmount.toFixed(2)}`);
    
    // Status-specific statistics
    if (status === 'cancelled') {
      const withRefundRequests = allOrders.filter(o => o.refundStatus).length;
      const pendingRefunds = allOrders.filter(o => o.refundStatus === 'Pending').length;
      const completedRefunds = allOrders.filter(o => o.refundStatus === 'Completed').length;
      const rejectedRefunds = allOrders.filter(o => o.refundStatus === 'Rejected').length;
      
      console.log(`\nRefund Statistics:`);
      console.log(`  Total with refund requests: ${withRefundRequests}`);
      console.log(`  Pending refunds: ${pendingRefunds}`);
      console.log(`  Completed refunds: ${completedRefunds}`);
      console.log(`  Rejected refunds: ${rejectedRefunds}`);
      console.log(`  No refund requested: ${allOrders.length - withRefundRequests}`);
      
      // Calculate refund amounts
      const totalRefundAmount = allOrders
        .filter(o => o.refundAmount)
        .reduce((sum, order) => sum + order.refundAmount, 0);
      console.log(`  Total refund amount: $${totalRefundAmount.toFixed(2)}`);
    }
    
  } catch (error) {
    console.error("Error querying orders:", error);
  }
  
  process.exit(0);
}

// Run the query
queryOrdersByStatus(targetStatus);