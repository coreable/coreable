import {
  GraphQLObjectType, 
  GraphQLList
} from "graphql";
 
import { CoreableErrorResolver } from "../../resolvers/CorableError";
import { ReviewListMediator } from "../../mediators/list/Review";

export const ReviewListCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'ReviewListCommand',
  description: 'ReviewListCommand',
  fields: () => {
    return {
      'result': {
        type: ReviewListMediator,
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
