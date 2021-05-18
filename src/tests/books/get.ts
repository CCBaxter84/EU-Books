// Import dependencies
import { getRoute, getError } from "../test-utils";
import { UNAUTH_REQ_ERR } from "../../lib/global-constants";

// Declare and Export Books Router Tests
export const getBooks = function() {
  // @route   GET /books
  describe("GET /books", function() {
    getRoute("/books", "books/index", ["Search Books", "Title", "Keywords", "Published After", "Published Before", "Search"]);
  });

  // @route   GET /authors/new
  describe("GET /books/new", function() {
    getError("/books/new", "Should render Unauthorized Err when attempting GET /books/new while not authenticated", UNAUTH_REQ_ERR);
  });

}