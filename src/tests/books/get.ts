// Import dependencies
import { getRoute } from "../test-utils";

// Declare and export tests for each route

// @route   GET /books
export const getBooks = function() {
  getRoute("/books", "books/index", ["Search Books", "Title", "Keywords", "Published After", "Published Before", "Search"]);
}