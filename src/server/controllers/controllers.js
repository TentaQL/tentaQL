const pg = require("pg");
const path = require("path");
const PATH = path.join(__dirname, "../../");
const fs = require("fs");
const {
  transform,
  queryResolver,
  mutationResolver
} = require("../functions/typesCreator");
const serverCreator = require("../functions/serverCreator");
const schemaCreator = require("../functions/schemaCreator");

const db = {};
let tables = {};
let foreignTables = {};
let requiredTables = {};
let uri;
let client;

//CONNECT
db.connect = (req, res) => {
  console.log("Body here");
  console.log(req.body.url);
  uri = req.body.url;

  // DB that breaks the mutationZip file:
  // postgres://diojgcgl:BH7f4HBifxfq7Z3O1sGMHsedqZJcEYw5@pellefant.db.elephantsql.com:5432/diojgcgl

  // AnnaHardcoded postgres://tbpsxkue:TBTE6vwArK31H7dVlizemHoMn9LP_TWC@baasu.db.elephantsql.com:5432/tbpsxkue
  // JonahHardcoded postgres://imggdlvc:VSxvN8VJsQNK32MXVCNvWRfAF_sj_Amz@baasu.db.elephantsql.com:5432/imggdlvc
  // JonathanHardcoded postgres://cwfmwiaw:AHwoqc41Cx3L7nMV5oSfz-KQZewSqQGx@baasu.db.elephantsql.com:5432/cwfmwiaw

  client = new pg.Client(uri);
  client.connect(err => {
    if (err) return console.log("Could not connect to postgres ", err);
  });
  // console.log(uri);
  res.json(uri);
};

//GET DATA
db.getTables = (req, res, next) => {
  client = new pg.Client(uri);
  console.log("Client: ", client);
  client.connect(err => {
    if (err) return console.log("Could not connect to postgres ", err);
  });
  client.query(
    "SELECT*FROM pg_catalog.pg_tables WHERE schemaname = 'public' AND tablename NOT LIKE 'spatial_ref_sys'",
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
          console.log(
            "******************************Result.rows_FilterAssociations******************************"
          );
          console.log(result.rows);
          resolve(result.rows);
        }
      }
    );
  });
  console.log(
    "******************************FILTERED RESULTS******************************"
  );
  console.log(filteredResults);
  await filteredResults.map(el => {
    foreignTables[el.table_name] = el.foreign_table_name;
  });
  let primaryKeys = await new Promise((resolve, reject) => {
    client.query(
      "SELECT c.table_name, c.column_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name where constraint_type = 'PRIMARY KEY';",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log(
            "******************************Result.rowsAfterFilterResults******************************"
          );
          console.log(result.rows);
          resolve(result.rows);
        }
      }
    );
  });

  let filter = {};
  let filteredKeys = await primaryKeys.map(el => {
    filter[el.table_name] = el.column_name;
  });
  console.log(
    "******************************FILTER******************************"
  );
  console.log(filter);

  tables.primaryKeys = filter;
  tables.foreignTables = foreignTables;

  // tables.requiredTables = requiredTables;
  console.log(
    "******************************TABLES FINAL******************************"
  );

  console.log(tables);

  let frontEndVersion = transform(tables);
  let mutationResolvers = mutationResolver(frontEndVersion, tables);
  let queryResolvers = queryResolver(frontEndVersion, tables);
  let resolvers = queryResolvers + mutationResolvers;

  let allFiles = {
    frontEnd: frontEndVersion,
    resolvers: resolvers,
  }

  res.end(JSON.stringify(allFiles));
};
module.exports = db;
