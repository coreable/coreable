import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";

import { UserResolver } from "../../models/UserResolver";
import { GroupResolver } from "../../models/GroupResolver";
 
export const UserGroupCompositeMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserGroupCompositeMediator',
  description: 'UserGroupUserGroupCompositeMediatorComposite',
  fields: () => {
    return {
      'user': {
        type: UserResolver,
        resolve(result) {
          return result.user;
        }
      },
      'group': {
        type: GroupResolver,
        resolve(result) {
          return result.group;
        }
      }
    }
  }
});
