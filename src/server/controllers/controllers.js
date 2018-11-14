const pg = require("pg");
const db = {};
let tables = {};
let foreignTables = {};
let uri;
let client;
let alan =
  "postgres://ysejjgvv:6WhT4YhfwqO01EDsGE7-0SEsnAfcrW2g@pellefant.db.elephantsql.com:5432/ysejjgvv";

//CONNECT
db.connect = (req, res) => {
  console.log("I got here ", req.body);
  //   uri = `postgres://${req.body.user}:${req.body.password}@${req.body.host}:${
  //     req.body.port
  //   }/${req.body.dbName}`;
  uri = alan;
  // "postgres://dbomqaen:FUKYQ_vrQCHbBzHwBpBDAHfUw5R6DzO6@elmer.db.elephantsql.com:5432/dbomqaen";
  client = new pg.Client(uri);
  client.connect(err => {
    if (err) return console.log("Could not connect to postgres ", err);
  });
  console.log(uri);
  res.end();
};

//GET DATA
db.getTables = (req, res, next) => {
  client = new pg.Client(uri);
  console.log("Client: ", client);
  client.connect(err => {
    if (err) return console.log("Could not connect to postgres ", err);
  });
  client.query(
    "SELECT*FROM pg_catalog.pg_tables WHERE schemaname = 'public'",
    (err, result) => {
      if (err) throw new Error("Error querying database");
      result.rows.map(table => (tables[table.tablename] = {}));
      next();
    }
  );
};

db.getFields = (req, res, next) => {
  Object.keys(tables).map((element, index) => {
    client.query(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${element}'`,
      (err, result) => {
        if (err) reject(err);

        tables[element] = result.rows.reduce((acc, curr) => {
          acc[curr.column_name] = curr.data_type;
          return acc;
        }, {});
        if (index === Object.keys(tables).length - 1) {
          next();
        }
      }
    );
  });
};

db.filterAssociations = async (req, res) => {
  let filteredResults = await new Promise((resolve, reject) => {
    client.query(
      "SELECT tc.table_schema, tc.constraint_name, tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name FROM information_schema.table_constraints tc JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name WHERE constraint_type = 'FOREIGN KEY';",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
  await filteredResults.map(el => {
    foreignTables[el.table_name] = el.foreign_table_name;
  });

  tables.foreignTables = foreignTables;
  res.end(JSON.stringify(tables));
};
module.exports = db;
