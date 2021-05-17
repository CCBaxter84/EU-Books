// Import dependencies
import { expect } from "chai";
import { generatePassword, validatePassword, isLongPassword, isComplexPassword } from "../lib/password-utils";

describe("Password Helper Functions", () => {
  describe("validatePassword Function", () => {
    const password = "password1234";
    const hashedPwd = generatePassword(password);
    it("Returns true when passwords match", () => {
      const passwordAttempt = "password1234";
      const isValid = validatePassword(passwordAttempt, hashedPwd);
      expect(isValid).to.eql(true);
    });

    it("Returns false when passwords do not match", () => {
      const passwordAttempt = "password12345";
      const isValid = validatePassword(passwordAttempt, hashedPwd);
      expect(isValid).to.eql(false);
    });
  });

  describe("isLongPassword Function", () => {
    it("Returns true if passwords equals or exceeds 12 characters", () => {
      const password = "1234567890ab";
      const isValid = isLongPassword(password);
      expect(isValid).to.eql(true);
    });

    it("Returns false if passwords is less than 12", () => {
      const password = "1234566890a";
      const isValid = isLongPassword(password);
      expect(isValid).to.eql(false);
    });
  });

  describe("isComplexPassword Function", () => {
    it("Returns true if password contains at least one uppercase, lowercase, numerical, and special character", () => {
      const password = "ThisIsAStrongP@55word";
      const isValid = isComplexPassword(password);
      expect(isValid).to.eql(true);
    });

    it("Returns false if passwords does not contain at least one lowercase, uppercase, numerical, or special character", () => {
      const weak = "THISISAWEAKP@55WORD";
      const weak2 = "thisisaweakp@55word";
      const weak3 = "ThisIsAWeakP@ssword";
      const weak4 = "ThisIsAWeakPa55word";
      const isValid = isComplexPassword(weak);
      const isValid2 = isComplexPassword(weak2);
      const isValid3 = isComplexPassword(weak3);
      const isValid4 = isComplexPassword(weak4);
      const results = [isValid, isValid2, isValid3, isValid4];
      expect(results).to.eql([false, false, false, false]);
    });
  });
});