import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";

import { APIResolver } from "../resolvers/API"

export const APIMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'APIMediator',
  description: 'APIMediator',
  fields: () => {
    return {
      'API': {
        type: APIResolver,
        resolve(data) {
          return data.API;
        }
      }
    }
  }
});
