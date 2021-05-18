// Set env to test so that mockgoose is used
process.env.NODE_ENV = "test";

// Import dependencies
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../server";
import { HEADER_TEST, HTML_HEADER, FOOTER_TEST, IS_LOGGED_OUT } from "../constants";
import { headerTest, footerTest, isLoggedOutTest } from "../partials";
import { UNAUTH_REQ_ERR } from "../../lib/global-constants";

// Set chai to use chaiHttp
chai.use(chaiHttp);

export const getIndex = function() {
  it("Should render the 'main' view", done => {
    chai.request(app)
      .get("/")
      .end((error, res) => {
        expect(res).to.have.header("content-type", HTML_HEADER);
        expect(res.text).to.contain("Recently Added");
        done();
      });
  });

  it(HEADER_TEST, headerTest);

  it(FOOTER_TEST, footerTest);

  it(IS_LOGGED_OUT, isLoggedOutTest);

  it("Should render Unauthorized Err when attempting to logout while not authenticated", done => {
    chai.request(app)
      .get("/logout")
      .end((error, res) => {
        expect(res).to.have.header("content-type", HTML_HEADER);
        expect(res.text).to.contain(UNAUTH_REQ_ERR);
      });
      done();
  });
};