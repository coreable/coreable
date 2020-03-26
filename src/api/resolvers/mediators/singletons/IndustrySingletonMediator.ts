import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";

import { IndustryResolver } from "../../models/IndustryResolver";

export const IndustrySingletonMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'IndustrySingletonMediator',
  description: 'IndustrySingletonMediator',
  fields: () => {
    return {
      'industry': {
        type: new GraphQLList(IndustryResolver),
        resolve(result) {
          return result.industry;
        }
      }
    }
  }
});