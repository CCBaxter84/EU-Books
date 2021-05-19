// Import dependencies
import { requestError, getRoute } from "../test-utils";
import { NOT_FOUND_ERR, UNAUTH_REQ_ERR } from "../../lib/global-constants";

// Declare and Export Authors Router Tests
export const getAuthors = function(): void {

  describe("GET /authors", function(): void {
    getRoute("/authors", "authors/index", ["Search Authors", "Name", "Search"]);
  });

  describe("GET /authors/new", function(): void {
    requestError("/authors/new", "Should render 'Unauthorized Error' when attempting GET /authors/new while not authenticated", UNAUTH_REQ_ERR);
  });

  describe("GET /authors/:id", function(): void {
    requestError("/authors/1", "Should render 'Not Found Error' when attempting to GET an invalid author page", NOT_FOUND_ERR);
  });

  describe("GET /authors/:id/edit", function(): void {
    requestError("/authors/1/edit", "Should render 'Unauthorized Error' when attempting to GET an author edit page while logged out", UNAUTH_REQ_ERR);
  });
}


