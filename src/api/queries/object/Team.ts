import { sequelize } from "../../../lib/sequelize";
import {
  GraphQLString
} from "graphql";

import { TeamObjectCommand } from "../../command/object/Team";
import { CoreableError } from "../../../models/CoreableError";

export default {
  type: TeamObjectCommand,
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
    let team = await sequelize.models.Team.findOne({ where: args });
    return {
      'result': !errors.length ? {
        'team': team
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
};
