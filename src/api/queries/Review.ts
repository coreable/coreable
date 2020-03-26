import {
  GraphQLInt
} from "graphql";

import { sequelize } from "../../lib/sequelize";
import { ReviewSingletonCommand } from "../resolvers/command/singletons/ReviewSingletonCommand";
import { CoreableError } from "../../models/CoreableError";

export default {
  type: ReviewSingletonCommand,
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
  async resolve(root: any, args: any) {
    let errors: CoreableError[] = [];
    let review = await sequelize.models.Review.findAll({ where: args });
    return {
      'result': !errors.length ? {
        'review': review
      }: null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}
