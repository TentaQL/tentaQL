var mysql = require('promise-mysql');
var connection;
let modelArr = [];
let finalTables = [];
let url = `mysql://root:test@localhost/tentaql`;

const controllerMySQL = {};

controllerMySQL.getDatabase = async (req, res) => {
  modelArr = [];
  finalTables = [];
  let finalOutput = ``;
const tableParseHelper = (req, string, tableNames) => {
  
  let lines = string.split("\n");
  let tableName = lines[0].match(/`(.*?)`/g)[0].replace(/`/g, "");
  let tableObj = {};
  tableObj[tableName] = [];
  for (let i = 1; i < lines.length; i++){
    let columnName = [];
      if (lines[i].includes('varchar')) {
        columnName.push(lines[i].match(/`(.*?)`/g)[0].replace(/`/g, ""));
        columnName.push("GraphQLString");
      } else if (lines[i].includes('tinyint')) {
        columnName.push(lines[i].match(/`(.*?)`/g)[0].replace(/`/g, ""));
        columnName.push("GraphQLBoolean");
      } else if (lines[i].includes('int')) {
        columnName.push(lines[i].match(/`(.*?)`/g)[0].replace(/`/g, ""));
        columnName.push("GraphQLInt");
      } else if (lines[i].includes('int')) {
        columnName.push(lines[i].match(/`(.*?)`/g)[0].replace(/`/g, ""));
        columnName.push("GraphQLInt");
      } else if (lines[i].includes('float')) {
        columnName.push(lines[i].match(/`(.*?)`/g)[0].replace(/`/g, ""));
        columnName.push("GraphQLFloat");
      } else if (lines[i].includes('PRIMARY KEY')) {
        let idName = lines[i].match(/`(.*?)`/g)[0].replace(/`/g, "");
        for (let i = 0; i < tableObj[tableName].length; i++) {
          if (tableObj[tableName][i][0] === idName) {
            tableObj[tableName][i][1] = 'GraphQLID';
          }
        }
      } else if (lines[i].includes("FOREIGN KEY")) {
        let beforeString = string.slice(string.indexOf("FOREIGN KEY")).match(/`(.*?)`/g)[0].replace(/`/g, "");
        let newString = string.slice(string.indexOf("REFERENCES"));
        let newerString = newString.match(/`(.*?)`/g);
        let finalOutput = [];
        finalOutput.push(beforeString);
        finalOutput.push(newerString[1].replace(/`/g, ""));
        let testName = newerString[0].replace(/`/g, "");
        // Checking potential MySQL Edge Case, re: lowercase conversion of Foreign Keys
        for (let i = 0; i < tableNames.length; i++) {
          if (tableNames[i].toLowerCase() === testName.toLowerCase()){
            if (tableNames[i] !== testName){
              testName = tableNames[i];
            }
            break;
          }
        }
        finalOutput.push(testName);
        if (finalOutput[1] === 'id') {
          finalOutput.push('GraphQLID') 
        } else {
          finalOutput.push('GraphQLInt');
        }
        for (let i = 0; i < tableObj[tableName].length; i++) {
          if (tableObj[tableName][i][0] === finalOutput[0]) {
            tableObj[tableName][i] = finalOutput;
          }
        }
      }
      if (columnName.length > 0) {
        tableObj[tableName].push(columnName);
      };
  }
  return tableObj;
}

