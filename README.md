# AssistPro Web (Landing Page)

Luxury landing page for **AssistPro** with:
- Full-screen hero **video background**
- Top-right social icons with **subtle animation** synced to video readiness (`onCanPlay`)
- Black + **luxury fashion gold** styling
- Sections: precision strip, services, download, partnerships, providers
- **Backend integration infrastructure** for dynamic data and API connectivity

## Quick start

1) Install dependencies
```bash
npm install
```

2) Add your hero video
- Put your MP4 at: `public/videos/hero-arrival.mp4`
- Or change the path in `app/page.tsx`.

3) Configure environment (optional)
- Copy `.env.example` to `.env.local`
- Update API URLs and keys as needed

4) Run
```bash
npm run dev
```

## Backend Integration

This application includes a complete backend integration infrastructure:

- ✅ **API Client** - HTTP request handling with error management
- ✅ **Type Definitions** - TypeScript interfaces for all data models
- ✅ **React Hooks** - Custom hooks for data fetching (useApi, useMutation)
- ✅ **API Routes** - Next.js API endpoints for providers, services, bookings, contact
- ✅ **Utilities** - Error handling, formatting, and helper functions

### Documentation
See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for complete documentation on:
- Architecture overview
- API endpoints reference
- Usage examples
- Connecting to external backends
- Database setup
- Security considerations

### Available API Endpoints

The application includes example API routes:

- `GET /api/services` - Fetch all available services with pricing
- `GET /api/providers` - Fetch verified service providers (with filters)
- `POST /api/providers` - Register new provider (pending admin verification)
- `POST /api/contact/partnership` - Send partnership inquiry
- `POST /api/contact/provider-verification` - Submit provider verification request

### Quick API Test

Test the endpoints:
```bash
# Get services
curl http://localhost:3000/api/services

# Get providers
curl http://localhost:3000/api/providers

# Send partnership inquiry
curl -X POST http://localhost:3000/api/contact/partnership \
  -H "Content-Type: application/json" \
  -d '{"name":"Your Name","email":"you@example.com","company":"Your Company","message":"Partnership inquiry"}'
```

## Social links
Edit links in: `components/TopRightSocialsAnimated.tsx`.

## Deploy (Vercel)
- Import the repo in Vercel
- Framework: Next.js
- Build: `npm run build`
- Add environment variables from `.env.example`


