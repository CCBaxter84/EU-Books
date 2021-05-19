"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistration = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
// Declare and Export Authors Router Tests
var getRegistration = function () {
    describe("GET /registration", function () {
        var pgContent = ["Email:", "Username:", "Password:", "Submit"];
        test_utils_1.getRoute("/registration", "auth/register", pgContent);
    });
};
exports.getRegistration = getRegistration;
