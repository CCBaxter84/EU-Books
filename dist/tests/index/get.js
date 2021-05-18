"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = void 0;
// Import dependencies
var test_utils_1 = require("../test-utils");
var global_constants_1 = require("../../lib/global-constants");
// Declare and export tests for each route
// @route   GET /
var getIndex = function () {
    test_utils_1.getRoute("/", "main", ["Recently Added"]);
    test_utils_1.getError("/logout", "Should render Unauthorized Err when attempting to logout while not authenticated", global_constants_1.UNAUTH_REQ_ERR);
};
exports.getIndex = getIndex;
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
