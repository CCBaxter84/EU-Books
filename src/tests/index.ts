// Set env to test so that mockgoose is used
process.env.NODE_ENV = "test";

// Import dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import { connectToDB, close } from "../config/database";
import { getIndex } from "./index/get";
import { getAuthors } from "./authors/get";
import { getBooks } from "./books/get";
import { getLogin } from "./login/get";
import { getRegistration } from "./registration/get";

// Set chai to use chaiHttp
chai.use(chaiHttp);

// Tests
describe("Routes Tests", function() {
  this.timeout(15_000);
  // Connect to mock database before running tests
  before((done) => {
    connectToDB();
    setTimeout(() => done(), 2000);
  });

  // Disconnect from mock database after completing tests
  after((done) => {
    close()
      .then(() => done())
      .catch(err => done(err));
  });

  // Testing block for GET /
  describe("GET /", getIndex);

  // Testing block for GET /authors
  describe("GET /authors", getAuthors);

  // Testing block for GET /books
  describe("GET /books", getBooks);

  // Testing block for GET /login
  describe("GET /login", getLogin);

  // Testing block for GET /registration
  describe("GET /registration", getRegistration);
});


