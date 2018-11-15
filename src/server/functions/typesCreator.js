const pluralize = require("pluralize");

// TESTING DATABASE
const allTypes = {
  customers: {
    customerid: "integer",
    lastname: "character varying",
    firstname: "character varying",
    phone: "character varying"
  },
  orders: {
    orderid: "integer",
    amount: "character varying",
    customerid: "integer"
  },
  stores: {
    storeid: "integer",
    region: "character varying",
    orderid: "integer"
  },
  foreignTables: {
    orders: "customers",
    stores: "orders"
  }
};

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
      return "Integer";
      break;
    case "date":
      return "String";
      break;
  }
}

function tranformObj(obj) {
  let output = {};
  output["type Query"] = {};
  output["type Mutation"] = {};
  for (key in obj) {
    let input = "";
    let i = 0;
    if (key != "foreignTables")
      for (field in obj[key]) {
        let count = Object.keys(obj[key]).length;
        if (field.slice(field.length - 2) != "id") {
          input += `    ${field}: ${valueChecker(obj[key][field])} \r\n`;
        }
        if (i >= count - 1) {
          //CREATE
          output["type Mutation"][
            `create${initialCapitalizer(key)}(\r\n${input}   )`
          ] = pluralize.singular(initialCapitalizer(key));

          output["type Mutation"][
            `update${pluralize.singular(
              initialCapitalizer(key)
            )}(\r\n${input}   )`
          ] = key;

          input = "";
        }

        i++;

        output["type Mutation"][
          `delete${pluralize.singular(initialCapitalizer(key))}(id:ID)`
        ] = pluralize.singular(initialCapitalizer(key));

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
  return output;
}

function relations(obj1, obj2) {
  let output = obj1;
  for (let key in obj2) {
    let check = "type " + initialCapitalizer(key);
    if (obj1.hasOwnProperty(check)) {
      let type = pluralize.singular(obj2[key]);
      obj1[check][type] = `[${initialCapitalizer(type)}]`;
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
        obj[key][field] === "text"
      ) {
        obj[key][field] = "String";
      } else if (obj[key][field] === "integer") {
        obj[key][field] = "Integer";
      } else if (obj[key][field] === "date") {
        obj[key][field] = "String";
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
  let typeDefs = tranformObj(obj);
  let final = changeValues(typeDefs);
  let related = relations(final, obj["foreignTables"]);
  let singularized = finalSingulizer(related);
  let queryTypeAdded = addQueryType(singularized);
  let string = mergeToString(related);
  return "const typeDefs = ` " + string + "\r\n `;";
};

console.log(transform(allTypes));

// module.exports = transform;
