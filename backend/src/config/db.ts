import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected Successfully!");
  } catch (error) {
    console.error("Error connecting to MONGODB! ", error);
    process.exit(1); // exit with failure
  }
};
