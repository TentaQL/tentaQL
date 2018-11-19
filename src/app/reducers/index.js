import { SEARCH_UPDATE, ZIP_FILES, ZIP_CURRENT, CURRENT_SEARCH, CODEMIRROR_UPDATE, SAVE_DATA  } from '../actions/types';
const serverCreator = require("../boilerFunc/serverCreator");
const schemaCreator = require("../boilerFunc/schemaCreator");
const psqlAdapterCreator = require("../boilerFunc/psqlAdapterCreator");
const packageJSONCreator = require("../boilerFunc/packageJSONCreator");
const JSZip = require("jszip");
const FileSaver = require('file-saver');


export default function reducer(state = {}, action) {
    switch (action.type) {
      case SEARCH_UPDATE:
        return {
          ...state,
          search_url: action.payload,
        }
      case CURRENT_SEARCH:
        return {
          ...state,
          saved_url: state.search_url[0],
          search_url: "",
          originalSchema: "",
          currentSchema: "",
          resolvers: "",
          originalResolvers: "",
          currentResolvers: "",
          resolversLambda: "",
          codeMirrorLambda: "",
        }
      case SAVE_DATA:
      let lambda_resolvers = action.payload.resolvers.replace(/\n/g, "λ");
      lambda_resolvers = lambda_resolvers.replace(/\r\n/g, "λ");
      lambda_resolvers = lambda_resolvers.replace(/\r/g, "λ");
        return {
          ...state,
          originalSchema: action.payload.frontEnd,
          currentSchema: action.payload.frontEnd,
          originalResolvers: action.payload.resolvers,
          resolvers: action.payload.resolvers,
          currentResolvers: action.payload.resolvers,
          resolversLambda: lambda_resolvers,
          codeMirrorLambda: action.payload.frontEnd.replace(/\r\n/g, "λ")
        }
      case ZIP_FILES:
        var zip = new JSZip();
        let schema;
        let resolvers; 
        console.log("Zip payload:");
        console.log(action.payload);
        if (action.payload === "Updates"){
          schema = state.currentSchema;
          resolvers = state.currentResolvers;
        } else {
          schema = state.originalSchema;
          resolvers = state.originalResolvers
        };
        zip.folder("tentaQL").folder("client").folder("graphql").file("schema.js", schemaCreator());
        zip.folder("tentaQL").file("server.js", serverCreator());
        zip.folder("tentaQL").folder("client").folder("graphql").file("psqlAdapter.js", psqlAdapterCreator(state.saved_url));
        zip.folder("tentaQL").folder("client").folder("graphql").file("resolvers.js", resolvers);
        zip.folder("tentaQL").folder("client").folder("graphql").folder("schema").file("typeDefs.js", schema);
        zip.folder("tentaQL").file("package.json", packageJSONCreator());
        zip.generateAsync({type:"blob"}).then(function (blob) { 
            saveAs(blob, "TentaQL.zip");                          
        });
        return {
          ...state
        }
      case CODEMIRROR_UPDATE:
        let lambdaLess = action.payload[0].replace(/\\r\\n/g, "λ");
         lambdaLess = lambdaLess.replace(/λ/g, "\n");
         console.log(action.payload[1]);
         switch(action.payload[1]) {
           case "resolversTab":
              state.currentResolvers = lambdaLess;
              break;
           case "schemaTab":
              state.currentSchema = lambdaLess;
              break;
            default:
              break
         }

        return {
          ...state,
        };
      default:
        return state;
    }
  }

