// Set env to test so that mockgoose is used
process.env.NODE_ENV = "test";

// Import dependencies
import chai, { expect, request } from "chai";
import chaiHttp from "chai-http";

// Set chai to use chaiHttp
chai.use(chaiHttp);

// Tests