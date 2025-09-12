// Assign super admin role to specific email
// Run with: npx tsx scripts/assign-super-admin.ts

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBKpfnARUv_Y4CHxF4hv9vT613FigJGwxw",
  authDomain: "tapup-f5368.firebaseapp.com",
  projectId: "tapup-f5368",
  storageBucket: "tapup-f5368.appspot.com",
  messagingSenderId: "526891400267",
  appId: "1:526891400267:web:a55d30b55bd1fea42421ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SUPER_ADMIN_EMAIL = "jzeffsomera@gmail.com";

async function assignSuperAdmin() {
  console.log('🚀 Assign Super Admin Role\n');
  console.log('================================\n');
  console.log(`Target email: ${SUPER_ADMIN_EMAIL}\n`);
  
  try {
    // Query for user with the specified email
    const usersRef = collection(db, 'user-account');
    const q = query(usersRef, where('email', '==', SUPER_ADMIN_EMAIL));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log(`❌ No user found with email: ${SUPER_ADMIN_EMAIL}`);
      console.log('\n⚠️  Make sure the user has created an account first.');
      process.exit(1);
    }
    
    if (querySnapshot.size > 1) {
      console.log(`⚠️  Warning: Multiple users found with email: ${SUPER_ADMIN_EMAIL}`);
      console.log('   Updating all matching users...\n');
    }
    
    // Update each matching user
    for (const userDoc of querySnapshot.docs) {
      const userData = userDoc.data();
      console.log(`\nFound user:`);
      console.log(`  - ID: ${userDoc.id}`);
      console.log(`  - Name: ${userData.firstName} ${userData.lastName}`);
      console.log(`  - Current Role: ${userData.role || 'user'}`);
      console.log(`  - Email: ${userData.email}`);
      
      // Update to super_admin role
      await updateDoc(userDoc.ref, {
        role: 'super_admin',
        updatedAt: serverTimestamp(),
      });
      
      console.log(`\n✅ Successfully updated user ${userDoc.id} to super_admin role!`);
    }
    
    console.log('\n\n🎉 Super Admin Assignment Complete!');
    console.log('================================');
    console.log(`\n✅ ${SUPER_ADMIN_EMAIL} now has super_admin role`);
    console.log('\nSuper Admin Permissions:');
    console.log('  - Can add/remove other admins');
    console.log('  - Can only generate cards in Card Bank (no other operations)');
    console.log('  - Has access to all admin areas');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error assigning super admin role:', error);
    process.exit(1);
  }
}

// Run the script
assignSuperAdmin();