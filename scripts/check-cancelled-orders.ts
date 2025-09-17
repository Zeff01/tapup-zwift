import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';

// Initialize Firebase Admin
const serviceAccountPath = path.join(process.cwd(), 'service-account.json');

try {
  initializeApp({
    credential: cert(serviceAccountPath)
  });
} catch (error) {
  console.error('Failed to initialize Firebase Admin. Make sure service-account.json exists in the root directory.');
  process.exit(1);
}

const db = getFirestore();

async function checkCancelledOrders() {
  console.log('=== Checking for Cancelled Orders ===\n');

  // Check in orders collection
  console.log('1. Checking "orders" collection for status = "Cancelled"...');
  const ordersRef = db.collection('orders');
  const cancelledOrdersQuery = ordersRef.where('status', '==', 'Cancelled');
  const ordersSnapshot = await cancelledOrdersQuery.get();
  
  console.log(`Found ${ordersSnapshot.size} cancelled orders in "orders" collection`);
  
  if (ordersSnapshot.size > 0) {
    console.log('\nCancelled Orders Details:');
    ordersSnapshot.forEach(doc => {
      const order = doc.data();
      console.log(`\n- Order ID: ${doc.id}`);
      console.log(`  User ID: ${order.userId || 'N/A'}`);
      console.log(`  Status: ${order.status}`);
      console.log(`  Cancelled At: ${order.cancelledAt ? new Date(order.cancelledAt.toDate()).toLocaleString() : 'N/A'}`);
      console.log(`  Cancel Reason: ${order.cancelReason || 'N/A'}`);
      console.log(`  Refund Status: ${order.refundStatus || 'N/A'}`);
      console.log(`  Total Amount: ${order.totalAmount || order.amount || 'N/A'}`);
    });
  }

  console.log('\n-----------------------------------\n');

  // Check in transactions collection
  console.log('2. Checking "transactions" collection for status = "cancelled"...');
  const transactionsRef = db.collection('transactions');
  const cancelledTransQuery = transactionsRef.where('status', '==', 'cancelled');
  const transSnapshot = await cancelledTransQuery.get();
  
  console.log(`Found ${transSnapshot.size} cancelled orders in "transactions" collection`);
  
  if (transSnapshot.size > 0) {
    console.log('\nCancelled Transactions Details:');
    transSnapshot.forEach(doc => {
      const trans = doc.data();
      console.log(`\n- Transaction ID: ${doc.id}`);
      console.log(`  User ID: ${trans.userId || trans.uid || trans.user_id || 'N/A'}`);
      console.log(`  Status: ${trans.status}`);
      console.log(`  Cancelled At: ${trans.cancelledAt ? new Date(trans.cancelledAt.toDate()).toLocaleString() : 'N/A'}`);
      console.log(`  Cancel Reason: ${trans.cancelReason || 'N/A'}`);
      console.log(`  Refund Status: ${trans.refundStatus || 'N/A'}`);
      console.log(`  Amount: ${trans.totalAmount || trans.amount || 'N/A'}`);
    });
  }

  console.log('\n-----------------------------------\n');

  // Check all statuses to see distribution
  console.log('3. Checking all order statuses in both collections...\n');
  
  // Check orders collection
  const allOrdersSnapshot = await ordersRef.get();
  const orderStatusCount: Record<string, number> = {};
  
  allOrdersSnapshot.forEach(doc => {
    const status = doc.data().status || 'No Status';
    orderStatusCount[status] = (orderStatusCount[status] || 0) + 1;
  });
  
  console.log('Orders Collection Status Distribution:');
  Object.entries(orderStatusCount).forEach(([status, count]) => {
    console.log(`  ${status}: ${count}`);
  });

  console.log('\n');

  // Check transactions collection  
  const allTransSnapshot = await transactionsRef.get();
  const transStatusCount: Record<string, number> = {};
  
  allTransSnapshot.forEach(doc => {
    const status = doc.data().status || 'No Status';
    transStatusCount[status] = (transStatusCount[status] || 0) + 1;
  });
  
  console.log('Transactions Collection Status Distribution:');
  Object.entries(transStatusCount).forEach(([status, count]) => {
    console.log(`  ${status}: ${count}`);
  });

  console.log('\n=== Check Complete ===');
}

// Run the check
checkCancelledOrders()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error checking cancelled orders:', error);
    process.exit(1);
  });