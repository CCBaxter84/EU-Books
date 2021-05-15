"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var user_1 = __importDefault(require("../models/user"));
var password_utils_1 = require("../lib/password-utils");
var customFields = {
    usernameField: "username",
    passwordField: "password"
};
var strategy = new passport_local_1.Strategy(customFields, function (username, password, done) {
    // Find matching user in Database
    user_1.default.findOne({ username: username })
        .then(function (user) {
        // Guard clause for empty user
        if (!user) {
            return done("Error: Invalid username", false);
        }
        if (user.locked) {
            return done("Account locked", false);
        }
        // Check whether password is a match
        var isValid = password_utils_1.validatePassword(password, user.passwordHash);
        // Return user if password matches
        if (isValid && !user.locked) {
            user.failedAttempts = 0;
            user.save(function (err, user) {
                if (err) {
                    return done(err, false);
                }
                done(null, user);
            });
        }
        else {
            user.failedAttempts++;
            if (user.failedAttempts >= 5) {
                user.locked = true;
            }
            user.save(function (err, user) {
                if (err) {
                    return done(err, false);
                }
                else if (user.locked) {
                    return done("Account locked", false);
                }
                return done("Error: Password is incorrect", false);
            });
        }
    })
        // Handle errors
        .catch(function (err) { return done(err); });
});
passport_1.default.use(strategy);
passport_1.default.serializeUser(function (user, done) {
    done(null, user._id);
});
passport_1.default.deserializeUser(function (userId, done) {
    user_1.default.findById(userId)
        .then(function (user) {
        done(null, user);
    })
        .catch(function (err) { return done(err); });
});
exports.default = passport_1.default;
