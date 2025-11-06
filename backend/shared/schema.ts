import { pgTable, text, serial, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/** HOTELS */
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

/** USERS */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  walletAddress: text("wallet_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

/** INVESTMENTS */
export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  hotelId: integer("hotel_id").notNull(),
  amount: integer("amount").notNull(), // in cents
  currentValue: integer("current_value").notNull(), // in cents
  purchaseDate: timestamp("purchase_date").defaultNow(),
  status: text("status").default("active"), // active, sold
});

/** PORTFOLIOS */
export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  totalInvestment: integer("total_investment").notNull(), // in cents
  currentValue: integer("current_value").notNull(), // in cents
  totalReturn: integer("total_return").notNull(), // in cents
  returnRate: real("return_rate").notNull(), // as percentage
  updatedAt: timestamp("updated_at").defaultNow(),
});

/** BOOKINGS */
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  userId: integer("user_id").notNull(),
  checkinDate: timestamp("checkin_date").notNull(),
  checkoutDate: timestamp("checkout_date").notNull(),
  status: text("status").default("pending"), // pending, confirmed, completed
  createdAt: timestamp("created_at").defaultNow(),
});

/** PAYMENTS */
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),

  // foreign keys (optional, link to other tables if they exist)
  userId: integer("user_id"),
  bookingId: integer("booking_id"),
  investmentId: integer("investment_id"),

  walletAddress: text("wallet_address").notNull(),
  amount: text("amount").notNull(),            // store BigInt as string
  amountHuman: text("amount_human"),
  method: text("method").notNull(),            // e.g., "USDC", "ETH"
  status: text("status").default("pending"),   // pending | confirmed | failed
  txHash: text("tx_hash").unique(),            // unique ensures one tx per payment
  receivedAt: timestamp("received_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});





/** VOUCHERS */
export const vouchers = pgTable("vouchers", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  discountAmount: integer("discount_amount"), // in cents
  discountPercent: real("discount_percent"), // e.g., 10 for 10%
  maxUsage: integer("max_usage").default(1),
  usedCount: integer("used_count").default(0),
  validFrom: timestamp("valid_from").notNull(),
  validUntil: timestamp("valid_until").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

/** BOOKING-VOUCHER RELATION (optional) */
export const bookingVouchers = pgTable("booking_vouchers", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").notNull(),
  voucherId: integer("voucher_id").notNull(),
});

/** BLOGS */
export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  imageUrl: text("image_url"),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/** INSERT SCHEMAS */
export const insertHotelSchema = createInsertSchema(hotels).omit({ id: true, createdAt: true });
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertInvestmentSchema = createInsertSchema(investments).omit({ id: true, purchaseDate: true });
export const insertPortfolioSchema = createInsertSchema(portfolios).omit({ id: true, updatedAt: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true });
export const insertPaymentSchema = createInsertSchema(payments).omit({ id: true, createdAt: true });
export const insertVoucherSchema = createInsertSchema(vouchers).omit({ id: true, createdAt: true });
export const insertBookingVoucherSchema = createInsertSchema(bookingVouchers).omit({ id: true });

/** TYPE DEFINITIONS */
export type Hotel = typeof hotels.$inferSelect;
export type User = typeof users.$inferSelect;
export type Investment = typeof investments.$inferSelect;
export type Portfolio = typeof portfolios.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Voucher = typeof vouchers.$inferSelect;
export type BookingVoucher = typeof bookingVouchers.$inferSelect;

export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type InsertVoucher = z.infer<typeof insertVoucherSchema>;
export type InsertBookingVoucher = z.infer<typeof insertBookingVoucherSchema>;

