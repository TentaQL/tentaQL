const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GenerateSchema = require('generate-schema');
const fs = require('fs');
const {
  mongoParser,
} = require("../functions/typesCreatorMongo");

const controllerMongo = {};

// const url = "mongodb://toeshoe:123abc@ds145093.mlab.com:45093/toeshoe";
// const url ="mongodb://tentaql1:tentaql1@ds045684.mlab.com:45684/tentaql"
// const url ="mongodb://admin1:admin1@ds055485.mlab.com:55485/datacenter"
controllerMongo.getDatabase = (req, res, next) => {
  let schemasArr = [[], []];
  let url = req.query.url;
  let dbConn = mongoose.createConnection(
    url,
    { useNewUrlParser: true },
    (err) => {
      if (err){
        res.send(JSON.stringify(err));
        res.header(500);
        res.send({
          ConnectionError: 'Could not connect to Mongo'
        });
        return;
      }
    }
  );
  // Begins the search through the dB on connection
  dbConn.on("open", () => {
    // Fetches all collections
    const coll = dbConn.db.listCollections().toArray();
    let promArr = [];
    let respArr = [];

    coll.then(
      (collections) => {
        const modelArr = [];
        
        for (let i = 0; i < collections.length; i++) {
          let model;
          let builtInColls = {
            "system.indexes": true, 
            "objectlabs-system": true,
            "objectlabs-system.admin.collections": true
          }
          if (builtInColls[collections[i].name] !== undefined) {
            continue; 
          }
          
          schemasArr[0].push([collections[i].name]);
          model = dbConn.model(collections[i].name, new Schema({}), collections[i].name);
          modelArr.push(model);


          promArr.push(new Promise((resolve, reject) => {
            model.find({}, (err, response) => {
              respArr.push({
                collectionName : collections[i].name,
                response : response,
              });
              resolve(console.log('Promise resolved.'));
            });
          }));
        }

      Promise.all(promArr)
        .then(() => {
          for (let i = 0; i < respArr.length; i++){
             let collSchema = GenerateSchema.mongoose(respArr[i].response[0]);
             schemasArr[1].push(collSchema["_doc"]);
            }
            dbConn.close((err) => {
              if (err) {console.warn(err)}
              else { console.log('Closed Mongo Connection'); }
            });
        let filteredCache = {};
        schemasArr[0].forEach(collName => {
          filteredCache[collName] = {
            typeDefs: []
          }
        })

        let collectionsNum = Object.keys(filteredCache);
        for (let i = 0; i < collectionsNum.length; i++) {
          filteredCache[collectionsNum[i]].typeDefs = Object.entries(schemasArr[1][i]).filter(type => {
            if (type[0] !== "_id" && type[0] !== "__v" && type[1].type == "ObjectId") {
              let namedRef = type[0];
              // Looping through the Collection looking for first instance of the linked Ref
              for (let j = 0; j < respArr[i].response.length; j++) {
                let collPre = respArr[i].response[j]["_doc"];
                let schemaKeys = Object.keys(collPre);
                if (schemaKeys.includes(namedRef)) {
                  if (Array.isArray(collPre[namedRef])) {
                    type[1].type = "Arr_ObjId";
                    break;
                  } else {
                    type[1].type = "Single_ObjId";
                    break;
                  }
                }
                

              }
            }
            return type[0] !== "_id" && type[0] !== "__v"
          })
        }
         res.end(JSON.stringify(mongoParser(filteredCache)));

        })
        .catch(err => {
          console.log(err);
        })
      }
    )
      .catch(err => console.log("Error During Mongo Schema Conversion", err));
  });
};

module.exports = controllerMongo;