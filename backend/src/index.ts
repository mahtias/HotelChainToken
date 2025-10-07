import express from "express";
import "dotenv/config";
import userRoutes from "./routes/userRoutes";
import hotelRoutes from "./routes/hotelRoutes";
import investmentRoutes from "./routes/investmentRoutes";
import portfolioRoutes from "./routes/portfolioRoutes";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/portfolios", portfolioRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
