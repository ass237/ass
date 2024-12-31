/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const connect = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }
    await mongoose.connect(uri);
    console.log("Database connected successfully");
  } catch (error: any) {
    console.error("Database connection failed:", error);
    throw error; // Optional: re-throw the error for further handling
  }
};

export default connect;
