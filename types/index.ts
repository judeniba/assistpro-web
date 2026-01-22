export interface ServiceMember {
  id: string;
  name: string;
  category: ServiceCategory;
  hourlyRate?: number;
  dailyRate?: number;
  weeklyRate?: number;
  bookingFee: number; // The fee set by the service member
  verified: boolean;
  bio?: string;
  languages: string[];
  availability: string[];
  profileImage?: string;
}

export type ServiceCategory = 
  | "Personal Assistant"
  | "Driver"
  | "Chaperone"
  | "Hostess"
  | "Artist";

export interface BookingDetails {
  serviceMemberId: string;
  bookingType: "hourly" | "daily" | "weekly" | "event";
  duration: number; // in hours, days, or weeks depending on bookingType
  bookingFee: number; // Total fee for the booking
  parentCompanyCommission: number; // 15% of booking fee
  serviceMemberEarnings: number; // 85% of booking fee
  taxes?: number;
  transactionFees?: number;
}

export interface PaymentBreakdown {
  subtotal: number; // Service member's booking fee
  parentCompanyCommission: number; // 15% of subtotal
  serviceMemberEarnings: number; // 85% of subtotal
  taxes: number;
  transactionFees: number;
  total: number; // subtotal + taxes + transactionFees
}

/**
 * Calculate payment breakdown with 15% commission to parent company
 * Commission is calculated on the booking fee before taxes and transaction fees
 */
export function calculatePaymentBreakdown(
  bookingFee: number,
  taxes: number = 0,
  transactionFees: number = 0
): PaymentBreakdown {
  const parentCompanyCommission = bookingFee * 0.15;
  const serviceMemberEarnings = bookingFee * 0.85;
  const total = bookingFee + taxes + transactionFees;

  return {
    subtotal: bookingFee,
    parentCompanyCommission,
    serviceMemberEarnings,
    taxes,
    transactionFees,
    total,
  };
}
