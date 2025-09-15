# Database Schema and Relationships

This document describes the Firebase Firestore collections and their relationships in the TapUp digital business card system.

## Collections Overview

### 1. user-account
Primary user information and authentication data.

**Fields:**
- `uid` (string) - Primary key, matches Firebase Auth UID
- `email` (string) - User's email address
- `firstName` (string) - User's first name
- `lastName` (string) - User's last name
- `role` (string) - User role: "user" or "admin"
- `profilePictureUrl` (string) - URL to profile image
- `createdAt` (timestamp) - Account creation date
- `lastLogin` (timestamp) - Last login timestamp

### 2. cards
Digital business card data and configurations.

**Fields:**
- `id` (string) - Primary key, auto-generated
- `owner` (string) - Foreign key to user-account.uid
- `templateId` (string) - Template used (Template1-Template18)
- `chosenPhysicalCard` (object) - Physical card design info
  - `id` (string) - Card type (eclipse, aurora, viper, etc.)
- `transferCode` (string) - Unique code for card transfer/activation
- `status` (string) - "active", "reserved", "inactive"
- `activated` (boolean) - Whether card is activated
- `customUrl` (string) - Custom URL path for the card
- `customUrlUpdatedAt` (timestamp) - URL change timestamp
- `disabled` (boolean) - Whether card is disabled/enabled
- `printStatus` (boolean) - Whether card has been printed
- `portfolioStatus` (boolean) - Whether card has portfolio content
- `onboarding` (boolean) - Whether card has completed onboarding
- `subscription_id` (string) - Foreign key to subscriptions.id
- `expiryDate` (number) - Calculated expiry timestamp
- `cardName` (string) - User-defined card name
- `timestamp` (timestamp) - Last modification timestamp
- Personal Information Fields:
  - `firstName` (string) - First name on card
  - `lastName` (string) - Last name on card
  - `email` (string) - Contact email
  - `number` (string) - Contact phone number
  - `position` (string) - Job title/position
  - `company` (string) - Company name
  - `companyBackground` (string) - Company description
  - `serviceDescription` (string) - Services offered
  - `servicePhotos` (array) - Array of service image URLs
  - `coverPhotoUrl` (string) - Cover photo URL
  - `profilePictureUrl` (string) - Profile picture URL
- Social Media Links:
  - `facebookUrl` (string) - Facebook profile URL
  - `youtubeUrl` (string) - YouTube channel URL
  - `instagramUrl` (string) - Instagram profile URL
  - `twitterUrl` (string) - Twitter/X profile URL
  - `linkedinUrl` (string) - LinkedIn profile URL
  - `whatsappNumber` (string) - WhatsApp contact number
  - `skypeInviteUrl` (string) - Skype contact URL
  - `websiteUrl` (string) - Personal/company website URL
- `createdAt` (timestamp) - Card creation date
- `updatedAt` (timestamp) - Last update timestamp

### 3. pregenerated-cards
Pre-printed physical cards inventory system.

**Fields:**
- `id` (string) - Primary key, auto-generated
- `cardType` (string) - Physical design (eclipse, aurora, etc.)
- `transferCode` (string) - Unique 8-character code
- `status` (string) - "available", "reserved", "assigned"
- `reservedFor` (string) - Foreign key to user-account.uid (when reserved)
- `reservedAt` (timestamp) - When card was reserved/purchased
- `assignedTo` (string) - Foreign key to user-account.uid (when activated)
- `assignedAt` (timestamp) - When card was activated
- `createdAt` (timestamp) - When pregenerated

### 4. subscriptions
Card subscription and expiration tracking.

**Fields:**
- `id` (string) - Primary key, auto-generated
- `card_id` (string) - Foreign key to cards.id
- `user_id` (string) - Foreign key to user-account.uid
- `subscriptionDays` (number) - Subscription duration in days
- `dateStarted` (timestamp) - Subscription start date
- `createdAt` (timestamp) - Subscription creation date

### 5. transactions
Payment and order records.

**Fields:**
- `id` (string) - Primary key, auto-generated
- `userId` (string) - Foreign key to user-account.uid
- `orderId` (string) - Unique order identifier
- `items` (array) - Array of purchased items
  - `id` (string) - Item ID (card type)
  - `name` (string) - Item name
  - `price` (number) - Item price
  - `quantity` (number) - Quantity purchased
  - `subscriptionPlan` (object) - Plan details
