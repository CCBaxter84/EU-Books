// Set env to test so that mockgoose is used
process.env.NODE_ENV = "test";

// Import dependencies
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../server";
import { HEADER_TEST, HTML_HEADER, FOOTER_TEST, IS_LOGGED_OUT } from "../constants";
import { headerTest, footerTest, isLoggedOutTest } from "../partials";

// Set chai to use chaiHttp
chai.use(chaiHttp);

export const getAuthors = function() {
  it("Should render the 'authors/index' view", done => {
    chai.request(app)
      .get("/authors")
      .end((error, res) => {
        expect(res).to.have.header("content-type", HTML_HEADER);
        expect(res.text).to.contain("Search Authors");
        expect(res.text).to.contain("Name");
        expect(res.text).to.contain("Search");
        done();
      });
  });

  it(HEADER_TEST, headerTest);

  it(FOOTER_TEST, footerTest);

  it(IS_LOGGED_OUT, isLoggedOutTest);
};