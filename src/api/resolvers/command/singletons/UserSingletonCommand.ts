import {
  GraphQLObjectType,
  GraphQLList
} from "graphql";

import { CoreableErrorResolver } from "../../models/CoreableErrorResolver";
import { UserSingletonMediator } from "../../mediators/singletons/UserSingletonMediator";

export const UserSingletonCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserSingletonCommand',
  description: 'UserSingletonCommand',
  fields: () => {
    return {
      'result': {
        type: UserSingletonMediator,
        resolve(value) {
          return value.result;
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
