import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";
import { UserResolver } from "../../resolvers/User";

export const UserListMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserListMediator',
  description: 'UserListMediator',
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