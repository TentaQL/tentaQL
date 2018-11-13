const pg = require("pg");
const db = {};
const uri =
  "postgres://dbomqaen:FUKYQ_vrQCHbBzHwBpBDAHfUw5R6DzO6@elmer.db.elephantsql.com:5432/dbomqaen";
const client = new pg.Client(uri);
let tables = {};

db.getTables = (req, res) => {
  client.connect(err => {
    if (err) return console.log("Could not connect to postgres ", err);
    client.query(
      "SELECT*FROM pg_catalog.pg_tables WHERE schemaname = 'public'",
      (err, result) => {
        if (err) throw new Error("Error querying database");
        //TABLE NAMES
        result.rows.map(table => (tables[table.tablename] = {}));
        console.log(tables);
        Object.keys(tables).map(element => {
          console.log(element);
          client.query(`SELECT*FROM ${element}`, (err, result) => {
            if (err) return console.log("Error");
            console.log(result.fields);
            tables[element] = result.fields.reduce((acc, curr) => {
              let format = "";
              if (curr.format === "text") {
                console.log("Hello");
                format = "String";
              }
              acc[curr.name] = format;
              return acc;
            }, {});
            console.log("Tables:", tables);
          });
        });
      }
    );
  });
  res.end("Done");
};

module.exports = db;
