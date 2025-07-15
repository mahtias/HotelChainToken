import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInvestmentSchema, insertHotelSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Hotel routes
  app.get("/api/hotels", async (req, res) => {
    try {
      const hotels = await storage.getHotels();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotels" });
    }
  });

  app.get("/api/hotels/search", async (req, res) => {
    try {
      const { query = "", location, type, minInvestment } = req.query;
      const minInvestmentNum = minInvestment ? parseInt(minInvestment as string) : undefined;
      
      const hotels = await storage.searchHotels(
        query as string,
        location as string,
        type as string,
        minInvestmentNum
      );
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Failed to search hotels" });
    }
  });

  app.get("/api/hotels/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const hotel = await storage.getHotel(id);
      
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotel" });
    }
  });

  app.post("/api/hotels", async (req, res) => {
    try {
      const hotelData = insertHotelSchema.parse(req.body);
      const hotel = await storage.createHotel(hotelData);
      res.status(201).json(hotel);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid hotel data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create hotel" });
    }
  });

  // Investment routes
  app.get("/api/investments", async (req, res) => {
    try {
      const { userId, hotelId } = req.query;
      
      let investments;
      if (userId) {
        investments = await storage.getInvestmentsByUserId(parseInt(userId as string));
      } else if (hotelId) {
        investments = await storage.getInvestmentsByHotelId(parseInt(hotelId as string));
      } else {
        investments = await storage.getInvestments();
      }
      
      res.json(investments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch investments" });
    }
  });

  app.post("/api/investments", async (req, res) => {
    try {
      const investmentData = insertInvestmentSchema.parse(req.body);
      const investment = await storage.createInvestment(investmentData);
      res.status(201).json(investment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid investment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create investment" });
    }
  });

  // Portfolio routes
  app.get("/api/portfolio/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const portfolio = await storage.getPortfolio(userId);
      
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio" });
    }
  });

  // Portfolio with investments details
  app.get("/api/portfolio/:userId/details", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const portfolio = await storage.getPortfolio(userId);
      const investments = await storage.getInvestmentsByUserId(userId);
      
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }

      // Get hotel details for each investment
      const investmentDetails = await Promise.all(
        investments.map(async (investment) => {
          const hotel = await storage.getHotel(investment.hotelId);
          return {
            ...investment,
            hotel,
          };
        })
      );
      
      res.json({
        portfolio,
        investments: investmentDetails,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio details" });
    }
  });

  // Market overview
  app.get("/api/market/overview", async (req, res) => {
    try {
      const hotels = await storage.getHotels();
      const investments = await storage.getInvestments();
      
      const totalValue = hotels.reduce((sum, hotel) => sum + hotel.totalValue, 0);
      const avgReturn = hotels.reduce((sum, hotel) => sum + hotel.expectedReturn, 0) / hotels.length;
      const activeInvestors = new Set(investments.map(i => i.userId)).size;
      
      res.json({
        totalValue,
        avgReturn,
        properties: hotels.length,
        investors: activeInvestors,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market overview" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
