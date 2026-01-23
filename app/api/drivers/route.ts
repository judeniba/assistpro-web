import { NextResponse } from "next/server";

// Mock driver data - In production, this would come from a database
const drivers = [
  {
    id: "driver-1",
    name: "James Anderson",
    rating: 4.9,
    experience: "8 years",
    languages: ["English", "French"],
    hourlyRate: 50,
    verified: true,
    image: "/images/driver-placeholder.jpg",
  },
  {
    id: "driver-2",
    name: "Maria Santos",
    rating: 4.8,
    experience: "6 years",
    languages: ["English", "Spanish", "Italian"],
    hourlyRate: 45,
    verified: true,
    image: "/images/driver-placeholder.jpg",
  },
  {
    id: "driver-3",
    name: "Chen Wei",
    rating: 5.0,
    experience: "10 years",
    languages: ["English", "Mandarin"],
    hourlyRate: 55,
    verified: true,
    image: "/images/driver-placeholder.jpg",
  },
];

export async function GET() {
  return NextResponse.json({ drivers });
}
