import {
  GraphQLObjectType,
  GraphQLList
} from "graphql";

import { CoreableErrorResolver } from "../../resolvers/CorableError";
import { TeamObjectMediator } from "../../mediators/object/Team";

export const TeamObjectCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'TeamObjectCommand',
  description: 'TeamObjectCommand',
  fields: () => {
    return {
      'data': {
        type: TeamObjectMediator,
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