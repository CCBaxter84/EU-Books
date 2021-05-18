"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthors = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
// Declare and export tests for each route
// @route   GET /authors
var getAuthors = function () {
    test_utils_1.getRoute("/authors", "authors/index", ["Search Authors", "Name", "Search"]);
};
exports.getAuthors = getAuthors;
