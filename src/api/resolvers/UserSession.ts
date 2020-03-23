import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";

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
        type: new GraphQLObjectType({
          name: 'UserAuth',
          description: 'Accessible after authentication',
          fields: () => {
            return {
              'userID': {
                type: GraphQLInt,
                resolve(user, args, context) {
                  return user.userID;
                }
              },
              'email': {
                type: GraphQLString,
                resolve(user, args, context) {
                  return user.email
                }
              }
            }
          }
        }),
        resolve(userSession) {
          return userSession.user;
        }
      }
    }
  }
});