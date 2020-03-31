import { sequelize } from "../../../lib/sequelize";
import {
  GraphQLString, GraphQLInt
} from "graphql";

import { CoreableError } from "../../../models/CoreableError";
import { TeamListCommand } from "../../command/list/Team";
import { Subject } from "../../../models/Subject";

export default {
  type: TeamListCommand,
  args: {
    teamID: {
      type: GraphQLString,
    },
    teamName: {
      type: GraphQLString
    },
    limit: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let team: any;
    let limit = args.limit;
    let offset = args.offset;
    delete args.offset;
    delete args.limit;
    if (!context.USER) {
      errors.push({ code: 'ER_UNAUTH', message: 'User unauthenticated', path: 'JWT' });
    }
    if (!errors.length) {
      if (!args.teamID && !args.teamName) {
        errors.push({ code: 'ER_ARGS', message: 'a teamId or a teamName must be passed as arguments', path: 'args' });
      }
    }
    if (!errors.length) {
      team = await sequelize.models.Team.findAll({ where: args, include: [{ model: Subject }], limit: limit, offset: offset });
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