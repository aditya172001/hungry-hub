import mongoose from "mongoose";
import { Connection } from "mongoose";

let connectionInstance: Connection | null = null;

export async function ensureDbConnection() {
  if (connectionInstance) {
    return connectionInstance;
  }

  try {
    // Create a Mongoose connection
    const dbConnection = (await mongoose.connect(
      process.env.MONGODB_URI as string,
      {}
    )) as unknown as Connection;
    connectionInstance = dbConnection;
    return connectionInstance;
  } catch (error) {
    throw error;
  }
}
