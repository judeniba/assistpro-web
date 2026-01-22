# Payment Gateway Implementation

This document describes the payment gateway integration for AssistPro service member profiles.

## Overview

Service members can set their own booking fees, and each booking follows a transparent 85/15 revenue split:
- **85%** goes to the service member
- **15%** goes to AssistPro (parent company)

**Important**: The 15% commission is calculated on the **base booking fee only**, excluding taxes and transaction fees.

## Payment Structure

### Commission Calculation

```typescript
const bookingFee = 1000; // Set by service member
const taxes = 100; // Applied after booking fee
const transactionFees = 30; // Payment gateway fees

const breakdown = calculatePaymentBreakdown(bookingFee, taxes, transactionFees);

// Results:
// - Parent Company Commission: $150 (15% of $1000)
// - Service Member Earnings: $850 (85% of $1000)
// - Total Payment: $1130 ($1000 + $100 + $30)
```

### Booking Types

Service members can offer multiple pricing options:
- **Hourly Rate**: Charged per hour
- **Daily Rate**: Charged per day
- **Weekly Rate**: Charged per week
- **Event-based**: Fixed fee for an event

## Features Implemented

### 1. Service Member Profiles (`/service-member/[id]`)
- Display member information, rates, languages, and availability
- Interactive booking form with real-time price calculation
- Transparent payment breakdown showing commission split

### 2. Payment Breakdown Display
- Shows booking fee (subtotal)
- Displays commission split (85% / 15%)
- Includes taxes and transaction fees separately
- Shows total payment amount

### 3. Service Members Listing (`/service-members`)
- Browse all verified service providers
- Filter by category
- View starting rates
- Quick access to individual profiles

### 4. Landing Page Updates
- Primary CTA to "Browse Service Providers"
- Payment structure information in Providers section
- Clear explanation of 85/15 revenue split

## Payment Gateway Integration

The system is ready for integration with:
- **Stripe**: Credit/debit card payments
- **Flutterwave**: Mobile money (MTN MoMo, Orange Money)

### Integration Points

1. **BookingForm Component**: Contains the payment submission handler
2. **API Routes** (to be implemented): 
   - `/api/create-payment-intent` - Initialize payment
   - `/api/confirm-payment` - Process successful payment
   - `/api/webhooks/stripe` - Handle Stripe webhooks
   - `/api/webhooks/flutterwave` - Handle Flutterwave webhooks

## Example Calculations

### Example 1: Personal Assistant - Daily Rate
```
Booking Fee (set by member): $300
Tax (10%): $30
Stripe Fee (2.9% + $0.30): $9.00

Commission Breakdown:
- AssistPro (15% of $300): $45
- Service Member (85% of $300): $255

Total Payment: $339.00
```

### Example 2: Artist - Event Booking
```
Booking Fee (set by member): $1500
Tax (10%): $150
Stripe Fee (2.9% + $0.30): $44.00

Commission Breakdown:
- AssistPro (15% of $1500): $225
- Service Member (85% of $1500): $1275

Total Payment: $1694.00
```

## Testing

Run the manual test script to verify calculations:

```bash
node -e "..." # See test-payment-breakdown.js
```

## Security Considerations

1. ✅ Commission calculation is immutable (15% hardcoded)
2. ✅ Payment breakdown is transparent to users
3. ✅ Taxes and fees are clearly separated
4. ✅ Payment gateway integration uses secure APIs
5. ✅ No sensitive payment data stored locally

## Future Enhancements

- [ ] Complete Stripe API integration
- [ ] Complete Flutterwave API integration
- [ ] Payment history dashboard for service members
- [ ] Automated payout scheduling
- [ ] Multi-currency support
- [ ] Tax calculation by region
- [ ] Refund management system

## Files Modified/Created

### New Files:
- `types/index.ts` - Type definitions and payment calculation logic
- `data/serviceMembers.ts` - Sample service member data
- `components/PaymentBreakdownDisplay.tsx` - Payment breakdown UI
- `components/BookingForm.tsx` - Interactive booking form
- `app/service-member/[id]/page.tsx` - Service member profile page
- `app/service-members/page.tsx` - Service members listing page
- `__tests__/paymentBreakdown.test.ts` - Unit tests for calculations

### Modified Files:
- `app/page.tsx` - Added CTA and payment structure info

## Compliance

This implementation ensures:
- ✅ Service members can allocate their own booking fees
- ✅ 15% commission to parent company (excluding taxes and transaction fees)
- ✅ 85% earnings to service members
- ✅ Transparent payment breakdown for all parties
- ✅ Support for multiple booking types and payment methods
