// Import dependencies
import { getRoute } from "../test-utils";

// Declare and Export Authors Router Tests
export const getRegistration = function() {
  // @route   GET /login
  getRoute("/registration", "auth/register", ["Email:", "Username:", "Password:", "Submit"]);
}


