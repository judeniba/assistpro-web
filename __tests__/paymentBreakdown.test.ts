import { calculatePaymentBreakdown } from "../types";

describe("Payment Breakdown Calculation", () => {
  test("should correctly calculate 15% commission on booking fee", () => {
    const bookingFee = 1000;
    const taxes = 0;
    const transactionFees = 0;

    const breakdown = calculatePaymentBreakdown(bookingFee, taxes, transactionFees);

    expect(breakdown.parentCompanyCommission).toBe(150); // 15% of 1000
    expect(breakdown.serviceMemberEarnings).toBe(850); // 85% of 1000
    expect(breakdown.subtotal).toBe(1000);
    expect(breakdown.total).toBe(1000);
  });

  test("should not include taxes and transaction fees in commission calculation", () => {
    const bookingFee = 1000;
    const taxes = 100; // 10% tax
    const transactionFees = 30; // Transaction fee

    const breakdown = calculatePaymentBreakdown(bookingFee, taxes, transactionFees);

    // Commission should still be 15% of booking fee only
    expect(breakdown.parentCompanyCommission).toBe(150); // 15% of 1000
    expect(breakdown.serviceMemberEarnings).toBe(850); // 85% of 1000
    
    // Total should include booking fee + taxes + transaction fees
    expect(breakdown.total).toBe(1130); // 1000 + 100 + 30
    expect(breakdown.taxes).toBe(100);
    expect(breakdown.transactionFees).toBe(30);
  });

  test("should handle decimal values correctly", () => {
    const bookingFee = 300;
    const taxes = 30;
    const transactionFees = 9;

    const breakdown = calculatePaymentBreakdown(bookingFee, taxes, transactionFees);

    expect(breakdown.parentCompanyCommission).toBe(45); // 15% of 300
    expect(breakdown.serviceMemberEarnings).toBe(255); // 85% of 300
    expect(breakdown.total).toBe(339); // 300 + 30 + 9
  });

  test("should work with real-world Stripe fees", () => {
    const bookingFee = 500;
    const taxes = 50; // 10% tax
    const transactionFees = 500 * 0.029 + 0.3; // Stripe: 2.9% + $0.30

    const breakdown = calculatePaymentBreakdown(bookingFee, taxes, transactionFees);

    expect(breakdown.parentCompanyCommission).toBe(75); // 15% of 500
    expect(breakdown.serviceMemberEarnings).toBe(425); // 85% of 500
    expect(breakdown.subtotal).toBe(500);
    
    // Total should be booking fee + tax + transaction fees
    const expectedTotal = 500 + 50 + transactionFees;
    expect(breakdown.total).toBeCloseTo(expectedTotal, 2);
  });

  test("should maintain correct percentages", () => {
    const bookingFee = 1000;
    const breakdown = calculatePaymentBreakdown(bookingFee, 0, 0);

    // Verify percentages add up to 100%
    const totalPercentage = 
      (breakdown.parentCompanyCommission / bookingFee) + 
      (breakdown.serviceMemberEarnings / bookingFee);
    
    expect(totalPercentage).toBe(1.0); // 100%
    
    // Verify individual percentages
    expect(breakdown.parentCompanyCommission / bookingFee).toBe(0.15); // 15%
    expect(breakdown.serviceMemberEarnings / bookingFee).toBe(0.85); // 85%
  });
});
