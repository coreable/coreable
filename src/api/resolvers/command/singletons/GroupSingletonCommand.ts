import { 
  GraphQLObjectType,
  GraphQLList
} from "graphql";

import { CoreableErrorResolver } from "../../models/CoreableErrorResolver";
import { GroupSingletonMediator } from "../../mediators/singletons/GroupSingletonMediator";

export const GroupSingletonCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'GroupSingletonCommand',
  description: 'GroupSingletonCommand',
  fields: () => {
    return {
      'result': {
        type: GroupSingletonMediator,
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