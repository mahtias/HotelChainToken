import { hotels, investments, portfolios, users, type Hotel, type Investment, type Portfolio, type User, type InsertHotel, type InsertInvestment, type InsertPortfolio, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq, or, ilike, gte } from "drizzle-orm";

export interface IStorage {
  // Hotel methods
  getHotels(): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;
  searchHotels(query: string, location?: string, type?: string, minInvestment?: number): Promise<Hotel[]>;
  
  // Investment methods
  getInvestments(): Promise<Investment[]>;
  getInvestment(id: number): Promise<Investment | undefined>;
  getInvestmentsByUserId(userId: number): Promise<Investment[]>;
  getInvestmentsByHotelId(hotelId: number): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  updateInvestment(id: number, investment: Partial<Investment>): Promise<Investment>;
  
  // Portfolio methods
  getPortfolio(userId: number): Promise<Portfolio | undefined>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(userId: number, portfolio: Partial<Portfolio>): Promise<Portfolio>;
  
  // User methods
  getUser(id: number): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Hotel methods
  async getHotels(): Promise<Hotel[]> {
    return await db.select().from(hotels);
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    const [hotel] = await db.select().from(hotels).where(eq(hotels.id, id));
    return hotel || undefined;
  }

  async createHotel(hotel: InsertHotel): Promise<Hotel> {
    const [newHotel] = await db
      .insert(hotels)
      .values(hotel)
      .returning();
    return newHotel;
  }

  async searchHotels(query: string, location?: string, type?: string, minInvestment?: number): Promise<Hotel[]> {
    let conditions = [];
    
    if (query) {
      conditions.push(
        or(
          ilike(hotels.name, `%${query}%`),
          ilike(hotels.location, `%${query}%`),
          ilike(hotels.description, `%${query}%`)
        )
      );
    }
    
    if (location) {
      conditions.push(ilike(hotels.location, `%${location}%`));
    }
    
    if (type) {
      conditions.push(eq(hotels.type, type));
    }
    
    if (minInvestment) {
      conditions.push(gte(hotels.minInvestment, minInvestment));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(hotels).where(conditions.length === 1 ? conditions[0] : or(...conditions));
    }
    
    return await db.select().from(hotels);
  }

  // Investment methods
  async getInvestments(): Promise<Investment[]> {
    return await db.select().from(investments);
  }

  async getInvestment(id: number): Promise<Investment | undefined> {
    const [investment] = await db.select().from(investments).where(eq(investments.id, id));
    return investment || undefined;
  }

  async getInvestmentsByUserId(userId: number): Promise<Investment[]> {
    return await db.select().from(investments).where(eq(investments.userId, userId));
  }

  async getInvestmentsByHotelId(hotelId: number): Promise<Investment[]> {
    return await db.select().from(investments).where(eq(investments.hotelId, hotelId));
  }

  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const [newInvestment] = await db
      .insert(investments)
      .values(investment)
      .returning();
    return newInvestment;
  }

  async updateInvestment(id: number, investment: Partial<Investment>): Promise<Investment> {
    const [updatedInvestment] = await db
      .update(investments)
      .set(investment)
      .where(eq(investments.id, id))
      .returning();
    return updatedInvestment;
  }

  // Portfolio methods
  async getPortfolio(userId: number): Promise<Portfolio | undefined> {
    const [portfolio] = await db.select().from(portfolios).where(eq(portfolios.userId, userId));
    return portfolio || undefined;
  }

  async createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio> {
    const [newPortfolio] = await db
      .insert(portfolios)
      .values(portfolio)
      .returning();
    return newPortfolio;
  }

  async updatePortfolio(userId: number, portfolio: Partial<Portfolio>): Promise<Portfolio> {
    const [updatedPortfolio] = await db
      .update(portfolios)
      .set(portfolio)
      .where(eq(portfolios.userId, userId))
      .returning();
    return updatedPortfolio;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db
      .insert(users)
      .values(user)
      .returning();
    return newUser;
  }
}

