import { sequelize } from "../../lib/sequelize";
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from "graphql";

import { CoreableError } from "../../models/CoreableError";
import { UserObjectCommand } from "../command/object/User";

export default {
  type: UserObjectCommand,
  args: {
    teamID: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    // let user: any;
    // let userTeams: any;
    let targetTeam: any;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
    }
    // if (!errors.length) {
    //   user = context.USER;
    //   userTeams = await context.USER.getTeams();
    // }
    if (!errors.length) {
      targetTeam = await sequelize.models.Team.findOne({ where: { teamID: args.teamID }});
      if (!targetTeam) {
        errors.push({ code: 'ER_TEAM_UNKNOWN', message: `Unable to locate team with teamID ${args.teamID}`, path: 'teamID' });
      }
    }
    if (!errors.length) {
      let isInGroup = false;
      for (const userTeam of context.USER.Teams) {
        if (userTeam.teamID === targetTeam.teamID) {
          isInGroup = true;
          break;
        }
      }
      if (!isInGroup) {
        errors.push({ code: 'ER_USER_NOT_IN_TEAM', message: `User with userID ${context.USER.userID} is not in team with teamID ${targetTeam.teamID}`, path: 'teamID' });
      }
    }
    if (!errors.length) {
      try {
        await context.USER.removeTeam(targetTeam);
      } catch (err) {
        errors.push({ code: err.original.code, message: err.original.sqlMessage, path: 'SQL' });
      }
    }
    return {
      'data': !errors.length ? {
        'user': await sequelize.models.User.findOne({ where: { userID: context.USER.userID } }),
      } : null,
      'errors': errors.length > 0 ? errors : null
    };
  }
}