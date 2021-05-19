// Import dependencies
import { expect } from "chai";
import { generatePassword, validatePassword, isLongPassword, isComplexPassword } from "../../lib/password-utils";

describe("Password Helper Functions", (): void => {

  describe("validatePassword Function", (): void => {
    const password: string = "password1234";
    const hashedPwd: string = generatePassword(password);

    it("Should return true when passwords match", (): void => {
      const passwordAttempt: string = "password1234";
      const isValid: boolean = validatePassword(passwordAttempt, hashedPwd);
      expect(isValid).to.eql(true);
    });

    it("Should return false when passwords do not match", (): void => {
      const passwordAttempt: string = "password12345";
      const isValid: boolean = validatePassword(passwordAttempt, hashedPwd);
      expect(isValid).to.eql(false);
    });
  });

  describe("isLongPassword Function", (): void => {

    it("Should return true if password equals or exceeds 12 characters", (): void => {
      const password: string = "1234567890ab";
      const isValid: boolean = isLongPassword(password);
      expect(isValid).to.eql(true);
    });

    it("Should return false if password is less than 12", (): void => {
      const password: string = "1234566890a";
      const isValid: boolean = isLongPassword(password);
      expect(isValid).to.eql(false);
    });
  });

  describe("isComplexPassword Function", (): void => {

    it("Should return true if password contains at least one uppercase, lowercase, numerical, and special character", (): void => {
      const password: string = "ThisIsAStrongP@55word";
      const isValid: boolean = isComplexPassword(password);
      expect(isValid).to.eql(true);
    });

    it("Should return false if password does not contain at least one lowercase, uppercase, numerical, or special character", (): void => {
      const weak: string = "THISISAWEAKP@55WORD";
      const weak2: string = "thisisaweakp@55word";
      const weak3: string = "ThisIsAWeakP@ssword";
      const weak4: string = "ThisIsAWeakPa55word";
      const isValid: boolean = isComplexPassword(weak);
      const isValid2: boolean = isComplexPassword(weak2);
      const isValid3: boolean = isComplexPassword(weak3);
      const isValid4: boolean = isComplexPassword(weak4);
      const results: boolean[] = [isValid, isValid2, isValid3, isValid4];
      expect(results).to.eql([false, false, false, false]);
    });
  });
});