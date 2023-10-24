import mongoose, { Mongoose } from "mongoose";
import { Connection } from "mongoose";

let connectionInstance: Connection | null = null;

export async function ensureDbConnection() {
  if (connectionInstance) {
    return connectionInstance;
  }

  try {
    if (!process.env.MONGODB_URI)
      return new Error("MONGODB URI not present. at connectdb.ts");
    // Create a Mongoose connection
    const dbConnection: any = await mongoose.connect(
      process.env.MONGODB_URI,
      {}
    );
    connectionInstance = dbConnection;
    return connectionInstance;
  } catch (error) {
    throw error;
  }
}
