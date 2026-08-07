// Type definitions for the booking system

export interface Driver {
  id: string;
  name: string;
  rating: number;
  experience: string;
  languages: string[];
  hourlyRate: number;
  verified: boolean;
  image: string;
}

export interface Booking {
  id: string;
  driverId: string;
  driverName: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  hours: number;
  hourlyRate: number;
  subtotal: number;
  commission: number;
  driverEarnings: number;
  total: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  paymentMethod: string;
  status: "pending" | "succeeded" | "failed";
  processedAt: string;
}

export interface BookingRequest {
  driverId: string;
  driverName: string;
  hours: number;
  hourlyRate: number;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
}

export interface PaymentRequest {
  bookingId: string;
  amount: number;
  paymentMethod?: string;
}
