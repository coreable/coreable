import {
  GraphQLObjectType, 
  GraphQLList
} from "graphql";

import { CoreableErrorResolver } from "../../models/CoreableErrorResolver";
import { ReviewSingletonMediator } from "../../mediators/singletons/ReviewSingletonMediator";

export const ReviewSingletonCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'ReviewSingletonCommand',
  description: 'ReviewSingletonCommand',
  fields: () => {
    return {
      'result': {
        type: ReviewSingletonMediator,
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
