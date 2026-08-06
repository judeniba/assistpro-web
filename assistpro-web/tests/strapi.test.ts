import test from "node:test";
import assert from "node:assert/strict";

import { normalizeStrapiProviders, normalizeStrapiBookings, normalizeStrapiMarketingContent, normalizeStrapiInvestorProfiles } from "../lib/strapi.ts";

test("normalizes Strapi provider payloads into app providers", () => {
  const providers = normalizeStrapiProviders({
    data: [
      {
        id: 7,
        attributes: {
          name: "Ava Stone",
          category: "Personal Assistant",
          bio: "Trusted executive support",
          languages: ["English", "French"],
          location: "London",
          rate: "$350/day",
          rating: 4.9,
          reviewCount: 40,
          verified: true,
          availableModes: ["daily", "weekly"],
          userId: "user-7",
        },
      },
    ],
  });

  assert.equal(providers.length, 1);
  assert.equal(providers[0].id, "7");
  assert.equal(providers[0].name, "Ava Stone");
  assert.equal(providers[0].category, "Personal Assistant");
  assert.equal(providers[0].languages[1], "French");
});

test("normalizes Strapi booking payloads into app bookings", () => {
  const bookings = normalizeStrapiBookings({
    data: [
      {
        id: 11,
        attributes: {
          clientId: "client-9",
          clientName: "Nadia",
          providerId: "7",
          providerName: "Ava Stone",
          category: "Personal Assistant",
          startDate: "2026-09-01",
          endDate: "2026-09-02",
          mode: "daily",
          status: "pending",
          notes: "Household support",
          totalCost: "$350",
          createdAt: "2026-08-01T00:00:00Z",
        },
      },
    ],
  });

  assert.equal(bookings.length, 1);
  assert.equal(bookings[0].id, "11");
  assert.equal(bookings[0].providerName, "Ava Stone");
  assert.equal(bookings[0].status, "pending");
});

test("normalizes Strapi marketing payloads into homepage content", () => {
  const content = normalizeStrapiMarketingContent({
    data: [
      {
        id: 1,
        attributes: {
          heroTitle: "Strapi hero title",
          heroSubtitle: "Strapi hero subtitle",
          channels: ["Instagram", "TikTok"],
          campaignIdeas: ["Launch a new campaign"],
          primaryCta: "Book a demo",
          investmentTitle: "Investor rights",
          investmentTerritories: [{ country: "Kenya", status: "Open", summary: "Fast launch market" }],
        },
      },
    ],
  });

  assert.equal(content?.heroTitle, "Strapi hero title");
  assert.equal(content?.primaryCta, "Book a demo");
  assert.equal(content?.channels[1], "TikTok");
  assert.equal(content?.investmentTitle, "Investor rights");
  assert.equal(content?.investmentTerritories?.[0].country, "Kenya");
});

test("normalizes Strapi investor profiles into admin investor applications", () => {
  const investors = normalizeStrapiInvestorProfiles({
    data: [
      {
        id: 5,
        attributes: {
          userId: "client-22",
          clientName: "Amina Rahman",
          clientEmail: "amina@example.com",
          country: "Kenya",
          budget: "$150,000-$250,000",
          operatingExperience: "Built regional hospitality operations.",
          notes: "Strong Nairobi hotel pipeline.",
          status: "under-review",
          appliedAt: "2026-08-01T00:00:00Z",
          updatedAt: "2026-08-02T00:00:00Z",
        },
      },
    ],
  });

  assert.equal(investors[0].userId, "client-22");
  assert.equal(investors[0].investorProfile.status, "under-review");
  assert.equal(investors[0].investorProfile.country, "Kenya");
});
