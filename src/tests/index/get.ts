// Import dependencies
import { getRoute, requestError } from "../test-utils";
import { UNAUTH_REQ_ERR } from "../../lib/global-constants";

// Declare and Export Index Router Tests
export const getIndex = function(): void {

  describe("GET /", function(): void {
    getRoute("/", "main", ["Recently Added"]);
  });

  describe("GET /logout", function(): void {
    requestError("/logout", "Should render Unauthorized Err when attempting to logout while not authenticated", UNAUTH_REQ_ERR);
  });
}