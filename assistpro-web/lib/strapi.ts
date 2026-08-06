import type { Provider, Booking, InvestorApplication, InvestorProfile, InvestorStatus, Session, User, Role } from "./types";
import type { MarketingContent } from "./marketing";

export interface StrapiResponse<T> {
  data: T[];
}

export interface StrapiProviderRecord {
  id: number;
  attributes: {
    name: string;
    category: Provider["category"];
    bio: string;
    languages: string[];
    location: string;
    rate: string;
    rating: number;
    reviewCount: number;
    verified: boolean;
    availableModes: Provider["availableModes"];
    userId: string;
  };
}

export interface StrapiBookingRecord {
  id: number;
  attributes: {
    clientId: string;
    clientName: string;
    providerId: string;
    providerName: string;
    category: Booking["category"];
    startDate: string;
    endDate: string;
    mode: Booking["mode"];
    status: Booking["status"];
    notes?: string;
    totalCost: string;
    createdAt: string;
  };
}

export interface StrapiUserRecord {
  id: number;
  attributes: {
    username?: string;
    name?: string;
    email: string;
    password?: string;
    role?: Role;
    createdAt?: string;
    investorProfile?: InvestorProfile;
  };
}

export interface StrapiInvestorProfileRecord {
  id: number;
  attributes: {
    userId: string;
    clientName: string;
    clientEmail: string;
    country: string;
    budget: string;
    operatingExperience: string;
    notes?: string;
    status: InvestorStatus;
    appliedAt: string;
    updatedAt: string;
  };
}

export interface StrapiMarketingRecord {
  id: number;
  attributes: {
    heroTitle?: string;
    heroSubtitle?: string;
    channels?: string[];
    campaignIdeas?: string[];
    primaryCta?: string;
    featuredProviderOrder?: string[];
    services?: Array<{ title?: string; description?: string }>;
    standards?: Array<{ label?: string }>;
    featuredProvidersHeading?: string;
    featuredProvidersSubheading?: string;
    featuredProvidersCta?: string;
    investmentTitle?: string;
    investmentSubtitle?: string;
    investmentPrimaryCta?: string;
    investmentSecondaryCta?: string;
    investmentHighlights?: Array<{ label?: string; value?: string }>;
    investmentTerritories?: Array<{ country?: string; status?: string; summary?: string }>;
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
    footerLinks?: Array<{ label?: string; href?: string }>;
    title?: string;
    subtitle?: string;
    cta?: string;
  };
}

export function normalizeStrapiProviders(payload: StrapiResponse<StrapiProviderRecord>): Provider[] {
  return payload.data.map((entry) => ({
    id: String(entry.id),
    userId: entry.attributes.userId,
    name: entry.attributes.name,
    category: entry.attributes.category,
    bio: entry.attributes.bio,
    languages: entry.attributes.languages,
    location: entry.attributes.location,
    rate: entry.attributes.rate,
    rating: entry.attributes.rating,
    reviewCount: entry.attributes.reviewCount,
    verified: entry.attributes.verified,
    availableModes: entry.attributes.availableModes,
  }));
}

export function normalizeStrapiBookings(payload: StrapiResponse<StrapiBookingRecord>): Booking[] {
  return payload.data.map((entry) => ({
    id: String(entry.id),
    clientId: entry.attributes.clientId,
    clientName: entry.attributes.clientName,
    providerId: entry.attributes.providerId,
    providerName: entry.attributes.providerName,
    category: entry.attributes.category,
    startDate: entry.attributes.startDate,
    endDate: entry.attributes.endDate,
    mode: entry.attributes.mode,
    status: entry.attributes.status,
    notes: entry.attributes.notes,
    totalCost: entry.attributes.totalCost,
    createdAt: entry.attributes.createdAt,
  }));
}

export function normalizeStrapiUser(payload: StrapiUserRecord): User {
  return {
    id: String(payload.id),
    name: payload.attributes.name ?? payload.attributes.username ?? "User",
    email: payload.attributes.email,
    passwordHash: payload.attributes.password ?? "",
    role: payload.attributes.role ?? "client",
    createdAt: payload.attributes.createdAt ?? new Date().toISOString(),
    investorProfile: payload.attributes.investorProfile,
  };
}

export function normalizeStrapiInvestorProfiles(payload: StrapiResponse<StrapiInvestorProfileRecord>): InvestorApplication[] {
  return payload.data.map((entry) => ({
    userId: entry.attributes.userId,
    name: entry.attributes.clientName,
    email: entry.attributes.clientEmail,
    investorProfile: {
      country: entry.attributes.country,
      budget: entry.attributes.budget,
      operatingExperience: entry.attributes.operatingExperience,
      notes: entry.attributes.notes,
      status: entry.attributes.status,
      appliedAt: entry.attributes.appliedAt,
      updatedAt: entry.attributes.updatedAt,
    },
  }));
}

