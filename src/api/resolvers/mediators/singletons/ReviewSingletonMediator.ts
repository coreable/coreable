import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";

import { ReviewResolver } from "../../models/ReviewResolver";

export const ReviewSingletonMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'ReviewSingletonMediator',
  description: 'ReviewSingletonMediator',
  fields: () => {
    return {
      'review': {
        type: new GraphQLList(ReviewResolver),
        resolve(result) {
          return result.review;
        }
      }
    }
  }
});
