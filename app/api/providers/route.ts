import { NextRequest, NextResponse } from "next/server";
import type { Provider } from "@/lib/types";

/**
 * Example API route handler for providers
 * GET /api/providers - Get all providers with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const language = searchParams.get("language");
    const verified = searchParams.get("verified");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // TODO: Replace with actual database query
    // This is mock data for demonstration
    const mockProviders: Provider[] = [
      {
        id: "1",
        name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        category: "personal_assistant" as any,
        languages: ["English", "French"],
        hourlyRate: 50,
        dailyRate: 400,
        weeklyRate: 2500,
        bio: "Experienced personal assistant with 10 years in luxury hospitality.",
        verified: true,
        rating: 4.8,
        totalBookings: 150,
        availability: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    // Apply filters (in production, this would be done in the database query)
    let filteredProviders = mockProviders;
    
    if (category) {
      filteredProviders = filteredProviders.filter((p) => p.category === category);
    }
    
    if (language) {
      filteredProviders = filteredProviders.filter((p) =>
        p.languages.includes(language)
      );
    }
    
    if (verified !== null) {
      const isVerified = verified === "true";
      filteredProviders = filteredProviders.filter((p) => p.verified === isVerified);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProviders = filteredProviders.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedProviders,
      pagination: {
        page,
        limit,
        total: filteredProviders.length,
        totalPages: Math.ceil(filteredProviders.length / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch providers",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/providers - Create a new provider registration
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["name", "email", "phone", "category"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    // TODO: Replace with actual database insertion
    // In production, this would save to your database
    const newProvider: Provider = {
      id: Math.random().toString(36).substr(2, 9),
      name: body.name,
      email: body.email,
      phone: body.phone,
      category: body.category,
      languages: body.languages || [],
      hourlyRate: body.hourlyRate || 0,
      dailyRate: body.dailyRate || 0,
      weeklyRate: body.weeklyRate || 0,
      bio: body.bio || "",
      verified: false, // New providers start as unverified
      rating: 0,
      totalBookings: 0,
      availability: body.availability || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // TODO: Send notification to admin for verification
    // await sendAdminNotification(newProvider);

    return NextResponse.json(
      {
        success: true,
        data: newProvider,
        message: "Provider registration submitted. Pending admin verification.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating provider:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create provider registration",
      },
      { status: 500 }
    );
  }
}
