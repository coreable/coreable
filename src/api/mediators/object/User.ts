import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";
import { UserResolver } from "../../resolvers/User";

export const UserObjectMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserObjectMediator',
  description: 'UserObjectMediator',
  fields: () => {
    return {
      'user': {
        type: UserResolver,
        resolve(result) {
          return result.user;
        }
      }
    }
  }
});
