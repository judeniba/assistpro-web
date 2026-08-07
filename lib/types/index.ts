/**
 * Core data type definitions for AssistPro
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  hourlyRate?: number;
  dailyRate?: number;
  weeklyRate?: number;
}

export enum ServiceCategory {
  PERSONAL_ASSISTANT = "personal_assistant",
  DRIVER = "driver",
  CHAPERONE = "chaperone",
  HOSTESS = "hostess",
  ARTIST = "artist",
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: ServiceCategory;
  languages: string[];
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  bio: string;
  verified: boolean;
  rating: number;
  totalBookings: number;
  availability: Availability[];
  createdAt: string;
  updatedAt: string;
}

export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

export interface Booking {
  id: string;
  userId: string;
  providerId: string;
  serviceCategory: ServiceCategory;
  startDate: string;
  endDate: string;
  duration: BookingDuration;
  status: BookingStatus;
  totalAmount: number;
  currency: string;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum BookingDuration {
  DAILY = "daily",
  WEEKLY = "weekly",
  LONG_TERM = "long_term",
  EVENT_BASED = "event_based",
}

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum PaymentStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export enum PaymentMethod {
  STRIPE = "stripe",
  FLUTTERWAVE = "flutterwave",
  MTN_MOMO = "mtn_momo",
  ORANGE_MONEY = "orange_money",
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  CLIENT = "client",
  PROVIDER = "provider",
  ADMIN = "admin",
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
