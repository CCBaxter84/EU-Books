"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
var express_1 = __importDefault(require("express"));
// Set app and other variables
var app = express_1.default();
var PORT = 5000;
// Configure app
app.use(express_1.default.json());
// Set the server to listen
app.listen(PORT, function () {
    console.log("Server is listening on port " + PORT);
});
