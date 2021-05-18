"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
var chai_1 = require("chai");
var password_utils_1 = require("../../lib/password-utils");
describe("Password Helper Functions", function () {
    describe("validatePassword Function", function () {
        var password = "password1234";
        var hashedPwd = password_utils_1.generatePassword(password);
        it("Should return true when passwords match", function () {
            var passwordAttempt = "password1234";
            var isValid = password_utils_1.validatePassword(passwordAttempt, hashedPwd);
            chai_1.expect(isValid).to.eql(true);
        });
        it("Should return false when passwords do not match", function () {
            var passwordAttempt = "password12345";
            var isValid = password_utils_1.validatePassword(passwordAttempt, hashedPwd);
            chai_1.expect(isValid).to.eql(false);
        });
    });
    describe("isLongPassword Function", function () {
        it("Should return true if password equals or exceeds 12 characters", function () {
            var password = "1234567890ab";
            var isValid = password_utils_1.isLongPassword(password);
            chai_1.expect(isValid).to.eql(true);
        });
        it("Should return false if password is less than 12", function () {
            var password = "1234566890a";
            var isValid = password_utils_1.isLongPassword(password);
            chai_1.expect(isValid).to.eql(false);
        });
    });
    describe("isComplexPassword Function", function () {
        it("Should return true if password contains at least one uppercase, lowercase, numerical, and special character", function () {
            var password = "ThisIsAStrongP@55word";
            var isValid = password_utils_1.isComplexPassword(password);
            chai_1.expect(isValid).to.eql(true);
        });
        it("Should return false if password does not contain at least one lowercase, uppercase, numerical, or special character", function () {
            var weak = "THISISAWEAKP@55WORD";
            var weak2 = "thisisaweakp@55word";
            var weak3 = "ThisIsAWeakP@ssword";
            var weak4 = "ThisIsAWeakPa55word";
            var isValid = password_utils_1.isComplexPassword(weak);
            var isValid2 = password_utils_1.isComplexPassword(weak2);
            var isValid3 = password_utils_1.isComplexPassword(weak3);
            var isValid4 = password_utils_1.isComplexPassword(weak4);
            var results = [isValid, isValid2, isValid3, isValid4];
            chai_1.expect(results).to.eql([false, false, false, false]);
        });
    });
});
