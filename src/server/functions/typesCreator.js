const pluralize = require("pluralize");

//TESTING DATABASE
// const allTypes = {
//   customers: {
//     customerid: "integer",
//     lastname: "character varying",
//     firstname: "character varying",
//     phone: "character varying"
//   },
//   orders: {
//     orderid: "integer",
//     amount: "character varying",
//     customerid: "integer"
//   },
//   stores: {
//     storeid: "integer",
//     region: "character varying",
//     orderid: "integer"
//   },
//   foreignTables: {
//     orders: "customers",
//     stores: "orders"
//   }
// };

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

function tranformObj(obj) {
  let output = {};
  output["type Query"] = {};
  for (key in obj) {
    if (key != "foreignTables")
      for (field in obj[key]) {
        let singular = pluralize.singular(key);
        output[`type ` + key.charAt(0).toUpperCase() + key.slice(1)] = obj[key];
        output["type Query"][pluralize.singular(key)] =
          singular.charAt(0).toUpperCase() + singular.slice(1);
        output["type Query"][key] = `[${singular.charAt(0).toUpperCase() +
          singular.slice(1)}]`;
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
    let check = "type " + key.charAt(0).toUpperCase() + key.slice(1);
    if (obj1.hasOwnProperty(check)) {
      let type = pluralize.singular(obj2[key]);
      obj1[check][type] = `[${type.charAt(0).toUpperCase() + type.slice(1)}]`;
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

// console.log(transform(allTypes));

module.exports = transform;
