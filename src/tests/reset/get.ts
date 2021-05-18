// Import dependencies
import { getRoute, getError } from "../test-utils";
import { NOT_FOUND_ERR } from "../../lib/global-constants";

// Declare and Export Authors Router Tests
export const getReset = function() {

  // @route   GET /reset
  describe("GET /reset", function() {
    getRoute("/reset", "reset/reset", ["Email:", "Send Reset Link"]);
  });

  // @route   GET /reset-confirm/:token
  describe("GET /reset-confirm/:token", function() {
    getError("/reset-confirm/1", "Should render 'Not Found Error' when attempting to get to an invalid reset token page", NOT_FOUND_ERR);
  });

}


