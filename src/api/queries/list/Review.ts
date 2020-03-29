import { sequelize } from "../../../lib/sequelize";
import {
  GraphQLString
} from "graphql";

import { CoreableError } from "../../../models/CoreableError";
import { ReviewListCommand } from "../../command/list/Review";

export default {
  type: ReviewListCommand,
  args: {
    reviewID: {
      type: GraphQLString,
    },
    userID: {
      type: GraphQLString,
    },
    submittedByID: {
      type: GraphQLString,
    }
  },
  async resolve(root: any, args: any) {
    let errors: CoreableError[] = [];
    let review = await sequelize.models.Review.findAll({ where: args });
    return {
      'data': !errors.length ? {
        'review': review
      }: null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}

