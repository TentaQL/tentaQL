
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
      return {
        ...state,
        saved_url: state.search_url,
        search_url: "",
        originalSchema: "",
        currentSchema: "",
        currentTab: "schema",
        currentTabText: "",
        resolvers: "",
        originalResolvers: "",
        currentResolvers: "",
        resolversLambda: "",
        schemaLambda: ""
      };
    case SAVE_DATA:
      return {
        ...state,
        originalSchema: action.payload.frontEnd,
        currentSchema: action.payload.frontEnd,
        originalResolvers: action.payload.resolvers,
        resolvers: action.payload.resolvers,
        currentTabText: action.payload.frontEnd.replace(/\n/g, "λ"),
        currentResolvers: action.payload.resolvers,
        resolversLambda: action.payload.resolvers.replace(/\n/g, "λ"),
        schemaLambda: action.payload.frontEnd.replace(/\n/g, "λ")
      };
    case ZIP_FILES:
      var zip = new JSZip();
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
      zip.folder("tentaQL").file("package.json", packageJSONCreator());
      zip.generateAsync({ type: "blob" }).then(function(blob) {
        saveAs(blob, "TentaQL.zip");
      });


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
