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

// Declare interfaces
type ReqType = "GET" | "POST";
interface IErrFn {
  (path: string, desc: string, errMessage: string, reqType?: ReqType, data?: object): void
}

// Declare and export functions

// Get an unauthenticated route
export const getRoute = function(path: string, view: string, viewContent: string[]) {
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
  checkHeaderFooterLogout();
}

export const requestError: IErrFn = function(path, desc, errMessage, reqType = "GET", data) {
  switch(reqType) {
    case "POST":
      postError(path, desc, errMessage, "POST", data);
      break;
    default:
      getError(path, desc, errMessage);
  }
}

// Get an unauthorized or unavailable route
const getError: IErrFn = function(path, desc, errMessage, reqType = "GET") {
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

// Post to an unauthorized or unavailable route
const postError: IErrFn = function(path, desc, errMessage, reqType = "POST", data) {
  it(desc, done => {
    chai.request(app)
      .post(path)
      .send({
        data
      })
      .end((error, res) => {
        expect(res.text).to.contain(errMessage);
      });
      done();
  });
}