export class MemStorage implements IStorage {
  private hotels: Map<number, Hotel> = new Map();
  private investments: Map<number, Investment> = new Map();
  private portfolios: Map<number, Portfolio> = new Map();
  private users: Map<number, User> = new Map();
  
  private currentHotelId = 1;
  private currentInvestmentId = 1;
  private currentPortfolioId = 1;
  private currentUserId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed hotels
    const hotelSeedData: InsertHotel[] = [
      {
        name: "Ocean Vista Resort",
        location: "Maldives",
        type: "luxury",
        totalValue: 820000000, // $8.2M in cents
        minInvestment: 250000, // $2,500 in cents
        expectedReturn: 12.5,
        fundingProgress: 68,
        rooms: 145,
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Luxury beachfront resort with infinity pool overlooking the ocean. Premium amenities and world-class service.",
        isActive: true,
      },
      {
        name: "Manhattan Business Hub",
        location: "New York, NY",
        type: "business",
        totalValue: 1570000000, // $15.7M in cents
        minInvestment: 500000, // $5,000 in cents
        expectedReturn: 9.8,
        fundingProgress: 92,
        rooms: 287,
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Modern city hotel with contemporary architecture and glass facade. Perfect for business travelers.",
        isActive: true,
      },
      {
        name: "Le Petit Château",
        location: "Paris, France",
        type: "boutique",
        totalValue: 480000000, // $4.8M in cents
        minInvestment: 150000, // $1,500 in cents
        expectedReturn: 11.2,
        fundingProgress: 45,
        rooms: 62,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Elegant boutique hotel with vintage charm and ornate interior. Authentic Parisian experience.",
        isActive: true,
      },
      {
        name: "Tokyo Business Tower",
        location: "Tokyo, Japan",
        type: "business",
        totalValue: 1200000000, // $12M in cents
        minInvestment: 300000, // $3,000 in cents
        expectedReturn: 8.9,
        fundingProgress: 76,
        rooms: 198,
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Modern high-rise hotel in the heart of Tokyo's business district.",
        isActive: true,
      },
      {
        name: "Swiss Alpine Lodge",
        location: "Zermatt, Switzerland",
        type: "luxury",
        totalValue: 650000000, // $6.5M in cents
        minInvestment: 400000, // $4,000 in cents
        expectedReturn: 10.8,
        fundingProgress: 58,
        rooms: 89,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Luxury mountain resort with spectacular alpine views and premium ski access.",
        isActive: true,
      },
    ];

    hotelSeedData.forEach(hotel => {
      const newHotel: Hotel = {
        ...hotel,
        id: this.currentHotelId++,
        createdAt: new Date(),
        isActive: hotel.isActive ?? true,
      };
      this.hotels.set(newHotel.id, newHotel);
    });

    // Seed default user
    const defaultUser: User = {
      id: this.currentUserId++,
      username: "demo_user",
      email: "demo@hotelvest.com",
      walletAddress: "0x742d35Cc6634C0532925a3b8D4f70B87fFc5ce8e",
      createdAt: new Date(),
    };
    this.users.set(defaultUser.id, defaultUser);

    // Seed investments for demo user
    const investmentSeedData: InsertInvestment[] = [
      {
        userId: 1,
        hotelId: 1,
        amount: 2500000, // $25,000 in cents
        currentValue: 2875000, // $28,750 in cents
        status: "active",
      },
      {
        userId: 1,
        hotelId: 2,
        amount: 2000000, // $20,000 in cents
        currentValue: 2153000, // $21,530 in cents
        status: "active",
      },
      {
        userId: 1,
        hotelId: 3,
        amount: 250000, // $2,500 in cents
        currentValue: 290000, // $2,900 in cents
        status: "active",
      },
    ];

    investmentSeedData.forEach(investment => {
      const newInvestment: Investment = {
        ...investment,
        id: this.currentInvestmentId++,
        purchaseDate: new Date(),
        status: investment.status ?? "active",
      };
      this.investments.set(newInvestment.id, newInvestment);
    });

