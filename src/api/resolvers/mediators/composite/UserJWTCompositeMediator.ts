import { 
  GraphQLObjectType
} from "graphql";

import { JsonWebTokenResolver } from "../../models/JsonWebTokenResolver";
import { AuthenticationResolver } from "../../models/AuthenticationResolver";

export const UserJWTCompositeMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserJWTCompositeMediator',
  description: 'UserJWTCompositeMediator',
  fields: () => {
    return {
      'user': {
        type: AuthenticationResolver,
        resolve(UserSession) {
          return UserSession.user;
        }
      },
      'session': {
        type: JsonWebTokenResolver,
        resolve(UserSession) {
          return UserSession.session;
        }
      }
    }
  }
});
