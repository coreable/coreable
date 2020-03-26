import { 
  GraphQLObjectType,
  GraphQLList
} from "graphql";
import { CoreableErrorResolver } from "../../models/CoreableErrorResolver";

import { APISingletonMediator } from "../../mediators/singletons/APISingletonMediator";

export const APISingletonCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'APISingletonCommand',
  description: 'APISingletonCommand',
  fields: () => {
    return {
      'result': {
        type: APISingletonMediator,
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
