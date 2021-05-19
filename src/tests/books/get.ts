// Import dependencies
import { getRoute, requestError } from "../test-utils";
import { UNAUTH_REQ_ERR, NOT_FOUND_ERR } from "../../lib/global-constants";

// Declare and Export Books Router Tests
export const getBooks = function(): void {

  describe("GET /books", function(): void {
    getRoute("/books", "books/index", ["Search Books", "Title", "Keywords", "Published After", "Published Before", "Search"]);
  });

  describe("GET /books/new", function(): void {
    requestError("/books/new", "Should render 'Unauthorized Error' when attempting GET /books/new while not authenticated", UNAUTH_REQ_ERR);
  });

  describe("GET /books/:id", function(): void {
    requestError("/authors/1", "Should render 'Not Found Error' when attempting to GET an invalid book page", NOT_FOUND_ERR);
  });

  describe("GET /books/:id/edit", function(): void {
    requestError("/books/1/edit", "Should render 'Unauthorized Error' when attempting to GET a book edit page while logged out", UNAUTH_REQ_ERR);
  });
}