"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import .env file if not in production
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
// Import dependencies
var mongoose_1 = require("mongoose");
// Define schema
var userSchema = new mongoose_1.Schema({
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
        default: true
    },
    failedAttempts: {
        type: Number,
        required: true,
        default: 0
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
});
userSchema.post("save", function (doc, next) {
    if (doc.verified && doc.locked) {
        setTimeout(function () {
            doc.locked = false;
            doc.failedAttempts = 0;
            doc.save();
        }, 5 * 60 * 1000);
    }
    next();
});
userSchema.post("save", function (doc) {
    if (process.env.EMAIL_ADDRESS === doc.email && !doc.admin) {
        doc.admin = true;
        doc.save();
    }
});
// Define and export Book model based on schema
var User = mongoose_1.model("User", userSchema);
exports.default = User;
