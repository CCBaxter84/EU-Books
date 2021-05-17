// Import dependencies
import mocha from "mocha";
import { expect } from "chai";
import { Request } from "express";

// Import functions to test
import { generatePassword, validatePassword } from "../lib/password-utils";

describe("Password Validator", () => {
  const password = "password1234";
  const hashedPwd = generatePassword(password);
  it("Returns true when passwords match", (done) => {
    const passwordAttempt = "password1234";
    const isValid = validatePassword(passwordAttempt, hashedPwd);
    expect(isValid).to.equal(true);
    done();
  });

  it("Returns false when passwords do not match", (done) => {
    const passwordAttempt = "password12345";
    const isValid = validatePassword(passwordAttempt, hashedPwd);
    expect(isValid).to.equal(false);
    done();
  });

})