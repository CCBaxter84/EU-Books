// Import dependencies
import { getRoute } from "../test-utils";

// Declare and export tests for each route

// @route   GET /authors
export const getAuthors = function() {
  getRoute("/authors", "authors/index", ["Search Authors", "Name", "Search"]);
}


