"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHeaderFooterLogout = exports.checkHeaderFooter = exports.isLoggedInTest = exports.isLoggedOutTest = void 0;
// Set env to test so that mockgoose is used
process.env.NODE_ENV = "test";
// Import dependencies
var chai_1 = __importStar(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var server_1 = __importDefault(require("../server"));
var constants_1 = require("./constants");
// Set chai to use chaiHttp
chai_1.default.use(chai_http_1.default);
// Define & export partial testing functions
var headerTest = function (done) {
    chai_1.default.request(server_1.default)
        .get("/")
        .end(function (error, res) {
        chai_1.expect(res.text).to.contain("Star Wars Novels Holocron");
        chai_1.expect(res.text).to.contain("Books");
        chai_1.expect(res.text).to.contain("Authors");
        done();
    });
};
var footerTest = function (done) {
    chai_1.default.request(server_1.default)
        .get("/")
        .end(function (error, res) {
        chai_1.expect(res.text).to.contain("Star Wars Novels Holocron");
        chai_1.expect(res.text).to.contain("Commemorating the Star Wars Expanded Universe");
        chai_1.expect(res.text).to.contain("STAR WARS is the property of The Walt Disney company and is used here under fair use laws");
        done();
    });
};
var isLoggedOutTest = function (done) {
    chai_1.default.request(server_1.default)
        .get("/")
        .end(function (error, res) {
        chai_1.expect(res.text).to.contain("Log In");
        chai_1.expect(res.text).not.to.contain("Add Author");
        chai_1.expect(res.text).not.to.contain("Add Book");
        chai_1.expect(res.text).not.to.contain("Log Out");
        done();
    });
};
exports.isLoggedOutTest = isLoggedOutTest;
var isLoggedInTest = function (done) {
    chai_1.default.request(server_1.default)
        .get("/")
        .end(function (error, res) {
        chai_1.expect(res.text).to.contain("Log Out");
        chai_1.expect(res.text).to.contain("Add Author");
        chai_1.expect(res.text).to.contain("Add Book");
        chai_1.expect(res.text).not.to.contain("Log In");
        done();
    });
};
exports.isLoggedInTest = isLoggedInTest;
// Check for Header and Footer
var checkHeaderFooter = function () {
    it(constants_1.HEADER_TEST, headerTest);
    it(constants_1.FOOTER_TEST, footerTest);
};
exports.checkHeaderFooter = checkHeaderFooter;
var checkHeaderFooterLogout = function () {
    exports.checkHeaderFooter();
    it(constants_1.IS_LOGGED_OUT, exports.isLoggedOutTest);
};
exports.checkHeaderFooterLogout = checkHeaderFooterLogout;
