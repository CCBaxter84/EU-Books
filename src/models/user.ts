// Import dependencies
import { Schema, Document, model, Model } from "mongoose";

// Define and export interface derived from mongoose Document
export interface IUser extends Document {
  email: string,
  username: string,
  passwordHash: string,
  admin: boolean,
  locked: boolean,
  failedAttempts: number
}

// Define schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  locked: {
    type: Boolean,
    required: true,
    default: false
  },
  failedAttempts: {
    type: Number,
    required: true,
    default: 0
  }
});

userSchema.post("save", function(this: IUser) {
  const user = this;
  if (user.locked) {
    setTimeout(function() {
      user.locked = false;
      user.failedAttempts = 0;
      user.save();
    }, 5 * 60 * 1000);
  }
});

// Define and export Book model based on schema
const User: Model<IUser> = model("User", userSchema);
export default User;