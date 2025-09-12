/**
 * Migration script to move card-specific data from user-account to cards collection
 * and clean up the user-account collection
 */

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteField,
  writeBatch,
  query,
  where
} from 'firebase/firestore';
import { firebaseDb } from '@/lib/firebase/firebase';

// Fields to migrate from user-account to cards
const CARD_FIELDS_TO_MIGRATE = [
  'chosenPhysicalCard',
  'chosenTemplate',
  'company',
  'position',
  'companyBackground',
  'serviceDescription',
  'servicePhotos',
  'coverPhotoUrl'
];

// Fields to remove from user-account (includes card fields + legacy fields)
const FIELDS_TO_REMOVE_FROM_USER = [
  ...CARD_FIELDS_TO_MIGRATE,
  'portfolioStatus', // if exists
  'cardName', // if exists
];

export async function migrateUserData() {
  console.log('Starting user data migration...');
  
  try {
    // Get all users
    const usersSnapshot = await getDocs(collection(firebaseDb, 'user-account'));
    const totalUsers = usersSnapshot.size;
    let processedUsers = 0;
    let migratedUsers = 0;
    let errors = 0;

    console.log(`Found ${totalUsers} users to process`);

    for (const userDoc of usersSnapshot.docs) {
      processedUsers++;
      const userId = userDoc.id;
      const userData = userDoc.data();
      
      console.log(`\nProcessing user ${processedUsers}/${totalUsers}: ${userId}`);

      try {
        // Check if user has any card data to migrate
        const hasCardData = CARD_FIELDS_TO_MIGRATE.some(field => userData[field] !== undefined);
        
        if (!hasCardData) {
          console.log(`- No card data to migrate for user ${userId}`);
          continue;
        }

        // Get user's cards
        const cardsQuery = query(
          collection(firebaseDb, 'cards'), 
          where('owner', '==', userId)
        );
        const cardsSnapshot = await getDocs(cardsQuery);
        
        console.log(`- Found ${cardsSnapshot.size} cards for user ${userId}`);

        // Prepare card data from user account
        const cardDataToMigrate: any = {};
        
        // Handle company data - convert to companies array if needed
        if (userData.company || userData.position) {
          cardDataToMigrate.companies = [{
            company: userData.company || '',
            position: userData.position || '',
            companyBackground: userData.companyBackground || '',
            serviceDescription: userData.serviceDescription || '',
            servicePhotos: userData.servicePhotos || []
          }];
        }

        // Copy other card fields
        if (userData.chosenPhysicalCard) {
          cardDataToMigrate.chosenPhysicalCard = {
            id: userData.chosenPhysicalCard,
            name: userData.chosenPhysicalCard
          };
        }
        if (userData.chosenTemplate) cardDataToMigrate.chosenTemplate = userData.chosenTemplate;
        if (userData.coverPhotoUrl) cardDataToMigrate.coverPhotoUrl = userData.coverPhotoUrl;

        // Update existing cards or create migration log
        if (cardsSnapshot.size > 0) {
          // Update only the first/primary card with the user data
          const primaryCard = cardsSnapshot.docs[0];
          const cardRef = doc(firebaseDb, 'cards', primaryCard.id);
          
          // Only update if card doesn't already have this data
          const existingCardData = primaryCard.data();
          const updates: any = {};
          
          if (!existingCardData.companies || existingCardData.companies.length === 0) {
            if (cardDataToMigrate.companies) updates.companies = cardDataToMigrate.companies;
          }
          if (!existingCardData.chosenPhysicalCard && cardDataToMigrate.chosenPhysicalCard) {
            updates.chosenPhysicalCard = cardDataToMigrate.chosenPhysicalCard;
          }
          if (!existingCardData.chosenTemplate && cardDataToMigrate.chosenTemplate) {
            updates.chosenTemplate = cardDataToMigrate.chosenTemplate;
          }
          if (!existingCardData.coverPhotoUrl && cardDataToMigrate.coverPhotoUrl) {
            updates.coverPhotoUrl = cardDataToMigrate.coverPhotoUrl;
          }

          if (Object.keys(updates).length > 0) {
            await updateDoc(cardRef, updates);
            console.log(`- Updated card ${primaryCard.id} with migrated data`);
          } else {
            console.log(`- Card ${primaryCard.id} already has all data, skipping`);
          }
        } else {
          console.log(`- No cards found for user ${userId}, data will be used when card is created`);
          // Store migration data in a separate collection for reference
          const migrationRef = doc(firebaseDb, 'user-data-migrations', userId);
          await updateDoc(migrationRef, {
            userId,
            cardData: cardDataToMigrate,
            migratedAt: new Date(),
            applied: false
          });
        }

        // Clean up user-account document
        const userRef = doc(firebaseDb, 'user-account', userId);
        const updateData: any = {};
        
        FIELDS_TO_REMOVE_FROM_USER.forEach(field => {
          if (userData[field] !== undefined) {
            updateData[field] = deleteField();
          }
        });

        if (Object.keys(updateData).length > 0) {
          await updateDoc(userRef, updateData);
          console.log(`- Cleaned up ${Object.keys(updateData).length} fields from user-account`);
          migratedUsers++;
        }

      } catch (error) {
        console.error(`Error processing user ${userId}:`, error);
        errors++;
      }
    }

    console.log('\n=== Migration Summary ===');
    console.log(`Total users processed: ${processedUsers}`);
    console.log(`Users migrated: ${migratedUsers}`);
    console.log(`Errors: ${errors}`);
    console.log('Migration completed!');
    
  } catch (error) {
    console.error('Fatal error during migration:', error);
    throw error;
  }
}

// Dry run function to preview what would be migrated
export async function dryRunMigration() {
  console.log('Running migration dry run...\n');
  
  const usersSnapshot = await getDocs(collection(firebaseDb, 'user-account'));
  const migrationPreview: any[] = [];
  
  for (const userDoc of usersSnapshot.docs) {
    const userData = userDoc.data();
    const hasCardData = CARD_FIELDS_TO_MIGRATE.some(field => userData[field] !== undefined);
    
    if (hasCardData) {
      const fieldsToMigrate = CARD_FIELDS_TO_MIGRATE.filter(field => userData[field] !== undefined);
      
      migrationPreview.push({
        userId: userDoc.id,
        email: userData.email,
        fieldsToMigrate,
        sampleData: fieldsToMigrate.reduce((acc, field) => {
          acc[field] = userData[field];
          return acc;
        }, {} as any)
      });
    }
  }
  
  console.log(`Found ${migrationPreview.length} users with card data to migrate:`);
  migrationPreview.forEach((preview, index) => {
    console.log(`\n${index + 1}. User: ${preview.email} (${preview.userId})`);
    console.log(`   Fields to migrate: ${preview.fieldsToMigrate.join(', ')}`);
  });
  
  return migrationPreview;
}