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
      'data': {
        type: ReviewObjectMediator,
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
