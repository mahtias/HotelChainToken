import { db } from "./db";
import { hotels, investments, portfolios, users } from "@shared/schema";

export async function seedDatabase() {
  try {
    console.log("Seeding database with initial data...");
    
    // Create default user
    const [defaultUser] = await db.insert(users).values({
      email: "demo@hotelvest.com",
      name: "Demo User",
      walletAddress: "0x742d35Cc6634C0532925a3b8D0E0af4dc53eb8b0"
    }).returning();

    // Create sample hotels
    const sampleHotels = [
      {
        name: "Ocean Vista Resort",
        location: "Maldives",
        description: "Luxury beachfront resort with overwater villas and world-class spa facilities",
        type: "luxury",
        imageUrl: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
        isActive: true
      },
      {
        name: "Manhattan Business Hub",
        location: "New York, NY",
        description: "Premium business hotel in the heart of Manhattan with modern amenities",
        type: "business",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        pricePerNight: 32000,
        totalValue: 1570000000,
        expectedReturn: 980,
        minInvestment: 500000,
        maxInvestment: 20000000,
        rooms: 287,
        rating: 460,
        features: ["City View", "Business Center", "Conference Rooms", "Executive Lounge", "Rooftop Bar"].join(","),
        amenities: ["WiFi", "Gym", "Restaurant", "Laundry", "Valet Parking"].join(","),
        documents: ["annual-report.pdf", "market-analysis.pdf", "investment-summary.pdf"].join(","),
        occupancyRate: 92,
        revenue: 28750000,
        expenses: 20125000,
        netIncome: 8625000,
        isActive: true
      },
      {
        name: "Le Petit Château",
        location: "Paris, France",
        description: "Charming boutique hotel in historic Montmartre district",
        type: "boutique",
        imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        pricePerNight: 28000,
        totalValue: 480000000,
        expectedReturn: 1120,
        minInvestment: 150000,
        maxInvestment: 5000000,
        rooms: 62,
        rating: 490,
        features: ["Historic Building", "Art Gallery", "Wine Cellar", "Garden Terrace", "Library"].join(","),
        amenities: ["WiFi", "Breakfast", "Concierge", "Pet Friendly", "Bike Rental"].join(","),
        documents: ["heritage-report.pdf", "renovation-plans.pdf", "performance-metrics.pdf"].join(","),
        occupancyRate: 89,
        revenue: 8940000,
        expenses: 6258000,
        netIncome: 2682000,
        isActive: true
      },
      {
        name: "Alpine Wellness Retreat",
        location: "Zermatt, Switzerland",
        description: "Eco-luxury mountain retreat with wellness spa and sustainable practices",
        type: "eco",
        imageUrl: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        pricePerNight: 65000,
        totalValue: 625000000,
        expectedReturn: 1180,
        minInvestment: 300000,
        maxInvestment: 8000000,
        rooms: 98,
        rating: 470,
        features: ["Mountain View", "Wellness Spa", "Organic Restaurant", "Ski Access", "Yoga Studio"].join(","),
        amenities: ["WiFi", "Spa", "Restaurant", "Fitness Center", "Ski Storage"].join(","),
        documents: ["sustainability-report.pdf", "wellness-programs.pdf", "ski-season-analysis.pdf"].join(","),
        occupancyRate: 84,
        revenue: 15625000,
        expenses: 10937500,
        netIncome: 4687500,
        isActive: true
      },
      {
        name: "Tokyo Modern Suites",
        location: "Tokyo, Japan",
        description: "Contemporary suites in Shibuya with panoramic city views",
        type: "modern",
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        pricePerNight: 42000,
        totalValue: 890000000,
        expectedReturn: 1050,
        minInvestment: 400000,
        maxInvestment: 12000000,
        rooms: 156,
        rating: 450,
        features: ["City View", "Modern Design", "Tech Integration", "Rooftop Garden", "Cultural Center"].join(","),
        amenities: ["WiFi", "Tech Concierge", "Restaurant", "Meditation Room", "Gaming Lounge"].join(","),
        documents: ["tech-integration-report.pdf", "cultural-impact-study.pdf", "market-position.pdf"].join(","),
        occupancyRate: 91,
        revenue: 19580000,
        expenses: 13706000,
        netIncome: 5874000,
        isActive: true
      },
      {
        name: "Santorini Sunset Villas",
        location: "Santorini, Greece",
        description: "Exclusive clifftop villas with infinity pools and Aegean Sea views",
        type: "luxury",
        imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        pricePerNight: 95000,
        totalValue: 520000000,
        expectedReturn: 1320,
        minInvestment: 350000,
        maxInvestment: 7500000,
        rooms: 24,
        rating: 495,
        features: ["Sea View", "Infinity Pool", "Private Terraces", "Sunset Views", "Wine Tasting"].join(","),
        amenities: ["WiFi", "Pool", "Spa", "Fine Dining", "Butler Service"].join(","),
        documents: ["luxury-positioning.pdf", "seasonal-analysis.pdf", "guest-satisfaction.pdf"].join(","),
        occupancyRate: 76,
        revenue: 6670000,
        expenses: 4669000,
        netIncome: 2001000,
        isActive: true
      }
    ];

    const createdHotels = await db.insert(hotels).values(sampleHotels).returning();
    console.log(`Created ${createdHotels.length} hotels`);

    // Create sample investments
    const sampleInvestments = [
      {
        userId: defaultUser.id,
        hotelId: createdHotels[0].id,
        amount: 500000,
        shares: 2000,
        investmentDate: new Date('2024-01-15'),
        currentValue: 525000,
        dividendsReceived: 12500,
        isActive: true
      },
      {
        userId: defaultUser.id,
        hotelId: createdHotels[1].id,
        amount: 1000000,
        shares: 3200,
        investmentDate: new Date('2024-02-20'),
        currentValue: 1048000,
        dividendsReceived: 24800,
        isActive: true
      },
      {
        userId: defaultUser.id,
        hotelId: createdHotels[2].id,
        amount: 300000,
        shares: 2000,
        investmentDate: new Date('2024-03-10'),
        currentValue: 316800,
        dividendsReceived: 8400,
        isActive: true
      }
    ];

    const createdInvestments = await db.insert(investments).values(sampleInvestments).returning();
    console.log(`Created ${createdInvestments.length} investments`);

    // Create portfolio
    const portfolioData = {
      userId: defaultUser.id,
      totalInvestment: 1800000,
      currentValue: 1889800,
      totalReturn: 89800,
      returnPercentage: 4.99,
      dividendsReceived: 45700,
      numberOfInvestments: 3,
      riskScore: 6.5,
      diversificationScore: 7.8,
      performanceScore: 8.2
    };

    const [portfolio] = await db.insert(portfolios).values(portfolioData).returning();
    console.log(`Created portfolio for user ${defaultUser.id}`);

    console.log("Database seeding completed successfully!");
    
    return {
      user: defaultUser,
      hotels: createdHotels,
      investments: createdInvestments,
      portfolio: portfolio
    };
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Function to check if database is already seeded
export async function isDatabaseSeeded(): Promise<boolean> {
  try {
    const hotelCount = await db.select().from(hotels);
    return hotelCount.length > 0;
  } catch (error) {
    console.error("Error checking database seed status:", error);
    return false;
  }
}

// Function to reset database (for development)
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