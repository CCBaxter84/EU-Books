// Import dependencies
import { requestError } from "../test-utils";
import { EMPTY_FORM_ERR, NO_EMAIL_ERR, NO_USERNAME_ERR, INVALID_EMAIL_ERR, NO_PASSWORD_ERR, WEAK_PASSWORD_ERR } from "../../lib/global-constants";

// Declare and Export Post /registration tests
export const postRegistration = function(): void {
  const path: string = "/registration";

  describe("POST /registration", function(): void {
    const emptyFields = { email: "", username: "", password: "12345" };
    requestError(path, "Should render Empty Form Error when multiple fields are blank", EMPTY_FORM_ERR, "POST", emptyFields);

    const noEmail = { email: "", username: "John Doe", password: "12345" }
    requestError(path, "Should render No Email Error when email is blank", NO_EMAIL_ERR, "POST", noEmail);

    const noUsername = { email: "troyceclark@gmail.com", username: "", password: "12345" }
    requestError(path, "Should render No Username Error when username is blank", NO_USERNAME_ERR, "POST", noUsername);

    const noPassword = { email: "troyceclark@gmail.com", username: "John Doe", password: "" }
    requestError(path, "Should render No Password Error when password is blank", NO_PASSWORD_ERR, "POST", noPassword);

    const inValidEmail = { email: "johnsmith", username: "John Doe", password: "12345" }
    requestError(path, "Should render Invalid Email Error when provided an invalid email address", INVALID_EMAIL_ERR, "POST", inValidEmail);

    const weakPassword = { email: "troyceclark@gmail.com", username: "John Doe", password: "12345" }
    requestError(path, "Should render Weak Password Error when provided a weak password", WEAK_PASSWORD_ERR, "POST", weakPassword);
  });
}