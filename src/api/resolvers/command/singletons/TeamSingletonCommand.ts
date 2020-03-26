import { 
  GraphQLObjectType,
  GraphQLList
} from "graphql";

import { CoreableErrorResolver } from "../../models/CoreableErrorResolver";
import { TeamSingletonMediator } from "../../mediators/singletons/TeamSingletonMediator";

export const TeamSingletonCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'TeamSingletonCommand',
  description: 'TeamSingletonCommand',
  fields: () => {
    return {
      'result': {
        type: TeamSingletonMediator,
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