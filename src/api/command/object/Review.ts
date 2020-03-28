import {
  GraphQLObjectType, 
  GraphQLList
} from "graphql";
 
import { CoreableErrorResolver } from "../../resolvers/CorableError";
import { ReviewObjectMediator } from "../../mediators/object/Review";

export const ReviewObjectCommand: GraphQLObjectType = new GraphQLObjectType({
  name: 'ReviewObjectCommand',
  description: 'ReviewObjectCommand',
  fields: () => {
    return {
      'result': {
        type: ReviewObjectMediator,
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
