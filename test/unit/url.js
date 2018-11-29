const chai = require("chai");
const { urlValidator } = require("../../src/server/functions/urlValidator");
const should = chai.should();

describe("User's URL validation tests", function() {
  context("User's URL validation tests", function() {
    it("should reject invalid url", function() {
      let invalidURL = "pasfdsgdfgd://fdvfbgcb@fsbgfbfh/dddd";
      urlValidator(invalidURL).should.equal(false);
    });

    it("should accept valid url", function() {
      let validUrl = "postgres://asdafsgdfhn@aesgrdht/sfsxfbc";
      urlValidator(validUrl).should.equal(true);
    });
  });
});
