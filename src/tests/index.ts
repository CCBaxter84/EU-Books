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
import { getReset } from "./reset/get";

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

  // Testing block for Index GET Requests
  describe("Index GET Requests", getIndex);

  // Testing block for Authors GET Requests
  describe("Authors GET Requests", getAuthors);

  // Testing block for Books GET Requests
  describe("Books GET Requests", getBooks);

  // Testing block for GET /login
  describe("GET /login", getLogin);

  // Testing block for GET /registration
  describe("GET /registration", getRegistration);

  // Testing block for GET /reset
  describe("Reset GET Requests", getReset);
});


