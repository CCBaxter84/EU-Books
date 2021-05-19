// Import dependencies
import { expect } from "chai";
import { getDateString, getPubDate } from "../../lib/handlebars";

describe("Handlebars Helper Functions", (): void => {
  describe("getDateString function", (): void => {
    it("Should properly format date to be rendered in the view", (): void => {
      const dateString: string = "May 17, 2021";
      const date: Date = new Date(dateString);
      const formatted: string = getDateString(date);
      expect(formatted).to.eql(dateString);
    });
  });

  describe("getPubDate function", (): void => {
    it("Should format Date type into a string without the time data", (): void => {
      const dateString: string = "May 17, 2021";
      const date: Date = new Date(dateString);
      const formatted: string = getPubDate(date);
      const nullFormatted: string = getPubDate(null);
      expect(formatted).to.eql("2021-05-17");
      expect(nullFormatted).to.eql("");
    });

    it("Should format null date into an empty string", (): void => {
      const nullFormatted: string = getPubDate(null);
      expect(nullFormatted).to.eql("");
    });
  });
});



