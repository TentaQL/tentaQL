const pluralize = require("pluralize");

// TESTING DATABASE
// const allTypes = {
//   players: {
//     player_id: "integer",
//     firstname: "character varying",
//     lastname: "character varying",
//     birthdate: "date",
//     country: "character varying"
//   },
//   dogs: {
//     dog_id: "integer",
//     firstname: "character varying",
//     lastname: "character varying",
//     birthdate: "date"
//   },
//   students: {
//     student_id: "integer",
//     player_name: "text"
//   },
//   cats: {
//     cat_id: "integer",
//     firstname: "character varying",
//     lastname: "character varying",
//     birthdate: "date"
//   },
//   tests: {
//     subject_id: "integer",
//     subject_name: "text",
//     higheststudent_id: "integer"
//   },
//   foreignTables: {
//     tests: "students"
//   },
//   primaryKeys: {
//     players: "player_id",
//     dogs: "dog_id",
//     cats: "cat_id",
//     students: "student_id"
//   }
// };

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
    case "real":
      return "Float";
      break;
    case "character":
      return "String";
      break;
    case "bool":
      return "Boolean";
      break;
    case "boolean":
      return "Boolean";
      break;
    case "Bool":
      return "Boolean";
      break;
    case "decimal":
      return "Float";
      break;
    case "DECIMAL":
      return "Float";
      break;
    case "int":
      return "Int";
      break;
    default:
      return "Float";
      break;
  }
}

function transformObj(obj) {
  let output = {};
  output["type Query"] = {};
  output["type Mutation"] = {};
  for (key in obj) {
    let input = "";
    let i = 0;
    if (key != "foreignTables" && key != "primaryKeys")
      for (field in obj[key]) {
        let count = Object.keys(obj[key]).length;
        if (field.slice(field.length - 2) != "id") {
          input += `${field}:${valueChecker(obj[key][field])}, `;
        }
        if (i >= count - 1) {
          //CREATE
          output["type Mutation"][
            `create${pluralize.singular(initialCapitalizer(key))}(${input})`
          ] = ` ${pluralize.singular(initialCapitalizer(key))}`;

          output["type Mutation"][
            `update${pluralize.singular(initialCapitalizer(key))}(${input})`
          ] = ` ${[pluralize.singular(initialCapitalizer(key))]}`;

          input = "";
        }

        i++;

        output["type Mutation"][
          `delete${pluralize.singular(initialCapitalizer(key))}(id:ID)`
        ] = ` ` + pluralize.singular(initialCapitalizer(key));

        let singular = pluralize.singular(key);
        output[`type ` + initialCapitalizer(key)] = obj[key];
        output["type Query"][pluralize.singular(key)] = initialCapitalizer(
          singular
        );
        output["type Query"][key] = `[${initialCapitalizer(singular)}]`;
      }
  }
  return output;
}

function mergeToString(obj) {
  let output = ``;
  let i = 0;
  for (key in obj) {
    output += `\r\n` + key + ` { `;

    for (field in obj[key]) {
      let counts = Object.keys(obj[key]).length;
      i++;
      output += `\r\n   ${field}:${obj[key][field]}`;
      if (i === counts) {
        output += "\r\n     }";
        i = 0;
      }
    }
  }
  output += " \r\n }";
  output = output.replace(/\, \)/g, ")");
  output = output.replace(/\: /g, ": ");
  return output;
}

function relations(obj1, obj2) {
  let output = obj1;

  for (let key in obj2) {
    let check = "type " + initialCapitalizer(obj2[key]);

    if (obj1.hasOwnProperty(check)) {
      let type = pluralize.singular(key);
      obj1[check][key] = `[${initialCapitalizer(type)}]`;
    }
  }
  return output;
}

function changeValues(obj) {
  let output = {};
  for (key in obj) {
    for (field in obj[key]) {
      if (
        obj[key][field] === "character varying" ||
        obj[key][field] === "text" ||
        obj[key][field].includes("char")
      ) {
        obj[key][field] = "String";
      } else if (obj[key][field] === "integer") {
        obj[key][field] = "Int";
      } else if (obj[key][field] === "date") {
        obj[key][field] = "String";
      } else if (obj[key][field].toLowerCase() === "real") {
        obj[key][field] = "Float";
      } else if (obj[key][field] === "boolean") {
        obj[key][field] = "Boolean";
      } else if (obj[key][field] === "numeric") {
        obj[key][field] = "Float";
      } else if (obj[key][field].toLowerCase() === "decimal") {
        obj[key][field] = "Float";
      }
    }
  }
  return obj;
}

function addQueryType(obj) {
  let output = obj;
  obj["Query"] = {};
  for (let key in obj) {
    obj["Query"];
  }
}

