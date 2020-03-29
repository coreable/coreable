import {
  GraphQLObjectType,
  GraphQLList
} from "graphql";

import { CoreableErrorResolver } from "../../resolvers/CorableError";
import { SessionObjectMediator } from "../../mediators/object/Session";
 
export const SessionObjectCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'SessionObjectCommand',
  description: 'SessionObjectCommand',
  fields: () => {
    return {
      'data': {
        type: SessionObjectMediator,
        resolve(value) {
          return value.data;
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