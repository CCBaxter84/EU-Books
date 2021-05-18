"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Set env to test so that mockgoose is used
process.env.NODE_ENV = "test";
// Import dependencies
var chai_1 = __importDefault(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var database_1 = require("../config/database");
var get_1 = require("./index/get");
var get_2 = require("./authors/get");
var get_3 = require("./books/get");
var get_4 = require("./login/get");
var get_5 = require("./registration/get");
var get_6 = require("./reset/get");
// Set chai to use chaiHttp
chai_1.default.use(chai_http_1.default);
// Tests
describe("Routes Tests", function () {
    this.timeout(15000);
    // Connect to mock database before running tests
    before(function (done) {
        database_1.connectToDB();
        setTimeout(function () { return done(); }, 2000);
    });
    // Disconnect from mock database after completing tests
    after(function (done) {
        database_1.close()
            .then(function () { return done(); })
            .catch(function (err) { return done(err); });
    });
    // Testing block for Index GET Requests
    describe("Index GET Requests", get_1.getIndex);
    // Testing block for Authors GET Requests
    describe("Authors GET Requests", get_2.getAuthors);
    // Testing block for Books GET Requests
    describe("Books GET Requests", get_3.getBooks);
    // Testing block for GET /login
    describe("GET /login", get_4.getLogin);
    // Testing block for GET /registration
    describe("GET /registration", get_5.getRegistration);
    // Testing block for GET /reset
    describe("Reset GET Requests", get_6.getReset);
});
