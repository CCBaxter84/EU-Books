// Import dependencies
import { requestError } from "../test-utils";
import { EMPTY_FORM_ERR, NO_EMAIL_ERR, NO_USERNAME_ERR, NO_PASSWORD_ERR } from "../../lib/global-constants";

// Declare and Export Post /registration tests
export const postRegistration = function() {
  const path = "/registration";
  const emptyFields = { email: "", username: "", password: "12345" };
  requestError(path, "Should render Empty Form Error when multiple fields are blank", EMPTY_FORM_ERR, "POST", emptyFields);

  const noEmail = { email: "", username: "John Doe", password: "12345" }
  requestError(path, "Should render No Email Error when email is blank", NO_EMAIL_ERR, "POST", noEmail);
}