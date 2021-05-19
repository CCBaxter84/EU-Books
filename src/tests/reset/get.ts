// Import dependencies
import { getRoute, requestError } from "../test-utils";
import { NOT_FOUND_ERR } from "../../lib/global-constants";

// Declare and Export Authors Router Tests
export const getReset = function(): void {

  describe("GET /reset", function(): void {
    getRoute("/reset", "reset/reset", ["Email:", "Send Reset Link"]);
  });

  describe("GET /reset-confirm/:token", function(): void {
    requestError("/reset-confirm/1", "Should render 'Not Found Error' when attempting to get to an invalid reset token page", NOT_FOUND_ERR);
  });

}


