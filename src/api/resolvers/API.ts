import { GraphQLObjectType, GraphQLString } from "graphql";

export const APIResolver: GraphQLObjectType = new GraphQLObjectType({
  name: 'APIResolver',
  description: 'API',
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
