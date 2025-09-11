// Direct database fix script - run with: npx tsx scripts/direct-fix-data.ts
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  writeBatch 
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

async function analyzeData() {
  console.log('\n📊 Analyzing transaction data...\n');
  
  const transactionsRef = collection(db, 'transactions');
  const allTransactions = await getDocs(transactionsRef);
  
  const analysis = {
    total: allTransactions.size,
    byStatus: {} as Record<string, number>,
    missingReceiver: 0,
    missingUserId: 0,
    missingItems: 0,
    emptyTransactions: 0
  };
  
  allTransactions.docs.forEach((doc) => {
    const data = doc.data();
    
    // Count by status
    const status = data.status || 'undefined';
    analysis.byStatus[status] = (analysis.byStatus[status] || 0) + 1;
    
    // Check for missing data
    if (!data.receiver || !data.receiver.customerName) {
      analysis.missingReceiver++;
    }
    if (!data.user_id && !data.userId) {
      analysis.missingUserId++;
    }
    if ((!data.items || data.items.length === 0) && (!data.cards || data.cards.length === 0)) {
      analysis.missingItems++;
    }
    if (!data.user_id && !data.userId && !data.items && !data.cards && !data.amount) {
      analysis.emptyTransactions++;
    }
  });
  
  console.log('Total transactions:', analysis.total);
  console.log('\nStatus breakdown:');
  Object.entries(analysis.byStatus).forEach(([status, count]) => {
    console.log(`  ${status}: ${count}`);
  });
  console.log('\nIssues found:');
  console.log(`  Missing receiver info: ${analysis.missingReceiver}`);
  console.log(`  Missing user ID: ${analysis.missingUserId}`);
  console.log(`  No items/cards: ${analysis.missingItems}`);
  console.log(`  Empty transactions: ${analysis.emptyTransactions}`);
  
  return analysis;
}

async function fixStatuses() {
  console.log('\n🔧 Fixing transaction statuses...\n');
  
  const transactionsRef = collection(db, 'transactions');
  const allTransactions = await getDocs(transactionsRef);
  
  let updatedCount = 0;
  const statusMapping: Record<string, string> = {
    'to-ship': 'processing',
    'shipping': 'completed',
    'delivered': 'completed'
  };
  
  for (const docSnapshot of allTransactions.docs) {
    const data = docSnapshot.data();
    const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    
    if (data.status && !validStatuses.includes(data.status)) {
      const newStatus = statusMapping[data.status] || 'processing';
      
      await updateDoc(docSnapshot.ref, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      
      console.log(`  Updated ${docSnapshot.id}: ${data.status} → ${newStatus}`);
      updatedCount++;
    }
  }
  
  console.log(`\n✅ Updated ${updatedCount} transactions`);
  return updatedCount;
}

async function fixMissingCustomers() {
  console.log('\n🔧 Fixing missing customer data...\n');
  
  const transactionsRef = collection(db, 'transactions');
  const allTransactions = await getDocs(transactionsRef);
  
  let deletedCount = 0;
  let fixedCount = 0;
  
  for (const docSnapshot of allTransactions.docs) {
    const data = docSnapshot.data();
    const hasReceiver = data.receiver && 
                        (data.receiver.customerName || 
                         data.receiver.customerEmail || 
                         data.receiver.customerId);
    
    const hasUserId = data.user_id || data.userId;
    const hasItems = data.items && data.items.length > 0;
    const hasCards = data.cards && data.cards.length > 0;
    
    if (!hasReceiver) {
      // Check if we can fix it with existing data
      if (hasUserId && (hasItems || hasCards)) {
        // Try to construct receiver from other fields
        const receiver = {
          customerId: data.userId || data.user_id || '',
          customerName: data.customerName || 'Unknown Customer',
          customerEmail: data.customerEmail || data.email || '',
          customerPhone: data.customerPhone || data.phone || '',
          customerAddress: data.customerAddress || data.address || ''
        };
        
        await updateDoc(docSnapshot.ref, {
          receiver,
          updatedAt: new Date().toISOString()
        });
        
        console.log(`  Fixed ${docSnapshot.id}: Added receiver info`);
        fixedCount++;
      } else if (!hasUserId && !hasItems && !hasCards && (!data.amount || data.amount === 0)) {
        // Delete truly empty transactions
        await deleteDoc(docSnapshot.ref);
        console.log(`  Deleted empty transaction: ${docSnapshot.id}`);
        deletedCount++;
      }
    }
  }
  
  console.log(`\n✅ Fixed ${fixedCount} transactions`);
  console.log(`🗑️  Deleted ${deletedCount} empty transactions`);
  
  return { fixedCount, deletedCount };
}

async function main() {
  console.log('🚀 Direct Transaction Data Fix Script\n');
  console.log('================================\n');
  
  try {
    // Step 1: Initial analysis
    const initialAnalysis = await analyzeData();
    
    // Step 2: Fix statuses if needed
    if (initialAnalysis.byStatus['to-ship'] || 
        initialAnalysis.byStatus['shipping'] || 
        initialAnalysis.byStatus['delivered']) {
      await fixStatuses();
    } else {
      console.log('\n✅ No status fixes needed');
    }
    
    // Step 3: Fix missing customer data
    if (initialAnalysis.missingReceiver > 0 || initialAnalysis.emptyTransactions > 0) {
      await fixMissingCustomers();
    } else {
      console.log('\n✅ No customer data fixes needed');
    }
    
    // Step 4: Final analysis
    console.log('\n\n📊 Final analysis after fixes:');
    await analyzeData();
    
    console.log('\n\n✅ All fixes completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

// Run the script
main();