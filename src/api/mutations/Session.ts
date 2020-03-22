import { GraphQLObjectType } from "graphql";

import { SessionResolver } from "../resolvers/Session";
import { UserResolver } from "../resolvers/User";

export const SessionMutation: GraphQLObjectType = new GraphQLObjectType({
  name: 'SessionMutation',
  description: 'Authentication',
  fields: () => {
    return {
      'session': {
        type: SessionResolver,
        resolve(auth) {
          return auth.session;
        }
      },
      'user': {
        type: UserResolver,
        resolve(auth) {
          return auth.user;
        }
      }
    }
  }
});