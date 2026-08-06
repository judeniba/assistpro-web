import type { Provider, Booking, InvestorApplication, InvestorProfile, InvestorStatus, Session, User } from "./types";

export interface BookingPayload {
  providerId?: string;
  startDate?: string;
  endDate?: string;
  mode?: string;
  notes?: string;
}

export interface AdminData {
  providers: Provider[];
  bookings: Booking[];
  investors: InvestorApplication[];
}

export interface AuthPayload {
  email?: string;
  password?: string;
  name?: string;
  role?: string;
  investorCountry?: string;
  investorBudget?: string;
  investorOperatingExperience?: string;
  investorNotes?: string;
}

export interface InvestorProfileResponse {
  investorProfile: InvestorProfile | null;
}

export interface InvestorStatusResponse {
  investor: InvestorApplication;
}

export interface DataSource {
  getProviders: (params?: { category?: string; q?: string }) => Promise<Provider[]>;
  getProviderById: (id: string) => Promise<Provider | null>;
  getBookings: () => Promise<Booking[]>;
  createBooking: (payload: BookingPayload) => Promise<Booking>;
  getSession: () => Promise<Session | null>;
  login: (payload: AuthPayload) => Promise<{ user: User; redirectTo: string }>;
  register: (payload: AuthPayload) => Promise<{ user: User; redirectTo: string }>;
}

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function getLiveProviders(params?: { category?: string; q?: string }): Promise<Provider[]> {
  const search = new URLSearchParams();
  if (params?.category) search.set("category", params.category);
  if (params?.q) search.set("q", params.q);
  const query = search.toString();
  const providers = await fetchJson<Provider[]>(`/api/providers${query ? `?${query}` : ""}`);
  return providers.sort((a, b) => b.rating - a.rating);
}

export async function getLiveProviderById(id: string): Promise<Provider | null> {
  try {
    return await fetchJson<Provider>(`/api/providers/${id}`);
  } catch {
    return null;
  }
}

export async function getLiveBookings(): Promise<Booking[]> {
  return fetchJson<Booking[]>("/api/bookings");
}

export async function createLiveBooking(payload: BookingPayload): Promise<Booking> {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? "Booking failed");
  }
  return response.json() as Promise<Booking>;
}

export async function getLiveSession(): Promise<Session | null> {
  return fetchJson<Session | null>("/api/auth/me");
}

export async function getAdminData(): Promise<AdminData> {
  return fetchJson<AdminData>("/api/admin");
}

export async function loginWithApi(payload: AuthPayload): Promise<{ user: User; redirectTo: string }> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? "Login failed");
  }
  return response.json() as Promise<{ user: User; redirectTo: string }>;
}

export async function registerWithApi(payload: AuthPayload): Promise<{ user: User; redirectTo: string }> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? "Registration failed");
  }
  return response.json() as Promise<{ user: User; redirectTo: string }>;
}

export async function getInvestorProfile(): Promise<InvestorProfile | null> {
  const response = await fetch("/api/investor-profile", { cache: "no-store" });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? "Unable to load investor profile");
  }
  const data = (await response.json()) as InvestorProfileResponse;
  return data.investorProfile;
}

export async function saveInvestorProfile(payload: Pick<InvestorProfile, "country" | "budget" | "operatingExperience"> & { notes?: string }): Promise<InvestorProfile> {
  const response = await fetch("/api/investor-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? "Unable to save investor profile");
  }
  const data = (await response.json()) as InvestorProfileResponse;
  if (!data.investorProfile) throw new Error("Investor profile was not returned");
  return data.investorProfile;
}

export async function updateInvestorStatus(userId: string, status: InvestorStatus): Promise<InvestorApplication> {
  const response = await fetch(`/api/admin/investors/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? "Unable to update investor status");
  }
  const data = (await response.json()) as InvestorStatusResponse;
  return data.investor;
}
