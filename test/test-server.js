//UNIT TESTING
const pg = require("pg");
const test = require("tape");
const chai = require("chai");
const chaiHTTP = require("chai-http");
const expect = chai.expect;
const httpMocks = require("node-mocks-http");
const server = require("../src/server/index.js");
const db = require("../src/server/controllers/controllers");
const should = chai.should();
chai.use(chaiHTTP);

describe("Database Access Tests", function() {
  it("should connect", function(done) {
    let url =
      "postgres://diojgcgl:BH7f4HBifxfq7Z3O1sGMHsedqZJcEYw5@pellefant.db.elephantsql.com:5432/diojgcgl";
    new pg.Client(url).connect(done);
  });
  it("should fail connecting");
});

describe("Middleware Tests", function() {
  it("should reject invalid url", function(done) {
    const host = "http://localhost:8080";
    const path = "/db";
    chai
      .request(host)
      .post(path)
      .set("content-type", "application/json")
      .send({
        url: "abc"
      })
      .end(function(err, res, body) {
        if (err) {
          console.log("HELLO ERROR");
          done(err);
        } else {
          console.log("HELLO WELL DONE ");
          done();
        }
      });
  });

  it("should send url to db.connect", function(done) {
    const host = "http://localhost:8080";
    const path = "/db";
    chai
      .request(host)
      .post(path)
      .set("content-type", "application/json")
      .send({
        url:
          "postgres://diojgcgl:BH7f4HBifxfq7Z3O1sGMHsedqZJcEYw5@pellefant.db.elephantsql.com:5432/diojgcgl"
      })
      .end(function(err, res, body) {
        if (err) {
          done(error);
        } else {
          done();
        }
      });
  });

  it("should return a string", function(done) {
    const host = "http://localhost:8080";
    const path = "/db/all";
    chai
      .request(host)
      .get(path)
      .then(function(res) {
        expect(res.text).to.be.a("string");
        done();
      })
      .catch(done);
  });

  it("should return all fields");
  it("should return associations");
  it("should return types");å
  it("should return resolvers");
});

test("should return all tables", function(assert) {
  const req = httpMocks.createRequest({});
  const res = httpMocks.createResponse({});

  return db.getTables(req, res).then(response => {
    console.log("RESPONSE=>>>>>", response);
    assert.equal(typeof response, "object");
  });
});
