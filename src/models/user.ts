// Import dependencies
import { Schema, Document, model, Model } from "mongoose";

// Define and export interface derived from mongoose Document
export interface IUser extends Document {
  email: string,
  username: string,
  passwordHash: string,
  passwordSalt: string
}

// Define schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: Number,
    required: true
  },
  passwordSalt: {
    type: String,
    required: true
  }
});

// Define and export Book model based on schema
const User: Model<IUser> = model("User", userSchema);
export default User;