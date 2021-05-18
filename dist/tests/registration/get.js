"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistration = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
// Declare and Export Authors Router Tests
var getRegistration = function () {
    // @route   GET /login
    test_utils_1.getRoute("/registration", "auth/register", ["Email:", "Username:", "Password:", "Submit"]);
};
exports.getRegistration = getRegistration;
