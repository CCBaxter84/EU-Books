// Import .env file if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import dependencies
import mongoose from "mongoose";
import session from "express-session";
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoURI: string = process.env.MONGO_URI || "";

// Set up session store
export const sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URI, collection: "sessions"
});

export function connectToDB(): void {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  const db = mongoose.connection;
  db.on("error", error => console.log(error));
  db.on("connected", () => console.log("Connected to database"));
  db.on("disconnected", () => console.log("Disconnected from database"));
}


