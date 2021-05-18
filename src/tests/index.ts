// Set env to test so that mockgoose is used
process.env.NODE_ENV = "test";

// Import dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import { connectToDB, close } from "../config/database";
import { getIndex } from "./index/get";
import { getAuthors } from "./authors/get";
import { getBooks } from "./books/get";

// Set chai to use chaiHttp
chai.use(chaiHttp);

// Tests
describe("Routes Tests", function() {
  this.timeout(15_000);
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

  // Testing block for GET /
  describe("GET /", getIndex);

  // Testing block for GET /authors
  describe("GET /authors", getAuthors);

  // Testing block for GET /books
  describe("GET /books", getBooks);
});


