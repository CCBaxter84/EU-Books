// Import dependencies
import { getError, getRoute } from "../test-utils";
import { UNAUTH_REQ_ERR } from "../../lib/global-constants";

// Declare and Export Authors Router Tests
export const getAuthors = function() {

  // @route   GET /authors
  describe("GET /authors", function() {
    getRoute("/authors", "authors/index", ["Search Authors", "Name", "Search"]);
  });

  // @route   GET /authors/new
  describe("GET /authors/new", function() {
    getError("/authors/new", "Should render Unauthorized Err when attempting GET /authors/new while not authenticated", UNAUTH_REQ_ERR);
  });


  /*// @route   POST /authors
  getError("/authors", "Should render Unauthorized Err when attempting POST /authors while not authenticated", UNAUTH_REQ_ERR);*/
}


