# Database Migrations

This directory contains database migration scripts that are run separately from the main application.

## User Data Migration

This migration moves card-specific data from the `user-account` collection to the `cards` collection to prevent data duplication.

### Running the Migration

1. **Preview changes (dry run):**
   ```bash
   npx tsx migrations/standalone-migration.ts --dry-run
   ```

2. **Execute the migration:**
   ```bash
   npx tsx migrations/standalone-migration.ts --force
   ```

**Note:** The migration requires proper Firebase authentication. See README-auth.md for authentication options.

### What this migration does:

1. Scans all documents in the `user-account` collection
2. Identifies card-specific fields (company, position, chosenTemplate, etc.)
3. Moves these fields to the user's cards in the `cards` collection
4. Removes the card-specific fields from `user-account`
5. Creates a migration log for users without cards

### Fields that get migrated:
- `chosenPhysicalCard`
- `chosenTemplate`
- `company`
- `position`
- `companyBackground`
- `serviceDescription`
- `servicePhotos`
- `coverPhotoUrl`

### Fields that remain in user-account:
- User profile data (firstName, lastName, email, etc.)
- Social media links
- Delivery addresses
- Subscriptions
- Card ordering preferences