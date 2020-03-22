import { GraphQLList, GraphQLInt, GraphQLString } from "graphql";
import { sequelize } from "../../sequelize";
import { ReviewResolver } from "../resolvers/Review";

export default {
  type: new GraphQLList(ReviewResolver),
  args: {
    reviewID: {
      type: GraphQLInt,
    },
    subjectID: {
      type: GraphQLInt,
    },
    completedByID: {
      type: GraphQLInt,
    }
  },
  resolve(root: any, args: any) {
    return sequelize.models.Review.findAll({ where: args });
  }
}
