import { sequelize } from "../../../lib/sequelize";
import {
  GraphQLString
} from "graphql";

import { TeamObjectCommand } from "../../command/object/Team";
import { CoreableError } from "../../../models/CoreableError";
import { Subject } from "../../../models/Subject";

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
    let team: any;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', message: 'User unauthenticated', path: 'JWT' });
    }
    if (!errors.length) {
      if (!args.teamID && !args.teamName) {
        errors.push({ code: 'ER_ARGS', message: 'a teamId or a teamName must be passed as arguments', path: 'args' });
      }
    }
    if (!errors.length) {
      team = await sequelize.models.Team.findOne({ where: args, include: [{ model: Subject }] });
      if (!team) {
        errors.push({ code: 'ER_TEAM_UNKNOWN', message: `Unable to find a team with args ${args}`, path: 'args' });
      }
    }
    return {
      'data': !errors.length ? {
        'team': team
      } : null,
      'errors': errors.length > 0 ? errors : null
    }
  }
};
