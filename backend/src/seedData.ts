import { db } from "./db";
import { hotels, investments, portfolios, users } from "../shared/schema";
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  try {
    console.log("Seeding database with initial data...");

    // --- 1 Create default user (skip if already exists) ---
    let [demoUser] = await db.insert(users)
      .values({
        email: "demo@hotelvest.com",
        username: "Demo User",
        walletAddress: "0x742d35Cc6634C0532925a3b8D0E0af4dc53eb8b0"
      })
      .onConflictDoNothing({ target: users.username })
      .returning();

    if (!demoUser) {
      // Fetch existing user if insert was skipped
      [demoUser] = await db.select().from(users).where(eq(users.username, "Demo User"));
    }
    console.log("Demo User ID:", demoUser.id);

    // --- 2️ Create sample hotels ---
   const sampleHotels = [
  {
    name: "Ocean Vista Resort",
    location: "Maldives",
    description: "Luxury beachfront resort with overwater villas and world-class spa facilities",
    type: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    pricePerNight: 85000,
    totalValue: 820000000,
    expectedReturn: 1250,
    minInvestment: 250000,
    maxInvestment: 10000000,
    rooms: 145,
    rating: 480,
    features: ["Ocean View", "Private Beach", "Spa", "Restaurant", "Bar"].join(","),
    amenities: ["WiFi", "Pool", "Gym", "Room Service", "Concierge"].join(","),
    documents: ["financial-report.pdf", "property-valuation.pdf", "legal-docs.pdf"].join(","),
    occupancyRate: 87,
    revenue: 12500000,
    expenses: 8750000,
    netIncome: 3750000,
    fundingProgress: 0,
    isActive: true
  },
  {
    name: "Mountain Escape Lodge",
    location: "Switzerland",
    description: "Charming alpine retreat with panoramic mountain views and ski-in/ski-out access",
    type: "boutique",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    pricePerNight: 65000,
    totalValue: 560000000,
    expectedReturn: 1150,
    minInvestment: 200000,
    maxInvestment: 7500000,
    rooms: 90,
    rating: 470,
    features: ["Mountain View", "Fireplace", "Restaurant", "Spa"].join(","),
    amenities: ["WiFi", "Sauna", "Ski Rental", "Shuttle"].join(","),
    documents: ["financials.pdf", "land-ownership.pdf"].join(","),
    occupancyRate: 82,
    revenue: 8500000,
    expenses: 6200000,
    netIncome: 2300000,
    fundingProgress: 0,
    isActive: true
  },
  {
    name: "CityLux Tower",
    location: "Dubai",
    description: "Premium urban hotel with rooftop infinity pool and smart room automation",
    type: "business",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    pricePerNight: 120000,
    totalValue: 950000000,
    expectedReturn: 1350,
    minInvestment: 500000,
    maxInvestment: 15000000,
    rooms: 220,
    rating: 490,
    features: ["City View", "Smart Room", "Rooftop Bar", "Conference Hall"].join(","),
    amenities: ["WiFi", "Gym", "Pool", "Concierge"].join(","),
    documents: ["financial-report.pdf", "ownership-cert.pdf"].join(","),
    occupancyRate: 91,
    revenue: 18000000,
    expenses: 13000000,
    netIncome: 5000000,
    fundingProgress: 0,
    isActive: true
  }
];

    // Insert hotels one by one to ensure we get IDs
    const createdHotels = await Promise.all(
      sampleHotels.map(async (hotel) => {
        const [created] = await db.insert(hotels).values(hotel).returning();
        return created;
      })
    );
    console.log(`Created ${createdHotels.length} hotels`);

    // --- 3️ Create sample investments ---
    const sampleInvestments = [
      {
        userId: demoUser.id,
        hotelId: createdHotels[0].id,
        amount: 500000,
        shares: 2000,
        investmentDate: new Date('2024-01-15'),
        currentValue: 525000,
        dividendsReceived: 12500,
        isActive: true
      },
      {
        userId: demoUser.id,
        hotelId: createdHotels[1].id,
        amount: 1000000,
        shares: 3200,
        investmentDate: new Date('2024-02-20'),
        currentValue: 1048000,
        dividendsReceived: 24800,
        isActive: true
      },
      {
        userId: demoUser.id,
        hotelId: createdHotels[2].id,
        amount: 300000,
        shares: 2000,
        investmentDate: new Date('2024-03-10'),
        currentValue: 316800,
        dividendsReceived: 8400,
        isActive: true
      }
    ];

    const createdInvestments = await Promise.all(
      sampleInvestments.map(async (inv) => {
        const [created] = await db.insert(investments).values(inv).returning();
        return created;
      })
    );
    console.log(`Created ${createdInvestments.length} investments`);

    // --- 4️ Create portfolio for the user ---
    const portfolioData = {
      userId: demoUser.id,
      totalInvestment: 1800000,
      currentValue: 1889800,
      totalReturn: 89800,
      returnRate: 4.99,
      dividendsReceived: 45700,
      numberOfInvestments: 3,
      riskScore: 6.5,
      diversificationScore: 7.8,
      performanceScore: 8.2
    };

    const [portfolio] = await db.insert(portfolios).values(portfolioData).returning();
    console.log(`Created portfolio for user ${demoUser.id}`);

    console.log("Database seeding completed successfully!");

    return {
      user: demoUser,
      hotels: createdHotels,
      investments: createdInvestments,
      portfolio: portfolio
    };

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// --- Utility: check if database is seeded ---
export async function isDatabaseSeeded(): Promise<boolean> {
  try {
    const hotelCount = await db.select().from(hotels);
    return hotelCount.length > 0;
  } catch (error) {
    console.error("Error checking database seed status:", error);
    return false;
  }
}

// --- Utility: reset database (for development) ---
export async function resetDatabase() {
  try {
    console.log("Resetting database...");
    await db.delete(investments);
    await db.delete(portfolios);
    await db.delete(hotels);
    await db.delete(users);
    console.log("Database reset completed!");
  } catch (error) {
    console.error("Error resetting database:", error);
    throw error;
  }
}
