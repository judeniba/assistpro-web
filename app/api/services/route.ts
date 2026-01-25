import { NextRequest, NextResponse } from "next/server";
import type { Service } from "@/lib/types";

/**
 * Example API route handler for services
 * GET /api/services - Get all available services
 */
export async function GET() {
  try {
    // TODO: Replace with actual database query
    // This is mock data for demonstration
    const services: Service[] = [
      {
        id: "1",
        title: "Personal Assistants",
        description: "Daily, weekly, or long-term support for travel, scheduling, and lifestyle operations.",
        category: "personal_assistant" as any,
        hourlyRate: 50,
        dailyRate: 400,
        weeklyRate: 2500,
      },
      {
        id: "2",
        title: "Drivers (Client Vehicle)",
        description: "Professional drivers operating the client's vehicle—executive standard, safety-first.",
        category: "driver" as any,
        hourlyRate: 40,
        dailyRate: 320,
        weeklyRate: 2000,
      },
      {
        id: "3",
        title: "Chaperones (Male)",
        description: "Professional presence for events and travel. Verified, discreet, and policy-enforced.",
        category: "chaperone" as any,
        hourlyRate: 60,
        dailyRate: 480,
        weeklyRate: 3000,
      },
      {
        id: "4",
        title: "Hostesses (Female)",
        description: "Event-facing hospitality professionals for VIP guest management, conferences, and launches.",
        category: "hostess" as any,
        hourlyRate: 60,
        dailyRate: 480,
        weeklyRate: 3000,
      },
      {
        id: "5",
        title: "Artists",
        description: "Verified talent for performances and events—portfolio-based, brand-safe.",
        category: "artist" as any,
        hourlyRate: 100,
        dailyRate: 800,
        weeklyRate: 5000,
      },
    ];

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch services",
      },
      { status: 500 }
    );
  }
}
