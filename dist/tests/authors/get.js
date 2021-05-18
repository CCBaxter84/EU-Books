"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthors = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
var global_constants_1 = require("../../lib/global-constants");
// Declare and Export Authors Router Tests
var getAuthors = function () {
    // @route   GET /authors
    describe("GET /authors", function () {
        test_utils_1.getRoute("/authors", "authors/index", ["Search Authors", "Name", "Search"]);
    });
    // @route   GET /authors/new
    describe("GET /authors/new", function () {
        test_utils_1.getError("/authors/new", "Should render Unauthorized Err when attempting GET /authors/new while not authenticated", global_constants_1.UNAUTH_REQ_ERR);
    });
    /*// @route   POST /authors
    getError("/authors", "Should render Unauthorized Err when attempting POST /authors while not authenticated", UNAUTH_REQ_ERR);*/
};
exports.getAuthors = getAuthors;
