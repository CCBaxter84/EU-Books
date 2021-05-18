"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
var global_constants_1 = require("../../lib/global-constants");
// Declare and Export Index Router Tests
var getIndex = function () {
    // @route   GET /
    describe("GET /", function () {
        test_utils_1.getRoute("/", "main", ["Recently Added"]);
    });
    // @route   GET /logout
    describe("GET /logout", function () {
        test_utils_1.getError("/logout", "Should render Unauthorized Err when attempting to logout while not authenticated", global_constants_1.UNAUTH_REQ_ERR);
    });
};
exports.getIndex = getIndex;
