// src/devSetup.ts
import "dotenv/config"; // <-- MUST be first
import { resetDatabase, seedDatabase } from "./seedData";
// import { log } from "./index"; // optional

async function setup() {
  try {
    console.log("Resetting database...");
    await resetDatabase();

    console.log("Seeding database...");
    const result = await seedDatabase();

    console.log("Database reset and seeded successfully!");
    console.log("Seeded user ID:", result.user.id);
    console.log("Number of hotels:", result.hotels.length);
  } catch (error) {
    console.error("Error during dev setup:", error);
  } finally {
    process.exit(0);
  }
}

setup();
