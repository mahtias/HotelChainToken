import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from backend/.env
dotenv.config({ path: path.resolve(__dirname, ".env") });

if (!process.env.DATABASE_URL) {
  throw new Error(" DATABASE_URL is missing. Please define it in backend/.env");
}

export default defineConfig({
  out: "./migrations",                    // where migration files will be stored
  schema: "./shared/schema.ts",           // path to your schema file inside backend/src
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
