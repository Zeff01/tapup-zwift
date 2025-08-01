# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
```bash
npm run dev          # Start development server with Turbo
npm run ngrok-live   # Start dev server accessible externally (0.0.0.0:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run Next.js linting
```

### Environment Setup
- Copy `.env.local` from system administrator (contains Firebase and API keys)
- Firebase credentials required: API key, auth domain, project ID, storage bucket, etc.
- Xendit payment gateway keys required for payment functionality

## High-Level Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **UI**: Tailwind CSS, Radix UI/shadcn components
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Payments**: Xendit (Philippine payment gateway)
- **State**: React Query (TanStack Query) + Context API

### Routing Structure
```
/src/app/
├── (public)/          # Unauthenticated routes
│   ├── (authpages)/   # Auth flows (login, signup, password reset)
│   └── site/[id]/     # Public card viewing
├── (secured)/         # Protected routes (middleware-enforced)
│   ├── (admin)/       # Admin dashboard and management
│   └── (user)/        # User dashboard, cards, orders
└── api/               # API routes (mainly webhooks)
```

### Core Business Logic

**Digital Business Card Platform**
- Users create/customize digital cards from 18 templates
- Cards have unique URLs and QR codes for sharing
- Physical NFC-enabled cards can be ordered
- Subscription-based model with card expiration

**Key Data Flow**
1. User signs up → Firebase Auth → Create Firestore user doc
2. Card creation → Select template → Customize → Save to Firestore
3. Order flow → Add to cart → Xendit payment → Webhook updates status
4. Public sharing → site/[cardId] route loads card data

### Firebase Integration Patterns

**Collections Structure**:
- `user-account`: User profiles with roles
- `cards`: Digital card data with template configs
- `subscriptions`: Card subscription details
- `transactions`: Payment records
- `invoices`: Xendit payment invoices

**Action Pattern** (`lib/firebase/actions/`):
```typescript
// All Firebase operations go through action files
await createCard(cardData)      // card.action.ts
await updateUser(userId, data)  // user.action.ts
await getCartItems(userId)      // cart.action.ts
```

### State Management

**Provider Hierarchy**:
```tsx
<QueryProvider>           // React Query
  <UserContextProvider>   // Auth state
    <CartProvider>        // Shopping cart
      <ThemeProvider>     // Dark/light mode
```

**Key Hooks**:
- `useUserSession()`: Current user auth state
- `useCart()`: Shopping cart operations
- `useDebounceEffect()`: Debounced updates

### Payment Integration (Xendit)

**Invoice Creation Flow**:
1. User checkouts → Create Xendit invoice
2. Store invoice in Firestore
3. Redirect to Xendit payment page
4. Webhook receives status updates
5. Update order/subscription status

**Webhook Handler**: `/api/webhooks/xendit/invoice/route.ts`

### Important Patterns

**Custom URL System**:
- Cards can have custom URLs (e.g., `/site/john-doe`)
- 30-day cooldown between URL changes
- Uniqueness enforced at Firestore level

**Template System**:
- 18 pre-built templates (Template1-Template18)
- Canvas-based editor for customization
- Physical card designs mapped to templates

**Session Management**:
- JWT tokens stored in cookies
- Middleware validates on protected routes
- Session refresh handled automatically

**Card Transfer System**:
- Transfer codes allow card ownership changes
- Used for bulk enterprise deployments

### Development Notes

- No test files present - consider adding tests
- Use Turbo for faster development builds
- Firebase emulators can be used for local development
- Ngrok integration available for webhook testing
- Image uploads go to Firebase Storage
- Heavy use of React Hook Form for forms
- Debounced cart saves (500ms) to reduce writes