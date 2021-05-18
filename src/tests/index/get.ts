// Set env to test so that mockgoose is used
process.env.NODE_ENV = "test";

// Import dependencies
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { connectToDB, close } from "../../config/database";
import app from "../../server";
import { HEADER_TEST, HTML_HEADER, FOOTER_TEST, IS_LOGGED_OUT } from "../constants";
import { headerTest, footerTest, isLoggedOutTest } from "../partials";

// Set chai to use chaiHttp
chai.use(chaiHttp);

// Tests
describe("GET /", function() {
  this.timeout(15000);
  // Connect to mock database before running tests
  before((done) => {
    connectToDB();
    done();
  });

  // Disconnect from mock database after completing tests
  after((done) => {
    close()
      .then(() => done())
      .catch(err => done(err));
  });

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
});