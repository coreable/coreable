import { 
  GraphQLObjectType, 
  GraphQLList
} from "graphql";

import { ReviewResolver } from "../../resolvers/Review";

export const ReviewListMediator: GraphQLObjectType = new GraphQLObjectType({
  name: 'ReviewListMediator',
  description: 'ReviewListMediator',
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
