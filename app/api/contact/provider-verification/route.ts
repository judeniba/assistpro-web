import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact/provider-verification - Send provider verification request
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, category, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !category || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    // TODO: Implement email sending logic
    // In production, you would:
    // 1. Use a service like SendGrid, AWS SES, or Resend
    // 2. Send email to admin (seaointeralia@gmail.com)
    // 3. Store the verification request in a database
    // 4. Send confirmation email to the provider

    console.log("Provider verification request received:", {
      name,
      email,
      phone,
      category,
      message,
    });

    // Mock success response
    return NextResponse.json({
      success: true,
      message: "Verification request submitted. Our team will review your application.",
    });
  } catch (error) {
    console.error("Error sending provider verification request:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send verification request",
      },
      { status: 500 }
    );
  }
}
