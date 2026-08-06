import test from "node:test";
import assert from "node:assert/strict";

import { getMarketingContent } from "../lib/marketing.ts";

test("returns a marketing snapshot with campaign channels and a primary CTA", () => {
  const content = getMarketingContent();

  assert.ok(content.heroTitle.length > 0);
  assert.ok(content.channels.length > 0);
  assert.ok(content.campaignIdeas.length > 0);
  assert.ok(content.primaryCta.length > 0);
  assert.ok(content.investmentTitle?.length);
  assert.ok(content.investmentTerritories && content.investmentTerritories.length > 0);
});
