import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";

export const AuthenticationResolver = new GraphQLObjectType({
  name: 'Authentication',
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
});