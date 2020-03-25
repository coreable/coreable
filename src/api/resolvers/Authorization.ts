import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import { JsonWebTokenResolver } from "./JsonWebToken";

export const AuthorizationResolver: GraphQLObjectType = new GraphQLObjectType({
  name: 'AuthorizationResolver',
  description: 'Authorization, the union join of User and JsonWebToken',
  fields: () => {
    return {
      'session': {
        type: JsonWebTokenResolver,
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
              },
              'firstName': {
                type: GraphQLString,
                resolve(user, args, context) {
                  return user.firstName;
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