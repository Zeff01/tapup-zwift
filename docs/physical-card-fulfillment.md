# Physical Card Ordering & Fulfillment Workflow

## Overview
This document explains how physical NFC business cards are ordered, fulfilled, and activated in the TapUp system.

## Pre-Production: Bulk Printing
1. **Print cards in bulk** (e.g., 1000 Vortex cards)
2. **Generate transfer codes** for each card in the system
3. **Print transfer codes** on card packaging/sleeves
4. **Store cards** in inventory (no specific order needed)

## Customer Order Process

### 1. Customer Places Order
```
Customer → Selects "Vortex" card → Pays → Order created
```

### 2. System Reserves a Card
- System finds ANY available Vortex card in `pregenerated-cards` collection
- Marks it as "reserved" for the customer
- Stores the transfer code in the order

### 3. Fulfillment (Manual Process)
- **Pick ANY physical Vortex card** from inventory
- The specific card doesn't matter - they're all identical until activated
- Pack and ship to customer
- Update order status to "Shipped"

### 4. Customer Receives Card
- Physical card arrives with transfer code on packaging
- Card is still "reserved" in system, not yet active

### 5. Card Activation
- Customer enters transfer code on website
- System links the card to their account
- Card becomes "active" and personalized with their data

## Why This Works

### Cards Are Anonymous Until Activated
- All 1000 Vortex cards are physically identical
- Transfer codes are unique but not pre-assigned
- Any card + any transfer code = valid combination

### Benefits
1. **Simple inventory** - No need to track specific cards
2. **Easy fulfillment** - Grab any card of the right type
3. **Reduced errors** - Can't ship the "wrong" card
4. **Flexible** - Can print cards before having orders

## Database Structure

### `pregenerated-cards` Collection
```javascript
{
  id: "ABC123",
  cardType: "vortex",
  transferCode: "VRTX-2024-ABCD",
  status: "available" | "reserved" | "assigned",
  reservedFor: "userId", // When purchased
  assignedTo: "userId",  // When activated
}
```

### Order Tracking
```javascript
{
  orderId: "ORDER123",
  userId: "USER456",
  items: [{
    name: "Vortex",
    transferCode: "VRTX-2024-ABCD", // For customer reference
    reservedCardId: "ABC123"
  }],
  status: "to-ship" | "shipped" | "delivered"
}
```

## Fulfillment Instructions for Staff

1. **Check "To Ship" orders** in admin panel
2. **For each order:**
   - Note the card type (e.g., "Vortex")
   - Pick ANY card of that type from inventory
   - Pack with shipping label
   - Mark as "Shipped" in system
3. **No need to match** specific transfer codes or card IDs
4. **Customer activates** using code on their package

## Example Scenario

**Inventory:** 1000 Vortex cards (IDs: V001-V1000)

**Order 1:** Customer A orders Vortex
- System reserves card V547
- Staff ships physical card #823 (any card)
- Customer activates with code from their package

**Order 2:** Customer B orders Vortex  
- System reserves card V102
- Staff ships physical card #445 (any card)
- Customer activates with code from their package

Both customers get working cards, regardless of which physical card was sent!

## FAQ

**Q: What if we accidentally ship the wrong card type?**
A: The transfer code won't work. Each code is locked to a specific card type.

**Q: Can we pre-assign cards to specific customers?**
A: Yes, but it's not recommended. It complicates fulfillment without adding value.

**Q: What if a transfer code is lost?**
A: Check the order history - the transfer code is stored there.

**Q: Can transfer codes be reused?**
A: No, each code can only be activated once.