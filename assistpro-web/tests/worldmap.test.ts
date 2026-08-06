import test from "node:test";
import assert from "node:assert/strict";
import { buildWorldMapPayload } from "../lib/worldmap.ts";

test("buildWorldMapPayload returns mapped points for provider locations", async () => {
  const payload = await buildWorldMapPayload([
    {
      id: "1",
      userId: "u1",
      name: "Ava",
      category: "Personal Assistant",
      bio: "",
      languages: ["English"],
      location: "London, United Kingdom",
      rate: "$150/hr",
      rating: 4.9,
      reviewCount: 17,
      verified: true,
      availableModes: ["daily", "weekly"],
    },
    {
      id: "2",
      userId: "u2",
      name: "Mateo",
      category: "Driver",
      bio: "",
      languages: ["Spanish"],
      location: "Dubai, UAE",
      rate: "$120/hr",
      rating: 4.7,
      reviewCount: 9,
      verified: true,
      availableModes: ["event"],
    },
  ]);

  assert.equal(payload.points.length, 2);
  assert.ok(payload.points[0].coordinates);
  assert.ok(payload.points[0].coordinates.lat > 0);
  assert.ok(payload.points[1].coordinates);
  assert.equal(payload.points[1].country, "UAE");
});
