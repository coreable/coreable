import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";

import { UserResolver } from "../../models/UserResolver";

export const UserSingletonMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserSingletonMediator',
  description: 'UserSingletonMediator',
  fields: () => {
    return {
      'user': {
        type: new GraphQLList(UserResolver),
        resolve(result) {
          return result.user;
        }
      }
    }
  }
});
