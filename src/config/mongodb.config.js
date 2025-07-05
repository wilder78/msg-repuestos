import mongoose from "mongoose";

// Función de conexion a mongo.
export const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/MSGCOMPANY");
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
