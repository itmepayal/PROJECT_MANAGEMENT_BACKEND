import mongoose from "mongoose";
import { connectDB } from "../config/db.config";
import { seedRoles } from "./role.seed";
import logger from "../config/logger.config";

const runSeed = async () => {
  try {
    await connectDB();
    logger.info("Database connected for seeding.");
    await seedRoles();
    logger.info("Seed completed successfully.");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    logger.error("Seed failed:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

runSeed();
