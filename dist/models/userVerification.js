"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
var mongoose_1 = require("mongoose");
var user_1 = __importDefault(require("./user"));
// Define schema
var userVerificationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true
    },
});
userVerificationSchema.post("save", function (doc, next) {
    setTimeout(function () {
        doc.remove();
    }, 1000 * 60 * 60 * 12);
    next();
});
userVerificationSchema.post("remove", function (doc, next) {
    user_1.default.findByIdAndDelete(doc.user)
        .then(function () { return next(); });
});
// Define and export Book model based on schema
var UserVerification = mongoose_1.model("UserVerification", userVerificationSchema);
exports.default = UserVerification;
