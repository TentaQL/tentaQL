const pg = require("pg");
const path = require("path");
const PATH = path.join(__dirname, "../../");
const fs = require("fs");
const {
  transform,
  queryResolver,
  mutationResolver
} = require("../functions/typesCreator");

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

db.getConstraints = async (req, res, next) => {
  let constraintData = await new Promise((resolve, reject) => {
    client.query(
      `SELECT 
      COL.TABLE_NAME,
      COL.COLUMN_NAME, 
      COL.DATA_TYPE, 
      COL.IS_NULLABLE 
      FROM INFORMATION_SCHEMA.COLUMNS COL
      WHERE COL.TABLE_NAME NOT LIKE 'pg_%' AND
      COL.TABLE_NAME NOT LIKE 'information_schema_catalog_name' AND
      COL.TABLE_NAME NOT LIKE 'applicable_roles' AND
      COL.TABLE_NAME NOT LIKE 'administrable_role_authorizations' AND
      COL.TABLE_NAME NOT LIKE 'attributes' AND
      COL.TABLE_NAME NOT LIKE 'character_sets' AND
      COL.TABLE_NAME NOT LIKE 'check_constraint_routine_usage' AND
      COL.TABLE_NAME NOT LIKE 'check_constraints' AND
      COL.TABLE_NAME NOT LIKE 'collations' AND
      COL.TABLE_NAME NOT LIKE 'collation_character_set_applicability' AND
      COL.TABLE_NAME NOT LIKE 'column_domain_usage' AND
      COL.TABLE_NAME NOT LIKE 'column_privileges' AND
      COL.TABLE_NAME NOT LIKE 'column_udt_usage' AND
      COL.TABLE_NAME NOT LIKE 'columns' AND
      COL.TABLE_NAME NOT LIKE 'constraint_column_usage' AND
      COL.TABLE_NAME NOT LIKE 'constraint_table_usage' AND
      COL.TABLE_NAME NOT LIKE 'domain_constraints' AND
      COL.TABLE_NAME NOT LIKE 'domain_udt_usage' AND
      COL.TABLE_NAME NOT LIKE 'domains' AND
      COL.TABLE_NAME NOT LIKE 'enabled_roles' AND
      COL.TABLE_NAME NOT LIKE 'key_column_usage' AND
      COL.TABLE_NAME NOT LIKE 'parameters' AND
      COL.TABLE_NAME NOT LIKE 'referential_constraints' AND
      COL.TABLE_NAME NOT LIKE 'role_column_grants' AND
      COL.TABLE_NAME NOT LIKE 'routine_privileges' AND
      COL.TABLE_NAME NOT LIKE 'role_routine_grants' AND
      COL.TABLE_NAME NOT LIKE 'routines' AND
      COL.TABLE_NAME NOT LIKE 'schemata' AND
      COL.TABLE_NAME NOT LIKE 'sequences' AND
      COL.TABLE_NAME NOT LIKE 'sql_features' AND
      COL.TABLE_NAME NOT LIKE 'sql_implementation_info' AND
      COL.TABLE_NAME NOT LIKE 'sql_languages' AND
      COL.TABLE_NAME NOT LIKE 'sql_packages' AND
      COL.TABLE_NAME NOT LIKE 'sql_sizing' AND
      COL.TABLE_NAME NOT LIKE 'sql_sizing_profiles' AND
      COL.TABLE_NAME NOT LIKE 'table_constraints' AND
      COL.TABLE_NAME NOT LIKE 'table_privileges' AND
      COL.TABLE_NAME NOT LIKE 'role_table_grants' AND
      COL.TABLE_NAME NOT LIKE 'tables' AND
      COL.TABLE_NAME NOT LIKE 'triggered_update_columns' AND
      COL.TABLE_NAME NOT LIKE 'triggers' AND
      COL.TABLE_NAME NOT LIKE 'udt_privileges' AND
      COL.TABLE_NAME NOT LIKE 'role_udt_grants' AND
      COL.TABLE_NAME NOT LIKE 'usage_privileges' AND
      COL.TABLE_NAME NOT LIKE 'role_usage_grants' AND
      COL.TABLE_NAME NOT LIKE 'user_defined_types' AND
      COL.TABLE_NAME NOT LIKE 'view_column_usage' AND
      COL.TABLE_NAME NOT LIKE 'view_routine_usage' AND
      COL.TABLE_NAME NOT LIKE 'view_table_usage' AND
      COL.TABLE_NAME NOT LIKE 'views' AND
      COL.TABLE_NAME NOT LIKE 'data_type_privileges' AND
      COL.TABLE_NAME NOT LIKE 'element_types' AND
      COL.TABLE_NAME NOT LIKE 'column_options' AND
      COL.TABLE_NAME NOT LIKE 'foreign_data_wrapper_options' AND
      COL.TABLE_NAME NOT LIKE 'foreign_data_wrappers' AND
      COL.TABLE_NAME NOT LIKE 'foreign_server_options' AND
      COL.TABLE_NAME NOT LIKE 'foreign_servers' AND
      COL.TABLE_NAME NOT LIKE 'foreign_table_options' AND
      COL.TABLE_NAME NOT LIKE 'foreign_tables' AND
      COL.TABLE_NAME NOT LIKE 'user_mapping_options' AND
      COL.TABLE_NAME NOT LIKE 'geography_columns' AND
      COL.TABLE_NAME NOT LIKE 'raster_columns' AND
      COL.TABLE_NAME NOT LIKE 'spatial_ref_sys' AND
      COL.TABLE_NAME NOT LIKE 'raster_overviews' AND
      COL.TABLE_NAME NOT LIKE 'raster_overviews' AND
      COL.TABLE_NAME NOT LIKE 'geometry_columns' AND
      COL.TABLE_NAME NOT LIKE 'user_mappings';`, 
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("******************************NEW CONSTRAINT DATA******************************")
          console.log(result.rows);
          console.log("******************************CURRENT TABLES******************************")
          console.log(tables)
          resolve(result.rows);
        }
      }
    )
  })
  // for (let i = 0; i < constraintData.length; i++) {
  //   requiredTables[constraintData[i][anonymous].table_name][constraintData[i][anonymous].column_name] = constraintData[i][anonymous].isnullable;
  // };
  console.log("******************************Finished TABLE?******************************")
  console.log(constraintData)
  for (let i = 0; i < constraintData.length; i++) {
    if (requiredTables[constraintData[i].table_name] === undefined) {
      requiredTables[constraintData[i].table_name] = [[constraintData[i].column_name, constraintData[i].is_nullable]]
    } else {
      requiredTables[constraintData[i].table_name].push([constraintData[i].column_name, constraintData[i].is_nullable]);
    }
  }
  // await constraintData.map(el => {
  //   requiredTables[el.table_name] = [el.column_name, el.is_nullable];
  // });
  console.log("******************************NEW TABLE!!!******************************")

  console.log(requiredTables);
  next();
}

