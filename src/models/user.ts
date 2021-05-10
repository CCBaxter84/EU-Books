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

// Add check to prevent saving duplicate user entries
userSchema.pre("save", function(this: IUser, next) {
  User.find({ email: this.email }, (error, user) => {
    if (error) {
      next(error);
    } else if (user.length >= 1) {
      next(new Error("Email address already registered"));
    } else {
      User.find({ username: this.username }, (error, user) => {
        if (error) {
          next(error);
        } else if (user.length >= 1) {
          next(new Error("Username already registered"));
        } else {
          next();
        }
      });
    }
  });
});

// Define and export Book model based on schema
const User: Model<IUser> = model("User", userSchema);
export default User;