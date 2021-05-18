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

export const getBooks = function() {
  it("Should render the 'books/index' view", done => {
    chai.request(app)
      .get("/books")
      .end((error, res) => {
        expect(res).to.have.header("content-type", HTML_HEADER);
        expect(res.text).to.contain("Search Books");
        expect(res.text).to.contain("Title");
        expect(res.text).to.contain("Keywords");
        expect(res.text).to.contain("Published After");
        expect(res.text).to.contain("Published Before");
        expect(res.text).to.contain("Search");
        done();
      });
  });

  it(HEADER_TEST, headerTest);

  it(FOOTER_TEST, footerTest);

  it(IS_LOGGED_OUT, isLoggedOutTest);
};