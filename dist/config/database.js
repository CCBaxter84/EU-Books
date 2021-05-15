"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = exports.sessionStore = void 0;
// Import .env file if not in production
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
// Import dependencies
var mongoose_1 = __importDefault(require("mongoose"));
var express_session_1 = __importDefault(require("express-session"));
var MongoDBStore = require("connect-mongodb-session")(express_session_1.default);
var mongoURI = process.env.MONGO_URI || "";
// Set up session store
exports.sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URI, collection: "sessions"
});
function connectToDB() {
    mongoose_1.default.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    var db = mongoose_1.default.connection;
    db.on("error", function (error) { return console.log(error); });
    db.on("connected", function () { return console.log("Connected to database"); });
    db.on("disconnected", function () { return console.log("Disconnected from database"); });
}
exports.connectToDB = connectToDB;