- `status` (string) - Order status (pending, to-ship, delivered, etc.)
- `shippingInfo` (object) - Delivery details
- `totalAmount` (number) - Total transaction amount
- `paymentMethod` (string) - Payment method used
- `createdAt` (timestamp) - Transaction date

### 6. invoices
Xendit payment gateway invoice records.

**Fields:**
- `id` (string) - Primary key (Xendit invoice ID)
- `userId` (string) - Foreign key to user-account.uid
- `external_id` (string) - Internal order reference
- `status` (string) - Payment status from Xendit
- `amount` (number) - Invoice amount
- `paid_at` (timestamp) - Payment completion time
- `payment_method` (string) - Method used for payment
- `items` (array) - Invoice line items
- `created` (timestamp) - Invoice creation date
- `updated` (timestamp) - Last update from webhook

### 7. cart
Shopping cart data for users.

**Fields:**
- `id` (string) - Primary key, auto-generated
- `userUid` (string) - Foreign key to user-account.uid
- `cartItems` (array) - Array of cart items
  - `id` (string) - Item ID (card type)
  - `name` (string) - Item name
  - `price` (number) - Item price
  - `quantity` (number) - Quantity in cart
  - `image` (string) - Item image URL
  - `subscriptionPlan` (object) - Selected plan
- `updatedAt` (timestamp) - Last cart update

## Relationships Diagram

```
user-account (1) ──┬──> (n) cards
                   ├──> (n) subscriptions
                   ├──> (n) transactions
                   ├──> (n) invoices
                   ├──> (1) cart
                   └──> (n) pregenerated-cards (via reservedFor/assignedTo)

cards (1) ─────────┬──> (1) user-account (via owner)
                   ├──> (1) subscriptions
                   └──> (1) pregenerated-cards (via transferCode)

pregenerated-cards (1) ──> (0-1) user-account (via reservedFor/assignedTo)
                      └──> (0-1) cards (when activated)

subscriptions (1) ─┬──> (1) cards
                   └──> (1) user-account

transactions (1) ──┬──> (1) user-account
                   └──> (n) pregenerated-cards (items purchased)

invoices (1) ──────┬──> (1) user-account
                   └──> (1) transactions (via external_id)

cart (1) ──────────> (1) user-account
```

## Key Relationships Explained

### User to Cards (One-to-Many)
- A user can own multiple digital business cards
- Each card belongs to exactly one user via the `owner` field

### Cards to Pregenerated Cards (One-to-One)
- When a user activates a physical card using a transfer code
- The pregenerated card's `transferCode` matches the card's `transferCode`
- Status changes: available → reserved → assigned

### User to Pregenerated Cards (One-to-Many)
- `reservedFor`: User who purchased but hasn't activated the card
- `assignedTo`: User who has activated the card with transfer code

### Cards to Subscriptions (One-to-One)
- Each card has one active subscription tracking its expiration
- Subscription determines if the card is viewable/active

### User to Transactions (One-to-Many)
- Users can have multiple purchase transactions
- Each transaction contains items (physical cards) purchased

### Transactions to Invoices (One-to-One)
- Each transaction may have a corresponding Xendit invoice
- Linked via `external_id` field in invoices

### User to Cart (One-to-One)
- Each user has one shopping cart
- Cart is cleared after successful checkout

## Data Flow Examples

### 1. Physical Card Purchase Flow
```
1. User adds card to cart → cart collection updated
2. User checkouts → transaction created (status: pending)
3. Xendit invoice created → invoice collection
4. Payment success → webhook updates invoice
5. Transaction updated → status: to-ship
6. Pregenerated card reserved → status: reserved, reservedFor: userId
```

### 2. Card Activation Flow
```
1. User enters transfer code
2. System finds pregenerated-card by transferCode
3. Creates/updates card in cards collection
4. Updates pregenerated-card → status: assigned, assignedTo: userId
5. Creates subscription for the card
```

### 3. Digital Card Creation Flow
```
1. User customizes template
2. Card created in cards collection with owner: userId
3. Subscription created for the card
4. Card becomes active and viewable
```

## Notes for Diagram Tools

When creating a visual diagram:
- Use different colors for different collection types:
  - Blue: User-related (user-account)
  - Green: Card-related (cards, pregenerated-cards)
  - Yellow: Financial (transactions, invoices, subscriptions)
  - Gray: Temporary (cart)
- Show cardinality (1:1, 1:n, n:m) on relationship lines
- Highlight primary keys and foreign keys
- Group related collections together