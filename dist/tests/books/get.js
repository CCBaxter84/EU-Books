"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
var global_constants_1 = require("../../lib/global-constants");
// Declare and Export Books Router Tests
var getBooks = function () {
    describe("GET /books", function () {
        test_utils_1.getRoute("/books", "books/index", ["Search Books", "Title", "Keywords", "Published After", "Published Before", "Search"]);
    });
    describe("GET /books/new", function () {
        test_utils_1.requestError("/books/new", "Should render 'Unauthorized Error' when attempting GET /books/new while not authenticated", global_constants_1.UNAUTH_REQ_ERR);
    });
    describe("GET /books/:id", function () {
        test_utils_1.requestError("/authors/1", "Should render 'Not Found Error' when attempting to GET an invalid book page", global_constants_1.NOT_FOUND_ERR);
    });
    describe("GET /books/:id/edit", function () {
        test_utils_1.requestError("/books/1/edit", "Should render 'Unauthorized Error' when attempting to GET a book edit page while logged out", global_constants_1.UNAUTH_REQ_ERR);
    });
};
exports.getBooks = getBooks;
