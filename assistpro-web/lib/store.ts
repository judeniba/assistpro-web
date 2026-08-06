import { pbkdf2Sync, randomBytes } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import type { User, Provider, Booking, Session, InvestorProfile } from "./types";

interface Store {
  users: Map<string, User>;
  providers: Map<string, Provider>;
  bookings: Map<string, Booking>;
  sessions: Map<string, Session>;
}

class PersistedMap<K, V> extends Map<K, V> {
  private readonly persist: () => void;

  constructor(persist: () => void, entries?: readonly (readonly [K, V])[] | null) {
    super();
    this.persist = persist;
    if (entries) {
      for (const [key, value] of entries) {
        super.set(key, value);
      }
    }
  }

  override set(key: K, value: V): this {
    super.set(key, value);
    this.persist();
    return this;
  }

  override delete(key: K): boolean {
    const deleted = super.delete(key);
    if (deleted) this.persist();
    return deleted;
  }

  override clear(): void {
    super.clear();
    this.persist();
  }
}

const g = globalThis as typeof globalThis & { __apStore?: Store };
const STORE_DIR = process.env.AP_STORE_DIR ?? path.join(process.cwd(), "data");
const STORE_FILE = process.env.AP_STORE_FILE ?? path.join(STORE_DIR, "store.json");

function hashPw(pw: string): string {
  const salt = randomBytes(16).toString("hex");
  return salt + ":" + pbkdf2Sync(pw, salt, 100_000, 64, "sha512").toString("hex");
}

export function hashPassword(pw: string) {
  return hashPw(pw);
}

export function verifyPassword(pw: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  return pbkdf2Sync(pw, salt, 100_000, 64, "sha512").toString("hex") === hash;
}

function parseStoreFile(): Partial<Store> | null {
  try {
    if (!existsSync(/* turbopackIgnore: true */ STORE_FILE)) return null;
    const raw = readFileSync(/* turbopackIgnore: true */ STORE_FILE, "utf8");
    if (!raw.trim()) return null;
    const parsed = JSON.parse(raw) as {
      users?: Array<User>;
      providers?: Array<Provider>;
      bookings?: Array<Booking>;
      sessions?: Array<Session>;
    };
    return {
      users: new Map((parsed.users ?? []).map((item) => [item.id, item])),
      providers: new Map((parsed.providers ?? []).map((item) => [item.id, item])),
      bookings: new Map((parsed.bookings ?? []).map((item) => [item.id, item])),
      sessions: new Map((parsed.sessions ?? []).map((item) => [item.userId, item])),
    };
  } catch {
    return null;
  }
}

function persistStore(s: Store) {
  const dir = path.dirname(STORE_FILE);
  mkdirSync(/* turbopackIgnore: true */ dir, { recursive: true });
  const payload = {
    users: Array.from(s.users.values()),
    providers: Array.from(s.providers.values()),
    bookings: Array.from(s.bookings.values()),
    sessions: Array.from(s.sessions.values()),
  };
  writeFileSync(/* turbopackIgnore: true */ STORE_FILE, JSON.stringify(payload, null, 2));
}

