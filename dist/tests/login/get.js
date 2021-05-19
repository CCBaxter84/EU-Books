"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogin = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
// Declare and Export Authors Router Tests
var getLogin = function () {
    describe("GET /login", function () {
        test_utils_1.getRoute("/login", "auth/login", ["Username:", "Password:", "Don't yet have an account?", "Register", "Forgot your password?", "Request Reset"]);
    });
};
exports.getLogin = getLogin;
