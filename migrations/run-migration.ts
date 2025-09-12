/**
 * Script to run the user data migration
 * Run with: npx tsx migrations/run-migration.ts
 */

// Load environment variables
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env file from project root
const envPath = path.resolve(__dirname, '../.env');
console.log('Loading environment from:', envPath);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('Error loading .env file:', result.error);
  console.log('\nPlease ensure you have a .env file in your project root with Firebase configuration.');
  process.exit(1);
}

// Verify required env vars
const requiredEnvVars = [
  'NEXT_PUBLIC_API_KEY',
  'NEXT_PUBLIC_AUTH_DOMAIN',
  'NEXT_PUBLIC_PROJECT_ID',
  'NEXT_PUBLIC_STORAGE_BUCKET',
  'NEXT_PUBLIC_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars.join(', '));
  console.log('\nPlease add these to your .env file.');
  process.exit(1);
}

import { dryRunMigration, migrateUserData } from './migrate-user-data';

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