db.filterAssociations = async (req, res) => {
  let filteredResults = await new Promise((resolve, reject) => {
    client.query(
      "SELECT tc.table_schema, tc.constraint_name, tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name FROM information_schema.table_constraints tc JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name WHERE constraint_type = 'FOREIGN KEY';",
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("******************************Result.rows_FilterAssociations******************************")
          console.log(result.rows)
          resolve(result.rows);
        }
      }
    );
  });
  console.log("******************************FILTERED RESULTS******************************")
  console.log(filteredResults)
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
          console.log("******************************Result.rowsAfterFilterResults******************************")
          console.log(result.rows)
          resolve(result.rows);
        }
      }
    );
  });

  let filter = {};
  let filteredKeys = await primaryKeys.map(el => {
    filter[el.table_name] = el.column_name;
  });
  console.log("******************************FILTER******************************");
  console.log(filter);

  tables.foreignTables = foreignTables;
  // tables.requiredTables = requiredTables;
  console.log("******************************TABLES FINAL******************************");

  console.log(tables)
  tables.primaryKeys = filter;
  let frontEndVersion = transform(tables, requiredTables);
  fs.writeFileSync(
    path.join(PATH, `mutationZip.js`),
    mutationResolver(frontEndVersion, tables)
  );
  fs.writeFileSync(path.join(PATH, `typesZip.js`), frontEndVersion);
  fs.writeFileSync(
    path.join(PATH, `queryZip.js`),
    queryResolver(frontEndVersion, tables)
    );
    // console.log(transformedToString);
    // console.log(tables.primaryKeys);
    // let transformedToString = transform(tables);
  res.end(JSON.stringify(frontEndVersion));
};
module.exports = db;
