# Philippines Cascading Address System

This document explains the new cascading address selection system implemented for Philippine addresses.

## Overview

The new system replaces manual text inputs with cascading dropdown selections to ensure accurate address data and reduce shipping errors.

## Flow

1. **Country**: Default set to "Philippines" (read-only)
2. **Province**: Select from available provinces
3. **City/Municipality**: Dropdown populated based on selected province  
4. **Barangay**: Dropdown populated based on selected city
5. **Street Address**: Manual input for specific address details
6. **ZIP Code**: Optional manual input

## Files Modified

### Core Components

- **`/lib/data/philippines-address.ts`** - Address data structure with provinces, cities, and barangays
- **`/src/app/(secured)/(user)/(boarded)/cards/_components/CascadingAddressForm.tsx`** - New cascading form component
- **`/src/app/(secured)/(user)/(boarded)/cards/_components/AddressManagement.tsx`** - Updated to use cascading form
- **`/types/types.d.ts`** - Updated DeliveryAddress interface with new fields

### Data Structure

```typescript
interface DeliveryAddress {
  // Existing fields (for backward compatibility)
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  name: string;
  street: string;
  city: string;     // Legacy field
  state: string;    // Legacy field  
  zipCode: string;
  
  // New Philippines fields
  country?: string;
  provinceCode?: string;
  provinceName?: string;
  cityCode?: string;
  cityName?: string;
  barangay?: string;
}
```

## Usage

### Adding New Addresses

When users add a new address:

1. They select a province from the dropdown
2. Cities for that province populate automatically
3. They select a city from the dropdown  
4. Barangays for that city populate automatically
5. They select a barangay from the dropdown
6. They enter street address and ZIP code manually

### Address Display

Addresses now display in this format:
```
[Address Label]
[Phone Number]
[Street Address]
[Barangay] (if available)
[City], [Province] [ZIP Code]
```

### Validation

The system validates:
- Province selection is required
- City selection is required
- Barangay selection is required
- Street address is required
- Basic personal info (name, phone) is required

## Sample Data

The system currently includes sample data for:

### NCR (National Capital Region)
- Manila
- Quezon City  
- Makati
- Pasig

### Central Luzon (Region III)
- Angeles City
- San Fernando, Pampanga

### CALABARZON (Region IV-A)  
- Antipolo
- Calamba, Laguna

## Expanding Data

To add more provinces, cities, and barangays:

1. Edit `/lib/data/philippines-address.ts`
2. Add new provinces to the `provinces` array
3. Add cities to each province's `cities` array
4. Add barangays to each city's `barangays` array

Example:
```typescript
{
  code: "REGION_V",
  name: "Bicol Region (Region V)",
  cities: [
    {
      code: "NAGA",
      name: "Naga City",
      barangays: [
        "Abella",
        "Bagumbayan North",
        "Bagumbayan South",
        // ... more barangays
      ]
    }
  ]
}
```

## Backward Compatibility

The system maintains backward compatibility:
- Existing addresses still display correctly
- Legacy `city` and `state` fields are preserved
- New addresses populate both legacy and new fields
- Address display logic checks for both old and new field formats

## Benefits

1. **Accuracy**: Prevents address typos and inconsistencies
2. **User Experience**: Guided selection is faster than typing
3. **Shipping**: Reduces delivery errors and returns
4. **Data Quality**: Standardized address format
5. **Analytics**: Better geographic data for business insights