// Import dependencies
import { expect } from "chai";
import { getDateString, getPubDate } from "../lib/handlebars";

describe("Handlebars Helper Functions", () => {
  describe("getDateString function", () => {
    it("Properly formats a date to be rendered in the view", () => {
      const dateString = "May 17, 2021";
      const date = new Date(dateString);
      const formatted = getDateString(date);
      expect(formatted).to.eql(dateString);
    });
  });

  describe("getPubDate function", () => {
    it("Formats a Date type into a string without the time data", () => {
      const dateString = "May 17, 2021";
      const date = new Date(dateString);
      const formatted = getPubDate(date);
      const nullFormatted = getPubDate(null);
      expect(formatted).to.eql("2021-05-17");
      expect(nullFormatted).to.eql("");
    });

    it("Formats null date into an empty string", () => {
      const nullFormatted = getPubDate(null);
      expect(nullFormatted).to.eql("");
    });
  });
});



