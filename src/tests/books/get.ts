// Import dependencies
import { getRoute, getError } from "../test-utils";
import { UNAUTH_REQ_ERR, NOT_FOUND_ERR } from "../../lib/global-constants";

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

    // @route   GET /books/:id
    describe("GET /books/:id", function() {
      getError("/authors/1", "Should render Not Found Error when attempting to GET an invalid book page", NOT_FOUND_ERR);
    });

    // @route   GET /authors/:id/edit
    describe("GET /books/:id/edit", function() {
      getError("/books/1/edit", "Should render Unauthorized Error when attempting to GET a book edit page while logged out", UNAUTH_REQ_ERR);
    });

}