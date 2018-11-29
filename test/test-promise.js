const test = require("tape");
const httpMocks = require("node-mocks-http");
const db = require("../src/server/controllers/controllers");

test("should return all tables", function(assert) {
  const uri =
    "postgres://diojgcgl:BH7f4HBifxfq7Z3O1sGMHsedqZJcEYw5@pellefant.db.elephantsql.com:5432/diojgcgl";
  const req = httpMocks.createRequest({});
  const res = httpMocks.createResponse({
    eventEmitter: require("events").EventEmitter
  });
  return db.getTables(req, res).then(response => {
    console.log("RESPONSE ", response);
    assert.equal(typeof response, "object");
  });
});
