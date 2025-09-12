/**
 * Script to run the user data migration
 * Run with: npx tsx scripts/run-migration.ts
 */

import { config } from 'dotenv';
import { dryRunMigration, migrateUserData } from './migrate-user-data';

// Load environment variables
config();

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