import { 
  GraphQLObjectType, GraphQLString
} from "graphql";
import { SessionResolver } from "../../resolvers/Session";

export const SessionObjectMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'SessionObjectMediator',
  description: 'SessionObjectMediator',
  fields: () => {
    return {
      'user': {
        type: SessionResolver,
        resolve(UserSession) {
          return UserSession.user;
        }
      },
      'token': {
        type: GraphQLString,
        resolve(UserSession) {
          return UserSession.token;
        }
      }
    }
  }
});