const boilerplateHandler = (req, dbNames, dbArr, url) => {
  
  let boilerStr = `const graphql = require('graphql');
var mysql = require('promise-mysql');
let credentials = '${url}';
let savedQueryData;
let savedPreDelete;

const { 
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString, 
  GraphQLInt, 
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = graphql;`
// BEGINNING OF FOR LOOP TYPE DEF
  for (let i = 0; i < dbArr.length; i++) {
    let currentTableName = dbNames[i];
    let allCols = dbArr[i][dbNames[i]];
    
    boilerStr += `
    
  const ${dbNames[i]}Type = new GraphQLObjectType({
    name: '${dbNames[i]}',
    fields: () => ({`;
    for (let j = 0; j < allCols.length; j++){
      if (allCols[j].length === 2) {
        boilerStr += `
          ${allCols[j][0]}: { type: ${allCols[j][1]} },`;
      } else {
        
        let refCol = allCols[j];
        // 
        // currentTableName 'Dog' 
        let refColName = refCol[0]; // 'Owner'
        let refID = refCol[1]; // 'id'
        let parentRefColStr = `parent.${refColName}`;
        let refTableName = refCol[2]; // 'Human'
        let refType = refCol[3]; // 'GraphQLID'
        // Adding a standard standard ref type option
        boilerStr += `
          ${refColName}: { type: ${refType} },`;
        let refTableIndex = dbNames.indexOf(refTableName);
        let refTableObj = dbArr[refTableIndex][refTableName];
        // 
        let refBackCol = refTableObj.filter(col => {
          return col.length === 4 && col[2] === dbNames[i]
        })

        boilerStr += `
          linked${refTableName}FromHere: {
            type: new GraphQLList(${refTableName}Type),
            resolve(parent, args) {
              return mysql.createConnection(credentials).then(function(conn){
                const sql = \`SELECT DISTINCT ${refTableName}.* FROM ${refTableName} INNER JOIN ${currentTableName} ON (${currentTableName}.${refColName} = ${refTableName}.${refID}) WHERE ${currentTableName}.${refColName} = \${${parentRefColStr}}\`;
                let result = conn.query(sql);
                conn.end();
                return result;
              }).then(function(rows){
                return rows;
              });
            }
          },`;

          if (refBackCol.length > 0) {
            let refBackColName = refBackCol[0][0]; 
            let refBackID = refBackCol[0][1]; 
            let parentConcatID = `parent.${refBackID}`;
            let refBackTableName = refBackCol[0][2];
            
            boilerStr += `
            linked${refTableName}ToHere: {
              type: new GraphQLList(${refTableName}Type),
              resolve(parent, args) {
                return mysql.createConnection(credentials).then(function(conn){
                  const sql = \`SELECT DISTINCT ${refTableName}.* FROM ${refTableName} INNER JOIN ${refBackTableName} ON (${refBackTableName}.id = ${refTableName}.${refBackColName}) WHERE ${refBackTableName}.id = \${${parentConcatID}}\`;
                  let result = conn.query(sql);
                  conn.end();
                  return result;
                }).then(function(rows){
                  return rows;
                });
              }
            },
            linked${refTableName}: {
              type: new GraphQLList(${refTableName}Type),
              resolve(parent, args) {
                return mysql.createConnection(credentials).then(function(conn){
                   const sql = \`SELECT ${refTableName}.* FROM ${refTableName} INNER JOIN ${refBackTableName} ON (${refBackTableName}.id = ${refTableName}.${refBackColName})  WHERE ${refBackTableName}.id = \${${parentConcatID}}
          UNION SELECT ${refTableName}.* FROM ${refTableName} INNER JOIN ${refBackTableName} ON (${refBackTableName}.${refColName} = ${refTableName}.id) WHERE ${refBackTableName}.${refColName} = \${${parentRefColStr}};\`;
                  let result = conn.query(sql);
                  conn.end();
                  return result;
                }).then(function(rows){
                  return rows;
                });
              }
            },`;
          }
        }
      }
      boilerStr += `
        })
      });`

    }

  // END OF TYPE DEFS
    boilerStr += `

    const RootQuery = new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {`;
      for (let i = 0; i < dbArr.length; i++) {
        let currentTableName = dbNames[i];
        let allCols = dbArr[i][dbNames[i]];
        let idCOL = allCols.filter(col => {
          if (col[1] === "GraphQLID") return col;
        })
        idCOL = idCOL[0];
        let argsStr = `args.${idCOL[0]}`;
        boilerStr += `
        every${currentTableName}: {
          type: new GraphQLList(${currentTableName}Type),
          resolve() {
            return mysql.createConnection(credentials).then(function(conn){
              const sql = \`SELECT * FROM ${currentTableName}\`;
              let result = conn.query(sql);
              conn.end();
              return result;
            }).then(function(rows){
              return rows;
            });
          }
        },
        ${currentTableName}: {
          type: ${currentTableName}Type,
          args: { ${idCOL[0]}: { type: GraphQLID}},
          resolve(parent, args) {
            return mysql.createConnection(credentials).then(function(conn){
              const sql = \`SELECT * FROM ${currentTableName} WHERE ${idCOL[0]} = \${${argsStr}}\`;
              let result = conn.query(sql);
              conn.end();
              return result;
            }).then(function(rows){
              return rows[0];
            });
          }
        },`
      }

      // END OF ROOT QUERY SECTION
    boilerStr += `
    }
    });

    const Mutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: {`;

    // BEGINNING OF MUTATION SECTION
    for (let i = 0; i < dbArr.length; i++) {
      let currentTableName = dbNames[i];
      let allCols = dbArr[i][dbNames[i]];
      let idCOL = allCols.filter(col => {
        if (col[1] === "GraphQLID") return col;
      })
      idCOL = idCOL[0];
      let argsStr = `args.${idCOL[0]}`;
      boilerStr += `
        add${currentTableName}: {
          type: ${currentTableName}Type,
          args: {`;
      for (let j = 0; j < allCols.length; j++) {
          if (allCols[j].length === 2) {
            boilerStr += `
            ${allCols[j][0]}: { type: ${allCols[j][1]} },`;
          } else {
            boilerStr += `
            ${allCols[j][0]}: { type: ${allCols[j][3]} },`;
          }
      }
      boilerStr += `
    },
    resolve(parent, args) {
      
      let refStr = \`INSERT into ${currentTableName} (\`;
      let valStr = \`) 
      VALUES (\`;
        for (const prop in args) {
          if (prop === '${idCOL[0]}') {
            savedQueryData = args[prop];
          }
          refStr += \`\${prop}, \`;
          if (!isNaN(parseFloat(args[prop]))) {
            valStr += \`\${args[prop]}, \`;
          } else if (String(args[prop]) === 'true' || String(args[prop]) === 'false') {
            valStr += \`\${args[prop]}, \`;
          } else {
            valStr += \`'\${args[prop]}', \`;
          } 
        }
        refStr = refStr.slice(0, -2);
        valStr = valStr.slice(0, -2);
        valStr += \`);\`;
        refStr += valStr; 
      return mysql.createConnection(credentials).then(function(conn){
        let result = conn.query(refStr);
        conn.end();
        return result;
      }).then(function(){
        return mysql.createConnection(credentials).then(function(conn){
          const sql = \`SELECT * FROM ${currentTableName} WHERE ${idCOL[0]} = \${savedQueryData}\`;
          let result = conn.query(sql);
          conn.end();
          return result;
        }).then(function(rows){
          return rows[0];
        });
      }); 
    }
    },
    update${currentTableName}: {
        type: ${currentTableName}Type,
        args: {`;

        for (let j = 0; j < allCols.length; j++) {
          if (allCols[j].length === 2) {
            boilerStr += `
            ${allCols[j][0]}: { type: ${allCols[j][1]} },`;
          } else {
            boilerStr += `
            ${allCols[j][0]}: { type: ${allCols[j][3]} },`;
          }
        };

        boilerStr += `
        },
        resolve(parent, args) {
          
          let updateValues = '';
            for (const prop in args) {
              if (prop === '${idCOL[0]}') {
                savedQueryData = args[prop];
              }
              if (!isNaN(parseFloat(args[prop]))) {
                updateValues += \`\${prop} = \${args[prop]}, \`;
              } else if (String(args[prop]) === 'true' || String(args[prop]) === 'false') {
                updateValues += \`\${prop} = \${args[prop]}, \`;
              } else {
                updateValues += \`\${prop} = '\${args[prop]}', \`;
              } 
            }

          return mysql.createConnection(credentials).then(function(conn){
            const sql = \`UPDATE ${currentTableName} SET \${updateValues.slice(0, -2)} WHERE ${idCOL[0]} = \${args.${idCOL[0]}};\`;
            
            let result = conn.query(sql);
            conn.end();
            return result;
          }).then(function(){
            return mysql.createConnection(credentials).then(function(conn){
              const sql = \`SELECT * FROM ${currentTableName} WHERE id = \${savedQueryData}\`;
              let result = conn.query(sql);
              conn.end();
              return result;
            }).then(function(rows){
              return rows[0];
            });
          });
        }
      },
    delete${currentTableName}: {
      type: ${currentTableName}Type,
      args: { ${idCOL[0]}: { type: GraphQLID}},
      resolve(parent, args)   {
          return mysql.createConnection(credentials).then(function(conn){
            const sql = \`SELECT * FROM ${currentTableName} WHERE ${idCOL[0]} = \${args.${idCOL[0]}}\`;
            savedQueryData = args.${idCOL[0]};
            let result = conn.query(sql);
            conn.end();
            return result;
          }).then(function(res){
            savedPreDelete = res;
            return;
          }).then(function(){
            return mysql.createConnection(credentials).then(function(conn){
              const sql = \`DELETE FROM ${currentTableName} WHERE ${idCOL[0]} = \${savedQueryData}\`;
              let result = conn.query(sql);
              conn.end();
              return savedPreDelete[0];
          });
        });
      }
    },`;

    };

    boilerStr += `
  }})


    module.exports = new GraphQLSchema({
      query: RootQuery,
      mutation: Mutation
    });`
        // 
        res.end(boilerStr);
        return boilerStr;
      }

    const traverseSchema = (req, url) => {
      
      return mysql.createConnection(url).then(function(conn){
        connection = conn;
        const sql = `show tables;`;
        var result = conn.query(sql);
        return result;
          }).then(function(tables){
            let vals = Object.entries(tables);
            return vals;
          }).then(function(tables) {
            let keysArr = [];
            for (let i = 0; i < tables.length; i++) {
              let keyName = Object.keys(tables[i][1])[0];
              keysArr.push(tables[i][1][keyName]);
            }
            return keysArr;
          }).then(function(collNames) {
            function getSchema(tableId) {
              return new Promise(async function(resolve, reject) {
                try {
                  let result = await connection.query(`SHOW CREATE TABLE ${tableId};`);
                  resolve(result);
                } catch (err) {
                  reject(err);
                }
              });
            }
            for (let i = 0; i < collNames.length; i++) {
              modelArr.push(getSchema(collNames[i]));
            }
            return Promise.all(modelArr).then(function(resp) {
              return resp;
            })
          }).then(function(resp) {
            let tablesArr = [];
            for (let i = 0; i < resp.length; i++) {
              tablesArr.push(resp[i][0]['Create Table']);
            }
            return tablesArr;
          }).then(function(schemas) {
            let tableNames = [];
            schemas.forEach(schema => {
              tableNames.push(schema.match(/`(.*?)`/)[1]);
            })
            
            for(i = 0; i < schemas.length; i++) {
              finalTables.push(tableParseHelper(req, schemas[i], tableNames));
            }
            return finalTables;
          }).then(function(tables){
            let tableNames = [];
            for (let i = 0; i < tables.length; i++) {
              tableNames.push(Object.keys(tables[i])[0]);
            }
            return boilerplateHandler(req, tableNames, tables, url);
          });
    }
      

        let filteredResults = await new Promise((resolve, reject) => {
          let final = traverseSchema(req, req.query.url);
          resolve(final);
        });
    }

module.exports = controllerMySQL;