// Import dependencies
import { getRoute, getError } from "../test-utils";
import { UNAUTH_REQ_ERR } from "../../lib/global-constants";

// Declare and export tests for each route

// @route   GET /
export const getIndex = function() {
  getRoute("/", "main", ["Recently Added"]);
  getError("/logout", "Should render Unauthorized Err when attempting to logout while not authenticated", UNAUTH_REQ_ERR);
}

/*
it("Should render Unauthorized Err when attempting to logout while not authenticated", done => {
  chai.request(app)
    .get("/logout")
    .end((error, res) => {
      expect(res).to.have.header("content-type", HTML_HEADER);
      expect(res.text).to.contain(UNAUTH_REQ_ERR);
    });
    done();
});*/