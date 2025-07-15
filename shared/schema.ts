import { pgTable, text, serial, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(), // luxury, business, boutique, extended-stay
  totalValue: integer("total_value").notNull(), // in cents
  minInvestment: integer("min_investment").notNull(), // in cents
  expectedReturn: real("expected_return").notNull(), // as percentage
  fundingProgress: real("funding_progress").notNull(), // as percentage
  rooms: integer("rooms").notNull(),
  rating: real("rating").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  hotelId: integer("hotel_id").notNull(),
  amount: integer("amount").notNull(), // in cents
  currentValue: integer("current_value").notNull(), // in cents
  purchaseDate: timestamp("purchase_date").defaultNow(),
  status: text("status").default("active"), // active, sold
});

export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  totalInvestment: integer("total_investment").notNull(), // in cents
  currentValue: integer("current_value").notNull(), // in cents
  totalReturn: integer("total_return").notNull(), // in cents
  returnRate: real("return_rate").notNull(), // as percentage
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  walletAddress: text("wallet_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHotelSchema = createInsertSchema(hotels).omit({
  id: true,
  createdAt: true,
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  purchaseDate: true,
});

export const insertPortfolioSchema = createInsertSchema(portfolios).omit({
  id: true,
  updatedAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export type Hotel = typeof hotels.$inferSelect;
export type Investment = typeof investments.$inferSelect;
export type Portfolio = typeof portfolios.$inferSelect;
export type User = typeof users.$inferSelect;

export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
