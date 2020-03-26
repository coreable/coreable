import { GraphQLObjectType, GraphQLString } from "graphql";

export const APIResolver: GraphQLObjectType = new GraphQLObjectType({
  name: 'APIResolver',
  description: 'API Resolver to test server status',
  fields: () => {
    return {
      'time': {
        type: GraphQLString,
        resolve(API) {
          return API.time;
        }
      },
      'mode': {
        type: GraphQLString,
        resolve(API) {
          return API.mode
        }
      }
    }
  }
});
