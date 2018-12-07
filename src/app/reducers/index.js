
import {
  SEARCH_UPDATE,
  ZIP_FILES,
  CURRENT_SEARCH,
  CODEMIRROR_UPDATE,
  SAVE_DATA,
  RESET_TAB,
  RESET_ALL,
  SWITCH_TAB
} from "../actions/types";

const serverCreator = require("../boilerFunc/serverCreator");
const mongo_serverCreator = require("../boilerFunc/mongo_serverCreator");
const mongoPackageJsonCreator = require("../boilerFunc/mongoPackageJSONCreator");
const mysql_serverCreator = require("../boilerFunc/mysql_serverCreator");
const mysqlPackageJSONCreator = require("../boilerFunc/mysql_packageJSONCreator");
const schemaCreator = require("../boilerFunc/schemaCreator");
const psqlAdapterCreator = require("../boilerFunc/psqlAdapterCreator");
const packageJSONCreator = require("../boilerFunc/packageJSONCreator");
const JSZip = require("jszip");

const FileSaver = require("file-saver");

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SEARCH_UPDATE:
      return {
        ...state,
        search_url: action.payload
      };
    case CURRENT_SEARCH:
      let saved_url = state.search_url;
      if (action.payload == "demo_database_pg") {
        saved_url = "postgres://tbpsxkue:TBTE6vwArK31H7dVlizemHoMn9LP_TWC@baasu.db.elephantsql.com:5432/tbpsxkue";
      } else if (action.payload == "demo_database_mongo"){
        saved_url = "mongodb://admin1:admin1@ds055485.mlab.com:55485/datacenter";
      }
      console.log("Saved_url: ", saved_url);
      return {
        ...state,
        saved_url: saved_url,
        search_url: "",
        originalSchema: "",
        currentSchema: "",
        currentTab: "schema",
        currentTabText: "",
        resolvers: "",
        originalResolvers: "",
        currentResolvers: "",
        resolversLambda: "",
        schemaLambda: "",
        hiddenButtons: "",
      };
    case SAVE_DATA:
      // Toggles Class (aka, hides) Codemirror Tabs/Buttons if using Mongo or MySQL
      if (state.saved_url.includes("mongodb://")){
        state.hiddenButtons = "hideBtn";
        state.originalSchema = action.payload;
        state.currentSchema = action.payload;
        state.originalResolvers = action.payload;
        state.resolvers = action.payload;
        state.currentTabText = action.payload.replace(/\n/g, "λ");
        state.currentResolvers = action.payload;
        state.resolversLambda = action.payload.replace(/\n/g, "λ");
        state.schemaLambda = action.payload.replace(/\n/g, "λ");
      } else if (state.saved_url.includes("mysql://")) {
        state.hiddenButtons = "hideBtn";
        state.originalSchema = action.payload;
        state.currentSchema = action.payload;
        state.originalResolvers = action.payload;
        state.resolvers = action.payload;
        state.currentTabText = action.payload.replace(/\n/g, "λ");
        state.currentResolvers = action.payload;
        state.resolversLambda = action.payload.replace(/\n/g, "λ");
        state.schemaLambda = action.payload.replace(/\n/g, "λ");
      } else {
        state.hiddenButtons = "showBtn"
        state.originalSchema = action.payload.frontEnd;
        state.currentSchema = action.payload.frontEnd;
        state.originalResolvers = action.payload.resolvers;
        state.resolvers = action.payload.resolvers;
        state.currentTabText = action.payload.frontEnd.replace(/\n/g, "λ");
        state.currentResolvers = action.payload.resolvers;
        state.resolversLambda = action.payload.resolvers.replace(/\n/g, "λ");
        state.schemaLambda = action.payload.frontEnd.replace(/\n/g, "λ")
      }
      return {
        ...state,
      };
    case ZIP_FILES:
      console.log("Triggered ZIP_FILES");
      var zip = new JSZip();
      if (state.saved_url.includes("mongodb://")){
        console.log("Triggered MongoDownload");
        let fullText;
        if (action.payload === "Updates") {
          fullText = state.currentSchema;
        } else {
          fullText = state.originalSchema;
        }
        let splitArr = fullText.split(`/*****************************************************************************************************************************************************`);
        console.log("SplitArr.length:\n", splitArr.length);
        for (let i = 0; i < splitArr.length; i++) {
          console.log(splitArr[i]);
          console.log("\n\nNext Piece\n\n");
        }
      zip
        .folder("tentaQL")
        .folder("server")
        .file("index.js", mongo_serverCreator(state.saved_url));
      zip
        .folder("tentaQL")
        .file("package.json", mongoPackageJsonCreator());
      zip
        .folder("tentaQL")
        .folder("graphql-schema")
        .file("index.js", splitArr[0])
      zip
        .folder("tentaQL")
        .file("README.md", readmeCreator("MongoDB", state.saved_url));
      let i = 2; 
      while (i < splitArr.length - 2){
        var regex = /[^\n\s]+(?=\.js)/;
        var found = splitArr[i].match(regex);
        let pathName = `${found[0]}.js`;
        zip
          .folder("tentaQL")
          .folder("server")
          .folder("db")
          .file(pathName, splitArr[i])
        i++;
      }
      zip.generateAsync({ type: "blob" }).then(function(blob) {
        saveAs(blob, "TentaQL_mongo.zip");
      });
      } else if (state.saved_url.includes("mysql://")) {
        console.log("Triggered mySQL Database Zip");
        let fullText;
        if (action.payload === "Updates") {
          fullText = state.currentSchema;
        } else {
          fullText = state.originalSchema;
        }
      zip
        .folder("tentaQL")
        .file("index.js", mysql_serverCreator(state.saved_url));
      zip
        .folder("tentaQL")
        .file("package.json", mysqlPackageJSONCreator());
      zip
        .folder("tentaQL")
        .folder("graphql-schema")
        .file("index.js", fullText);
      zip
        .folder("tentaQL")
        .file("README.md", readmeCreator("MySQL", state.saved_url));

      zip.generateAsync({ type: "blob" }).then(function(blob) {
        saveAs(blob, `TentaQL_mysql.zip`);
      });
      } else {
          let schema;
          let resolvers;
          console.log("Zip payload:");
          console.log(action.payload);
          if (action.payload === "Updates") {
            schema = state.currentSchema;
            resolvers = state.currentResolvers;
          } else {
            schema = state.originalSchema;
            resolvers = state.originalResolvers;
          }

          zip
            .folder("tentaQL")
            .folder("client")
            .folder("graphql")
            .file("schema.js", schemaCreator());
          zip.folder("tentaQL").file("server.js", serverCreator());
          zip
            .folder("tentaQL")
            .folder("client")
            .folder("graphql")
            .file("psqlAdapter.js", psqlAdapterCreator(state.saved_url));

          zip
            .folder("tentaQL")
            .folder("client")
            .folder("graphql")
            .folder("resolvers")
            .file("resolvers.js", resolvers);

          zip
            .folder("tentaQL")
            .folder("client")
            .folder("graphql")
            .folder("schema")
            .file("typeDefs.js", schema);
          zip
            .folder("tentaQL")
            .file("README.md", readmeCreator("Postgres", state.saved_url));
          zip.folder("tentaQL").file("package.json", packageJSONCreator());
          zip.generateAsync({ type: "blob" }).then(function(blob) {
            saveAs(blob, `TentaQL_postgres.zip`);
          });
        }

      return {
        ...state
      };
    case CODEMIRROR_UPDATE:
      let lambdaLess = action.payload[0].replace(/\\r\\n/g, "λ");
      lambdaLess = lambdaLess.replace(/λ/g, "\n");
      state.currentTabText = action.payload[0];
      console.log(action.payload[1]);
      switch (state.currentTab) {
        case "resolvers":
          state.currentResolvers = lambdaLess;
          break;
        case "schema":
          state.currentSchema = lambdaLess;
          
          break;
        default:
          break;
      }

      return {
        ...state
      };
    case SWITCH_TAB:
      switch (action.payload) {
        case "resolversTabButton":
          state.schemaLambda = state.currentTabText;
          state.currentTab = "resolvers";
          state.currentTabText = state.resolversLambda;
          break;
        case "schemaTabButton":
          state.resolversLambda = state.currentTabText;
          state.currentTab = "schema";
          state.currentTabText = state.schemaLambda;
          break;
        default:
          break;
      }
      return {
        ...state
      };
    case RESET_TAB:
      switch (state.currentTab) {
        case "resolvers":
          let origResolvers = state.originalResolvers.replace(/\n/g, "λ");
          state.currentTabText = origResolvers;
          state.resolversLambda = origResolvers;
          break;
        case "schema":
          let origSchema = state.originalSchema.replace(/\n/g, "λ");
          state.schemaLambda = origSchema;
          state.currentTabText = origSchema;
          break;
        default:
          break;
      }

      return {
        ...state
      };
    case RESET_ALL:
      let origSchema = state.originalSchema.replace(/\n/g, "λ");
      let origResolvers = state.originalResolvers.replace(/\n/g, "λ");
      state.schemaLambda = origSchema;
      state.resolversLambda = origResolvers;
      switch (state.currentTab) {
        case "resolvers":
          state.currentTabText = state.resolversLambda;
          break;
        case "schema":
          state.currentTabText = state.schemaLambda;
          break;
        default:
          break;
      }

      return {
        ...state
      };
    default:
      return state;
  }
}
