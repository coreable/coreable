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
    _id: {
      type: GraphQLString,
    },
    name: {
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
      if (!args._id && !args.name) {
        errors.push({ code: 'ER_ARGS', message: 'a Team _id or a name must be passed as arguments', path: 'args' });
      }
    }
    if (!errors.length) {
      team = await sequelize.models.Team.findOne({ where: args, include: [{ model: Subject, as: 'subjects' }] });
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
