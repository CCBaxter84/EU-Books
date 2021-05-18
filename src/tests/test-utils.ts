// Set env to test so that mockgoose is used
process.env.NODE_ENV = "test";

// Import dependencies
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../server";
import { HTML_HEADER } from "./constants";
import { checkHeaderFooterLogout } from "./partials";

// Set chai to use chaiHttp
chai.use(chaiHttp);

// Declare and export functions

// Get an unauthenticated route
export const getRoute = function(path: string, view: string, viewContent: string[]) {
  checkHeaderFooterLogout();

  it(`Should render the '${view}' view`, done => {
    chai.request(app)
      .get(path)
      .end((error, res) => {
        expect(res).to.have.header("content-type", HTML_HEADER);
        viewContent.forEach(item => {
          expect(res.text).to.contain(item);
        });
      });
      done();
  });
}

// Get an unauthorized or unavailable route
export const getError = function(path: string, desc: string, errMessage: string) {
  it(desc, done => {
    chai.request(app)
      .get(path)
      .end((error, res) => {
        expect(res).to.have.header("content-type", HTML_HEADER);
        expect(res.text).to.contain(errMessage)
      });
      done();
  });
  checkHeaderFooterLogout();
}