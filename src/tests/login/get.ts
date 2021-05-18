// Import dependencies
import { getRoute } from "../test-utils";

// Declare and Export Authors Router Tests
export const getLogin = function() {
  // @route   GET /login
  getRoute("/login", "auth/login", ["Username:", "Password:", "Don't yet have an account?", "Register", "Forgot your password?", "Request Reset"]);
}


