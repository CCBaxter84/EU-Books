"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookCoverChecker = exports.bookFormChecker = void 0;
var book_1 = __importDefault(require("../../models/book"));
var book_utils_1 = require("../book-utils");
// Middleware for checking book post and put requests
var bookFormChecker = function (req, res, next) {
    var book = new book_1.default();
    var hasEmptyField = false;
    for (var key in req.body) {
        if (!["coAuthor", "tags", "cover"].includes(key)) {
            if (req.body[key] === "" || !req.body[key]) {
                hasEmptyField = true;
            }
            else {
                try {
                    book[key] = req.body[key];
                }
                catch (_a) {
                    book_utils_1.renderNewPage(req, res, book, true);
                    return;
                }
            }
        }
    }
    if (!hasEmptyField) {
        next();
    }
    else {
        book_utils_1.renderNewPage(req, res, book, true);
        return;
    }
};
exports.bookFormChecker = bookFormChecker;
// Middleware for checking book post and put requests
var bookCoverChecker = function (req, res, next) {
    if (req.body.cover === "" || !req.body.cover) {
        book_utils_1.renderNewPage(req, res, new book_1.default(), true);
        return;
    }
    else {
        next();
    }
};
exports.bookCoverChecker = bookCoverChecker;
