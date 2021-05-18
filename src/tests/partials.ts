// Import dependencies
import chai, { expect } from "chai";
import { Done } from "mocha";
import chaiHttp from "chai-http";
import app from "../server";

// Set chai to use chaiHttp
chai.use(chaiHttp);

// Define & export partial testing functions
export const headerTest = function(done: Done) {
  chai.request(app)
    .get("/")
    .end((error, res) => {
      expect(res.text).to.contain("Star Wars Novels Holocron");
      expect(res.text).to.contain("Books");
      expect(res.text).to.contain("Authors");
      done();
    });
}

export const footerTest = function(done: Done) {
  chai.request(app)
    .get("/")
    .end((error, res) => {
      expect(res.text).to.contain("Star Wars Novels Holocron");
      expect(res.text).to.contain("Commemorating the Star Wars Expanded Universe");
      expect(res.text).to.contain("STAR WARS is the property of The Walt Disney company and is used here under fair use laws");
      done();
    });
}

export const isLoggedOutTest = function(done: Done) {
  chai.request(app)
    .get("/")
    .end((error, res) => {
      expect(res.text).to.contain("Log In");
      expect(res.text).not.to.contain("Add Author");
      expect(res.text).not.to.contain("Add Book");
      expect(res.text).not.to.contain("Log Out");
      done();
    });
}

export const isLoggedInTest = function(done: Done) {
  chai.request(app)
    .get("/")
    .end((error, res) => {
      expect(res.text).to.contain("Log Out");
      expect(res.text).to.contain("Add Author");
      expect(res.text).to.contain("Add Book");
      expect(res.text).not.to.contain("Log In");
      done();
    });
}