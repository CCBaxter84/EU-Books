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
exports.getBooks = void 0;
// Set env to test so that mockgoose is used
process.env.NODE_ENV = "test";
// Import dependencies
var chai_1 = __importStar(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var server_1 = __importDefault(require("../../server"));
var constants_1 = require("../constants");
var partials_1 = require("../partials");
// Set chai to use chaiHttp
chai_1.default.use(chai_http_1.default);
var getBooks = function () {
    it("Should render the 'books/index' view", function (done) {
        chai_1.default.request(server_1.default)
            .get("/books")
            .end(function (error, res) {
            chai_1.expect(res).to.have.header("content-type", constants_1.HTML_HEADER);
            chai_1.expect(res.text).to.contain("Search Books");
            chai_1.expect(res.text).to.contain("Title");
            chai_1.expect(res.text).to.contain("Keywords");
            chai_1.expect(res.text).to.contain("Published After");
            chai_1.expect(res.text).to.contain("Published Before");
            chai_1.expect(res.text).to.contain("Search");
            done();
        });
    });
    it(constants_1.HEADER_TEST, partials_1.headerTest);
    it(constants_1.FOOTER_TEST, partials_1.footerTest);
    it(constants_1.IS_LOGGED_OUT, partials_1.isLoggedOutTest);
};
exports.getBooks = getBooks;