export function normalizeStrapiMarketingContent(payload: StrapiResponse<StrapiMarketingRecord>): MarketingContent | null {
  const entry = payload.data[0];
  if (!entry) return null;

  const attrs = entry.attributes;

  return {
    heroTitle: attrs.heroTitle ?? attrs.title ?? "AssistPro media campaigns for luxury hospitality and executive service brands",
    heroSubtitle:
      attrs.heroSubtitle ??
      attrs.subtitle ??
      "Turn verified provider access into premium lead generation with concierge-ready positioning, multilingual outreach, and hospitality-focused campaigns.",
    channels: attrs.channels ?? ["Instagram", "LinkedIn", "WhatsApp", "Partner concierge networks"],
    campaignIdeas: attrs.campaignIdeas ?? [
      "Launch a luxury hospitality partner week",
      "Showcase verified provider stories in short-form reels",
      "Publish concierge-ready service bundles for hotels and VIP hosts",
    ],
    primaryCta: attrs.primaryCta ?? attrs.cta ?? "Book a strategy call",
    featuredProviderOrder: attrs.featuredProviderOrder ?? ["Personal Assistant", "Driver", "Hostess", "Chaperone", "Artist"],
    services: attrs.services?.map((service) => ({
      title: service.title ?? "Service",
      description: service.description ?? "",
    })) ?? [
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
    standards: attrs.standards?.map((item) => ({ label: item.label ?? "Standard" })) ?? [
      { label: "Admin-approved verification" },
      { label: "Discretion-first standards" },
      { label: "No minors permitted" },
      { label: "Global multilingual service" },
    ],
    featuredProvidersHeading: attrs.featuredProvidersHeading ?? "Most trusted providers on the front page",
    featuredProvidersSubheading:
      attrs.featuredProvidersSubheading ??
      "Clients can browse a curated showcase of verified personal assistants, drivers, hostesses, chaperones, and artists with real ratings and profile photos.",
    featuredProvidersCta: attrs.featuredProvidersCta ?? "View all providers",
    investmentTitle: attrs.investmentTitle ?? "Investment portfolio for exclusive country operators",
    investmentSubtitle:
      attrs.investmentSubtitle ??
      "Private investors can secure exclusive national rights to launch, market, and monetize AssistPro in their territories with central brand, product, and compliance support.",
    investmentPrimaryCta: attrs.investmentPrimaryCta ?? "Request portfolio deck",
    investmentSecondaryCta: attrs.investmentSecondaryCta ?? "Discuss country rights",
    investmentHighlights: attrs.investmentHighlights?.map((item) => ({
      label: item.label ?? "Highlight",
      value: item.value ?? "",
    })) ?? [
      { label: "License model", value: "Exclusive country operating rights" },
      { label: "Revenue mix", value: "Booking fees, premium verification, enterprise partnerships" },
      { label: "Support", value: "Brand system, onboarding playbook, and product roadmap access" },
    ],
    investmentTerritories: attrs.investmentTerritories?.map((item) => ({
      country: item.country ?? "Country",
      status: item.status ?? "Open",
      summary: item.summary ?? "",
    })) ?? [
      { country: "United Arab Emirates", status: "Open", summary: "High concierge demand, hospitality partnerships, and premium traveler traffic." },
      { country: "France", status: "Open", summary: "Luxury retail, events, and executive travel create recurring marketplace demand." },
      { country: "Morocco", status: "Reserved for review", summary: "Tourism growth and multilingual service coverage suit an early operator launch." },
    ],
    downloadTitle: attrs.downloadTitle ?? "Download AssistPro",
    downloadSubtitle: attrs.downloadSubtitle ?? "Replace the buttons with your App Store and Play Store links when ready.",
    downloadPrimaryCta: attrs.downloadPrimaryCta ?? "App Store",
    downloadSecondaryCta: attrs.downloadSecondaryCta ?? "Google Play",
    partnershipsTitle: attrs.partnershipsTitle ?? "Enterprise & hotel partnerships",
    partnershipsSubtitle:
      attrs.partnershipsSubtitle ?? "Offer verified professionals to VIP guests via concierge teams. Pilot-ready in 30 days.",
    partnershipsPrimaryCta: attrs.partnershipsPrimaryCta ?? "Partner Inquiry",
    partnershipsSecondaryCta: attrs.partnershipsSecondaryCta ?? "Provider Network",
    providerSectionTitle: attrs.providerSectionTitle ?? "Become verified",
    providerSectionSubtitle:
      attrs.providerSectionSubtitle ??
      "Providers are searchable only after admin verification. This protects clients and preserves brand standards.",
    providerSectionEmail: attrs.providerSectionEmail ?? "seaointeralia@gmail.com",
    footerLinks: attrs.footerLinks?.map((link) => ({ label: link.label ?? "Link", href: link.href ?? "#" })) ?? [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Provider Standards", href: "#" },
    ],
  };
}

export function getStrapiBaseUrl(): string {
  return process.env.STRAPI_URL?.replace(/\/$/, "") ?? "";
}

function getInvestorProfileContentType(): string {
  return process.env.STRAPI_INVESTOR_PROFILE_CONTENT_TYPE ?? "investor-profiles";
}

export function isStrapiEnabled(): boolean {
  return Boolean(getStrapiBaseUrl() && process.env.STRAPI_API_TOKEN);
}

export async function fetchStrapi<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = getStrapiBaseUrl();
  if (!baseUrl) throw new Error("STRAPI_URL is not configured");

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchStrapiWithAuth<T>(path: string, accessToken: string, init?: RequestInit): Promise<T> {
  const baseUrl = getStrapiBaseUrl();
  if (!baseUrl) throw new Error("STRAPI_URL is not configured");

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Strapi authenticated request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getStrapiInvestorApplications(): Promise<InvestorApplication[]> {
  const contentType = getInvestorProfileContentType();
  const payload = await fetchStrapi<StrapiResponse<StrapiInvestorProfileRecord>>(`/api/${contentType}?pagination[pageSize]=100`);
  return normalizeStrapiInvestorProfiles(payload);
}

export async function getStrapiInvestorApplicationByUserId(userId: string): Promise<InvestorApplication | null> {
  const contentType = getInvestorProfileContentType();
  const search = new URLSearchParams({
    "filters[userId][$eq]": userId,
    "pagination[pageSize]": "1",
  });
  const payload = await fetchStrapi<StrapiResponse<StrapiInvestorProfileRecord>>(`/api/${contentType}?${search.toString()}`);
  return normalizeStrapiInvestorProfiles(payload)[0] ?? null;
}

export async function upsertStrapiInvestorApplication(application: InvestorApplication): Promise<InvestorApplication> {
  const existing = await getStrapiInvestorApplicationByUserId(application.userId);
  const contentType = getInvestorProfileContentType();
  const body = {
    data: {
      userId: application.userId,
      clientName: application.name,
      clientEmail: application.email,
      country: application.investorProfile.country,
      budget: application.investorProfile.budget,
      operatingExperience: application.investorProfile.operatingExperience,
      notes: application.investorProfile.notes,
      status: application.investorProfile.status,
      appliedAt: application.investorProfile.appliedAt,
      updatedAt: application.investorProfile.updatedAt,
    },
  };

  if (!existing) {
    const created = await fetchStrapi<{ data: StrapiInvestorProfileRecord }>(`/api/${contentType}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return normalizeStrapiInvestorProfiles({ data: [created.data] })[0];
  }

  const current = await fetchStrapi<StrapiResponse<StrapiInvestorProfileRecord>>(`/api/${contentType}?filters[userId][$eq]=${encodeURIComponent(application.userId)}&pagination[pageSize]=1`);
  const record = current.data[0];
  if (!record) return existing;

  const updated = await fetchStrapi<{ data: StrapiInvestorProfileRecord }>(`/api/${contentType}/${record.id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return normalizeStrapiInvestorProfiles({ data: [updated.data] })[0];
}

export async function updateStrapiInvestorApplicationStatus(userId: string, status: InvestorStatus): Promise<InvestorApplication | null> {
  const application = await getStrapiInvestorApplicationByUserId(userId);
  if (!application) return null;
  return upsertStrapiInvestorApplication({
    ...application,
    investorProfile: {
      ...application.investorProfile,
      status,
      updatedAt: new Date().toISOString(),
    },
  });
}

export function getStrapiSessionFromCookie(cookieValue: string | undefined): Session | null {
  if (!cookieValue) return null;

  try {
    const parsed = JSON.parse(cookieValue) as Partial<Session> & { jwt?: string };
    return parsed.userId && parsed.role
      ? ({
          userId: parsed.userId,
          role: parsed.role as Role,
          name: parsed.name ?? "Strapi User",
          email: parsed.email ?? "",
          expiresAt: parsed.expiresAt ?? Number.MAX_SAFE_INTEGER,
        } satisfies Session)
      : null;
  } catch {
    return null;
  }
}
