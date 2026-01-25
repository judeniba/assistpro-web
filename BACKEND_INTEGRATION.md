# Backend Integration Guide for AssistPro Web

This document explains how the AssistPro web application interfaces with backend services to provide dynamic functionality.

## Architecture Overview

The application uses a **layered architecture** to separate concerns:

```
┌─────────────────┐
│   UI Layer      │ (React Components)
│   app/page.tsx  │
└────────┬────────┘
         │
┌────────▼────────┐
│  Hooks Layer    │ (React Hooks)
│  lib/hooks/     │
└────────┬────────┘
         │
┌────────▼────────┐
│ Service Layer   │ (API Functions)
│ lib/api/        │
└────────┬────────┘
         │
┌────────▼────────┐
│  API Routes     │ (Next.js API)
│  app/api/       │
└────────┬────────┘
         │
┌────────▼────────┐
│    Backend      │ (Database, External APIs)
│   (To be impl.) │
└─────────────────┘
```

## Components Created

### 1. **Type Definitions** (`lib/types/index.ts`)
Defines TypeScript interfaces for:
- `Provider` - Service provider information
- `Booking` - Booking/reservation details
- `Service` - Available services
- `User` - User account information
- Enums for categories, statuses, payment methods

### 2. **API Client** (`lib/api/client.ts`)
Low-level HTTP client with:
- Generic `apiClient()` function for all requests
- Convenience methods: `api.get()`, `api.post()`, `api.put()`, `api.delete()`
- Error handling with custom `ApiError` class
- Query parameter support

### 3. **API Services** (`lib/api/services.ts`)
High-level service functions organized by domain:
- **providerApi**: Get/create providers
- **bookingApi**: Manage bookings
- **serviceApi**: Fetch available services
- **paymentApi**: Payment integration (Stripe, Flutterwave)
- **contactApi**: Contact forms and inquiries

### 4. **React Hooks** (`lib/hooks/`)
Custom hooks for data fetching and mutations:
- `useApi()` - Generic data fetching with loading/error states
- `useMutation()` - For POST/PUT/DELETE operations
- Domain-specific hooks:
  - `useProviders()` - Fetch providers with filters
  - `useServices()` - Fetch available services
  - `useCreateBooking()` - Create a new booking
  - `useSendPartnershipInquiry()` - Send partnership request

### 5. **Utility Functions** (`lib/utils/helpers.ts`)
Helper functions for:
- Error formatting and handling
- Currency formatting
- Date/time formatting
- Debounce for search inputs

### 6. **API Routes** (`app/api/`)
Next.js API route handlers:
- `/api/providers` - Provider CRUD operations
- `/api/services` - Service listings
- `/api/contact/partnership` - Partnership inquiries
- `/api/contact/provider-verification` - Provider verification requests

## Usage Examples

### Fetching Data from Backend

```tsx
"use client";

import { useProviders } from "@/lib/hooks";
import { ServiceCategory } from "@/lib/types";

export default function ProvidersList() {
  const { data, loading, error } = useProviders({
    category: ServiceCategory.PERSONAL_ASSISTANT,
    verified: true,
  });

  if (loading) return <div>Loading providers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data?.data.map((provider) => (
        <div key={provider.id}>
          <h3>{provider.name}</h3>
          <p>{provider.bio}</p>
          <p>Rating: {provider.rating}⭐</p>
        </div>
      ))}
    </div>
  );
}
```

### Creating/Mutating Data

```tsx
"use client";

import { useCreateBooking } from "@/lib/hooks";
import { BookingDuration, ServiceCategory } from "@/lib/types";

export default function BookingForm() {
  const { mutate, loading, error } = useCreateBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await mutate({
      userId: "user-123",
      providerId: "provider-456",
      serviceCategory: ServiceCategory.DRIVER,
      startDate: "2024-01-20",
      endDate: "2024-01-21",
      duration: BookingDuration.DAILY,
      totalAmount: 320,
      currency: "USD",
    });

    if (result) {
      alert("Booking created successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Book Now"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
```

