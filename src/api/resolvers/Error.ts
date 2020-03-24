import { GraphQLObjectType, GraphQLString } from "graphql";

export const ErrorResolver: GraphQLObjectType = new GraphQLObjectType({
  name: 'ErrorResolver',
  description: 'Error',
  fields: () => {
    return {
      'message': {
        type: GraphQLString,
        resolve(error) {
          return error.message;
        }
      },
      'path': {
        type: GraphQLString,
        resolve(error) {
          return error.path
        }
      },
      'code': {
        type: GraphQLString,
        resolve(error) {
          return error.code;
        }
      }
    }
  }
});
