// const pluralize = require("pluralize");

//HELPER FUNCTIONS
function initialCapitalizer(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function valueChecker(str) {
  switch (str) {
    case "character varying":
      return "String";
      break;
    case "text":
      return "String";
      break;
    case "integer":
      return "Int";
      break;
    case "date":
      return "String";
      break;
    case "boolean":
      return "Boolean";
      break;
    case "character":
      return "String";
      break;
    case "real":
      return "Float";
      break;
    case "numeric":
      return "Float";
      break;
    case "decimal":
      return "Float";
      break;
    default:
      return "Int";
  }
}

///////////////////////////////////////////////////////TYPES

//QUERY TYPE
function queriesCreator(obj) {
  let allTables = Object.keys(obj);
  let output = ``;

  allTables.map(table => {
    if (table !== "primaryKeys" && table !== "foreignTables") {
      output += `
        ${table}:[${initialCapitalizer(table)}]
        ${table}ByID(id:ID):${initialCapitalizer(table)}`;
    }
  });
  return output;
}

//ALL TYPES
function allTypesCreator(obj) {
  let allTables = Object.keys(obj);

  //FINAL STRING OUTPUT
  let output = ``;

  allTables.map(table => {
    if (table !== "primaryKeys" && table !== "foreignTables") {
      let allFields = Object.keys(obj[table]);
      let fieldsMapped = ``;

      allFields.map((field, index) => {
        fieldsMapped += `
      ${field}:${valueChecker(obj[table][field])}`;
        if (obj.foreignTables[table] && index >= allFields.length - 1) {
          fieldsMapped += `
      ${table}: ${initialCapitalizer(obj.foreignTables[table])}`;
        }
      });
      output += `type ${initialCapitalizer(table)} {  ${fieldsMapped}
    }

    `;
    }
  });
  return output;
}

function mutationCreator(obj) {
  //ALL TABLE NAMES
  let allTables = Object.keys(obj);
  //FINAL STRING OUTPUT
  let output = ``;
  //ITERATE OVER ALL TABLES EXCEPT TWO LAST TABLES
  for (let i = 0; i < allTables.length - 2; i++) {
    //CURRENT TABLE
    let table = allTables[i];
    //GET ALL FIELDS FOR CURRENT TABLE
    let allFields = Object.keys(obj[allTables[i]]);
    //CREATE AN INPUT STRING
    let input = `${allFields[0]}:ID, `;

    for (let j = 1; j <= allFields.length - 1; j++) {
      let field = allFields[j];

      let valueOfField = valueChecker(obj[table][field]);
      input += `${field}: ${valueOfField} `;
      if (j !== allFields.length - 1) {
        input += `, `;
      }
    }
    output += `
        create${initialCapitalizer(table)}(${input}): ${initialCapitalizer(
      table
    )}
        delete${initialCapitalizer(table)}(${input}): ${initialCapitalizer(
      table
    )}
        update${initialCapitalizer(table)}(${input}): ${initialCapitalizer(
      table
    )}`;
  }
  return output;
}

function typeDefsReturner(str1, str2, str3) {
  return `
  const typeDefs = \`
    type Query { ${str1}
    }

    type Mutation { ${str2}
    }

      ${str3}\`
  

  module.exports = typeDefs;
  `;
}

/////////////////////////////////////////// RESOLVERS

function queryResolver(obj) {
  let output = ``;
  let tables = Object.keys(obj);

  let query = tables.map(table => {
    if (table !== "primaryKeys" && table !== "foreignTables") {
      let idField = Object.keys(obj[table])[0];
      output += `
    ${table}(){
      const query = \`SELECT * FROM ${table}\`;
      return psql.manyOrNone(query);
    },
    `;

      output += `
    ${table}ByID(parent, args, ctx, info){
      const query = \`SELECT * FROM ${table} WHERE ${idField} = $\{args.${idField}}\`;
      return psql.manyOrNone(query)
      .then(data=>{
        let newData = {${table}ByID:data[0]};
        return newData.${table}ByID})
        .catch(err=>{
          console.log(error)
        
      });
    }, 
    `;
    }
  });

  return output;
}

function mutationResolver(obj) {
  let allTables = Object.keys(obj);
  let output = ``;
  for (let i = 0; i < allTables.length - 2; i++) {
    let table = allTables[i];
    let allFields = Object.keys(obj[allTables[i]]).slice(1);
    let idField = Object.keys(obj[allTables[i]])[0];
    console.log(idField);

    //CREATE RESOLVER
    //DELETE RESOLVER
    //UPDATE RESOLVER
    output += `create${initialCapitalizer(table)}(parent, args, ctx, info){
            let argsObj = Object.entries(args);
            let literal = '';
            let insertStr = \`INSERT INTO ${initialCapitalizer(table)}(\`;
            let valuesStr = \`VALUES(\`
          for (let i = 0; i < argsObj.length; i++) {

              if (i > 0) {
                insertStr += ', ';
                valuesStr += ', ';
              }
              insertStr += \`$\{argsObj[i][0]}\`;
              valuesStr += \`'$\{argsObj[i][1]}'\`;
       }
       literal = insertStr + ') ' + valuesStr + ') RETURNING *';
     const query = literal;
     console.log(query);
       return psql.manyOrNone(query)
       .then(data => {
         let newData = {create${initialCapitalizer(table)}: data[0]};
         return newData.create${initialCapitalizer(table)}})
       .catch(error => {
         console.log(error)
       });
     },

        delete${initialCapitalizer(table)}(parent, args, ctx, info){
          const query = \`DELETE FROM ${table} WHERE ${idField} = $\{args.${idField}} RETURNING *\`;
            return psql.manyOrNone(query)
            .then(data => {
              let newData = { delete${initialCapitalizer(table)}: data[0]};
              return newData.delete${initialCapitalizer(table)};
          })
        },

      update${initialCapitalizer(table)}(parent, args, ctx, info) {
     let argsObj = Object.entries(args);
     let literal = \`UPDATE ${initialCapitalizer(table)} \`;
     let counter = 0;
     for (let i = 0; i < argsObj.length; i++) {
       if (argsObj[i][0] !== 'id') {
         if(counter > 0) {
           literal += \`, $\{argsObj[i][0]}='$\{argsObj[i][1]}'\`;
         } else {
           literal += \`SET $\{argsObj[i][0]}='$\{argsObj[i][1]}'\`;
         }
         counter++;
       }
     }
       literal += \`
       WHERE ${idField} = $\{args.${idField}} RETURNING *\`;
       const query = literal;
       console.log(query);
       return psql.manyOrNone(query)
       .then(data => {
         let newData = {update${initialCapitalizer(table)}: data[0]};
         return newData.update${initialCapitalizer(table)}})
       .catch(error => {
         console.log(error)
       });
   },`;
  }
  return output;
}

function returnResolvers(str1, str2) {
  return `
const psql = require('../psqlAdapter').psql;

const resolvers = {
  Query:{
            ${str1}
      },

  Mutation:{
            ${str2}
      }
  };
  
  module.exports = resolvers;
  `;
}

module.exports = {
  allTypesCreator,
  queriesCreator,
  mutationCreator,
  typeDefsReturner,
  returnResolvers,
  queryResolver,
  mutationResolver,
  initialCapitalizer
};
