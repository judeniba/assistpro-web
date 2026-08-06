import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const originalStorePath = process.env.AP_STORE_FILE;

test("persists store data across module reloads", async () => {
  const tempDir = mkdtempSync(path.join(tmpdir(), "assistpro-store-"));
  const tempFile = path.join(tempDir, "store.json");
  process.env.AP_STORE_FILE = tempFile;

  delete (globalThis as typeof globalThis & { __apStore?: unknown }).__apStore;
  const first = await import(`../lib/store.ts?test=${Date.now()}`);

  first.users.set("persisted-user", {
    id: "persisted-user",
    name: "Persisted User",
    email: "persisted@example.com",
    passwordHash: "hash",
    role: "client",
    createdAt: "2026-01-01T00:00:00Z",
    investorProfile: {
      country: "Kenya",
      budget: "$100,000-$150,000",
      operatingExperience: "Built regional hospitality operations.",
      status: "submitted",
      appliedAt: "2026-08-01T00:00:00Z",
      updatedAt: "2026-08-01T00:00:00Z",
    },
  });

  const persisted = JSON.parse(readFileSync(tempFile, "utf8"));
  assert.ok(Array.isArray(persisted.users));
  assert.ok(persisted.users.some((user: { id: string }) => user.id === "persisted-user"));

  delete (globalThis as typeof globalThis & { __apStore?: unknown }).__apStore;
  const second = await import(`../lib/store.ts?test=${Date.now() + 1}`);

  assert.equal(second.users.get("persisted-user")?.name, "Persisted User");
  assert.equal(second.users.get("persisted-user")?.investorProfile?.country, "Kenya");

  rmSync(tempDir, { recursive: true, force: true });
  if (originalStorePath === undefined) {
    delete process.env.AP_STORE_FILE;
  } else {
    process.env.AP_STORE_FILE = originalStorePath;
  }
});
