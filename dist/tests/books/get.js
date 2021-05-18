"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
var global_constants_1 = require("../../lib/global-constants");
// Declare and Export Books Router Tests
var getBooks = function () {
    // @route   GET /authors
    test_utils_1.getRoute("/books", "books/index", ["Search Books", "Title", "Keywords", "Published After", "Published Before", "Search"]);
    // @route   GET /authors/new
    test_utils_1.getError("/books/new", "Should render Unauthorized Err when attempting GET /books/new while not authenticated", global_constants_1.UNAUTH_REQ_ERR);
};
exports.getBooks = getBooks;
