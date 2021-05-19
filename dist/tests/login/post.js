"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
var global_constants_1 = require("../../lib/global-constants");
// Declare and Export Post /reset tests
var postLogin = function () {
    var path = "/login";
    describe("POST /login", function () {
        var emptyCreds = { username: "", password: "" };
        test_utils_1.requestError(path, "Should render No Email Error when email is blank", global_constants_1.EMPTY_FORM_ERR, "POST", emptyCreds);
        var noUsername = { username: "", password: "12345" };
        test_utils_1.requestError(path, "Should render Not Found Error for invalid reset token", global_constants_1.NO_USERNAME_ERR, "POST", noUsername);
        var noPassword = { username: "John Doe", password: "" };
        test_utils_1.requestError(path, "Should render Not Found Error for invalid reset token", global_constants_1.NO_PASSWORD_ERR, "POST", noPassword);
    });
};
exports.postLogin = postLogin;
