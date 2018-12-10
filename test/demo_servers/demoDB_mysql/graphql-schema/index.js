const graphql = require('graphql');
var mysql = require('promise-mysql');
let credentials = 'mysql://root:test@localhost/tentaql';
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
} = graphql;
    
  const DogType = new GraphQLObjectType({
    name: 'Dog',
    fields: () => ({
          id: { type: GraphQLID },
          collarID: { type: GraphQLInt },
          hasFleas: { type: GraphQLBoolean },
          species: { type: GraphQLString },
          ageDogYears: { type: GraphQLInt },
          name: { type: GraphQLString },
          favoriteFood: { type: GraphQLString },
          Owner: { type: GraphQLID },
          linkedHumanFromHere: {
            type: new GraphQLList(HumanType),
            resolve(parent, args) {
              return mysql.createConnection(credentials).then(function(conn){
                const sql = `SELECT DISTINCT Human.* FROM Human INNER JOIN Dog ON (Dog.Owner = Human.id) WHERE Dog.Owner = ${parent.Owner}`;
                let result = conn.query(sql);
                conn.end();
                return result;
              }).then(function(rows){
                return rows;
              });
            }
          },
            linkedHumanToHere: {
              type: new GraphQLList(HumanType),
              resolve(parent, args) {
                return mysql.createConnection(credentials).then(function(conn){
                  const sql = `SELECT DISTINCT Human.* FROM Human INNER JOIN Dog ON (Dog.id = Human.dogs_owned) WHERE Dog.id = ${parent.id}`;
                  let result = conn.query(sql);
                  conn.end();
                  return result;
                }).then(function(rows){
                  return rows;
                });
              }
            },
            linkedHuman: {
              type: new GraphQLList(HumanType),
              resolve(parent, args) {
                return mysql.createConnection(credentials).then(function(conn){
                   const sql = `SELECT Human.* FROM Human INNER JOIN Dog ON (Dog.id = Human.dogs_owned)  WHERE Dog.id = ${parent.id}
          UNION SELECT Human.* FROM Human INNER JOIN Dog ON (Dog.Owner = Human.id) WHERE Dog.Owner = ${parent.Owner};`;
                  let result = conn.query(sql);
                  conn.end();
                  return result;
                }).then(function(rows){
                  return rows;
                });
              }
            },
        })
      });
    
  const HumanType = new GraphQLObjectType({
    name: 'Human',
    fields: () => ({
          id: { type: GraphQLID },
          name: { type: GraphQLString },
          dogs_owned: { type: GraphQLID },
          linkedDogFromHere: {
            type: new GraphQLList(DogType),
            resolve(parent, args) {
              return mysql.createConnection(credentials).then(function(conn){
                const sql = `SELECT DISTINCT Dog.* FROM Dog INNER JOIN Human ON (Human.dogs_owned = Dog.id) WHERE Human.dogs_owned = ${parent.dogs_owned}`;
                let result = conn.query(sql);
                conn.end();
                return result;
              }).then(function(rows){
                return rows;
              });
            }
          },
            linkedDogToHere: {
              type: new GraphQLList(DogType),
              resolve(parent, args) {
                return mysql.createConnection(credentials).then(function(conn){
                  const sql = `SELECT DISTINCT Dog.* FROM Dog INNER JOIN Human ON (Human.id = Dog.Owner) WHERE Human.id = ${parent.id}`;
                  let result = conn.query(sql);
                  conn.end();
                  return result;
                }).then(function(rows){
                  return rows;
                });
              }
            },
            linkedDog: {
              type: new GraphQLList(DogType),
              resolve(parent, args) {
                return mysql.createConnection(credentials).then(function(conn){
                   const sql = `SELECT Dog.* FROM Dog INNER JOIN Human ON (Human.id = Dog.Owner)  WHERE Human.id = ${parent.id}
          UNION SELECT Dog.* FROM Dog INNER JOIN Human ON (Human.dogs_owned = Dog.id) WHERE Human.dogs_owned = ${parent.dogs_owned};`;
                  let result = conn.query(sql);
                  conn.end();
                  return result;
                }).then(function(rows){
                  return rows;
                });
              }
            },
          ownsCats: { type: GraphQLBoolean },
          Veternarian: { type: GraphQLString },
          ageHumanYears: { type: GraphQLInt },
        })
      });

    const RootQuery = new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        everyDog: {
          type: new GraphQLList(DogType),
          resolve() {
            return mysql.createConnection(credentials).then(function(conn){
              const sql = `SELECT * FROM Dog`;
              let result = conn.query(sql);
              conn.end();
              return result;
            }).then(function(rows){
              return rows;
            });
          }
        },
        Dog: {
          type: DogType,
          args: { id: { type: GraphQLID}},
          resolve(parent, args) {
            return mysql.createConnection(credentials).then(function(conn){
              const sql = `SELECT * FROM Dog WHERE id = ${args.id}`;
              let result = conn.query(sql);
              conn.end();
              return result;
            }).then(function(rows){
              return rows[0];
            });
          }
        },
        everyHuman: {
          type: new GraphQLList(HumanType),
          resolve() {
            return mysql.createConnection(credentials).then(function(conn){
              const sql = `SELECT * FROM Human`;
              let result = conn.query(sql);
              conn.end();
              return result;
            }).then(function(rows){
              return rows;
            });
          }
        },
        Human: {
          type: HumanType,
          args: { id: { type: GraphQLID}},
          resolve(parent, args) {
            return mysql.createConnection(credentials).then(function(conn){
              const sql = `SELECT * FROM Human WHERE id = ${args.id}`;
              let result = conn.query(sql);
              conn.end();
              return result;
            }).then(function(rows){
              return rows[0];
            });
          }
        },
    }
    });

    const Mutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: {
        addDog: {
          type: DogType,
          args: {
            id: { type: GraphQLID },
            collarID: { type: GraphQLInt },
            hasFleas: { type: GraphQLBoolean },
            species: { type: GraphQLString },
            ageDogYears: { type: GraphQLInt },
            name: { type: GraphQLString },
            favoriteFood: { type: GraphQLString },
            Owner: { type: GraphQLID },
    },
    resolve(parent, args) {
      
      let refStr = `INSERT into Dog (`;
      let valStr = `) 
      VALUES (`;
        for (const prop in args) {
          if (prop === 'id') {
            savedQueryData = args[prop];
          }
          refStr += `${prop}, `;
          if (!isNaN(parseFloat(args[prop]))) {
            valStr += `${args[prop]}, `;
          } else if (String(args[prop]) === 'true' || String(args[prop]) === 'false') {
            valStr += `${args[prop]}, `;
          } else {
            valStr += `'${args[prop]}', `;
          } 
        }
        refStr = refStr.slice(0, -2);
        valStr = valStr.slice(0, -2);
        valStr += `);`;
        refStr += valStr; 
      return mysql.createConnection(credentials).then(function(conn){
        let result = conn.query(refStr);
        conn.end();
        return result;
      }).then(function(){
        return mysql.createConnection(credentials).then(function(conn){
          const sql = `SELECT * FROM Dog WHERE id = ${savedQueryData}`;
          let result = conn.query(sql);
          conn.end();
          return result;
        }).then(function(rows){
          return rows[0];
        });
      }); 
    }
    },
    updateDog: {
        type: DogType,
        args: {
            id: { type: GraphQLID },
            collarID: { type: GraphQLInt },
            hasFleas: { type: GraphQLBoolean },
            species: { type: GraphQLString },
            ageDogYears: { type: GraphQLInt },
            name: { type: GraphQLString },
            favoriteFood: { type: GraphQLString },
            Owner: { type: GraphQLID },
        },
        resolve(parent, args) {
          
          let updateValues = '';
            for (const prop in args) {
              if (prop === 'id') {
                savedQueryData = args[prop];
              }
              if (!isNaN(parseFloat(args[prop]))) {
                updateValues += `${prop} = ${args[prop]}, `;
              } else if (String(args[prop]) === 'true' || String(args[prop]) === 'false') {
                updateValues += `${prop} = ${args[prop]}, `;
              } else {
                updateValues += `${prop} = '${args[prop]}', `;
              } 
            }

          return mysql.createConnection(credentials).then(function(conn){
            const sql = `UPDATE Dog SET ${updateValues.slice(0, -2)} WHERE id = ${args.id};`;
            
            let result = conn.query(sql);
            conn.end();
            return result;
          }).then(function(){
            return mysql.createConnection(credentials).then(function(conn){
              const sql = `SELECT * FROM Dog WHERE id = ${savedQueryData}`;
              let result = conn.query(sql);
              conn.end();
              return result;
            }).then(function(rows){
              return rows[0];
            });
          });
        }
      },
    deleteDog: {
      type: DogType,
      args: { id: { type: GraphQLID}},
      resolve(parent, args)   {
          return mysql.createConnection(credentials).then(function(conn){
            const sql = `SELECT * FROM Dog WHERE id = ${args.id}`;
            savedQueryData = args.id;
            let result = conn.query(sql);
            conn.end();
            return result;
          }).then(function(res){
            savedPreDelete = res;
            return;
          }).then(function(){
            return mysql.createConnection(credentials).then(function(conn){
              const sql = `DELETE FROM Dog WHERE id = ${savedQueryData}`;
              let result = conn.query(sql);
              conn.end();
              return savedPreDelete[0];
          });
        });
      }
    },
        addHuman: {
          type: HumanType,
          args: {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            dogs_owned: { type: GraphQLID },
            ownsCats: { type: GraphQLBoolean },
            Veternarian: { type: GraphQLString },
            ageHumanYears: { type: GraphQLInt },
    },
    resolve(parent, args) {
      
      let refStr = `INSERT into Human (`;
      let valStr = `) 
      VALUES (`;
        for (const prop in args) {
          if (prop === 'id') {
            savedQueryData = args[prop];
          }
          refStr += `${prop}, `;
          if (!isNaN(parseFloat(args[prop]))) {
            valStr += `${args[prop]}, `;
          } else if (String(args[prop]) === 'true' || String(args[prop]) === 'false') {
            valStr += `${args[prop]}, `;
          } else {
            valStr += `'${args[prop]}', `;
          } 
        }
        refStr = refStr.slice(0, -2);
        valStr = valStr.slice(0, -2);
        valStr += `);`;
        refStr += valStr; 
      return mysql.createConnection(credentials).then(function(conn){
        let result = conn.query(refStr);
        conn.end();
        return result;
      }).then(function(){
        return mysql.createConnection(credentials).then(function(conn){
          const sql = `SELECT * FROM Human WHERE id = ${savedQueryData}`;
          let result = conn.query(sql);
          conn.end();
          return result;
        }).then(function(rows){
          return rows[0];
        });
      }); 
    }
    },
    updateHuman: {
        type: HumanType,
        args: {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            dogs_owned: { type: GraphQLID },
            ownsCats: { type: GraphQLBoolean },
            Veternarian: { type: GraphQLString },
            ageHumanYears: { type: GraphQLInt },
        },
        resolve(parent, args) {
          
          let updateValues = '';
            for (const prop in args) {
              if (prop === 'id') {
                savedQueryData = args[prop];
              }
              if (!isNaN(parseFloat(args[prop]))) {
                updateValues += `${prop} = ${args[prop]}, `;
              } else if (String(args[prop]) === 'true' || String(args[prop]) === 'false') {
                updateValues += `${prop} = ${args[prop]}, `;
              } else {
                updateValues += `${prop} = '${args[prop]}', `;
              } 
            }

          return mysql.createConnection(credentials).then(function(conn){
            const sql = `UPDATE Human SET ${updateValues.slice(0, -2)} WHERE id = ${args.id};`;
            
            let result = conn.query(sql);
            conn.end();
            return result;
          }).then(function(){
            return mysql.createConnection(credentials).then(function(conn){
              const sql = `SELECT * FROM Human WHERE id = ${savedQueryData}`;
              let result = conn.query(sql);
              conn.end();
              return result;
            }).then(function(rows){
              return rows[0];
            });
          });
        }
      },
    deleteHuman: {
      type: HumanType,
      args: { id: { type: GraphQLID}},
      resolve(parent, args)   {
          return mysql.createConnection(credentials).then(function(conn){
            const sql = `SELECT * FROM Human WHERE id = ${args.id}`;
            savedQueryData = args.id;
            let result = conn.query(sql);
            conn.end();
            return result;
          }).then(function(res){
            savedPreDelete = res;
            return;
          }).then(function(){
            return mysql.createConnection(credentials).then(function(conn){
              const sql = `DELETE FROM Human WHERE id = ${savedQueryData}`;
              let result = conn.query(sql);
              conn.end();
              return savedPreDelete[0];
          });
        });
      }
    },
  }})


    module.exports = new GraphQLSchema({
      query: RootQuery,
      mutation: Mutation
    });