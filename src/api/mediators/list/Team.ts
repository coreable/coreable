import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";

import { TeamResolver } from "../../resolvers/Billing";

export const TeamListMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'TeamListMediator',
  description: 'TeamListMediator',
  fields: () => {
    return {
      'team': {
        type: new GraphQLList(TeamResolver),
        resolve(data) {
          return data.team;
        }
      }
    }
  }
});