### Direct API Calls

```tsx
import { providerApi } from "@/lib/api/services";

async function fetchProviderData() {
  try {
    const response = await providerApi.getProviders({
      category: ServiceCategory.ARTIST,
      verified: true,
      page: 1,
      limit: 10,
    });
    
    console.log("Providers:", response.data);
    console.log("Total pages:", response.pagination.totalPages);
  } catch (error) {
    console.error("Failed to fetch providers:", error);
  }
}
```

## Environment Configuration

Create a `.env.local` file (already provided) with:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Payment Keys (for production)
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-...
FLUTTERWAVE_SECRET_KEY=FLWSECK-...
```

## API Endpoints Reference

### Providers
- `GET /api/providers` - List providers with filters
  - Query params: `category`, `language`, `verified`, `page`, `limit`
- `POST /api/providers` - Register new provider
- `GET /api/providers/[id]` - Get single provider (to be implemented)

### Services
- `GET /api/services` - List all available services

### Bookings
- `GET /api/bookings` - List user bookings (to be implemented)
- `POST /api/bookings` - Create new booking (to be implemented)
- `PATCH /api/bookings/[id]` - Update booking (to be implemented)

### Contact
- `POST /api/contact/partnership` - Send partnership inquiry
- `POST /api/contact/provider-verification` - Request provider verification

## Connecting to External Backend

If you have a separate backend API (e.g., Node.js, Python, Go), update the environment variable:

```bash
NEXT_PUBLIC_API_URL=https://api.assistpro.com
```

The API client will automatically route all requests to your external backend. Ensure your backend implements the same API structure or modify `lib/api/services.ts` accordingly.

## Next Steps

### Immediate TODOs:
1. **Database Integration**: Replace mock data in API routes with actual database queries
2. **Authentication**: Add user authentication (NextAuth.js, Clerk, or custom)
3. **Payment Integration**: Implement Stripe and Flutterwave payment flows
4. **Email Service**: Set up email notifications (SendGrid, AWS SES, Resend)
5. **Admin Panel**: Create admin interface for provider verification
6. **File Uploads**: Add provider photo/document upload functionality

### Database Schema Example:
```sql
-- Example PostgreSQL schema
CREATE TABLE providers (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  category VARCHAR(50) NOT NULL,
  languages TEXT[],
  hourly_rate DECIMAL(10,2),
  daily_rate DECIMAL(10,2),
  weekly_rate DECIMAL(10,2),
  bio TEXT,
  verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0,
  total_bookings INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  provider_id UUID REFERENCES providers(id),
  service_category VARCHAR(50),
  start_date DATE,
  end_date DATE,
  duration VARCHAR(50),
  status VARCHAR(50),
  total_amount DECIMAL(10,2),
  currency VARCHAR(3),
  payment_status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Testing the Integration

Run the development server:
```bash
npm install
npm run dev
```

Test API endpoints:
```bash
# Get providers
curl http://localhost:3000/api/providers

# Get services
curl http://localhost:3000/api/services

# Create provider (POST)
curl -X POST http://localhost:3000/api/providers \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","phone":"+1234567890","category":"hostess"}'
```

## Error Handling

All API functions return typed responses:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

Handle errors consistently:
```tsx
const { data, error } = useProviders();

if (error) {
  // Show user-friendly error message
  return <ErrorDisplay message={error} />;
}
```

## Security Considerations

- ✅ Environment variables for sensitive keys
- ✅ Input validation in API routes
- ✅ Type safety with TypeScript
- ⚠️ TODO: Add rate limiting
- ⚠️ TODO: Add CSRF protection
- ⚠️ TODO: Add authentication/authorization
- ⚠️ TODO: Sanitize user inputs
- ⚠️ TODO: Add API request logging

## Support

For questions or issues with the backend integration, contact: seaointeralia@gmail.com