function finalSingulizer(obj) {
  let output = obj;
  for (let key in obj) {
    let splitted = key.split(" ");
    obj[` type ` + pluralize.singular(splitted[1])] = obj[key];
    delete obj[key];
  }
  output += "}";
  return output;
}

const transform = obj => {
  let typeDefs = transformObj(obj);
  let final = changeValues(typeDefs);
  let related = relations(final, obj["foreignTables"]);
  let singularized = finalSingulizer(related);
  let queryTypeAdded = addQueryType(singularized);
  let string = mergeToString(related);
  return "const typeDefs = ` " + string + "\r\n `;";
};
<<<<<<< HEAD

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
=======
// let transformedTostring = transform(allTypes);

function queryResolver(str, obj) {
  //PROCESSING QUERY PORTION
  let splittedTypes = str.split("type");
  let query = splittedTypes[2];

  let fields = query
    .replace(/Query {/g, "")
    .replace(/]/g, "")
    .replace(/]/g, "")
    .replace(/\}/g, "")
    .replace(/\[/g, "")
    .replace(/\r\n/g, "")
    .replace(/  +/g, " ")
    .trim();
  let splitted = fields.split(" ");
  let final = splitted.map(el => el.split(":"));

  let output = ``;
  final.map((el, index) => {
    if (index % 2 === 0) {
      output += `
      ${el[0]}(parent, {id}, ctx, info) {
        client.query("SELECT*FROM ${pluralize(el[0].toString())} where ${
        obj.primaryKeys[pluralize(el[0].toString())]
      }= id", 
        (err,result)=> {
          if(err) throw new Error("Error querying all ${el[0]}")
          return result;
        });
      },
      `;
    } else {
      output += `
      ${el[0]}(parent, args, ctx, info) {
          client.query("SELECT*FROM ${el[0]}", (err,result)=>{
            if(err) throw new Error("Error querying all ${el[0]}")
            return result;
          })
      
      },
      `;
    }
  });
  return `const Query = { ${output} \n };`;
}
// console.log(queryResolver(transformedTostring, allTypes));
>>>>>>> 7095f59a6e915e4edf0e94130e5598b0c0a6faad

function mutationResolver(str, obj) {
  let splitted = str.split("type")[3];
  let fields = splitted
    .replace(/Mutation {/g, "")
    .replace(/}/g, "")
    .replace(/  +/g, " ")
    .replace(/\n/g, "")
    .trim();

  let fieldsSplitted = fields.split("\r");
  let output = ``;

  fieldsSplitted.map((el, index) => {
    let element = el.split("):");
    let pluralized =
      obj.primaryKeys[pluralize(element[1].trim()).toLowerCase()];
    let singularized = obj.primaryKeys[element[1].trim().toLowerCase()];
    let tableName = element[1].trim().toLowerCase();
    let tableNamePl = pluralize(element[1].trim().toLowerCase());
    let from;
    if (obj[tableName]) {
      from = tableName;
    } else {
      from = tableNamePl;
    }

    if (
      element[0].toString().startsWith(" delete") &&
      (pluralized || singularized)
    ) {
      output += `delete${element[
        element.length - 1
      ].trim()}(parent, args, {id}, info) {
    client.query("DELETE FROM ${from} WHERE ${pluralized ||
        singularized} = id", (err,result)=>{
      if(err) throw new Error("Error deleting");
      return result;
    })
    },
    `;
    } else if (
      element[0].toString().startsWith(" create") &&
      (pluralized || singularized)
    ) {
      output += `create${pluralize.singular(
        element[element.length - 1].trim()
      )}(parent, args, {id}, info) {
    client.query("create FROM ${from} WHERE ${pluralized ||
        singularized} = id", (err,result)=>{
      if(err) throw new Error("Error creating");
      return result;
    })
    },
    `;
    } else if (
      element[0].toString().startsWith(" upda") &&
      (pluralized || singularized)
    ) {
      output += `update${element[
        element.length - 1
      ].trim()}(parent, args, {id}, info) {
          client.query("update FROM ${from} WHERE ${pluralized ||
        singularized} = id", (err,result)=>{
              if(err) throw new Error("Error creating");
              return result;
            })
            },
            `;
    }
  });
<<<<<<< HEAD
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
  transform,
  queryResolver,
  mutationResolver,
  returnResolvers
};
=======
  return `const Mutation = { \r\n ${output} \r\n};
  module.exports = Mutation;`;
}

module.exports = { transform, queryResolver, mutationResolver };
>>>>>>> 7095f59a6e915e4edf0e94130e5598b0c0a6faad
