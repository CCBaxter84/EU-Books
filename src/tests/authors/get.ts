// Import dependencies
import { getError, getRoute } from "../test-utils";
import { NOT_FOUND_ERR, UNAUTH_REQ_ERR } from "../../lib/global-constants";

// Declare and Export Authors Router Tests
export const getAuthors = function() {

  // @route   GET /authors
  describe("GET /authors", function() {
    getRoute("/authors", "authors/index", ["Search Authors", "Name", "Search"]);
  });

  // @route   GET /authors/new
  describe("GET /authors/new", function() {
    getError("/authors/new", "Should render 'Unauthorized Error' when attempting GET /authors/new while not authenticated", UNAUTH_REQ_ERR);
  });

  // @route   GET /authors/:id
  describe("GET /authors/:id", function() {
    getError("/authors/1", "Should render 'Not Found Error' when attempting to GET an invalid author page", NOT_FOUND_ERR);
  });

  // @route   GET /authors/:id/edit
  describe("GET /authors/:id/edit", function() {
    getError("/authors/1/edit", "Should render 'Unauthorized Error' when attempting to GET an author edit page while logged out", UNAUTH_REQ_ERR);
  });


  /*// @route   POST /authors
  getError("/authors", "Should render Unauthorized Err when attempting POST /authors while not authenticated", UNAUTH_REQ_ERR);*/
}


