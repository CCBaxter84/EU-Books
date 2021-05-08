import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Types } from "mongoose";
import User, { IUser } from "../models/user";
import { validatePassword } from "../lib/passwordUtils";

const customFields = {
  usernameField: "username",
  passwordField: "password"
};

const strategy = new LocalStrategy(customFields, function(username, password, done) {
  // Find matching user in Database
  User.findOne({ username: username })
      .then(user => {
        // Guard clause for empty user
        if (!user) {
          return done(null, false);
        }
        // Check whether password is a match
        const isValid = validatePassword(password, user.passwordHash);
        // Return user if password matches
        if (isValid) {
          done(null, user);
        } else {
          return done(null, false);
        }
      })
      // Handle errors
      .catch(err => done(err));
});

declare global {
  namespace Express {
    interface User {
      email: string,
      username: string,
      passwordHash: string
      admin: boolean,
      locked: boolean,
      _id?: Types.ObjectId|string
    }
  }
}

passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((userId, done) => {
  User.findById(userId)
      .then(user => {
        done(null, user);
      })
      .catch(err => done(err));
});

export default passport;