export type Role = "client" | "provider" | "admin";
export type ServiceCategory =
  | "Personal Assistant"
  | "Driver"
  | "Chaperone"
  | "Hostess"
  | "Artist";
export type BookingMode = "daily" | "weekly" | "event";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type InvestorStatus = "submitted" | "under-review" | "approved";

export interface InvestorProfile {
  country: string;
  budget: string;
  operatingExperience: string;
  notes?: string;
  status: InvestorStatus;
  appliedAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: string;
  investorProfile?: InvestorProfile;
}

export interface InvestorApplication {
  userId: string;
  name: string;
  email: string;
  investorProfile: InvestorProfile;
}

export interface Provider {
  id: string;
  userId: string;
  name: string;
  category: ServiceCategory;
  bio: string;
  languages: string[];
  location: string;
  rate: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  availableModes: BookingMode[];
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;
  category: ServiceCategory;
  startDate: string;
  endDate: string;
  mode: BookingMode;
  status: BookingStatus;
  notes?: string;
  totalCost: string;
  createdAt: string;
}

export interface Session {
  userId: string;
  role: Role;
  name: string;
  email: string;
  expiresAt: number;
}

export type PaymentStatus = "pending" | "authorized" | "captured" | "failed" | "refunded";

export interface PaymentIntent {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
}
