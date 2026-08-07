"use client";

import { providerApi, serviceApi, bookingApi, contactApi } from "../api/services";
import { useApi, useMutation } from "./useApi";
import type { ServiceCategory } from "../types";

/**
 * Hook to fetch all providers
 */
export function useProviders(params?: {
  category?: ServiceCategory;
  language?: string;
  verified?: boolean;
}) {
  return useApi(() => providerApi.getProviders(params));
}

/**
 * Hook to fetch a single provider
 */
export function useProvider(id: string) {
  return useApi(() => providerApi.getProvider(id));
}

/**
 * Hook to create a provider registration
 */
export function useCreateProvider() {
  return useMutation(providerApi.createProvider);
}

/**
 * Hook to fetch all services
 */
export function useServices() {
  return useApi(() => serviceApi.getServices());
}

/**
 * Hook to fetch bookings for a user
 */
export function useBookings(userId: string) {
  return useApi(() => bookingApi.getBookings(userId));
}

/**
 * Hook to create a booking
 */
export function useCreateBooking() {
  return useMutation(bookingApi.createBooking);
}

/**
 * Hook to update a booking
 */
export function useUpdateBooking() {
  return useMutation(
    async ({ id, data }: { id: string; data: any }) =>
      bookingApi.updateBooking(id, data)
  );
}

/**
 * Hook to send partnership inquiry
 */
export function useSendPartnershipInquiry() {
  return useMutation(contactApi.sendPartnershipInquiry);
}

/**
 * Hook to send provider verification request
 */
export function useSendProviderVerification() {
  return useMutation(contactApi.sendProviderVerification);
}
