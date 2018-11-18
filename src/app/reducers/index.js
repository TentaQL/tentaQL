import { SEARCH_UPDATE } from '../actions/types';
import { CURRENT_SEARCH } from '../actions/types';
import { CODEMIRROR_UPDATE } from '../actions/types';
import { SAVE_DATA } from '../actions/types';

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
          codeMirrorLambda: "",
        }
      case SAVE_DATA:
        return {
          ...state,
          originalSchema: action.payload.frontEnd,
          currentSchema: action.payload.frontEnd,
          resolvers: action.payload.resolvers,
          codeMirrorLambda: action.payload.frontEnd.replace(/\r\n/g, "λ")
        }
      case CODEMIRROR_UPDATE:
        let lambda = action.payload;
        let lambdaLess = lambda.replace(/\\r\\n/g, "λ");
 		    lambdaLess = lambdaLess.replace(/λ/g, "\n");
        return {
          ...state,
          codeMirrorLambda: lambda,
          currentSchema: lambdaLess,
        };
      default:
        return state;
    }
  }

