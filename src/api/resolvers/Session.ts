import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";

export const SessionResolver = new GraphQLObjectType({
  name: 'Session',
  description: 'Accessible after authentication',
  fields: () => {
    return {
      'userID': {
        type: GraphQLString,
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