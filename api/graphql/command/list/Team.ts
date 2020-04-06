import {
  GraphQLObjectType,
  GraphQLList
} from "graphql";

import { CoreableErrorResolver } from "../../resolvers/CorableError";
import { TeamListMediator } from "../../mediators/list/Team";

export const TeamListCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'TeamListCommand',
  description: 'TeamListCommand',
  fields: () => {
    return {
      'data': {
        type: TeamListMediator,
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