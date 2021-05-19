"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReset = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
var global_constants_1 = require("../../lib/global-constants");
// Declare and Export Authors Router Tests
var getReset = function () {
    describe("GET /reset", function () {
        test_utils_1.getRoute("/reset", "reset/reset", ["Email:", "Send Reset Link"]);
    });
    describe("GET /reset-confirm/:token", function () {
        test_utils_1.requestError("/reset-confirm/1", "Should render 'Not Found Error' when attempting to get to an invalid reset token page", global_constants_1.NOT_FOUND_ERR);
    });
};
exports.getReset = getReset;
