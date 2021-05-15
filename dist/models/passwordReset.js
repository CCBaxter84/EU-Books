"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
var mongoose_1 = require("mongoose");
// Define schema
var passwordResetSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
var PasswordReset = mongoose_1.model("PasswordReset", passwordResetSchema);
exports.default = PasswordReset;
