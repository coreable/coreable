import { 
  GraphQLObjectType,
  GraphQLList
} from "graphql";

import { CoreableErrorResolver } from "../resolvers/CorableError";
import { MeMediator } from "../mediators/Me";

export const MeCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'MeCommand',
  description: 'MeCommand',
  fields: () => {
    return {
      'data': {
        type: MeMediator,
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