import { sequelize } from "../../../lib/sequelize";
import {
  GraphQLString
} from "graphql";

import { CoreableError } from "../../../models/CoreableError";
import { TeamListCommand } from "../../command/list/Team";

export default {
  type: TeamListCommand,
  args: {
    teamID: {
      type: GraphQLString,
    },
    teamName: {
      type: GraphQLString
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let team = await sequelize.models.Team.findAll({ where: args });
    return {
      'data': !errors.length ? {
        'team': team
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
};