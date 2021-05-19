"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReset = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
var global_constants_1 = require("../../lib/global-constants");
// Declare and Export Post /reset tests
var postReset = function () {
    var noEmail = { email: "" };
    describe("POST /reset", function () {
        test_utils_1.requestError("/reset", "Should render No Email Error when email is blank", global_constants_1.NO_EMAIL_ERR, "POST", noEmail);
    });
    describe("POST /reset-confirm/:token", function () {
        test_utils_1.requestError("/reset-confirm/12", "Should render Not Found Error for invalid reset token", global_constants_1.NOT_FOUND_ERR, "POST", noEmail);
    });
};
exports.postReset = postReset;
