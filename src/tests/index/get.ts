// Import dependencies
import { getRoute, getError } from "../test-utils";
import { UNAUTH_REQ_ERR } from "../../lib/global-constants";

// Declare and Export Index Router Tests
export const getIndex = function() {
  // @route   GET /
  describe("GET /", function() {
    getRoute("/", "main", ["Recently Added"]);
  });

  // @route   GET /logout
  describe("GET /logout", function() {
    getError("/logout", "Should render Unauthorized Err when attempting to logout while not authenticated", UNAUTH_REQ_ERR);
  });
}