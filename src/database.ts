// Import .env file if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import dependencies
import mongoose from "mongoose";
const mongoURI: string = process.env.MONGO_URI || "";

// Defined, setup, and export DB connection
export function connectToDB(): void {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on("error", error => console.log(error));
  db.once("open", () => console.log("Connected to database"));
  db.on("disconnected", () => console.log("Disconnected from database"));
}


