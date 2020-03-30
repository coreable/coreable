import { sequelize } from "../../lib/sequelize";
import {
  GraphQLNonNull,
  GraphQLString,
} from "graphql";

import { CoreableError } from "../../models/CoreableError";

import { Team } from "../../models/Team";
import { UserObjectCommand } from "../command/object/User";

export default {
  type: UserObjectCommand,
  args: {
    inviteCode: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(root: any, args: any, context: any) {
    let errors: CoreableError[] = [];
    let user: any;
    let userTeams: any;
    let targetTeam: any;
    if (!context.USER) {
      errors.push({ code: 'ER_AUTH_FAILURE', path: 'JWT', message: 'User unauthenticated' });
    }
    if (!errors.length) {
      user = context.USER;
      userTeams = await user.getTeams();
    }
    if (!errors.length) {
      targetTeam = await sequelize.models.Team.findOne({ where: { 'inviteCode': args.inviteCode } });
      if (!targetTeam) {
        errors.push({ code: 'ER_TEAM_UNKNOWN', message: `Unable to locate team with inviteCode ${args.inviteCode}`, path: 'inviteCode' });
      }
    }
    if (!errors.length) {
      for (const userTeam of userTeams) {
        if (userTeam.teamID === targetTeam.teamID) {
          errors.push({ code: 'ER_USER_IN_TEAM', message: `User with userID ${user.userID} is already in team with teamID ${targetTeam.teamID}`, path: 'userID' });
          break;
        }
      }
    }
    if (!errors.length) {
      try {
        await user.addTeam(targetTeam);
      } catch (err) {
        console.log(err);
        errors.push({ 'code': err.original.code, 'message': err.original.sqlMessage, 'path': 'SQL' });
      }
    }
    return {
      'data': !errors.length ? {
        'user': await sequelize.models.User.findOne({ where: { userID: context.USER.userID } })
      } : null,
      'errors': errors.length > 0 ? errors : null
    };
  }
}
