import mongoose from "mongoose";
import { config } from "dotenv";

config();
const mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017/dns";

export const connectMongo = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
  }
};
