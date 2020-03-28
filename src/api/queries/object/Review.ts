import {
  GraphQLString
} from "graphql";

import { sequelize } from "../../../lib/sequelize";
import { CoreableError } from "../../../models/CoreableError";
import { ReviewObjectCommand } from "../../command/object/Review";

export default {
  type: ReviewObjectCommand,
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
      'result': !errors.length ? {
        'review': review
      }: null,
      'errors': errors.length > 0 ? errors : null
    }
  }
}