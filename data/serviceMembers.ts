import { ServiceMember } from "../types";

// Sample service members for demonstration
export const sampleServiceMembers: ServiceMember[] = [
  {
    id: "sm-001",
    name: "Elena Martinez",
    category: "Personal Assistant",
    dailyRate: 300,
    weeklyRate: 1800,
    bookingFee: 300,
    verified: true,
    bio: "Experienced executive assistant with 8+ years supporting C-level executives in luxury hospitality and private aviation.",
    languages: ["English", "Spanish", "French"],
    availability: ["Weekdays", "Weekends", "Travel-ready"],
    profileImage: "/images/placeholder-profile.jpg",
  },
  {
    id: "sm-002",
    name: "James Wilson",
    category: "Driver",
    hourlyRate: 50,
    dailyRate: 400,
    bookingFee: 400,
    verified: true,
    bio: "Professional chauffeur with 12 years experience. Specialized in luxury vehicle handling and VIP client service.",
    languages: ["English"],
    availability: ["24/7 Available"],
    profileImage: "/images/placeholder-profile.jpg",
  },
  {
    id: "sm-003",
    name: "Marcus Thompson",
    category: "Chaperone",
    hourlyRate: 75,
    dailyRate: 600,
    bookingFee: 600,
    verified: true,
    bio: "Certified security professional providing discreet accompaniment services for events and travel.",
    languages: ["English", "Italian"],
    availability: ["Events", "Travel"],
    profileImage: "/images/placeholder-profile.jpg",
  },
  {
    id: "sm-004",
    name: "Sophie Laurent",
    category: "Hostess",
    hourlyRate: 60,
    dailyRate: 480,
    bookingFee: 480,
    verified: true,
    bio: "Professional event hostess with experience in international conferences, luxury launches, and VIP guest management.",
    languages: ["English", "French", "Mandarin"],
    availability: ["Events", "Corporate"],
    profileImage: "/images/placeholder-profile.jpg",
  },
  {
    id: "sm-005",
    name: "Alessandro Rossi",
    category: "Artist",
    hourlyRate: 200,
    dailyRate: 1500,
    bookingFee: 1500,
    verified: true,
    bio: "Classically trained violinist available for luxury events, private performances, and exclusive gatherings.",
    languages: ["English", "Italian", "Spanish"],
    availability: ["Events", "Private Performances"],
    profileImage: "/images/placeholder-profile.jpg",
  },
];

export function getServiceMemberById(id: string): ServiceMember | undefined {
  return sampleServiceMembers.find((member) => member.id === id);
}

export function getServiceMembersByCategory(category: string): ServiceMember[] {
  return sampleServiceMembers.filter((member) => member.category === category);
}
