"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRegistration = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
var global_constants_1 = require("../../lib/global-constants");
// Declare and Export Post /registration tests
var postRegistration = function () {
    var path = "/registration";
    describe("POST /registration", function () {
        var emptyFields = { email: "", username: "", password: "12345" };
        test_utils_1.requestError(path, "Should render Empty Form Error when multiple fields are blank", global_constants_1.EMPTY_FORM_ERR, "POST", emptyFields);
        var noEmail = { email: "", username: "John Doe", password: "12345" };
        test_utils_1.requestError(path, "Should render No Email Error when email is blank", global_constants_1.NO_EMAIL_ERR, "POST", noEmail);
        var noUsername = { email: "troyceclark@gmail.com", username: "", password: "12345" };
        test_utils_1.requestError(path, "Should render No Username Error when username is blank", global_constants_1.NO_USERNAME_ERR, "POST", noUsername);
        var noPassword = { email: "troyceclark@gmail.com", username: "John Doe", password: "" };
        test_utils_1.requestError(path, "Should render No Password Error when password is blank", global_constants_1.NO_PASSWORD_ERR, "POST", noPassword);
        var inValidEmail = { email: "johnsmith", username: "John Doe", password: "12345" };
        test_utils_1.requestError(path, "Should render Invalid Email Error when provided an invalid email address", global_constants_1.INVALID_EMAIL_ERR, "POST", inValidEmail);
        var weakPassword = { email: "troyceclark@gmail.com", username: "John Doe", password: "12345" };
        test_utils_1.requestError(path, "Should render Weak Password Error when provided a weak password", global_constants_1.WEAK_PASSWORD_ERR, "POST", weakPassword);
    });
};
exports.postRegistration = postRegistration;
