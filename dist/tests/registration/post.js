"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRegistration = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
var global_constants_1 = require("../../lib/global-constants");
// Declare and Export Post /registration tests
var postRegistration = function () {
    var path = "/registration";
    var emptyFields = { email: "", username: "", password: "12345" };
    test_utils_1.requestError(path, "Should render Empty Form Error when multiple fields are blank", global_constants_1.EMPTY_FORM_ERR, "POST", emptyFields);
    var noEmail = { email: "", username: "John Doe", password: "12345" };
    test_utils_1.requestError(path, "Should render No Email Error when email is blank", global_constants_1.NO_EMAIL_ERR, "POST", noEmail);
};
exports.postRegistration = postRegistration;
