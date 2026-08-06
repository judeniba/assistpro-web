# Strapi content types for AssistPro

The app is already wired to read these Strapi shapes when the environment variables are set.

## 1) Marketing content

Content type name: `marketing-contents`

You can override the default name with:

```bash
STRAPI_MARKETING_CONTENT_TYPE=marketing-contents
```

### Fields

- `heroTitle` — Text
- `heroSubtitle` — Text
- `channels` — JSON
- `campaignIdeas` — JSON
- `primaryCta` — Text
- `featuredProviderOrder` — JSON
- `services` — Repeatable component
  - `title` — Text
  - `description` — Text
- `standards` — Repeatable component
  - `label` — Text
- `featuredProvidersHeading` — Text
- `featuredProvidersSubheading` — Text
- `featuredProvidersCta` — Text
- `investmentTitle` — Text
- `investmentSubtitle` — Text
- `investmentPrimaryCta` — Text
- `investmentSecondaryCta` — Text
- `investmentHighlights` — Repeatable component
  - `label` — Text
  - `value` — Text
- `investmentTerritories` — Repeatable component
  - `country` — Text
  - `status` — Text
  - `summary` — Text
- `downloadTitle` — Text
- `downloadSubtitle` — Text
- `downloadPrimaryCta` — Text
- `downloadSecondaryCta` — Text
- `partnershipsTitle` — Text
- `partnershipsSubtitle` — Text
- `partnershipsPrimaryCta` — Text
- `partnershipsSecondaryCta` — Text
- `providerSectionTitle` — Text
- `providerSectionSubtitle` — Text
- `providerSectionEmail` — Text
- `footerLinks` — Repeatable component
  - `label` — Text
  - `href` — Text

### Example JSON payload

```json
{
  "heroTitle": "Luxury concierge talent for elite travel",
  "heroSubtitle": "Verified professionals for high-touch events and executive support.",
  "channels": ["Instagram", "LinkedIn", "WhatsApp"],
  "campaignIdeas": ["Launch a hotel partner week", "Publish verified provider stories"],
  "primaryCta": "Book a strategy call",
  "featuredProviderOrder": ["Personal Assistant", "Driver", "Hostess", "Chaperone", "Artist"],
  "services": [
    { "title": "Personal Assistants", "description": "Executive support for travel and lifestyle operations." },
    { "title": "Drivers", "description": "Professional chauffeur support for premium clients." }
  ],
  "standards": [
    { "label": "Admin-approved verification" },
    { "label": "Discretion-first standards" }
  ],
  "featuredProvidersHeading": "Most trusted providers",
  "featuredProvidersSubheading": "Browse a curated shortlist of verified professionals.",
  "featuredProvidersCta": "Explore the network",
  "investmentTitle": "Investment portfolio for exclusive country operators",
  "investmentSubtitle": "Private investors can acquire exclusive national rights to launch and monetize AssistPro in their territories.",
  "investmentPrimaryCta": "Request portfolio deck",
  "investmentSecondaryCta": "Discuss country rights",
  "investmentHighlights": [
    { "label": "License model", "value": "Exclusive country operating rights" }
  ],
  "investmentTerritories": [
    { "country": "United Arab Emirates", "status": "Open", "summary": "Premium hospitality and concierge demand." }
  ],
  "downloadTitle": "Download AssistPro",
  "downloadSubtitle": "Get the app on your preferred store.",
  "downloadPrimaryCta": "App Store",
  "downloadSecondaryCta": "Google Play",
  "partnershipsTitle": "Enterprise & hotel partnerships",
  "partnershipsSubtitle": "Pilot-ready concierge support for VIP operations.",
  "partnershipsPrimaryCta": "Partner Inquiry",
  "partnershipsSecondaryCta": "Provider Network",
  "providerSectionTitle": "Become verified",
  "providerSectionSubtitle": "Providers appear after admin verification.",
  "providerSectionEmail": "hello@assistpro.com",
  "footerLinks": [
    { "label": "Privacy", "href": "/privacy" },
    { "label": "Terms", "href": "/terms" }
  ]
}
```

## 2) Providers

Content type name: `providers`

### Fields

- `name` — Text
- `category` — Enumeration or Text
- `bio` — Text
- `languages` — JSON
- `location` — Text
- `rate` — Text
- `rating` — Number
- `reviewCount` — Number
- `verified` — Boolean
- `availableModes` — JSON
- `userId` — Text

## 3) Bookings

Content type name: `bookings`

### Fields

- `clientId` — Text
- `clientName` — Text
- `providerId` — Text
- `providerName` — Text
- `category` — Text
- `startDate` — Date
- `endDate` — Date
- `mode` — Text
- `status` — Text
- `notes` — Text
- `totalCost` — Text
- `createdAt` — DateTime

## 4) Auth

The app uses Strapi’s built-in Users & Permissions plugin.

The login route expects the Strapi auth response to contain a user with these fields:

- `email`
- `name` or `username`
- `role`
- `password`

If you want, you can also add a custom `name` field to the built-in user model or use the existing `username` field.

## 5) Investor profiles

Content type name: `investor-profiles`

You can override the default name with:

```bash
STRAPI_INVESTOR_PROFILE_CONTENT_TYPE=investor-profiles
```

### Fields

- `userId` — Text
- `clientName` — Text
- `clientEmail` — Email
- `country` — Text
- `budget` — Text
- `operatingExperience` — Long text
- `notes` — Long text
- `status` — Enumeration: `submitted`, `under-review`, `approved`
- `appliedAt` — DateTime
- `updatedAt` — DateTime
