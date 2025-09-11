# Firestore Security Rules

## Overview
The Firestore security rules have been updated to implement proper role-based access control (RBAC) with three user roles:
- **user**: Regular users
- **admin**: Administrators with elevated permissions
- **super_admin**: Super administrators with full system access

## Deploying the Rules

To deploy the security rules to Firebase:

```bash
firebase deploy --only firestore:rules
```

## Security Rules Structure

### User Roles
- **Regular Users**: Can only access their own data
- **Admins**: Can access all user data and manage cards
- **Super Admins**: Full system access including role management

### Key Collections

#### `/user-account/{userId}`
- Users can read and update their own profile (except role)
- Admins can read all user profiles
- Only super admins can update user roles

#### `/pregenerated-cards/{cardId}`
- All authenticated users can read cards
- Only admins can create/update/delete cards

#### `/card-generation-logs/{logId}`
- Only super admins can view generation logs
- Logs are immutable once created

#### `/transactions/{transactionId}`
- Users can view their own transactions
- Admins can view all transactions
- Webhook updates are handled server-side

## Important Notes

1. **Before deploying**: Make sure all admin users have their roles properly set in the database
2. **After deploying**: Test all user flows to ensure proper access
3. **Webhook Access**: Transaction updates from Xendit webhooks need to be handled through Cloud Functions or server-side code since webhooks don't have user authentication

## Testing the Rules

You can test the rules locally before deploying:

```bash
firebase emulators:start --only firestore
```

Then run your application against the local emulator to verify all access patterns work correctly.