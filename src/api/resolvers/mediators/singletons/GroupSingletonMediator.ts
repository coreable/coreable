import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";

import { GroupResolver } from "../../models/GroupResolver";

export const GroupSingletonMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'GroupSingletonMediator',
  description: 'GroupSingletonMediator',
  fields: () => {
    return {
      'group': {
        type: new GraphQLList(GroupResolver),
        resolve(result) {
          return result.group;
        }
      }
    }
  }
});