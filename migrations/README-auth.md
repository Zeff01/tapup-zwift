# Migration with Authentication

The migration encountered permission errors because it needs proper authentication to modify Firestore documents.

## Options:

### Option 1: Use Firebase Admin SDK (Recommended for production)

1. Go to Firebase Console > Project Settings > Service Accounts
2. Generate a new private key
3. Save the JSON file as `service-account.json` in the migrations folder
4. Run the migration with admin privileges

### Option 2: Run from authenticated environment

Run the migration from an environment where you're already authenticated:
- From the Firebase CLI after running `firebase login`
- From a server with proper service account credentials

### Option 3: Temporary Firestore Rules (Development only)

**WARNING: Only for development/testing. Never use in production!**

Temporarily update your Firestore rules to allow the migration:

```javascript
// Temporary rules - REMOVE AFTER MIGRATION
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Temporary migration rules
    match /user-account/{userId} {
      allow write: if true; // TEMPORARY - REMOVE AFTER MIGRATION
    }
    match /cards/{cardId} {
      allow write: if true; // TEMPORARY - REMOVE AFTER MIGRATION
    }
    match /user-data-migrations/{userId} {
      allow write: if true; // TEMPORARY - REMOVE AFTER MIGRATION
    }
    
    // Your existing rules below...
  }
}
```

After migration, revert to your original security rules.

## Results from your migration:

- Found 3 users with card data to migrate
- 46 users had no card data to migrate
- 3 errors due to permissions

The users that need migration are:
1. jzeffsomera@gmail.com - has all card fields
2. david.estrelloso.tribugenia@gmail.com - has card fields (no physical card)
3. wendelsabayo999@gmail.com - has all card fields

## Manual Migration Alternative

Since there are only 3 users, you could manually update them in the Firebase Console:

1. Copy the card data from each user's `user-account` document
2. Update their respective cards in the `cards` collection
3. Delete the card fields from `user-account`

Fields to move:
- chosenPhysicalCard
- chosenTemplate
- company
- position
- companyBackground
- serviceDescription
- servicePhotos
- coverPhotoUrl