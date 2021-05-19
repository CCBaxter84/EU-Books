"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthors = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
var global_constants_1 = require("../../lib/global-constants");
// Declare and Export Authors Router Tests
var getAuthors = function () {
    describe("GET /authors", function () {
        test_utils_1.getRoute("/authors", "authors/index", ["Search Authors", "Name", "Search"]);
    });
    describe("GET /authors/new", function () {
        test_utils_1.requestError("/authors/new", "Should render 'Unauthorized Error' when attempting GET /authors/new while not authenticated", global_constants_1.UNAUTH_REQ_ERR);
    });
    describe("GET /authors/:id", function () {
        test_utils_1.requestError("/authors/1", "Should render 'Not Found Error' when attempting to GET an invalid author page", global_constants_1.NOT_FOUND_ERR);
    });
    describe("GET /authors/:id/edit", function () {
        test_utils_1.requestError("/authors/1/edit", "Should render 'Unauthorized Error' when attempting to GET an author edit page while logged out", global_constants_1.UNAUTH_REQ_ERR);
    });
};
exports.getAuthors = getAuthors;
