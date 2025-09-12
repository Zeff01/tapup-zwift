/**
 * Standalone migration script with embedded Firebase initialization
 * Run with: npx tsx migrations/standalone-migration.ts
 */

// Load environment variables FIRST
import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(__dirname, '../.env');
console.log('Loading environment from:', envPath);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('Error loading .env file:', result.error);
  process.exit(1);
}

// Now import Firebase after env is loaded
import { initializeApp } from 'firebase/app';
import { 
  getFirestore,
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteField,
  query,
  where
} from 'firebase/firestore';

// Initialize Firebase with loaded env vars
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

console.log('Initializing Firebase with project:', firebaseConfig.projectId);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

// Fields to remove from user-account
const FIELDS_TO_REMOVE_FROM_USER = [
  ...CARD_FIELDS_TO_MIGRATE,
  'portfolioStatus',
  'cardName',
];

async function dryRunMigration() {
  console.log('Running migration dry run...\n');
  
  const usersSnapshot = await getDocs(collection(db, 'user-account'));
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

async function migrateUserData() {
  console.log('Starting user data migration...');
  
  try {
    const usersSnapshot = await getDocs(collection(db, 'user-account'));
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
        const hasCardData = CARD_FIELDS_TO_MIGRATE.some(field => userData[field] !== undefined);
        
        if (!hasCardData) {
          console.log(`- No card data to migrate for user ${userId}`);
          continue;
        }

        // Get user's cards
        const cardsQuery = query(
          collection(db, 'cards'), 
          where('owner', '==', userId)
        );
        const cardsSnapshot = await getDocs(cardsQuery);
        
        console.log(`- Found ${cardsSnapshot.size} cards for user ${userId}`);

        // Prepare card data from user account
        const cardDataToMigrate: any = {};
        
        // Handle company data
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

        // Update existing cards
        if (cardsSnapshot.size > 0) {
          const primaryCard = cardsSnapshot.docs[0];
          const cardRef = doc(db, 'cards', primaryCard.id);
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
          console.log(`- No cards found for user ${userId}, storing for future use`);
          // Store in migration collection
          const migrationRef = doc(db, 'user-data-migrations', userId);
          await updateDoc(migrationRef, {
            userId,
            cardData: cardDataToMigrate,
            migratedAt: new Date(),
            applied: false
          });
        }

        // Clean up user-account document
        const userRef = doc(db, 'user-account', userId);
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

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const forceRun = args.includes('--force');

  console.log('=== User Data Migration Tool ===\n');

  if (isDryRun) {
    console.log('Running in DRY RUN mode - no changes will be made\n');
    await dryRunMigration();
    return;
  }

  if (!forceRun) {
    console.log('⚠️  WARNING: This will modify your database!');
    console.log('Run with --dry-run first to preview changes');
    console.log('Or run with --force to proceed with migration\n');
    return;
  }

  console.log('Starting actual migration...\n');
  
  try {
    await migrateUserData();
    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
main().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});