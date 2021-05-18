"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
// Declare and export tests for each route
// @route   GET /books
var getBooks = function () {
    test_utils_1.getRoute("/books", "books/index", ["Search Books", "Title", "Keywords", "Published After", "Published Before", "Search"]);
};
exports.getBooks = getBooks;
