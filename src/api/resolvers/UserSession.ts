import { GraphQLObjectType } from "graphql";

import { SessionResolver } from "../resolvers/Session";
import { UserResolver } from "../resolvers/User";

export const UserSessionResolver: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserSessionReslver',
  description: 'Authentication, the union join of User and Session to return both JWT and user details',
  fields: () => {
    return {
      'session': {
        type: SessionResolver,
        resolve(userSession) {
          return userSession.session;
        }
      },
      'user': {
        type: UserResolver,
        resolve(userSession) {
          return userSession.user;
        }
      }
    }
  }
});