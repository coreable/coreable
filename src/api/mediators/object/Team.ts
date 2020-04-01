import { 
  GraphQLObjectType
} from "graphql";

import { TeamResolver } from "../../resolvers/Team";

export const TeamObjectMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'TeamObjectMediator',
  description: 'TeamObjectMediator',
  fields: () => {
    return {
      'team': {
        type: TeamResolver,
        resolve(data) {
          return data.team;
        }
      }
    }
  }
});