/**
 * API service functions for AssistPro backend integration
 */

import { api } from "./client";
import type {
  Provider,
  Booking,
  Service,
  ApiResponse,
  PaginatedResponse,
  ServiceCategory,
} from "../types";

/**
 * Provider API
 */
export const providerApi = {
  /**
   * Get all providers with optional filters
   */
  getProviders: async (params?: {
    category?: ServiceCategory;
    language?: string;
    verified?: boolean;
    page?: number;
    limit?: number;
  }) => {
    const queryParams: Record<string, string> = {};
    if (params?.category) queryParams.category = params.category;
    if (params?.language) queryParams.language = params.language;
    if (params?.verified !== undefined)
      queryParams.verified = String(params.verified);
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);

    return api.get<PaginatedResponse<Provider>>("/providers", queryParams);
  },

  /**
   * Get a single provider by ID
   */
  getProvider: async (id: string) => {
    return api.get<ApiResponse<Provider>>(`/providers/${id}`);
  },

  /**
   * Create a new provider registration
   */
  createProvider: async (data: Partial<Provider>) => {
    return api.post<ApiResponse<Provider>>("/providers", data);
  },
};

/**
 * Booking API
 */
export const bookingApi = {
  /**
   * Get all bookings for a user
   */
  getBookings: async (userId: string, params?: { page?: number; limit?: number }) => {
    const queryParams: Record<string, string> = { userId };
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);

    return api.get<PaginatedResponse<Booking>>("/bookings", queryParams);
  },

  /**
   * Get a single booking by ID
   */
  getBooking: async (id: string) => {
    return api.get<ApiResponse<Booking>>(`/bookings/${id}`);
  },

  /**
   * Create a new booking
   */
  createBooking: async (data: Partial<Booking>) => {
    return api.post<ApiResponse<Booking>>("/bookings", data);
  },

  /**
   * Update booking status
   */
  updateBooking: async (id: string, data: Partial<Booking>) => {
    return api.patch<ApiResponse<Booking>>(`/bookings/${id}`, data);
  },

  /**
   * Cancel a booking
   */
  cancelBooking: async (id: string) => {
    return api.delete<ApiResponse<void>>(`/bookings/${id}`);
  },
};

/**
 * Service API
 */
export const serviceApi = {
  /**
   * Get all services
   */
  getServices: async () => {
    return api.get<ApiResponse<Service[]>>("/services");
  },

  /**
   * Get a single service by ID
   */
  getService: async (id: string) => {
    return api.get<ApiResponse<Service>>(`/services/${id}`);
  },
};

/**
 * Payment API
 */
export const paymentApi = {
  /**
   * Create a payment intent for Stripe
   */
  createStripePayment: async (data: {
    bookingId: string;
    amount: number;
    currency: string;
  }) => {
    return api.post<ApiResponse<{ clientSecret: string }>>("/payments/stripe", data);
  },

  /**
   * Create a payment for Flutterwave
   */
  createFlutterwavePayment: async (data: {
    bookingId: string;
    amount: number;
    currency: string;
    email: string;
    name: string;
  }) => {
    return api.post<ApiResponse<{ link: string }>>("/payments/flutterwave", data);
  },

  /**
   * Verify payment status
   */
  verifyPayment: async (transactionId: string) => {
    return api.get<ApiResponse<{ status: string; paid: boolean }>>(
      `/payments/verify/${transactionId}`
    );
  },
};

/**
 * Contact API
 */
export const contactApi = {
  /**
   * Send a partnership inquiry
   */
  sendPartnershipInquiry: async (data: {
    name: string;
    email: string;
    company: string;
    message: string;
  }) => {
    return api.post<ApiResponse<void>>("/contact/partnership", data);
  },

  /**
   * Send a provider verification request
   */
  sendProviderVerification: async (data: {
    name: string;
    email: string;
    phone: string;
    category: ServiceCategory;
    message: string;
  }) => {
    return api.post<ApiResponse<void>>("/contact/provider-verification", data);
  },
};
