const chai = require("chai");
const {
  allTypesCreator,
  queriesCreator,
  mutationCreator,
  returnResolvers,
  queryResolver,
  mutationResolver,
  initialCapitalizer
} = require("../../src/server/functions/typesCreator");
const tables = require("./test-tables");
const expect = chai.expect;

describe("Parser functions for Postgres", function() {
  let keys = Object.keys(tables);
  context("queriesCreator function", function() {
    let queries = queriesCreator(tables);
    it("should return a string", function() {
      expect(queries).to.be.a("string");
    });

    it("should contain all key value pairs from the tables except primary and foreign keys", function() {
      for (let i = 0; i < keys.length - 2; i++) {
        console.log(keys[i]);
        expect(queries).to.include(keys[i]);
        expect(queries).to.include(initialCapitalizer(keys[i]));
      }
    });
  });

  context("allTypesCreator function", function() {
    let result = allTypesCreator(tables);
    it("should return string that includes types", function() {
      expect(result).to.be.a("string");
    });
    it("should contain 'type' keyword followed by capitalized key name", function() {
      for (let i = 0; i < keys.length - 2; i++) {
        expect(result).to.include(`type ${initialCapitalizer(keys[i])} {`);
      }
    });
  });

  context("mutationCreator", function() {
    let result = mutationCreator(tables);

    it("should return a string", function() {
      expect(result).to.be.a("string");
    });

    it("should contain create/update/delete", function() {
      console.log("MUTATIONS CREATOR=>>>>>", result);
      for (let i = 0; i < keys.lenght - 2; i++) {
        expect(result).to.include(`create${initialCapitalizer(key[i])}`);
        expect(result).to.include(`delete${initialCapitalizer(key[i])}`);
        expect(result).to.include(`update${initialCapitalizer(key[i])}`);
      }
    });

    it("should include all column names with their values", function() {
      for (let i = 0; i < keys.length - 2; i++) {
        let columnNames = Object.keys(tables[keys[i]]);
        columnNames.forEach(el => {
          expect(result).to.include(`${el}`);
        });
      }
    });
    it("should include capitalized key name", function() {
      for (let i = 0; i < keys.length - 2; i++) {
        expect(result).to.include(`: ${initialCapitalizer(keys[i])}`);
      }
    });

    context("queryResolver", function() {
      let result = queryResolver(tables);
      it("should return a string", function() {
        console.log("QUERY RESOLVER=>>>>>", result);
        expect(result).to.be.a("string");
      });
    });
  });

  context("mutationResolver test", function() {
    let result = mutationResolver(tables);
    it("should return a string", function() {
      expect(result).to.be.a("string");
    });
  });
});
