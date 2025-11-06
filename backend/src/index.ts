import express from "express";
import "dotenv/config";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import hotelRoutes from "./routes/hotelRoutes";
import investmentRoutes from "./routes/investmentRoutes";
import portfolioRoutes from "./routes/portfolioRoutes";
import pms from "./routes/pms";
import paymentRoutes from "./routes/payment";

const app = express();

app.use(cors({
  origin: "https://hotel-chain-token.vercel.app", // replace with your actual frontend URL
  credentials: true // optional, if you use cookies/auth https://hotel-chain-token.vercel.app
}));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/pms", pms);
app.use ("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
