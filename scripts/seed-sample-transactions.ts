// Seed sample transactions data
// Run with: npx tsx scripts/seed-sample-transactions.ts

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc,
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

// Sample user data
const sampleUsers = [
  { id: "user1", name: "John Doe", email: "john.doe@example.com", phone: "+639123456789" },
  { id: "user2", name: "Jane Smith", email: "jane.smith@example.com", phone: "+639234567890" },
  { id: "user3", name: "Miguel Santos", email: "miguel.santos@example.com", phone: "+639345678901" },
  { id: "user4", name: "Maria Cruz", email: "maria.cruz@example.com", phone: "+639456789012" },
  { id: "user5", name: "Jose Reyes", email: "jose.reyes@example.com", phone: "+639567890123" }
];

// Card types and prices
const cardTypes = [
  { id: "eclipse", name: "Eclipse", price: 600 },
  { id: "aurora", name: "Aurora", price: 600 },
  { id: "viper", name: "Viper", price: 600 },
  { id: "vortex", name: "Vortex", price: 600 },
  { id: "bloom", name: "Bloom", price: 600 }
];

// Generate random date within last 30 days
function randomDate() {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return Timestamp.fromDate(date);
}

// Generate random status based on realistic distribution
function randomStatus() {
  const rand = Math.random();
  if (rand < 0.7) return "completed";      // 70% completed
  if (rand < 0.85) return "processing";    // 15% processing
  if (rand < 0.95) return "pending";       // 10% pending
  return "cancelled";                       // 5% cancelled
}

// Generate random address
function randomAddress(city: string) {
  const streets = ["Rizal St", "Bonifacio Ave", "Quezon Blvd", "Magsaysay Dr", "Roxas Ave"];
  const barangays = ["San Antonio", "Poblacion", "Santa Rosa", "San Miguel", "Santo Niño"];
  const street = streets[Math.floor(Math.random() * streets.length)];
  const barangay = barangays[Math.floor(Math.random() * barangays.length)];
  return `${Math.floor(Math.random() * 999) + 1} ${street}, Brgy. ${barangay}, ${city}`;
}

async function createSampleTransaction(userIndex: number) {
  const user = sampleUsers[userIndex % sampleUsers.length];
  const numCards = Math.floor(Math.random() * 3) + 1; // 1-3 cards per order
  
  // Random selection of cards
  const selectedCards = [];
  const items = [];
  let totalAmount = 0;
  
  for (let i = 0; i < numCards; i++) {
    const card = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    const quantity = Math.floor(Math.random() * 2) + 1; // 1-2 quantity
    
    selectedCards.push({
      id: card.id,
      name: card.name
    });
    
    items.push({
      id: card.id,
      name: card.name,
      quantity: quantity,
      price: card.price
    });
    
    totalAmount += card.price * quantity;
  }
  
  const cities = ["Manila", "Quezon City", "Makati", "Pasig", "Taguig", "Cebu City", "Davao City"];
  const city = cities[Math.floor(Math.random() * cities.length)];
  
  const transaction = {
    // User info
    user_id: user.id,
    userId: user.id, // For backward compatibility
    
    // Receiver/shipping info
    receiver: {
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone,
      customerAddress: randomAddress(city)
    },
    
    // Order details
    cards: selectedCards,
    items: items,
    amount: totalAmount,
    
    // Status and dates
    status: randomStatus(),
    createdAt: randomDate(),
    updatedAt: randomDate(),
    
    // Payment info (for completed/processing orders)
    paymentUrl: null,
    xenditPlanId: `plan_${Math.random().toString(36).substring(7)}`,
    
    // Additional fields
    orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    paymentMethod: "xendit",
    notes: ""
  };
  
  // Add shipping info for some transactions
  if (Math.random() > 0.3) {
    transaction['shippingInfo'] = {
      email: user.email,
      phone: user.phone,
      address: randomAddress(city),
      recipientName: user.name,
      contactNumber: user.phone,
      city: city,
      zipCode: Math.floor(Math.random() * 9000) + 1000
    };
  }
  
  return transaction;
}

async function main() {
  console.log('🚀 Seed Sample Transactions\n');
  console.log('================================\n');
  console.log('This will create sample transaction data for testing.\n');
  
  try {
    const transactionsRef = collection(db, 'transactions');
    const numTransactions = 25; // Create 25 sample transactions
    
    console.log(`Creating ${numTransactions} sample transactions...\n`);
    
    const promises = [];
    for (let i = 0; i < numTransactions; i++) {
      const transaction = await createSampleTransaction(i);
      promises.push(addDoc(transactionsRef, transaction));
      console.log(`✅ Created transaction ${i + 1}/${numTransactions}: ${transaction.receiver.customerName} - ₱${transaction.amount} (${transaction.status})`);
    }
    
    await Promise.all(promises);
    
    // Summary
    console.log('\n\n📊 Summary:');
    console.log('================================');
    console.log(`✅ Successfully created ${numTransactions} sample transactions`);
    console.log('\nStatus distribution:');
    console.log('  - ~70% completed');
    console.log('  - ~15% processing');
    console.log('  - ~10% pending');
    console.log('  - ~5% cancelled');
    console.log('\n✅ Sample data seeded successfully!');
    console.log('\nRefresh your admin transactions page to see the data.');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding data:', error);
    process.exit(1);
  }
}

// Run the script
main();