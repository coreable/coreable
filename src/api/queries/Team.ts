import {
  GraphQLInt
} from "graphql";

import { sequelize } from "../../lib/sequelize";

import { TeamSingletonCommand } from "../resolvers/command/singletons/TeamSingletonCommand";
import { CoreableError } from "../../models/CoreableError";

export default {
  type: TeamSingletonCommand,
  args: {
    groupID: {
      type: GraphQLInt,
    },
    userID: {
      type: GraphQLInt
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let team = await sequelize.models.Team.findAll({ where: args });
    return {
      'result': !errors.length ? {
        'team': team
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
};
