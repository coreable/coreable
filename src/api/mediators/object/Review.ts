import { 
  GraphQLObjectType
} from "graphql";

import { ReviewResolver } from "../../resolvers/Review";

export const ReviewObjectMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'ReviewObjectMediator',
  description: 'ReviewObjectMediator',
  fields: () => {
    return {
      'review': {
        type: ReviewResolver,
        resolve(result) {
          return result.review;
        }
      }
    }
  }
});

 