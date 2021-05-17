"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
// Import functions to test
var password_utils_1 = require("../lib/password-utils");
describe("Password Validator", function () {
    var password = "password1234";
    var hashedPwd = password_utils_1.generatePassword(password);
    it("Returns true when passwords match", function (done) {
        var passwordAttempt = "password1234";
        var isValid = password_utils_1.validatePassword(passwordAttempt, hashedPwd);
        chai_1.expect(isValid).to.equal(true);
        done();
    });
    it("Returns false when passwords do not match", function (done) {
        var passwordAttempt = "password12345";
        var isValid = password_utils_1.validatePassword(passwordAttempt, hashedPwd);
        chai_1.expect(isValid).to.equal(false);
        done();
    });
});
