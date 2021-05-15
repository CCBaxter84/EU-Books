"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
var mongoose_1 = require("mongoose");
var book_1 = __importDefault(require("./book"));
var global_constants_1 = require("../lib/global-constants");
// Define schema
var authorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    }
});
// Add check to prevent deleting an author associated with books stored in the database
authorSchema.pre("remove", function (next) {
    book_1.default.find({ author: this._id }, function (error, books) {
        if (error) {
            next(error);
        }
        else if (books.length > 0) {
            next(new Error(global_constants_1.AUTHOR_HAS_BOOKS_ERR));
        }
        else {
            next();
        }
    });
});
// Add check to prevent saving duplicate author entries
authorSchema.pre("save", function (next) {
    Author.find({ name: this.name }, function (error, author) {
        if (error) {
            next(error);
        }
        else if (author.length >= 1) {
            next(new Error(global_constants_1.AUTHOR_EXISTS_ERR));
        }
        else {
            next();
        }
    });
});
// Define and export Author model
var Author = mongoose_1.model("Author", authorSchema);
exports.default = Author;
