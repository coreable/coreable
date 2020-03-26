import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { CoreableErrorResolver } from "../../models/CoreableErrorResolver";

import { IndustrySingletonMediator } from "../../mediators/singletons/IndustrySingletonMediator";

export const IndustrySingletonCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'IndustrySingletonCommand',
  description: 'IndustrySingletonCommand',
  fields: () => {
    return {
      'result': {
        type: IndustrySingletonMediator,
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