    // Seed portfolio for demo user
    const portfolioData: InsertPortfolio = {
      userId: 1,
      totalInvestment: 4750000, // $47,500 in cents
      currentValue: 5218000, // $52,180 in cents
      totalReturn: 468000, // $4,680 in cents
      returnRate: 9.85,
    };

    const newPortfolio: Portfolio = {
      ...portfolioData,
      id: this.currentPortfolioId++,
      updatedAt: new Date(),
    };
    this.portfolios.set(newPortfolio.id, newPortfolio);
  }

  async getHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values()).filter(h => h.isActive);
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    return this.hotels.get(id);
  }

  async createHotel(hotel: InsertHotel): Promise<Hotel> {
    const newHotel: Hotel = {
      ...hotel,
      id: this.currentHotelId++,
      createdAt: new Date(),
      isActive: hotel.isActive ?? true,
    };
    this.hotels.set(newHotel.id, newHotel);
    return newHotel;
  }

  async searchHotels(query: string, location?: string, type?: string, minInvestment?: number): Promise<Hotel[]> {
    const allHotels = Array.from(this.hotels.values()).filter(h => h.isActive);
    
    return allHotels.filter(hotel => {
      const matchesQuery = query === "" || 
        hotel.name.toLowerCase().includes(query.toLowerCase()) ||
        hotel.location.toLowerCase().includes(query.toLowerCase()) ||
        hotel.type.toLowerCase().includes(query.toLowerCase());
      
      const matchesLocation = !location || location === "All Locations" || hotel.location === location;
      const matchesType = !type || type === "All Types" || hotel.type === type;
      const matchesMinInvestment = !minInvestment || hotel.minInvestment >= minInvestment;
      
      return matchesQuery && matchesLocation && matchesType && matchesMinInvestment;
    });
  }

  async getInvestments(): Promise<Investment[]> {
    return Array.from(this.investments.values());
  }

  async getInvestment(id: number): Promise<Investment | undefined> {
    return this.investments.get(id);
  }

  async getInvestmentsByUserId(userId: number): Promise<Investment[]> {
    return Array.from(this.investments.values()).filter(i => i.userId === userId);
  }

  async getInvestmentsByHotelId(hotelId: number): Promise<Investment[]> {
    return Array.from(this.investments.values()).filter(i => i.hotelId === hotelId);
  }

  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const newInvestment: Investment = {
      ...investment,
      id: this.currentInvestmentId++,
      purchaseDate: new Date(),
      status: investment.status ?? "active",
    };
    this.investments.set(newInvestment.id, newInvestment);
    return newInvestment;
  }

  async updateInvestment(id: number, investment: Partial<Investment>): Promise<Investment> {
    const existing = this.investments.get(id);
    if (!existing) {
      throw new Error('Investment not found');
    }
    const updated = { ...existing, ...investment };
    this.investments.set(id, updated);
    return updated;
  }

  async getPortfolio(userId: number): Promise<Portfolio | undefined> {
    return Array.from(this.portfolios.values()).find(p => p.userId === userId);
  }

  async createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio> {
    const newPortfolio: Portfolio = {
      ...portfolio,
      id: this.currentPortfolioId++,
      updatedAt: new Date(),
    };
    this.portfolios.set(newPortfolio.id, newPortfolio);
    return newPortfolio;
  }

  async updatePortfolio(userId: number, portfolio: Partial<Portfolio>): Promise<Portfolio> {
    const existing = Array.from(this.portfolios.values()).find(p => p.userId === userId);
    if (!existing) {
      throw new Error('Portfolio not found');
    }
    const updated = { ...existing, ...portfolio, updatedAt: new Date() };
    this.portfolios.set(existing.id, updated);
    return updated;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.email === email);
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      ...user,
      id: this.currentUserId++,
      createdAt: new Date(),
      walletAddress: user.walletAddress ?? null,
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }
}

export const storage = new DatabaseStorage();
