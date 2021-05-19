// Import dependencies
import { requestError } from "../test-utils";
import { EMPTY_FORM_ERR, NO_USERNAME_ERR, NO_PASSWORD_ERR } from "../../lib/global-constants";

// Declare and Export Post /reset tests
export const postLogin = function(): void {
  const path: string = "/login";

  describe("POST /login", function(): void {
    const emptyCreds = { username: "", password: "" }
    requestError(path, "Should render No Email Error when email is blank", EMPTY_FORM_ERR, "POST", emptyCreds);

    const noUsername = { username: "", password: "12345" }
    requestError(path, "Should render Not Found Error for invalid reset token", NO_USERNAME_ERR, "POST", noUsername);

    const noPassword = { username: "John Doe", password: "" }
    requestError(path, "Should render Not Found Error for invalid reset token", NO_PASSWORD_ERR, "POST", noPassword);
  });
}