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
      return "Integer";
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
      return "String";
      break;
    case "numeric":
      return "Integer";
      break;
  }
}

///////////////////////////////////////////////////////TYPES

//QUERY TYPE
function queriesCreator(obj) {
  let allTables = Object.keys(obj);
  let output = ``;

  allTables.map(table => {
    output += `
        ${table}:[${initialCapitalizer(table)}]
        ${table}ByID(id:ID):[${initialCapitalizer(table)}]`;
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
    let input = `${allFields[0]}:ID, {`;

    for (let j = 1; j <= allFields.length - 1; j++) {
      let field = allFields[j];

      let valueOfField = valueChecker(obj[table][field]);
      input += `${field}: ${valueOfField} `;
      if (j !== allFields.length - 1) {
        input += `, `;
      } else if (j === allFields.length - 1) {
        input += `}`;
      }
    }
    output += `
        create${initialCapitalizer(table)}(${input}): [${initialCapitalizer(
      table
    )}]
        delete${initialCapitalizer(table)}(${
      allFields[0]
    }:ID): [${initialCapitalizer(table)}]
        update${initialCapitalizer(table)}(${input}): [${initialCapitalizer(
      table
    )}]`;
  }
  return output;
}

function typeDefsReturner(str1, str2, str3) {
  return `
  const typeDefs = \`{
    type Query { ${str1}
    }

    type Mutation { ${str2}
    }

      ${str3}
  \`
  

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
      const query = \`SELECT * FROM ${table} WHERE ${idField} = $\{args.id}\`;
      return psql.manyOrNone(query);
    }, 
    `;
    }
  });

  return output;
}

function mutationResolver(obj) {
  // let splitted = str.split("type")[3];
  // let fields = splitted
  //   .replace(/Mutation {/g, "")
  //   .replace(/}/g, "")
  //   .replace(/  +/g, " ")
  //   .replace(/\n/g, "")
  //   .trim();

  // let fieldsSplitted = fields.split("\r");
  // let output = ``;

  // fieldsSplitted.map((el, index) => {
  //   let element = el.split("):");
  //   let pluralized =
  //     obj.primaryKeys[pluralize(element[1].trim()).toLowerCase()];
  //   let singularized = obj.primaryKeys[element[1].trim().toLowerCase()];
  //   let tableName = element[1].trim().toLowerCase();
  //   let tableNamePl = pluralize(element[1].trim().toLowerCase());
  //   let from;
  //   if (obj[tableName]) {
  //     from = tableName;
  //   } else {
  //     from = tableNamePl;
  //   }

  //   if (
  //     element[0].toString().startsWith(" delete") &&
  //     (pluralized || singularized)
  //   ) {
  //     output += `delete${element[
  //       element.length - 1
  //     ].trim()}(parent, args, {id}, info) {
  //   client.query("DELETE FROM ${from} WHERE ${pluralized ||
  //       singularized} = id", (err,result)=>{
  //     if(err) throw new Error("Error deleting");
  //     return result;
  //   })
  //   },
  //   `;
  //   } else if (
  //     element[0].toString().startsWith(" create") &&
  //     (pluralized || singularized)
  //   ) {
  //     output += `create${pluralize.singular(
  //       element[element.length - 1].trim()
  //     )}(parent, args, {id}, info) {
  //   client.query("create FROM ${from} WHERE ${pluralized ||
  //       singularized} = id", (err,result)=>{
  //     if(err) throw new Error("Error creating");
  //     return result;
  //   })
  //   },
  //   `;
  //   } else if (
  //     element[0].toString().startsWith(" upda") &&
  //     (pluralized || singularized)
  //   ) {
  //     output += `update${element[
  //       element.length - 1
  //     ].trim()}(parent, args, {id}, info) {
  //         client.query("update FROM ${from} WHERE ${pluralized ||
  //       singularized} = id", (err,result)=>{
  //             if(err) throw new Error("Error creating");
  //             return result;
  //           })
  //           },
  //           `;
  //   }
  // });
  // return output;
  return "Should have some mutations here";
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
  mutationResolver
};
