import { SEARCH_UPDATE, ZIP_FILES, ZIP_CURRENT, CURRENT_SEARCH, CODEMIRROR_UPDATE, SAVE_DATA, RESET_TAB, RESET_ALL } from '../actions/types';
const serverCreator = require("../boilerFunc/serverCreator");
const schemaCreator = require("../boilerFunc/schemaCreator");
const JSZip = require("jszip");
const FileSaver = require('file-saver');
const store = require('../store')


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
        return {
          ...state,
          originalSchema: action.payload.frontEnd,
          currentSchema: action.payload.frontEnd,
          originalResolvers: action.payload.resolvers,
          resolvers: action.payload.resolvers,
          currentResolvers: action.payload.resolvers,
          resolversLambda: action.payload.resolvers.replace(/\n/g, "λ"),
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
        zip.folder("tentaQL").file("server.js", serverCreator(state.saved_url));
        zip.folder("tentaQL").folder("client").folder("graphql").file("resolvers.js", resolvers);
        zip.folder("tentaQL").folder("client").folder("graphql").file("schema.graphql", schema);

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
        case RESET_ALL: 
        // Reset all not working -- currently only works for single tab
          state.codeMirrorLambda += " ";
          state.resolversLambda += " ";
          return {
            ...state
          };
        case RESET_TAB: 
          state.codeMirrorLambda += " ";
          state.resolversLambda += " ";
            return {
              ...state
            };
      default:
        return state;
    }
  }

