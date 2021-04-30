"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
var mongoose_1 = require("mongoose");
// Define schema
var bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    publishDate: {
        type: Date,
        required: true
    },
    coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType: {
        type: String,
        required: true
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    }
});
// Set virtual for coverImagePath to store base64 encoded value of the cover image
bookSchema.virtual("coverImagePath").get(function () {
    if (this.coverImage != null && this.coverImageType != null) {
        return "data:" + this.coverImageType + ";charset=utf-8;base64," + this.coverImage.toString('base64');
    }
});
// Define and export Book model based on schema
var Book = mongoose_1.model("Book", bookSchema);
exports.default = Book;
