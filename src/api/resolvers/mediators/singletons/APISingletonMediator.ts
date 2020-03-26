import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";

import { APIResolver } from "../../models/APIResolver";

export const APISingletonMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'APISingletonMediator',
  description: 'APISingletonMediator',
  fields: () => {
    return {
      'API': {
        type: APIResolver,
        resolve(result) {
          return result.API;
        }
      }
    }
  }
});