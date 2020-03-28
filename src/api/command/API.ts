import { 
  GraphQLObjectType,
  GraphQLList
} from "graphql";

import { APIMediator } from "../mediators/API";
import { CoreableErrorResolver } from "../resolvers/CorableError";

export const APICommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'APICommand',
  description: 'APICommand',
  fields: () => {
    return {
      'result': {
        type: APIMediator,
        resolve(value) {
          return value.result;
        }
      },
      'errors': {
        type: new GraphQLList(CoreableErrorResolver),
        resolve(value) {
          return value.errors;
        }
      }
    }
  }
});