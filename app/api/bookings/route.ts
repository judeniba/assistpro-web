import { NextResponse } from "next/server";
import { Booking, BookingRequest } from "../../types/booking";

// Mock bookings storage - In production, this would be a database
const bookings: Booking[] = [];

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json();
    const { driverId, driverName, hours, hourlyRate, clientName, clientEmail, clientPhone } = body;

    // Validate required fields
    if (!driverId || !hours || !hourlyRate || !clientName || !clientEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Calculate costs
    const subtotal = hourlyRate * hours;
    const commission = subtotal * 0.15; // 15% commission to company
    const driverEarnings = subtotal - commission;
    const total = subtotal;

    // Create booking
    const booking: Booking = {
      id: `booking-${Date.now()}`,
      driverId,
      driverName,
      clientName,
      clientEmail,
      clientPhone,
      hours,
      hourlyRate,
      subtotal,
      commission,
      driverEarnings,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    bookings.push(booking);

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ bookings });
}
