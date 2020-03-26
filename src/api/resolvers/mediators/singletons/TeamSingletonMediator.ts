import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";

import { TeamResolver } from "../../models/TeamResolver";

export const TeamSingletonMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'TeamSingletonMediator',
  description: 'TeamSingletonMediator',
  fields: () => {
    return {
      'team': {
        type: new GraphQLList(TeamResolver),
        resolve(result) {
          return result.team;
        }
      }
    }
  }
});