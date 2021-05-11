// Import dependencies
import { Schema, Document, model, Model } from "mongoose";

// Define and export interface derived from mongoose Document
export interface IPasswordReset extends Document {
  user: Schema.Types.ObjectId,
  token: string
}

// Define schema
const passwordResetSchema = new Schema({
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

passwordResetSchema.index({ "updatedAt": 1 }, { expireAfterSeconds: 300 });

// Define and export Book model based on schema
const PasswordReset: Model<IPasswordReset> = model("User", passwordResetSchema);

export default PasswordReset;