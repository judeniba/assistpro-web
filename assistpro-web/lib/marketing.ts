export interface MarketingContent {
  heroTitle: string;
  heroSubtitle: string;
  channels: string[];
  campaignIdeas: string[];
  primaryCta: string;
  featuredProviderOrder?: string[];
  services?: Array<{ title: string; description: string }>;
  standards?: Array<{ label: string }>;
  featuredProvidersHeading?: string;
  featuredProvidersSubheading?: string;
  featuredProvidersCta?: string;
  investmentTitle?: string;
  investmentSubtitle?: string;
  investmentPrimaryCta?: string;
  investmentSecondaryCta?: string;
  investmentHighlights?: Array<{ label: string; value: string }>;
  investmentTerritories?: Array<{ country: string; status: string; summary: string }>;
  downloadTitle?: string;
  downloadSubtitle?: string;
  downloadPrimaryCta?: string;
  downloadSecondaryCta?: string;
  partnershipsTitle?: string;
  partnershipsSubtitle?: string;
  partnershipsPrimaryCta?: string;
  partnershipsSecondaryCta?: string;
  providerSectionTitle?: string;
  providerSectionSubtitle?: string;
  providerSectionEmail?: string;
  footerLinks?: Array<{ label: string; href: string }>;
}

export function getMarketingContent(): MarketingContent {
  return {
    heroTitle: "AssistPro media campaigns for luxury hospitality and executive service brands",
    heroSubtitle:
      "Turn verified provider access into premium lead generation with concierge-ready positioning, multilingual outreach, and hospitality-focused campaigns.",
    channels: ["Instagram", "LinkedIn", "WhatsApp", "Partner concierge networks"],
    campaignIdeas: [
      "Launch a luxury hospitality partner week",
      "Showcase verified provider stories in short-form reels",
      "Publish concierge-ready service bundles for hotels and VIP hosts",
    ],
    primaryCta: "Book a strategy call",
    featuredProviderOrder: ["Personal Assistant", "Driver", "Hostess", "Chaperone", "Artist"],
    services: [
      {
        title: "Personal Assistants",
        description: "Daily, weekly, or long-term support for travel, scheduling, and lifestyle operations.",
      },
      {
        title: "Drivers (Client Vehicle)",
        description: "Professional drivers operating the client’s vehicle—executive standard, safety-first.",
      },
      {
        title: "Chaperones (Male)",
        description: "Professional presence for events and travel. Verified, discreet, and policy-enforced.",
      },
      {
        title: "Hostesses (Female)",
        description: "Event-facing hospitality professionals for VIP guest management, conferences, and launches.",
      },
      {
        title: "Artists",
        description: "Verified talent for performances and events—portfolio-based, brand-safe.",
      },
    ],
    standards: [
      { label: "Admin-approved verification" },
      { label: "Discretion-first standards" },
      { label: "No minors permitted" },
      { label: "Global multilingual service" },
    ],
    featuredProvidersHeading: "Most trusted providers on the front page",
    featuredProvidersSubheading:
      "Clients can browse a curated showcase of verified personal assistants, drivers, hostesses, chaperones, and artists with real ratings and profile photos.",
    featuredProvidersCta: "View all providers",
    investmentTitle: "Investment portfolio for exclusive country operators",
    investmentSubtitle:
      "Private investors can secure exclusive national rights to launch, market, and monetize AssistPro in their territories with central brand, product, and compliance support.",
    investmentPrimaryCta: "Request portfolio deck",
    investmentSecondaryCta: "Discuss country rights",
    investmentHighlights: [
      { label: "License model", value: "Exclusive country operating rights" },
      { label: "Revenue mix", value: "Booking fees, premium verification, enterprise partnerships" },
      { label: "Support", value: "Brand system, onboarding playbook, and product roadmap access" },
    ],
    investmentTerritories: [
      { country: "United Arab Emirates", status: "Open", summary: "High concierge demand, hospitality partnerships, and premium traveler traffic." },
      { country: "France", status: "Open", summary: "Luxury retail, events, and executive travel create recurring marketplace demand." },
      { country: "Morocco", status: "Reserved for review", summary: "Tourism growth and multilingual service coverage suit an early operator launch." },
    ],
    downloadTitle: "Download AssistPro",
    downloadSubtitle: "Replace the buttons with your App Store and Play Store links when ready.",
    downloadPrimaryCta: "App Store",
    downloadSecondaryCta: "Google Play",
    partnershipsTitle: "Enterprise & hotel partnerships",
    partnershipsSubtitle: "Offer verified professionals to VIP guests via concierge teams. Pilot-ready in 30 days.",
    partnershipsPrimaryCta: "Partner Inquiry",
    partnershipsSecondaryCta: "Provider Network",
    providerSectionTitle: "Become verified",
    providerSectionSubtitle:
      "Providers are searchable only after admin verification. This protects clients and preserves brand standards.",
    providerSectionEmail: "seaointeralia@gmail.com",
    footerLinks: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Provider Standards", href: "#" },
    ],
  };
}
