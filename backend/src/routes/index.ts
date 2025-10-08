// backend/src/routes/index.ts
import { Express } from "express";
import hotelsRouter from "./hotelRoutes";
import investmentsRouter from "./investmentRoutes";
import portfolioRouter from "./portfolioRoutes";

export function setupRoutes(app: Express) {
  app.use("/api/hotels", hotelsRouter);
  app.use("/api/investments", investmentsRouter);
  app.use("/api/portfolio", portfolioRouter);
}
