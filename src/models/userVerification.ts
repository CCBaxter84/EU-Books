// Import dependencies
import { Schema, Document, model, Model } from "mongoose";

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
  }
}, {
  timestamps: true
});

userVerificationSchema.index({ "updatedAt": 1 }, { expireAfterSeconds: 300 });

// Define and export Book model based on schema
const UserVerification: Model<IUserVerification> = model("UserVerification", userVerificationSchema);

export default UserVerification;