function seed(): Store {
  const persist = () => undefined;
  const s: Store = {
    users: new PersistedMap<string, User>(() => undefined),
    providers: new PersistedMap<string, Provider>(() => undefined),
    bookings: new PersistedMap<string, Booking>(() => undefined),
    sessions: new PersistedMap<string, Session>(() => undefined),
  };

  const persisted = parseStoreFile();
  if (persisted) {
    s.users = persisted.users ?? new PersistedMap<string, User>(() => undefined);
    s.providers = persisted.providers ?? new PersistedMap<string, Provider>(() => undefined);
    s.bookings = persisted.bookings ?? new PersistedMap<string, Booking>(() => undefined);
    s.sessions = persisted.sessions ?? new PersistedMap<string, Session>(() => undefined);
    return s;
  }

  const addUser = (id: string, name: string, email: string, pw: string, role: User["role"], investorProfile?: InvestorProfile) =>
    s.users.set(id, { id, name, email, passwordHash: hashPw(pw), role, createdAt: "2026-01-01T00:00:00Z", investorProfile });

  addUser("admin-1",   "AssistPro Admin",   "admin@assistpro.com",  "admin123!",    "admin");
  addUser("client-1",  "James Harrington",  "james@example.com",    "demo123!",     "client", {
    country: "United Arab Emirates",
    budget: "$250,000-$500,000",
    operatingExperience: "Scaled concierge and hospitality ventures across Dubai and Abu Dhabi for 6 years.",
    notes: "Interested in exclusive GCC launch rights with hotel and executive travel partnerships.",
    status: "approved",
    appliedAt: "2026-07-20T10:00:00Z",
    updatedAt: "2026-08-01T12:00:00Z",
  });
  addUser("client-2",  "Isabelle Moreau",   "isabelle@example.com", "demo123!",     "client");
  addUser("pu1",       "Sofia Laurent",     "sofia@example.com",    "demo123!",     "provider");
  addUser("pu2",       "Marcus Chen",       "marcus@example.com",   "demo123!",     "provider");
  addUser("pu3",       "Elara Williams",    "elara@example.com",    "demo123!",     "provider");
  addUser("pu4",       "Riko Nakamura",     "riko@example.com",     "demo123!",     "provider");
  addUser("pu5",       "Lena Kovac",        "lena@example.com",     "demo123!",     "provider");
  addUser("pu6",       "Omar Farouk",       "omar@example.com",     "demo123!",     "provider");

  const addProvider = (data: Provider) => s.providers.set(data.id, data);

  addProvider({ id: "p1", userId: "pu1", name: "Sofia Laurent",  category: "Personal Assistant", bio: "10+ years executive PA across London, Paris & Dubai. Expert in travel logistics, calendar management, and HNWI client relations.", languages: ["English","French","Arabic"], location: "Dubai, UAE",             rate: "$320/day",       rating: 4.9,  reviewCount: 87,  verified: true,  availableModes: ["daily","weekly","event"] });
  addProvider({ id: "p2", userId: "pu2", name: "Marcus Chen",    category: "Driver",              bio: "Former executive-protection driver, 8 years. Defensive-driving certified, navigates 12 major cities. Precision, punctuality, discretion.", languages: ["English","Mandarin","Cantonese"], location: "Hong Kong / Singapore", rate: "$280/day",       rating: 4.8,  reviewCount: 64,  verified: true,  availableModes: ["daily","event"] });
  addProvider({ id: "p3", userId: "pu3", name: "Elara Williams", category: "Hostess",             bio: "Luxury hospitality specialist. Monaco Grand Prix, Art Basel, private superyacht charters. Native English, fluent French, conversational Italian.", languages: ["English","French","Italian"], location: "Monaco / Paris",         rate: "$380/day",       rating: 4.95, reviewCount: 112, verified: true,  availableModes: ["event","daily"] });
  addProvider({ id: "p4", userId: "pu4", name: "Riko Nakamura",  category: "Chaperone",           bio: "Discreet professional chaperone for executive travel. Former diplomat's aide. Background-checked, CPR certified.", languages: ["English","Japanese","Korean"], location: "Tokyo / Seoul",            rate: "$300/day",       rating: 4.85, reviewCount: 45,  verified: true,  availableModes: ["daily","weekly","event"] });
  addProvider({ id: "p5", userId: "pu5", name: "Lena Kovac",     category: "Personal Assistant", bio: "Multilingual corporate PA for Eastern Europe & MENA markets. MBA, 7 years private-equity support.", languages: ["English","Russian","Czech","German"], location: "Prague / Vienna",           rate: "$295/day",       rating: 4.75, reviewCount: 38,  verified: true,  availableModes: ["daily","weekly"] });
  addProvider({ id: "p6", userId: "pu6", name: "Omar Farouk",    category: "Artist",              bio: "Acclaimed oud player & jazz-fusion composer. Performed at Cannes, ADIPEC, and private royal events across the Gulf. Portfolio on request.", languages: ["English","Arabic","French"], location: "Cairo / Riyadh",           rate: "$1,200/event",   rating: 4.92, reviewCount: 33,  verified: true,  availableModes: ["event"] });

  s.bookings.set("bk1", { id: "bk1", clientId: "client-1", clientName: "James Harrington", providerId: "p1", providerName: "Sofia Laurent", category: "Personal Assistant", startDate: "2026-08-10", endDate: "2026-08-14", mode: "weekly",  status: "confirmed", notes: "Singapore trip — full logistics support.", totalCost: "$1,600", createdAt: "2026-08-01T10:00:00Z" });
  s.bookings.set("bk2", { id: "bk2", clientId: "client-1", clientName: "James Harrington", providerId: "p3", providerName: "Elara Williams", category: "Hostess",            startDate: "2026-08-20", endDate: "2026-08-20", mode: "event",   status: "pending",   notes: "Product launch, 120 guests.",           totalCost: "$380",   createdAt: "2026-08-02T14:00:00Z" });
  s.bookings.set("bk3", { id: "bk3", clientId: "client-2", clientName: "Isabelle Moreau",  providerId: "p2", providerName: "Marcus Chen",    category: "Driver",             startDate: "2026-08-08", endDate: "2026-08-08", mode: "daily",   status: "completed", totalCost: "$280",   createdAt: "2026-07-25T09:00:00Z" });

  persistStore(s);
  return s;
}

if (!g.__apStore) {
  g.__apStore = seed();
}

const store = g.__apStore;

const persistStoreWithContext = () => persistStore(store);
store.users = new PersistedMap<string, User>(persistStoreWithContext, Array.from(store.users.entries()));
store.providers = new PersistedMap<string, Provider>(persistStoreWithContext, Array.from(store.providers.entries()));
store.bookings = new PersistedMap<string, Booking>(persistStoreWithContext, Array.from(store.bookings.entries()));
store.sessions = new PersistedMap<string, Session>(persistStoreWithContext, Array.from(store.sessions.entries()));

export const users = store.users;
export const providers = store.providers;
export const bookings = store.bookings;
export const sessions = store.sessions;
