"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
var chai_1 = require("chai");
var handlebars_1 = require("../../lib/handlebars");
describe("Handlebars Helper Functions", function () {
    describe("getDateString function", function () {
        it("Properly formats a date to be rendered in the view", function () {
            var dateString = "May 17, 2021";
            var date = new Date(dateString);
            var formatted = handlebars_1.getDateString(date);
            chai_1.expect(formatted).to.eql(dateString);
        });
    });
    describe("getPubDate function", function () {
        it("Formats a Date type into a string without the time data", function () {
            var dateString = "May 17, 2021";
            var date = new Date(dateString);
            var formatted = handlebars_1.getPubDate(date);
            var nullFormatted = handlebars_1.getPubDate(null);
            chai_1.expect(formatted).to.eql("2021-05-17");
            chai_1.expect(nullFormatted).to.eql("");
        });
        it("Formats null date into an empty string", function () {
            var nullFormatted = handlebars_1.getPubDate(null);
            chai_1.expect(nullFormatted).to.eql("");
        });
    });
});
