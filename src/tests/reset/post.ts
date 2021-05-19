// Import dependencies
import { requestError } from "../test-utils";
import { NO_EMAIL_ERR, NOT_FOUND_ERR } from "../../lib/global-constants";

// Declare and Export Post /reset tests
export const postReset = function() {
  const noEmail = { email: "" }
  describe("POST /reset", function() {
    requestError("/reset", "Should render No Email Error when email is blank", NO_EMAIL_ERR, "POST", noEmail);
  });

  describe("POST /reset-confirm/:token", function() {
    requestError("/reset-confirm/12", "Should render Not Found Error for invalid reset token", NOT_FOUND_ERR, "POST", noEmail);
  });
}