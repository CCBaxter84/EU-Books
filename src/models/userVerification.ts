// Import dependencies
import { Schema, Document, model, Model } from "mongoose";
import User from "./user";

// Define and export interface derived from mongoose Document
export interface IUserVerification extends Document {
  user: Schema.Types.ObjectId,
  token: string
}

// Define schema
const userVerificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true
  },
});

userVerificationSchema.post("updateOne", function(this: IUserVerification) {
});

// Define and export Book model based on schema
const UserVerification: Model<IUserVerification> = model("UserVerification", userVerificationSchema);

export default UserVerification;