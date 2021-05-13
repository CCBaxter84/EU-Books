// Import dependencies
import { Schema, Document, model, Model } from "mongoose";
import User, { IUser } from "./user";

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

userVerificationSchema.post("save", function(doc: IUserVerification, next) {
  setTimeout(function() {
    doc.remove();
  }, 1000 * 60 * 60 * 12);
  next();
});

userVerificationSchema.post("remove", function(doc: IUserVerification, next) {
  User.findByIdAndDelete(doc.user)
      .then(() => next());
});

// Define and export Book model based on schema
const UserVerification: Model<IUserVerification> = model("UserVerification", userVerificationSchema);

export default UserVerification;