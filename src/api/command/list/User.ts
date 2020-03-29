import {
  GraphQLObjectType,
  GraphQLList
} from "graphql";

import { CoreableErrorResolver } from "../../resolvers/CorableError";
import { UserListMediator } from "../../mediators/list/User";

export const UserListCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserListCommand',
  description: 'UserListCommand',
  fields: () => {
    return {
      'data': {
        type: UserListMediator,
        resolve(value) {
          return value.data;
        }
      },
      'errors': {
        type: new GraphQLList(CoreableErrorResolver),
        resolve(value) {
          return value.errors;
        }
      }
    }
  }
});