import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Types } from "mongoose";
import User from "../models/user";
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
          return done("Error: Invalid username", false);
        }
        // Check whether password is a match
        const isValid = validatePassword(password, user.passwordHash);
        // Return user if password matches
        if (isValid && !user.locked) {
          done(null, user);
        } else {
          console.log("password not valid");
          user.failedAttempts++;
          if (user.failedAttempts >= 5) {
            user.locked = true;
          }
          user.save((err, user) => {
            if (err) {
              return done("your mom", false);
            } else if (user.locked) {
              return done("Account locked", false);
            }
            return done("Error: Password is incorrect", false);
          });
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