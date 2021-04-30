"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
// Import .env file if not in production
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
// Import dependencies
var mongoose_1 = __importDefault(require("mongoose"));
var mongoURI = process.env.MONGO_URI || "";
// Defined, setup, and export DB connection
function connectToDB() {
    mongoose_1.default.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    var db = mongoose_1.default.connection;
    db.on("error", function (error) { return console.log(error); });
    db.once("open", function () { return console.log("Connected to database"); });
    db.on("disconnected", function () { return console.log("Disconnected from database"); });
}
exports.connectToDB = connectToDB;
