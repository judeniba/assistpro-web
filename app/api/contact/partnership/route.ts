import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact/partnership - Send partnership inquiry
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !company || !message) {
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
    // 3. Optionally store the inquiry in a database
    // 4. Send confirmation email to the user

    console.log("Partnership inquiry received:", {
      name,
      email,
      company,
      message,
    });

    // Mock success response
    return NextResponse.json({
      success: true,
      message: "Partnership inquiry sent successfully. We'll contact you soon.",
    });
  } catch (error) {
    console.error("Error sending partnership inquiry:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send partnership inquiry",
      },
      { status: 500 }
    );
  }
}
